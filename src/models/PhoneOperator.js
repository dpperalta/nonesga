import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const PhoneOperator = sequelize.define('phoneOperator', {
    operatorID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    operatorName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    detail: {
        type: Sequelize.TEXT
    },
    smsNumber: {
        type: Sequelize.STRING(15)
    },
    cost: {
        type: Sequelize.DOUBLE
    },
    observations: {
        type: Sequelize.TEXT
    },
    registeredDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    unregisteredDate: {
        type: Sequelize.DATE
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default PhoneOperator;