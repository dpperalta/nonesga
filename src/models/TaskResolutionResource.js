import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import TaskResolution from './TaskResolution';

const TaskResolutionResource = sequelize.define('taskResolutionResource', {
    resourceID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    resourceName: {
        type: Sequelize.TEXT
    },
    details: {
        type: Sequelize.TEXT
    },
    resource: {
        type: Sequelize.STRING(500)
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
    resolutionID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'taskResolution',
            key: 'resolutionID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

TaskResolution.hasMany(TaskResolutionResource, { foreignKey: { name: 'resolutionID', targetKey: 'resolutionID' } });
TaskResolutionResource.belongsTo(TaskResolution, { foreignKey: { name: 'resolutionID', targetKey: 'resolutionID' } })

export default TaskResolutionResource;