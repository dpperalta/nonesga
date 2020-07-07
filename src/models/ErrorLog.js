import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

const ErrorLog = sequelize.define('errorLog', {
    errorLogID: {
        type: Sequelize.INTEGER,
        primarikey: true
    },
    errorDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    errorDetail: {
        type: Sequelize.JSON,
        allowNull: false
    },
    errorModule: {
        type: Sequelize.CHAR,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default ErrorLog;