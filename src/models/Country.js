import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Country = sequelize.define('country', {
    countryID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    countryCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
    },
    countryName: {
        type: Sequelize.STRING(250),
        allowNull: false,
        unique: true
    },
    countryDetails: {
        type: Sequelize.TEXT
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    callCode: {
        type: Sequelize.STRING(5),
        allowNull: false
    },
    registeredDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    unregisteredDate: {
        type: Sequelize.DATE
    },
    currency: {
        type: Sequelize.STRING(100)
    },
    currencySymbol: {
        type: Sequelize.STRING(3)
    },
    longLanguage: {
        type: Sequelize.STRING(100)
    },
    shortLanguage: {
        type: Sequelize.STRING(5)
    },
    status:{
        type: Sequelize.SMALLINT
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default Country;