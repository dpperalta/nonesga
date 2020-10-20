"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _Person = _interopRequireDefault(require("./Person"));

var _PhoneOperator = _interopRequireDefault(require("./PhoneOperator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Telephone = _database.sequelize.define('telephone', {
  telephoneID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  number: {
    type: _sequelize["default"].STRING(10),
    allowNull: false
  },
  phoneName: {
    type: _sequelize["default"].STRING(100),
    allowNull: false
  },
  detail: {
    type: _sequelize["default"].TEXT
  },
  isFavourite: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isWork: {
    type: _sequelize["default"].BOOLEAN
  },
  phoneType: {
    type: _sequelize["default"].SMALLINT
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
  operatorID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'phoneOperator',
      key: 'operatorID'
    }
  },
  personID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'person',
      key: 'personID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_PhoneOperator["default"].hasMany(Telephone, {
  foreignKey: {
    name: 'operatorID',
    targetKey: 'operatorID'
  }
});

Telephone.belongsTo(_PhoneOperator["default"], {
  foreignKey: {
    name: 'operatorID',
    targetKey: 'operatorID'
  }
});

_Person["default"].hasMany(Telephone, {
  foreignKey: {
    name: 'personID',
    targetKey: 'personID'
  }
});

Telephone.belongsTo(_Person["default"], {
  foreignKey: {
    name: 'personID',
    targetKey: 'personID'
  }
});
var _default = Telephone;
exports["default"] = _default;