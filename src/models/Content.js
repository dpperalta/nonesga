import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Content = sequelize.define('content', {
    contentID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    contentCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
    },
    contentDetail: {
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
    image: {
        type: Sequelize.STRING(500)
    }
    /*,
        subjectID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'province',
                key: 'provinceID'
            }
        }*/
}, {
    timestamps: false,
    freezeTableName: true
});

export default Content;