'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Spots', [
			{
				ownerId: 1,
				address: '2256 Avalon Street',
				city: 'Nashville',
				state: 'TN',
				country: 'United States of America',
				lat: 33.6566065,
				lng: -117.9103705,
				name: 'Delightful vacation',
				description: 'In the heart of downtown Nashville',
				price: 100,
			},
			{
				ownerId: 2,
				address: '2262 Avalon Street',
				city: 'Scottsdale',
				state: 'AZ',
				country: 'United States of America',
				lat: 33.6567793,
				lng: -117.9103903,
				name: 'Elegantly Renovated Bungalow',
				description:'Relax in a renovated historic home',
				price: 150,
			},
			{
				ownerId: 3,
				address: '2263 Avalon Street',
				city: 'Buffalo',
				state: 'NY',
				country: 'United States of America',
				lat: 33.6567828,
				lng: -117.9108898,
				name: 'Modern Villa with Unmatched Skyline Views',
				description: 'Soak up the open loft space',
				price: 200,
			},
			{
				ownerId: 4,
				address: '2257 Avalon Street',
				city: 'Hollywood',
				state: 'CA',
				country: 'United States of America',
				lat: 33.6566096,
				lng: -117.9109225,
				name: 'Hollywood Hills View',
				description: 'An outdoor awaits',
				price: 250,
			},
			{
				ownerId: 5,
				address: '2253 Avalon Street',
				city: 'Dallas',
				state: 'TX',
				country: 'United States of America',
				lat: 33.65644,
				lng: -117.9108983,
				name: 'Views of Downtown Dallas',
				description: 'Dallas modern townhome',
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
		return queryInterface.bulkDelete('Spots');
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
