import Sequelize, { SMALLINT } from 'sequelize';
import { sequelize } from '../database/database';
import Subject from './Subject';

const Exam = sequelize.define('exam', {
    examID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    startHour: {
        type: Sequelize.TIME,
        allowNull: false
    },
    endDate: {
        type: Sequelize.TIME,
        allowNull: false
    },
    endHour: {
        type: Sequelize.TIME,
        allowNull: false
    },
    minGrade: {
        type: Sequelize.SMALLINT,
        allowNull: false,
    },
    maxGrade: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    status: {
        type: Sequelize.SMALLINT
    },
    isDelayed: {
        type: Sequelize.BOOLEAN
    },
    minDelayed: {
        type: Sequelize.SMALLINT
    },
    maxDelayed: {
        type: Sequelize.SMALLINT
    },
    delayedDate: {
        type: Sequelize.DATE
    },
    registeredDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    unregisteredDate: {
        type: Sequelize.DATE
    },
    isPartial: {
        type: Sequelize.BOOLEAN
    },
    isFinal: {
        type: Sequelize.BOOLEAN
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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

Subject.hasMany(Exam, { foreignKey: { name: 'subjectID', targetKey: 'subjectID' } });
Exam.belongsTo(Subject, { foreignKey: { name: 'subjectID', targetKey: 'subjectID' } });

export default Exam;