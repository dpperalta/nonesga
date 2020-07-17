import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Role from './Role';
import Person from './Person';
import College from './College';

const User = sequelize.define('user', {
    userID: {
        type: Sequelize.INTEGER,
        primarikey: true
    },
    nick: {
        type: Sequelize.STRING(100),
        unique: true
    },
    pass: {
        type: Sequelize.STRING(400),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    registeredDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    status: {
        type: Sequelize.SMALLINT
    },
    unregisteredDate: {
        type: Sequelize.DATE
    },
    lastLogin: {
        type: Sequelize.DATE
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    personID: {
        type: Sequelize.INTEGER
    },
    roleID: {
        type: Sequelize.INTEGER
    },
    collegeID: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true
});


Role.hasMany(User, { foreingKey: 'roleID', sourceKey: 'roleID' });
User.belongsTo(Role, { foreingKey: 'roleID', sourceKey: 'roleID' });

Person.hasMany(User, { foreingKey: 'personID', sourceKey: 'personID' });
User.belongsTo(Person, { foreingKey: 'personID', sourceKey: 'personID' });

College.hasMany(User, { foreingKey: 'collegeID', sourceKey: 'collegeID' });
User.belongsTo(College, { foreingKey: 'collegeID', sourceKey: 'collegeID' });

export default User;