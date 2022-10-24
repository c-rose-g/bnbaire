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
					firstName: 'Lily',
					lastName: 'Pad',
					username: 'Lillypad2',
					hashedPassword: bcrypt.hashSync('password'),
					email: 'demo2@aa.io',
				},
				{
					firstName: 'Hunter',
					lastName: 'Saadeh',
					username: 'HunS101',
					hashedPassword: bcrypt.hashSync('password'),
					email: 'demo3@aa.io',
				},
				{
					firstName: 'Kennedy',
					lastName: 'Perez',
					username: 'Kdog',
					hashedPassword: bcrypt.hashSync('password'),
					email: 'demo4@aa.io',
				},
				{
					firstName: 'Harper',
					lastName: 'Smith',
					username: 'Harper5',
					hashedPassword: bcrypt.hashSync('password'),
					email: 'demo5@aa.io',
				},
				{
					firstName: 'Jenna',
					lastName: 'Chatillon',
					username: 'Jennachat',
					hashedPassword: bcrypt.hashSync('password'),
					email: 'demo6@aa.io',
				},
			],
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
