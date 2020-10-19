import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Province from './Province';

const Canton = sequelize.define('canton', {
    cantonID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    cantonCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
    },
    cantonName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    details: {
        type: Sequelize.TEXT
    },
    capital: {
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
    provinceID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'province',
            key: 'provinceID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Province.hasMany(Canton, { foreignKey: { name: 'provinceID', targetKey: 'provinceID' } });
Canton.belongsTo(Province, { foreignKey: { name: 'provinceID', targetKey: 'provinceID' } });

export default Canton;