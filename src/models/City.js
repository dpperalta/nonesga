import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Province from './Province';

const City = sequelize.define('city', {
    cityID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    cityCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
    },
    cityName: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    cityDetail: {
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

Province.hasMany(City, { foreignKey: { name: 'provinceID', targetKey: 'provinceID' } });
City.belongsTo(Province, { foreignKey: { name: 'provinceID', targetKey: 'provinceID' } });

export default City;