"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _Subject = _interopRequireDefault(require("../models/Subject"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Content = _database.sequelize.define('content', {
  contentID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  contentCode: {
    type: _sequelize["default"].STRING(10),
    allowNull: false,
    unique: true
  },
  contentTitle: {
    type: _sequelize["default"].STRING(50),
    allowNull: false
  },
  contentDetail: {
    type: _sequelize["default"].TEXT
  },
  registeredDate: {
    type: _sequelize["default"].DATE,
    allowNull: false,
    defaultValue: _database.sequelize.literal('CURRENT_TIMESTAMP')
  },
  unregisteredDate: {
    type: _sequelize["default"].DATE
  },
  isActive: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  image: {
    type: _sequelize["default"].STRING(500)
  },
  subjectID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'subject',
      key: 'subjectID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_Subject["default"].hasMany(Content, {
  foreignKey: {
    name: 'subjectID',
    targetKey: 'subjectID'
  }
});

Content.belongsTo(_Subject["default"], {
  foreignKey: {
    name: 'subjectID',
    targetKey: 'subjectID'
  }
});
var _default = Content;
exports["default"] = _default;