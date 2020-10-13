import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Exam from './Exam';

const ExamQuestion = sequelize.define('examQuestion', {
    questionID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    question: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    minGrade: {
        type: Sequelize.SMALLINT
    },
    maxGrade: {
        type: Sequelize.SMALLINT
    },
    image: {
        type: Sequelize.STRING(500)
    },
    registeredDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    unregisteredDate: {
        type: Sequelize.DATE
    },
    status: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    examID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'exam',
            key: 'examID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Exam.hasMany(ExamQuestion, { foreignKey: { name: 'examID', targetKey: 'examID' } });
ExamQuestion.belongsTo(Exam, { foreignKey: { name: 'examID', targetKey: 'examID' } });

export default ExamQuestion;