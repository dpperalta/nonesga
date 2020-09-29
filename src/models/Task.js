import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Subject from './Subject';

const Task = sequelize.define('task', {
    taskID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    taskCode: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    taskName: {
        type: Sequelize.STRING(300),
        allowNull: false
    },
    taskDetail: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    permitsDelay: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    maxDelay: {
        type: Sequelize.DATE
    },
    image: {
        type: Sequelize.STRING(500)
    },
    subjectID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'subject',
            key: 'subjectID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Subject.hasMany(Task, { foreignKey: { name: 'subjectID', targetKey: 'subjectID' } });
Task.belongsTo(Subject, { foreignKey: { name: 'subjectID', targetKey: 'subjectID' } });

export default Task;