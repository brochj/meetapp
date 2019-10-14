const faker = require('faker'); // eslint-disable-line

const meetups = [];

for (let i = 1; i <= 1500; i += 1) {
  meetups.push({
    file_id: faker.random.number({ min: 1, max: 12 }),
    user_id: faker.random.number({ min: 1, max: 15 }),
    title: faker.lorem.sentence(faker.random.number(7)),
    description: faker.lorem.sentences(faker.random.number(7), '\n'),
    location: faker.address.city(),
    date: faker.date.between('2019-10-01', '2019-12-31'),
    created_at: new Date(),
    updated_at: new Date(),
  });
}

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('meetups', meetups, {});
  },

  down: queryInterface => queryInterface.bulkDelete('meetups', null, {}),
};
