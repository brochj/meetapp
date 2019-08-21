import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        // OBS: esses campos abaixo NÃO precisam ser um reflexo dos
        // campos que estão na base de dados
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        // esse campo VIRTUAL nunca vai existir no DB, somente no lado do código
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      { sequelize }
    );
    // Esses hooks são uma funcionalidade do sequelize
    // São trechos de código, que são executados de forma automática, baseado em acoes
    // que acontecem no Model
    // Exemplo:
    // Quando utiliza-se o Hook `'beforeSave '` antes de qulqr usuario ser salvo/alterado no banco de dados, o trecho de código que dentro desse hook (segundo parâmetro) será executado de forma automática
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // checkPassword(password) {
  //   return bcrypt.compare(password, this.password_hash);
  // }
}

export default User;
