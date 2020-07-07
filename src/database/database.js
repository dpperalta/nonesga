import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'nonesga', //esquema
    'postgres', //usuario
    'admin',     //contraseña
    {
        hots: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
);