import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import College from './College';

const Course = sequelize.define('course', {
    courseID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    courseCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
    },
    courseName: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    description: {
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
    collegeID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'college',
            key: 'collegeID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

College.hasMany(Course, { foreignKey: { name: 'collegeID', targetKey: 'collegeID' } });
Course.belongsTo(College, { foreignKey: { name: 'collegeID', targetKey: 'collegeID' } });

export default Course;