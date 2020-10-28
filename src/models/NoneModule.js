import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import User from './User';

const NoneModule = sequelize.define('noneModule', {
    moduleID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    privileges: {
        type: Sequelize.SMALLINT
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
    },
    updatedDate: {
        type: Sequelize.DATE
    },
    updatedUser: {
        type: Sequelize.INTEGER
    },
    updatedReason: {
        type: Sequelize.TEXT
    },
    parentID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'noneModule',
            key: 'moduleID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

NoneModule.hasMany(NoneModule, { foreignKey: { name: 'moduleID', targetKey: 'parentID' } });
NoneModule.belongsTo(NoneModule, { foreignKey: { name: 'parentID', targetKey: 'moduleID' } });

export default NoneModule;