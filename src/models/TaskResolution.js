import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Task from './Task';
import Student from './Student';

const TaskResolution = sequelize.define('taskResolution', {
    resolutionID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    detail: {
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
    updatedDate: {
        type: Sequelize.DATE
    },
    isPublished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    publishedDate: {
        type: Sequelize.DATE
    },
    taskID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Task',
            key: 'taskID'
        }
    },
    studentID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Student',
            key: 'studentID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Task.hasMany(TaskResolution, { foreignKey: { name: 'taskID', targetKey: 'taskID' } });
TaskResolution.belongsTo(Task, { foreignKey: { name: 'taskID', targetKey: 'taskID' } });
Student.hasMany(TaskResolution, { foreignKey: { name: 'studentID', targetKey: 'studentID' } });
TaskResolution.belongsTo(Student, { foreignKey: { name: 'studentID', targetKey: 'studentID' } });

export default TaskResolution;