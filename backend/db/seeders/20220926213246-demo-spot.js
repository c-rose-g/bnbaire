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
				name: 'Delightful vacation from urban life in a mansion',
				description: 'Our 1 bedroom is a spacious 970 sq ft situated on the 2nd floor of our building in the heart of the Gulch neighborhood in downtown Nashville.',
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
				name: 'Elegantly Renovated Bungalow in a Historic District',
				description: 'Relax in a renovated historic home with abundant design details',
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
				description: 'Soak up the airy living space filled with white brick, an open loft space and inspiring furniture and unwind in the luxurious bathrooms lined in beautiful tile.',
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
				name: 'Hollywood Hills New Construction w/ View',
				description: 'An outdoor brick paved space awaits just off the generous kitchen filled with natural light and a cozy dining room bench.',
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
				name: 'Private Rooftop w/Views of Downtown Dallas',
				description: 'Central Dallas modern townhome close to Downtown, with multiple bars, and restaurants in close vicinity.',
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
