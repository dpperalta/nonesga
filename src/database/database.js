import Sequelize from 'sequelize';

/*export const sequelize = new Sequelize(
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
);*/

// Production
export const sequelize = new Sequelize(
    'nonesga', //esquema
    'djisvgxhgdftyc', //usuario
    '5bbc12f29c192c9d39bb13bd7159f7d7a2312a02a3c1dc74ab25c2ff89cfff36', //contraseña
    {
        hots: 'ec2-34-237-89-96.compute-1.amazonaws.com',
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