const faker = require('faker'); // eslint-disable-line

const users = [];

for (let id = 1; id <= 20; id += 1) {
  const date = new Date();
  users.push({
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
  },

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
