import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

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
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default Course;