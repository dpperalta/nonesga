"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireWildcard(require("sequelize"));

var _database = require("../database/database");

var _Subject = _interopRequireDefault(require("./Subject"));

var _sequelize$define;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Exam = _database.sequelize.define('exam', (_sequelize$define = {
  examID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  startDate: {
    type: _sequelize["default"].DATE,
    allowNull: false
  },
  endDate: {
    type: _sequelize["default"].DATE,
    allowNull: false
  },
  startHour: {
    type: _sequelize["default"].TIME,
    allowNull: false
  }
}, _defineProperty(_sequelize$define, "endDate", {
  type: _sequelize["default"].TIME,
  allowNull: false
}), _defineProperty(_sequelize$define, "endHour", {
  type: _sequelize["default"].TIME,
  allowNull: false
}), _defineProperty(_sequelize$define, "minGrade", {
  type: _sequelize["default"].SMALLINT,
  allowNull: false
}), _defineProperty(_sequelize$define, "maxGrade", {
  type: _sequelize["default"].SMALLINT,
  allowNull: false
}), _defineProperty(_sequelize$define, "status", {
  type: _sequelize["default"].SMALLINT
}), _defineProperty(_sequelize$define, "topic", {
  type: _sequelize["default"].TEXT
}), _defineProperty(_sequelize$define, "isDelayed", {
  type: _sequelize["default"].BOOLEAN
}), _defineProperty(_sequelize$define, "minDelayed", {
  type: _sequelize["default"].SMALLINT
}), _defineProperty(_sequelize$define, "maxDelayed", {
  type: _sequelize["default"].SMALLINT
}), _defineProperty(_sequelize$define, "delayedDate", {
  type: _sequelize["default"].DATE
}), _defineProperty(_sequelize$define, "registeredDate", {
  type: _sequelize["default"].DATE,
  allowNull: false,
  defaultValue: _database.sequelize.literal('CURRENT_TIMESTAMP')
}), _defineProperty(_sequelize$define, "unregisteredDate", {
  type: _sequelize["default"].DATE
}), _defineProperty(_sequelize$define, "isPartial", {
  type: _sequelize["default"].BOOLEAN
}), _defineProperty(_sequelize$define, "isFinal", {
  type: _sequelize["default"].BOOLEAN
}), _defineProperty(_sequelize$define, "isActive", {
  type: _sequelize["default"].BOOLEAN,
  allowNull: false,
  defaultValue: true
}), _defineProperty(_sequelize$define, "subjectID", {
  type: _sequelize["default"].INTEGER,
  references: {
    model: 'subject',
    key: 'subjectID'
  }
}), _sequelize$define), {
  timestamps: false,
  freezeTableName: true
});

_Subject["default"].hasMany(Exam, {
  foreignKey: {
    name: 'subjectID',
    targetKey: 'subjectID'
  }
});

Exam.belongsTo(_Subject["default"], {
  foreignKey: {
    name: 'subjectID',
    targetKey: 'subjectID'
  }
});
var _default = Exam;
exports["default"] = _default;