import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Calendar = sequelize.define('calendar', {
    calendarID: {
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
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    detail: {
        type: Sequelize.TEXT
    },
    year: {
        type: Sequelize.STRING(4)
    },
    updatedDate: {
        type: Sequelize.DATE
    },
    updatedUser: {
        type: Sequelize.INTEGER
    },
    updatedReason: {
        type: Sequelize.TEXT
    },
    isVisible: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default Calendar;