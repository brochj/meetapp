import Sequelize from 'sequelize';

import File from '../app/models/File';
import User from '../app/models/User';
import Meetup from '../app/models/Meetup';
import Subscription from '../app/models/Subscription';

import databaseConfig from '../config/database';

const models = [User, File, Meetup, Subscription];
class Database {
  constructor() {
    this.init();
  }

  init() {
    // faz a conexao com o db e carrega os models
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
