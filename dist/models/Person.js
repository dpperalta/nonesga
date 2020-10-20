"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _PersonType = _interopRequireDefault(require("./PersonType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Person = _database.sequelize.define('person', {
  personID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  dni: {
    type: _sequelize["default"].STRING(13),
    allowNull: false
  },
  birthdate: {
    type: _sequelize["default"].DATE
  },
  names: {
    type: _sequelize["default"].STRING(100),
    allowNull: false
  },
  lastNames: {
    type: _sequelize["default"].STRING(100),
    allowNull: false
  },
  completeName: {
    type: _sequelize["default"].STRING(200)
  },
  image: {
    type: _sequelize["default"].STRING(500)
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
  bio: {
    type: _sequelize["default"].TEXT
  },
  votes: {
    type: _sequelize["default"].INTEGER
  },
  sex: {
    type: _sequelize["default"].STRING(50),
    allowNull: false
  },
  personTypeID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'personType',
      key: 'personTypeID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
}); //PersonType.hasMany(Person, { foreingKey: 'personTypeID', sourceKey: 'personTypeID' });
//PersonType.hasMany(Person, { foreingKey: 'per_has_typ_fk', targetKey: 'personTypeID' });


_PersonType["default"].hasMany(Person, {
  foreingKey: {
    name: 'personTypeID',
    allowNull: true,
    targetKey: 'personTypeID'
  }
}); //Person.belongsTo(PersonType, { foreingKey: 'per_has_typ_fk', targetKey: 'personTypeID' });
//Person.belongsTo(PersonType, { foreingKey: 'personTypeID', sourceKey: 'personTypeID' });


Person.belongsTo(_PersonType["default"], {
  foreingKey: {
    name: 'personTypeID',
    allowNull: true,
    targetKey: 'personTypeID'
  }
});
var _default = Person;
exports["default"] = _default;