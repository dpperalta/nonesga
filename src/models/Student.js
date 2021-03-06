import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Course from './Course';
import Person from './Person';

const Student = sequelize.define('student', {
    studentID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    studentCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
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
    registeredDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    unregisteredDate: {
        type: Sequelize.DATE
    },
    previousCourse: {
        type: Sequelize.INTEGER
    },
    grade: {
        type: Sequelize.SMALLINT
    },
    details: {
        type: Sequelize.TEXT
    },
    ratting: {
        type: Sequelize.SMALLINT
    },
    bio: {
        type: Sequelize.TEXT
    },
    personID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'person',
            key: 'personID'
        }
    },
    courseID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'course',
            key: 'courseID'
        }
    },
}, {
    timestamps: false,
    freezeTableName: true
});

Person.hasMany(Student, { foreignKey: { name: 'personID', targetKey: 'personID' } });
Student.belongsTo(Person, { foreignKey: { name: 'personID', targetKey: 'personID' } });

Course.hasMany(Student, { foreignKey: { name: 'courseID', targetKey: 'courseID' } });
Student.belongsTo(Course, { foreignKey: { name: 'courseID', targetKey: 'courseID' } });

export default Student;