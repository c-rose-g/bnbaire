'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Spots', [
			{
				ownerId: 1,
				address: '2256 Avalon Street',
				city: 'Costa Mesa',
				state: 'California',
				country: 'United States of America',
				lat: 33.6566065,
				lng: -117.9103705,
				name: 'Cece House One',
				description: 'First spot',
				price: 100,
			},
			{
				ownerId: 2,
				address: '2262 Avalon Street',
				city: 'Costa Mesa',
				state: 'California',
				country: 'United States of America',
				lat: 33.6567793,
				lng: -117.9103903,
				name: 'Cece House Two',
				description: 'Second spot',
				price: 150,
			},
			{
				ownerId: 3,
				address: '2263 Avalon Street',
				city: 'Costa Mesa',
				state: 'California',
				country: 'United States of America',
				lat: 33.6567828,
				lng: -117.9108898,
				name: 'Lucy House',
				description: 'Beautiful spot',
				price: 200,
			},
			{
				ownerId: 4,
				address: '2257 Avalon Street',
				city: 'Costa Mesa',
				state: 'California',
				country: 'United States of America',
				lat: 33.6566096,
				lng: -117.9109225,
				name: 'Doggy Zen Pad',
				description: 'Doggy-approved spot',
				price: 250,
			},
			{
				ownerId: 5,
				address: '2253 Avalon Street',
				city: 'Costa Mesa',
				state: 'California',
				country: 'United States of America',
				lat: 33.65644,
				lng: -117.9108983,
				name: 'Kitty Oasis',
				description: 'Cat-approved spot',
				price: 300,
			},
		]);
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
    return queryInterface.bulkDelete(
      'Spots'
    )
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
