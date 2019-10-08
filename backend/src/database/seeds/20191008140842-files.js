const date = new Date();

const files = [
  {
    name: '1.jpg',
    path: 'seeds/1.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    name: '2.jpg',
    path: 'seeds/2.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    name: '3.jpg',
    path: 'seeds/3.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    name: '4.jpg',
    path: 'seeds/4.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    name: '5.jpg',
    path: 'seeds/5.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    name: '6.jpg',
    path: 'seeds/6.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    name: '1.png',
    path: 'seeds/1.png',
    created_at: date,
    updated_at: date,
  },
  {
    name: '2.png',
    path: 'seeds/2.png',
    created_at: date,
    updated_at: date,
  },
  {
    name: '3.png',
    path: 'seeds/3.png',
    created_at: date,
    updated_at: date,
  },
  {
    name: '4.png',
    path: 'seeds/4.png',
    created_at: date,
    updated_at: date,
  },
  {
    name: '5.png',
    path: 'seeds/5.png',
    created_at: date,
    updated_at: date,
  },
  {
    name: '6.png',
    path: 'seeds/6.png',
    created_at: date,
    updated_at: date,
  },
];
module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('files', files, {});
  },
  down: queryInterface => queryInterface.bulkDelete('files', null, {}),
};
