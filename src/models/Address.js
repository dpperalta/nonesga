import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import City from './City';
import Person from './Person';

const Address = sequelize.define('address', {
    addressID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    addressName: {
        type: Sequelize.STRING(200)
    },
    mainStreet: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    number: {
        type: Sequelize.STRING(5),
        defaultValue: 'N/A',
        allowNull: false
    },
    secondStreet: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    references: {
        type: Sequelize.TEXT
    },
    zipCode: {
        type: Sequelize.STRING(8)
    },
    latitude: {
        type: Sequelize.DOUBLE
    },
    longitude: {
        type: Sequelize.DOUBLE
    },
    addressType: {
        type: Sequelize.SMALLINT
    },
    registeredDate: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    unregistredDate: {
        type: Sequelize.DATE
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    isFavourite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    cityID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'city',
            key: 'cityID'
        }
    },
    personID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'person',
            key: 'personID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

City.hasMany(Address, { foreignKey: { name: 'cityID', targetKey: 'cityID' } });
Address.belongsTo(City, { foreignKey: { name: 'cityID', targetKey: 'cityID' } });

Person.hasMany(Address, { foreignKey: { name: 'personID', targetKey: 'personID' } });
Address.belongsTo(Person, { foreignKey: { name: 'personID', targetKey: 'personID' } });

export default Address;