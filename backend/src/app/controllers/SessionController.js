import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    // validacoes dos dados de entrada
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required('email field is required'),
      password: Yup.string().required('password field is required'),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    const { email, password } = req.body;

    // Verificando se existe o email no banco de dados
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User does not exists' });
    }

    // Verificando se a senha informada bate com a salva no DB
    // O decrypt da senha é feito no Model pelo método checkPassword(password))
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // Se passou pelas validações acima, pode-se gerar uma sessão pro usuário
    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      // Gerar token
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
