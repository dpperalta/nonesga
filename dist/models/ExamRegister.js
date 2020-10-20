"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _Exam = _interopRequireDefault(require("./Exam"));

var _Student = _interopRequireDefault(require("./Student"));

var _User = _interopRequireDefault(require("./User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ExamRegister = _database.sequelize.define('examRegister', {
  registerID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  registeredDate: {
    type: _sequelize["default"].DATE,
    allowNull: false,
    defaultValue: _database.sequelize.literal('CURRENT_TIMESTAMP')
  },
  status: {
    type: _sequelize["default"].SMALLINT,
    allowNull: false
  },
  reviewNumber: {
    type: _sequelize["default"].INTEGER,
    allowNull: false
  },
  isReviewed: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  lastStatus: {
    type: _sequelize["default"].SMALLINT
  },
  lastStatusDate: {
    type: _sequelize["default"].DATE
  },
  lastStatusUser: {
    type: _sequelize["default"].INTEGER
  },
  reviewDetail: {
    type: _sequelize["default"].TEXT
  },
  generalDetail: {
    type: _sequelize["default"].TEXT
  },
  isRegistered: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  studentID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'student',
      key: 'studentID'
    }
  },
  examID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'exam',
      key: 'examID'
    }
  },
  userID: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'userID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_Student["default"].hasMany(ExamRegister, {
  foreignKey: {
    name: 'studentID',
    targetKey: 'studentID'
  }
});

ExamRegister.belongsTo(_Student["default"], {
  foreignKey: {
    name: 'studentID',
    targetKey: 'studentID'
  }
});

_Exam["default"].hasMany(ExamRegister, {
  foreignKey: {
    name: 'examID',
    targetKey: 'examID'
  }
});

ExamRegister.belongsTo(_Exam["default"], {
  foreignKey: {
    name: 'examID',
    targetKey: 'examID'
  }
});

_User["default"].hasMany(ExamRegister, {
  foreignKey: {
    name: 'userID',
    targetKey: 'userID'
  }
});

ExamRegister.belongsTo(_User["default"], {
  foreignKey: {
    name: 'userID',
    targetKey: 'userID'
  }
});
var _default = ExamRegister;
exports["default"] = _default;