import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Course from './Course';
import Teacher from './Teacher';

const Subject = sequelize.define('subject', {
    subjectID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    subjectCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
    },
    subjectName: {
        type: Sequelize.STRING(250),
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    details: {
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
    },
    gradeNeeded: {
        type: Sequelize.SMALLINT
    },
    gradeHomologation: {
        type: Sequelize.STRING(2)
    },
    gradeMinimun: {
        type: Sequelize.SMALLINT
    },
    gradeMaximun: {
        type: Sequelize.SMALLINT
    },
    teacherID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'teacher',
            key: 'teacherID'
        }
    },
    courseID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'course',
            key: 'courseID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Course.hasMany(Subject, { foreignKey: { name: 'courseID', targetKey: 'courseID' } });
Subject.belongsTo(Course, { foreignKey: { name: 'courseID', targetKey: 'courseID' } });
Teacher.hasMany(Subject, { foreignKey: { name: 'teacherID', targetKey: 'teacherID' } });
Subject.belongsTo(Teacher, { foreignKey: { name: 'teacherID', targetKey: 'teacherID' } });

export default Subject;