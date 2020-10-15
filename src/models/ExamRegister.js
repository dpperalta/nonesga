import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Exam from './Exam';
import Student from './Student';
import User from './User';

const ExamRegister = sequelize.define('examRegister', {
    registerID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    registeredDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    status: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    reviewNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isReviewed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    lastStatus: {
        type: Sequelize.SMALLINT
    },
    lastStatusDate: {
        type: Sequelize.DATE
    },
    lastStatusUser: {
        type: Sequelize.INTEGER
    },
    reviewDetail: {
        type: Sequelize.TEXT
    },
    generalDetail: {
        type: Sequelize.TEXT
    },
    isRegistered: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    studentID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'student',
            key: 'studentID'
        }
    },
    examID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'exam',
            key: 'examID'
        }
    },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'userID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Student.hasMany(ExamRegister, { foreignKey: { name: 'studentID', targetKey: 'studentID' } });
ExamRegister.belongsTo(Student, { foreignKey: { name: 'studentID', targetKey: 'studentID' } });
Exam.hasMany(ExamRegister, { foreignKey: { name: 'examID', targetKey: 'examID' } });
ExamRegister.belongsTo(Exam, { foreignKey: { name: 'examID', targetKey: 'examID' } });
User.hasMany(ExamRegister, { foreignKey: { name: 'userID', targetKey: 'userID' } });
ExamRegister.belongsTo(User, { foreignKey: { name: 'userID', targetKey: 'userID' } });

export default ExamRegister;