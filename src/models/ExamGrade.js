import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Student from './Student';
import Exam from './Exam';
import Teacher from './Teacher';

const ExamGrade = sequelize.define('examGrade', {
    examGradeID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    grade: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    homologatedGrade: {
        type: Sequelize.STRING(5)
    },
    gradeDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    gradeDetail: {
        type: Sequelize.TEXT
    },
    isGraded: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isModified: {
        type: Sequelize.BOOLEAN
    },
    modificationDate: {
        type: Sequelize.DATE
    },
    modificationUser: {
        type: Sequelize.INTEGER
    },
    previousGrade: {
        type: Sequelize.SMALLINT
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
    teacherID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'teacher',
            key: 'teacherID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Student.hasMany(ExamGrade, { foreignKey: { name: 'studentID', targetKey: 'studentID' } });
ExamGrade.belongsTo(Student, { foreignKey: { name: 'studentID', targetKey: 'studentID' } });
Exam.hasMany(ExamGrade, { foreignKey: { name: 'examID', targetKey: 'examID' } });
ExamGrade.belongsTo(Exam, { foreignKey: { name: 'examID', targetKey: 'examID' } });
Teacher.hasMany(ExamGrade, { foreignKey: { name: 'teacherID', targetKey: 'teacherID' } });
ExamGrade.belongsTo(Teacher, { foreignKey: { name: 'teacherID', targetKey: 'teacherID' } });

export default ExamGrade;