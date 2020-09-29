import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

// Se podría analizar la posibilidad de anclar el collegeID con el academic period para que cada institución
// pueda crear sus propios periodos académicos

const AcademicPeriod = sequelize.define('academicPeriod', {
    periodID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    startPeriod: {
        type: Sequelize.DATE
    },
    endPeriod: {
        type: Sequelize.DATE
    },
    periodName: {
        type: Sequelize.STRING(150),
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
    detail: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default AcademicPeriod;