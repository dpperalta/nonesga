import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import ExamQuestion from './ExamQuestion';

const ExamAnswer = sequelize.define('examAnswer', {
    answerID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    answer: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    grade: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    homologatedGrade: {
        type: Sequelize.STRING(5)
    },
    isCorrect: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    status: {
        type: Sequelize.SMALLINT
    },
    detail: {
        type: Sequelize.TEXT
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

ExamQuestion.hasMany(ExamAnswer, { foreignKey: { name: 'questionID', targetKey: 'questionID' } });
ExamAnswer.belongsTo(ExamQuestion, { foreignKey: { name: 'questionID', targetKey: 'questionID' } });

export default ExamAnswer;