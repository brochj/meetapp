const faker = require('faker'); // eslint-disable-line

const users = [];

for (let i = 1; i <= 15; i += 1) {
  const date = new Date();
  users.push({
    id: i,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password_hash:
      '$2a$08$yIzw6uZsyKum50NU8qp9h.rCfwghMB49rigY3LrVB4WGwH08JUN46',
    avatar_id: null,
    created_at: date,
    updated_at: date,
  });
}

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('users', users, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "users_id_seq" RESTART WITH ${users.length + 1}`
    );
  },

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
