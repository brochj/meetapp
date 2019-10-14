import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    // validacoes dos dados de entrada
    const schema = Yup.object().shape({
      name: Yup.string().required('name field is required'),
      email: Yup.string()
        .email('invalid email')
        .required('email field is required'),
      password: Yup.string()
        .min(6, 'Passwords must be at least 6 characters long')
        .required('password field is required'),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    // Verificando se ja existe usuário com email cadastrado
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    // validacão de update de usuário
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email('invalid email'),
      oldPassword: Yup.string().min(
        6,
        'Passwords must be at least 6 characters long'
      ),
      password: Yup.string()
        .min(6, 'Passwords must be at least 6 characters long')
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required()
              .oneOf([Yup.ref('password')], 'confirm password does not match')
          : field
      ),
    });
    // TODO evitar update de senha atual, exempl oldpassword = password

    //schema
      //.validate(req.body)
      //.catch(e => res.status(400).json({ error: e.message }));

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId); // user contem os dados do DB

    // Verificando se o usario quis trocar de email.
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    // Verificando se o usario quis trocar de senha.
    // Verificando se a senha "antiga" confere com a senha salva no DB
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // Se passou pelas validações acima, pode-se atualizar o usuário
    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, email, provider });
  }
}

export default new UserController();
