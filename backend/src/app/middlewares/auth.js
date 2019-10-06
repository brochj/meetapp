import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // Verifica se foi passado um Token no header
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // authHeader = 'Bearer xcYaE7f2TCPs8ufAv7C_PG...'
  // Retiro a palavra Bearer e descarto, ficando somente com o token
  const [, token] = authHeader.split(' ');

  try {
    // decodificando para pegar o id que esta dentro do token jwt
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Passa o id do usuario para dentro do req,
    req.userId = decoded.id;
    // logo em UserController.update terá disponível esse id do usuário em req.userId

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
