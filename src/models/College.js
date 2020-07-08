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
    /*registeredDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },*/
    unregisteredDate: {
        type: Sequelize.DATE
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

/*
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
    personTypeID: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Person.belongsTo(PersonType, { foreingKey: 'personTypeID', sourceKey: 'personTypeID' });
PersonType.hasMany(Person, { foreingKey: 'personTypeID', sourceKey: 'personTypeID' });

export default Person;
*/