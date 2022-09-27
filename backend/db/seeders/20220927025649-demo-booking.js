'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>{

    return queryInterface.bulkInsert('Bookings', [

    {
      spotId: 1,
      userId: 1,
      startDate: '2022-09-01',
      endDate: '2022-09-10'
    },
    {
      spotId: 2,
      userId: 2,
      startDate: '2022-10-01',
      endDate: '2022-10-31'
    },
    {
      spotId: 3,
      userId: 3,
      startDate: '2022-11-01',
      endDate: '2022-11-15'
    },
    {
      spotId: 4,
      userId: 4,
      startDate: '2022-12-01',
      endDate: '2022-12-20'
    },
    {
      spotId: 5,
      userId: 5,
      startDate: '2022-10-15',
      endDate: '2022-10-29'
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

  down: async (queryInterface, Sequelize) =>{
    return queryInterface.bulkDelete('Bookings')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
