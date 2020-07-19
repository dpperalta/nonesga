import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

import User from '../models/User';

const Session = sequelize.define('session', {
    sessionID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    sessionRoom: {
        type: Sequelize.INTEGER,
    },
    sessionDate: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    sessionToken: {
        type: Sequelize.TEXT
    },
    sessionExpiration: {
        type: Sequelize.STRING(50)
    },
    sessionIP: {
        type: Sequelize.STRING(20)
    },
    sessionDevice: {
        type: Sequelize.STRING(20)
    },
    sessionCode: {
        type: Sequelize.STRING(50)
    },
    userID: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Session.hasMany(User, { foreignKey: 'userID', sourceKey: 'userID' });
User.belongsTo(Session, { foreignKey: 'userID', sourceKey: 'userID' });

export default Session; 