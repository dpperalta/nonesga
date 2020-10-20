"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _Country = _interopRequireDefault(require("./Country"));

var _Province = _interopRequireDefault(require("./Province"));

var _Canton = _interopRequireDefault(require("./Canton"));

var _City = _interopRequireDefault(require("./City"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Holiday = _database.sequelize.define('holiday', {
  holidayID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  name: {
    type: _sequelize["default"].STRING(100),
    allowNull: false
  },
  date: {
    type: _sequelize["default"].DATE,
    allowNull: false
  },
  details: {
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
  isNational: {
    type: _sequelize["default"].BOOLEAN
  },
  isOptional: {
    type: _sequelize["default"].BOOLEAN
  },
  isReprogramed: {
    type: _sequelize["default"].BOOLEAN
  },
  reprogramedDate: {
    type: _sequelize["default"].DATE
  },
  countryID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'city',
      key: 'cityID'
    }
  },
  provinceID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'province',
      key: 'provinceID'
    }
  },
  cantonID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'canton',
      key: 'cantonID'
    }
  },
  cityID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'city',
      key: 'cityID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_Country["default"].hasMany(Holiday, {
  foreignKey: {
    name: 'countryID',
    targetKey: 'countryID'
  }
});

Holiday.belongsTo(_Country["default"], {
  foreignKey: {
    name: 'countryID',
    targetKey: 'countryID'
  }
});

_Province["default"].hasMany(Holiday, {
  foreignKey: {
    name: 'provinceID',
    targetKey: 'provinceID'
  }
});

Holiday.belongsTo(_Province["default"], {
  foreignKey: {
    name: 'provinceID',
    targetKey: 'provinceID'
  }
});

_Canton["default"].hasMany(Holiday, {
  foreignKey: {
    name: 'cantonID',
    targetKey: 'cantonID'
  }
});

Holiday.belongsTo(_Canton["default"], {
  foreignKey: {
    name: 'cantonID',
    targetKey: 'cantonID'
  }
});

_City["default"].hasMany(Holiday, {
  foreignKey: {
    name: 'cityID',
    targetKey: 'cityID'
  }
});

Holiday.belongsTo(_City["default"], {
  foreignKey: {
    name: 'cityID',
    targetKey: 'cityID'
  }
});
var _default = Holiday;
exports["default"] = _default;