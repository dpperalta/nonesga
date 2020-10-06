import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Task from './Task';
import Student from './Student';

const TaskEvaluation = sequelize.define('taskEvaluation', {
    taskEvaluationID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    taskScore: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    scoreHomologation: {
        type: Sequelize.STRING(5)
    },
    registeredDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    unregisteredDate: {
        type: Sequelize.DATE
    },
    taskEvaluationDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    studentDetail: {
        type: Sequelize.TEXT
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    agentDetail: {
        type: Sequelize.TEXT
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

Task.hasMany(TaskEvaluation, { foreignKey: { name: 'taskID', targetKey: 'taskID' } });
TaskEvaluation.belongsTo(Task, { foreignKey: { name: 'taskID', targetKey: 'taskID' } });
Student.hasMany(TaskEvaluation, { foreignKey: { name: 'studentID', targetKey: 'studentID' } });
TaskEvaluation.belongsTo(Student, { foreignKey: { name: 'studentID', targetKey: 'studentID' } });

export default TaskEvaluation;