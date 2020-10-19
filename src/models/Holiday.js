import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Country from './Country';
import Province from './Province';
import Canton from './Canton';
import City from './City';

const Holiday = sequelize.define('holiday', {
    holidayID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
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
    isNational: {
        type: Sequelize.BOOLEAN
    },
    isOptional: {
        type: Sequelize.BOOLEAN
    },
    isReprogramed: {
        type: Sequelize.BOOLEAN
    },
    reprogramedDate: {
        type: Sequelize.DATE
    },
    countryID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'city',
            key: 'cityID'
        }
    },
    provinceID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'province',
            key: 'provinceID'
        }
    },
    cantonID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'canton',
            key: 'cantonID'
        }
    },
    cityID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'city',
            key: 'cityID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Country.hasMany(Holiday, { foreignKey: { name: 'countryID', targetKey: 'countryID' } });
Holiday.belongsTo(Country, { foreignKey: { name: 'countryID', targetKey: 'countryID' } });
Province.hasMany(Holiday, { foreignKey: { name: 'provinceID', targetKey: 'provinceID' } });
Holiday.belongsTo(Province, { foreignKey: { name: 'provinceID', targetKey: 'provinceID' } });
Canton.hasMany(Holiday, { foreignKey: { name: 'cantonID', targetKey: 'cantonID' } });
Holiday.belongsTo(Canton, { foreignKey: { name: 'cantonID', targetKey: 'cantonID' } });
City.hasMany(Holiday, { foreignKey: { name: 'cityID', targetKey: 'cityID' } });
Holiday.belongsTo(City, { foreignKey: { name: 'cityID', targetKey: 'cityID' } });

export default Holiday;