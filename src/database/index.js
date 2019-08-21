import Sequelize from 'sequelize';

import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User];
class Database {
  constructor() {
    this.init();
  }

  init() {
    // faz a conexao com o db e carrega os models
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
