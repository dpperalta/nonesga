import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const EnrollmentStatus = sequelize.define('enrollmentStatus', {
    statusID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    code: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    unregisteredDate: {
        type: Sequelize.DATE
    },
    detail: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default EnrollmentStatus;