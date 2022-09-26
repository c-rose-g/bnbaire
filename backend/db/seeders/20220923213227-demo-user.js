'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					firstName: 'Cindy',
					lastName: 'Guzman',
					username: 'Cece1',
					hashedPassword: bcrypt.hashSync('password1'),
					email: 'demo1@aa.io',
				},
				{
					firstName: 'Cindy',
					lastName: 'Guzman',
					username: 'Cece2',
					hashedPassword: bcrypt.hashSync('password2'),
					email: 'demo2@aa.io',
				},
				{
					firstName: 'Lucy',
					lastName: 'Perez',
					username: 'Lucy3',
					hashedPassword: bcrypt.hashSync('password3'),
					email: 'demo3@aa.io',
				},
				{
					firstName: 'Harper',
					lastName: 'Guzman',
					username: 'Harper4',
					hashedPassword: bcrypt.hashSync('password4'),
					email: 'demo4@aa.io',
				},
				{
					firstName: 'Lilith',
					lastName: 'Guzman',
					username: 'Lilith5',
					hashedPassword: bcrypt.hashSync('password5'),
					email: 'demo5@aa.io',
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
				username: { [Op.in]: ['Cece1', 'Cece2', 'Lucy3','Harper4','Lilith5'] },
			},
			{}
		);
	},
};
