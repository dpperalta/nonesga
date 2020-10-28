import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import College from './College';
import NoneModule from './NoneModule';

const NoneParam = sequelize.define('noneParam', {
    paramID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    paramName: {
        type: Sequelize.STRING(100),
        allowNull: false
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
    isGlobal: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    value: {
        type: Sequelize.TEXT
    },
    rules: {
        type: Sequelize.JSON
    },
    collegeID: {
        type: Sequelize.INTEGER,
        references: {
            modle: 'college',
            key: 'collegeID'
        }
    },
    moduleID: {
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

College.hasMany(NoneParam, { foreignKey: { name: 'collegeID', targetKey: 'collegeID' } });
NoneParam.belongsTo(College, { foreignKey: { name: 'collegeID', targetKey: 'collegeID' } });
NoneModule.hasMany(NoneParam, { foreignKey: { name: 'moduleID', targetKey: 'moduleID' } });
NoneParam.belongsTo(NoneModule, { foreignKey: { name: 'moduleID', targetKey: 'moduleID' } });

export default NoneParam;