import Sequelize from 'sequelize';
import { Col } from 'sequelize/types/lib/utils';
import { sequelize } from '../database/database';
import College from '../models/College';
import Course from '../models/Course';

const Schedule = sequelize.define('schedule', {
    scheduleID: {
        type: Sequelize.INTEGER,
        primaryKey: true
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
    details: {
        type: Sequelize.TEXT
    },
    isAutomatic: {
        type: Sequelize.BOOLEAN
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    endDate: {
        type: Sequelize.DATE
    },
    date: {
        type: Sequelize.DATE
    },
    startHour: {
        type: Sequelize.TIME
    },
    endHour: {
        type: Sequelize.TIME
    },
    timePeriod: {
        type: Sequelize.TIME
    },
    collegeID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'college',
            key: 'collegeID'
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

College.hasMany(Schedule, { foreignKey: { name: 'collegeID', targetKey: 'collegeID' } });
Schedule.belongsTo(College, { foreignKey: { name: 'collegeID', targetKey: 'collegeID' } });
Course.hasMany(Schedule, { foreignKey: { name: 'courseID', targetKey: 'courseID' } });
Schedule.belongsTo(Course, { foreignKey: { name: 'courseID', targetKey: 'courseID' } });

export default Schedule;

/*
Person.hasMany(Student, { foreignKey: { name: 'personID', targetKey: 'personID' } });
Student.belongsTo(Person, { foreignKey: { name: 'personID', targetKey: 'personID' } });

*/