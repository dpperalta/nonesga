import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Canton from './Canton';

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
    cantonID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'canton',
            key: 'cantonID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Canton.hasMany(City, { foreignKey: { name: 'cantonID', targetKey: 'cantonID' } });
City.belongsTo(Canton, { foreignKey: { name: 'cantonID', targetKey: 'cantonID' } });

export default City;