'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					firstName: 'Demo',
					lastName: 'Demo',
					username: 'Demolition',
					hashedPassword: bcrypt.hashSync('password'),
					email: 'demo@aa.io',
				},
				{
					firstName: 'Cindy',
					lastName: 'Guzman',
					username: 'Cece2',
					hashedPassword: bcrypt.hashSync('password'),
					email: 'demo2@aa.io',
				},
				{
					firstName: 'Hunter',
					lastName: 'Guzman',
					username: 'Cece3',
					hashedPassword: bcrypt.hashSync('password'),
					email: 'demo3@aa.io',
				},
				{
					firstName: 'Kennedy',
					lastName: 'Perez',
					username: 'Lucy4',
					hashedPassword: bcrypt.hashSync('password'),
					email: 'demo4@aa.io',
				},
				{
					firstName: 'Harper',
					lastName: 'Guzman',
					username: 'Harper5',
					hashedPassword: bcrypt.hashSync('password'),
					email: 'demo5@aa.io',
				},
				{
					firstName: 'Jenna',
					lastName: 'Guzman',
					username: 'Lilith5',
					hashedPassword: bcrypt.hashSync('password'),
					email: 'demo6@aa.io',
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			'Users',
			{
				username: { [Op.in]: ['Demolition','Cece2', 'Cece3', 'Lucy4','Harper5','Lilith5'] },
			},
			{}
		);
	},
};
