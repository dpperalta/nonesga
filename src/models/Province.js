import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Country from './Country';

const Province = sequelize.define('province', {
    provinceID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    provinceCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
    },
    provinceName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    details: {
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
    countryID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'country',
            key: 'countryID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Country.hasMany(Province, { foreignKey: { name: 'countryID', targetKey: 'countryID' } });
Province.belongsTo(Country, { foreignKey: { name: 'countryID', targetKey: 'countryID' } });

export default Province;