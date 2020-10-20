"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _AcademicPeriod = _interopRequireDefault(require("./AcademicPeriod"));

var _Course = _interopRequireDefault(require("./Course"));

var _EnrollmentStatus = _interopRequireDefault(require("./EnrollmentStatus"));

var _Student = _interopRequireDefault(require("./Student"));

var _User = _interopRequireDefault(require("./User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Enrollment = _database.sequelize.define('enrollment', {
  enrollmentID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  enrollmentCode: {
    type: _sequelize["default"].STRING(10)
  },
  registeredDate: {
    type: _sequelize["default"].DATE,
    allowNull: false,
    defaultValue: _sequelize["default"].literal('CURRENT_TIMESTAMP')
  },
  unregisteredDate: {
    type: _sequelize["default"].DATE
  },
  isActive: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  statusChangeDate: {
    type: _sequelize["default"].DATE
  },
  statusID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'enrollmentStatus',
      key: 'statusID'
    }
  },
  studentID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'student',
      key: 'studentID'
    }
  },
  userID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'user',
      key: 'userID'
    }
  },
  periodID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'academicPeriod',
      key: 'periodID'
    }
  },
  courseID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'course',
      key: 'courseID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_EnrollmentStatus["default"].hasMany(Enrollment, {
  foreignKey: {
    name: 'statusID',
    targetKey: 'statusID'
  }
});

Enrollment.belongsTo(_EnrollmentStatus["default"], {
  foreignKey: {
    name: 'statusID',
    targetKey: 'statusID'
  }
});

_Student["default"].hasMany(Enrollment, {
  foreignKey: {
    name: 'studentID',
    targetKey: 'studentID'
  }
});

Enrollment.belongsTo(_Student["default"], {
  foreignKey: {
    name: 'studentID',
    targetKey: 'studentID'
  }
});

_User["default"].hasMany(Enrollment, {
  foreignKey: {
    name: 'userID',
    targetKey: 'userID'
  }
});

Enrollment.belongsTo(_User["default"], {
  foreignKey: {
    name: 'userID',
    targetKey: 'userID'
  }
});

_AcademicPeriod["default"].hasMany(Enrollment, {
  foreignKey: {
    name: 'periodID',
    targetKey: 'periodID'
  }
});

Enrollment.belongsTo(_AcademicPeriod["default"], {
  foreignKey: {
    name: 'periodID',
    targetKey: 'periodID'
  }
});

_Course["default"].hasMany(Enrollment, {
  foreignKey: {
    name: 'courseID',
    targetKey: 'courseID'
  }
});

Enrollment.belongsTo(_Course["default"], {
  foreignKey: {
    name: 'courseID',
    targetKey: 'courseID'
  }
});
var _default = Enrollment;
/*
        
}, {
    timestamps: false,
    freezeTableName: true
});

Course.hasMany(Subject, { foreignKey: { name: 'courseID', targetKey: 'courseID' } });
Subject.belongsTo(Course, { foreignKey: { name: 'courseID', targetKey: 'courseID' } });
Teacher.hasMany(Subject, { foreignKey: { name: 'teacherID', targetKey: 'teacherID' } });
Subject.belongsTo(Teacher, { foreignKey: { name: 'teacherID', targetKey: 'teacherID' } });

export default Subject;
*/

exports["default"] = _default;