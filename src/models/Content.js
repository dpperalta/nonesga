import Sequelize from 'sequelize';
import Subject from '../models/Subject';
import { sequelize } from '../database/database';

const Content = sequelize.define('content', {
    contentID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    contentCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
    },
    contentTitle: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    contentDetail: {
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
    image: {
        type: Sequelize.STRING(500)
    },
    subjectID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'subject',
            key: 'subjectID'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Subject.hasMany(Content, { foreignKey: { name: 'subjectID', targetKey: 'subjectID' } });
Content.belongsTo(Subject, { foreignKey: { name: 'subjectID', targetKey: 'subjectID' } });

export default Content;