import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import PersonType from './PersonType';

const Person = sequelize.define('person', {
    personID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    dni: {
        type: Sequelize.STRING(13),
        allowNull: false
    },
    birthdate: {
        type: Sequelize.DATE
    },
    names: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    lastNames: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    completeName: {
        type: Sequelize.STRING(200)
    },
    image: {
        type: Sequelize.STRING(500)
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
    bio: {
        type: Sequelize.TEXT
    },
    votes: {
        type: Sequelize.INTEGER
    },
    sex: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    personTypeID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'personType',
            key: 'personTypeID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

//PersonType.hasMany(Person, { foreingKey: 'personTypeID', sourceKey: 'personTypeID' });
//PersonType.hasMany(Person, { foreingKey: 'per_has_typ_fk', targetKey: 'personTypeID' });
PersonType.hasMany(Person, { foreingKey: { name: 'personTypeID', allowNull: true, targetKey: 'personTypeID' } });
//Person.belongsTo(PersonType, { foreingKey: 'per_has_typ_fk', targetKey: 'personTypeID' });
//Person.belongsTo(PersonType, { foreingKey: 'personTypeID', sourceKey: 'personTypeID' });
Person.belongsTo(PersonType, { foreingKey: { name: 'personTypeID', allowNull: true, targetKey: 'personTypeID' } });

export default Person;