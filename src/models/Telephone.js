import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Person from './Person';
import PhoneOperator from './PhoneOperator';

const Telephone = sequelize.define('telephone', {
    telephoneID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    number: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    phoneName: {
        type: Sequelize.STRING(100),
        //allowNull: true
    },
    detail: {
        type: Sequelize.TEXT
    },
    isFavourite: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isWork: {
        type: Sequelize.BOOLEAN
    },
    phoneType: {
        type: Sequelize.SMALLINT
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
    operatorID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'phoneOperator',
            key: 'operatorID'
        }
    },
    personID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'person',
            key: 'personID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

PhoneOperator.hasMany(Telephone, { foreignKey: { name: 'operatorID', targetKey: 'operatorID' } });
Telephone.belongsTo(PhoneOperator, { foreignKey: { name: 'operatorID', targetKey: 'operatorID' } });

Person.hasMany(Telephone, { foreignKey: { name: 'personID', targetKey: 'personID' } });
Telephone.belongsTo(Person, { foreignKey: { name: 'personID', targetKey: 'personID' } });

export default Telephone;