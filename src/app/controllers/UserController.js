// import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    // Verificando se ja existe usuário com email cadastrado
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    // validacoes
    // const schema = Yup.object().shape({
    //   name: Yup.string(),
    //   email: Yup.string().email(),
    //   oldPassword: Yup.string().min(6),
    //   password: Yup.string()
    //     .min(6)
    //     .when('oldPassword', (oldPassword, field) =>
    //       oldPassword ? field.required() : field
    //     ),
    //   confirmPassword: Yup.string().when('password', (password, field) =>
    //     password ? field.required().oneOf([Yup.ref('password')]) : field
    //   ),
    // });

    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ error: 'Validations fails' });
    // }

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
