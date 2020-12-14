import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Forum from './Forum';

const ForumContent = sequelize.define('forumContent', {
    forumContentID: {
        type: Sequelize.INTEGER,
        primaryKey: true
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
    forumContent: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    details: {
        type: Sequelize.TEXT
    },
    forumID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'forum',
            key: 'forumID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Forum.hasMany(ForumContent, { foreignKey: { name: 'forumID', targetKey: 'forumID' } });
ForumContent.belongsTo(Forum, { foreignKey: { name: 'forumID', targetKey: 'forumID' } });

export default ForumContent;