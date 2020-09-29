import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import AcademicPeriod from './AcademicPeriod';
import Course from './Course';
import EnrollmentStatus from './EnrollmentStatus';
import Student from './Student';
import User from './User';

const Enrollment = sequelize.define('enrollment', {
    enrollmentID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    enrollmentCode: {
        type: Sequelize.STRING(10)
    },
    registeredDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    unregisteredDate: {
        type: Sequelize.DATE
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    statusChangeDate: {
        type: Sequelize.DATE
    },
    statusID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'enrollmentStatus',
            key: 'statusID'
        }
    },
    studentID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'student',
            key: 'studentID'
        }
    },
    userID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'user',
            key: 'userID'
        }
    },
    periodID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'academicPeriod',
            key: 'periodID'
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

EnrollmentStatus.hasMany(Enrollment, { foreignKey: { name: 'statusID', targetKey: 'statusID' } });
Enrollment.belongsTo(EnrollmentStatus, { foreignKey: { name: 'statusID', targetKey: 'statusID' } });
Student.hasMany(Enrollment, { foreignKey: { name: 'studentID', targetKey: 'studentID' } });
Enrollment.belongsTo(Student, { foreignKey: { name: 'studentID', targetKey: 'studentID' } });
User.hasMany(Enrollment, { foreignKey: { name: 'userID', targetKey: 'userID' } });
Enrollment.belongsTo(User, { foreignKey: { name: 'userID', targetKey: 'userID' } });
AcademicPeriod.hasMany(Enrollment, { foreignKey: { name: 'periodID', targetKey: 'periodID' } });
Enrollment.belongsTo(AcademicPeriod, { foreignKey: { name: 'periodID', targetKey: 'periodID' } });
Course.hasMany(Enrollment, { foreignKey: { name: 'courseID', targetKey: 'courseID' } });
Enrollment.belongsTo(Course, { foreignKey: { name: 'courseID', targetKey: 'courseID' } });

export default Enrollment;

/*
        
}, {
    timestamps: false,
    freezeTableName: true
});

Course.hasMany(Subject, { foreignKey: { name: 'courseID', targetKey: 'courseID' } });
Subject.belongsTo(Course, { foreignKey: { name: 'courseID', targetKey: 'courseID' } });
Teacher.hasMany(Subject, { foreignKey: { name: 'teacherID', targetKey: 'teacherID' } });
Subject.belongsTo(Teacher, { foreignKey: { name: 'teacherID', targetKey: 'teacherID' } });

export default Subject;
*/