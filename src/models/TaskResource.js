import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Task from './Task';

const TaskResource = sequelize.define('taskResource', {
    taskResourceID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    resourceName: {
        type: Sequelize.STRING(250),
        allowNull: false
    },
    resourceType: {
        type: Sequelize.STRING(500)
    },
    resourceDetail: {
        type: Sequelize.TEXT,
        allowNull: false
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
    taskID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'task',
            key: 'taskID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Task.hasMany(TaskResource, { foreignKey: { name: 'taskID', targetKey: 'taskID' } });
TaskResource.belongsTo(Task, { foreignKey: { name: 'taskID', targetKey: 'taskID' } });

export default TaskResource;