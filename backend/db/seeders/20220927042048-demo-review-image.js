'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>{
    return queryInterface.bulkInsert('ReviewImages',[
      {
        reviewId: 1,
        url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aG9tZSUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
      },
      {
        reviewId: 2,
        url: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBpbnRlcmlvcnxlbnwwfHwwfHw%3D&w=1000&q=80'
      },
      {
        reviewId: 3,
        url: 'https://media.istockphoto.com/photos/front-door-of-home-with-beautiful-floor-plan-design-picture-id1263682795?b=1&k=20&m=1263682795&s=170667a&w=0&h=Ktd6hDi7X_KsnpNEagEJT6YRLVK0uImBNK64T7isMF0='
      },
      {
        reviewId: 4,
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZSUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
      },
      {
        reviewId: 5,
        url: 'https://st2.depositphotos.com/2851435/8341/i/600/depositphotos_83419576-stock-photo-minimalist-sitting-room-design.jpg'
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
    return queryInterface.bulkDelete('ReviewImages')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
