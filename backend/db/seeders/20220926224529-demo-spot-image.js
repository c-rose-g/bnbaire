'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://static8.depositphotos.com/1392258/871/i/600/depositphotos_8716836-stock-photo-modern-gray-brick-home.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://st2.depositphotos.com/1007034/6589/i/450/depositphotos_65897773-stock-photo-modern-house-with-pool.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://us.123rf.com/450wm/kab3/kab31910/kab3191000005/132406339-modern-house-with-garage.jpg?ver=6',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.habitusliving.com/wp-content/uploads/1.smallmodhomesFEAT.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://www.skyarchitectstudio.com.au/wp-content/uploads/2021/04/DEEPDENE-MODERN-HOUSE-1.jpg',
        preview: true
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SpotImages')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
