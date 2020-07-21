import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const College = sequelize.define('college', {
    collegeID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    collegeName: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    collegeShowName: {
        type: Sequelize.TEXT,
    },
    collegeCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
    },
    detail: {
        type: Sequelize.TEXT
    },
    flag: {
        type: Sequelize.STRING(500)
    },
    mainColour: {
        type: Sequelize.STRING(20)
    },
    secondaryColour: {
        type: Sequelize.STRING(20)
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
    image: {
        type: Sequelize.STRING(500)
    },
    logo: {
        type: Sequelize.STRING(500)
    },
    description: {
        type: Sequelize.TEXT
    },
    registratedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    unregistratedDate: {
        type: Sequelize.DATE
    },
    lastChangeDate: {
        type: Sequelize.DATE
    },
    changeDetail: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    lastChangeUser: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default College;