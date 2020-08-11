import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Person from './Person';

const Teacher = sequelize.define('teacher', {
    teacherID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    teacherCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
    },
    status: {
        type: Sequelize.SMALLINT
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    registeredDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    unregisteredDate: {
        type: Sequelize.DATE
    },
    details: {
        type: Sequelize.TEXT
    },
    bio: {
        type: Sequelize.TEXT
    },
    ratting: {
        type: Sequelize.SMALLINT
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

Person.hasMany(Teacher, { foreignKey: { name: 'personID', targetKey: 'personID' } });
Teacher.belongsTo(Person, { foreignKey: { name: 'personID', targetKey: 'personID' } });

export default Teacher;