'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>{
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: 'Wow, this place was the greatest thing to happen to me since the birth of my first child.',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'It was alright. The lady kept texting me nonstop about the amentities. We get it, you have nice towels.',
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Hablan muy bien el espanol. Me senti como en casa.',
        stars: 4
      },
      {
        spotId: 4,
        userId: 4,
        review: 'My doggy loved staying here. He thought it was paw-reffic',
        stars: 5
      },
      {
        spotId: 5,
        userId: 5,
        review: 'This kitty loved shacking in this oasis.',
        stars: 5
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
    return queryInterface.bulkDelete('Reviews')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
