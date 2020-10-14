import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import ExamAnswer from './ExamAnswer';
import ExamQuestion from './ExamQuestion';
import Student from './Student';

const StudentAnswer = sequelize.define('studentAnswer', {
    studentAnswerID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    selectedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    grade: {
        type: Sequelize.DOUBLE
    },
    tryNumber: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 1
    },
    studentAnswer: {
        type: Sequelize.TEXT
    },
    teacherDetails: {
        type: Sequelize.TEXT
    },
    agentDetails: {
        type: Sequelize.TEXT
    },
    studentDetails: {
        type: Sequelize.TEXT
    },
    isReviewed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    isPublished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    publishedDate: {
        type: Sequelize.DATE
    },
    teacherUpdates: {
        type: Sequelize.DATE
    },
    studentUpdates: {
        type: Sequelize.DATE
    },
    agentUpdates: {
        type: Sequelize.DATE
    },
    answerID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'examAnswer',
            key: 'answerID'
        }
    },
    studentID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'student',
            key: 'studentID'
        }
    },
    questionID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'examQuestion',
            key: 'questionID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

ExamAnswer.hasMany(StudentAnswer, { foreignKey: { name: 'answerID', targetKey: 'answerID' } });
StudentAnswer.belongsTo(ExamAnswer, { foreignKey: { name: 'answerID', targetKey: 'answerID' } });
Student.hasMany(StudentAnswer, { foreignKey: { name: 'studentID', targetKey: 'studentID' } });
StudentAnswer.belongsTo(Student, { foreignKey: { name: 'studentID', targetKey: 'studentID' } });
ExamQuestion.hasMany(StudentAnswer, { foreignKey: { name: 'questionID', targetKey: 'questionID' } });
StudentAnswer.belongsTo(ExamQuestion, { foreignKey: { name: 'questionID', targetKey: 'questionID' } });

export default StudentAnswer;