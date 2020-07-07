import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

const Role = sequelize.define('role', {
    roleID: {
        type: Sequelize.INTEGER,
        primarikey: true
    },
    roleCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
    },
    roleName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    privileges: {
        type: Sequelize.SMALLINT
    },
    description: {
        type: Sequelize.TEXT
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    registeredDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    unregisteredDate: {
        type: Sequelize.DATE
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default Role;