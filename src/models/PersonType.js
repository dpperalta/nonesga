import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const PersonType = sequelize.define('personType', {
    personTypeID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    type: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        unique: true
    },
    typeName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    details: {
        type: Sequelize.STRING(500)
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

export default PersonType;