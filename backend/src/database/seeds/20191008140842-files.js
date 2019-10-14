const date = new Date();

const files = [
  {
    id: 1,
    name: '1.jpg',
    path: 'seeds/1.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    id: 2,
    name: '2.jpg',
    path: 'seeds/2.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    id: 3,
    name: '3.jpg',
    path: 'seeds/3.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    id: 4,
    name: '4.jpg',
    path: 'seeds/4.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    id: 5,
    name: '5.jpg',
    path: 'seeds/5.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    id: 6,
    name: '6.jpg',
    path: 'seeds/6.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    id: 7,
    name: '1.png',
    path: 'seeds/1.png',
    created_at: date,
    updated_at: date,
  },
  {
    id: 8,
    name: '2.png',
    path: 'seeds/2.png',
    created_at: date,
    updated_at: date,
  },
  {
    id: 9,
    name: '3.png',
    path: 'seeds/3.png',
    created_at: date,
    updated_at: date,
  },
  {
    id: 10,
    name: '4.png',
    path: 'seeds/4.png',
    created_at: date,
    updated_at: date,
  },
  {
    id: 11,
    name: '5.png',
    path: 'seeds/5.png',
    created_at: date,
    updated_at: date,
  },
  {
    id: 12,
    name: '6.png',
    path: 'seeds/6.png',
    created_at: date,
    updated_at: date,
  },
];
module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('files', files, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "files_id_seq" RESTART WITH ${files.length + 1}`
    );
  },
  down: queryInterface => queryInterface.bulkDelete('files', null, {}),
};
