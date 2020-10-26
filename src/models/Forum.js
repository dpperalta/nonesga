import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Teacher from './Teacher';

const Forum = sequelize.define('forum', {
    forumID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    forumName: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    forumDetails: {
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
    isAcademic: {
        type: Sequelize.BOOLEAN
    },
    isQualified: {
        type: Sequelize.BOOLEAN
    },
    calification: {
        type: Sequelize.DOUBLE
    },
    teacherID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'teacher',
            key: 'teacherID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Teacher.hasMany(Forum, { foreignKey: { name: 'teacherID', targetKey: 'teacherID' } });
Forum.belongsTo(Teacher, { foreignKey: { name: 'teacherID', targetKey: 'teacherID' } });

export default Forum;