"use strict";

var _express = _interopRequireDefault(require("express"));

var _role = _interopRequireDefault(require("./role"));

var _personType = _interopRequireDefault(require("./personType"));

var _person = _interopRequireDefault(require("./person"));

var _college = _interopRequireDefault(require("./college"));

var _user = _interopRequireDefault(require("./user"));

var _login = _interopRequireDefault(require("./login"));

var _country = _interopRequireDefault(require("./country"));

var _province = _interopRequireDefault(require("./province"));

var _canton = _interopRequireDefault(require("./canton"));

var _city = _interopRequireDefault(require("./city"));

var _address = _interopRequireDefault(require("./address"));

var _phoneOperator = _interopRequireDefault(require("./phoneOperator"));

var _telephone = _interopRequireDefault(require("./telephone"));

var _teacher = _interopRequireDefault(require("./teacher"));

var _student = _interopRequireDefault(require("./student"));

var _course = _interopRequireDefault(require("./course"));

var _content = _interopRequireDefault(require("./content"));

var _subject = _interopRequireDefault(require("./subject"));

var _task = _interopRequireDefault(require("./task"));

var _enrollmentStatus = _interopRequireDefault(require("./enrollmentStatus"));

var _academicPeriod = _interopRequireDefault(require("./academicPeriod"));

var _enrollment = _interopRequireDefault(require("./enrollment"));

var _taskResource = _interopRequireDefault(require("./taskResource"));

var _taskEvaluation = _interopRequireDefault(require("./taskEvaluation"));

var _taskResolution = _interopRequireDefault(require("./taskResolution"));

var _taskResolutionResource = _interopRequireDefault(require("./taskResolutionResource"));

var _exam = _interopRequireDefault(require("./exam"));

var _examQuestion = _interopRequireDefault(require("./examQuestion"));

var _examAnswer = _interopRequireDefault(require("./examAnswer"));

var _studentAnswer = _interopRequireDefault(require("./studentAnswer"));

var _examRegister = _interopRequireDefault(require("./examRegister"));

var _examGrade = _interopRequireDefault(require("./examGrade"));

var _holiday = _interopRequireDefault(require("./holiday"));

var _calendar = _interopRequireDefault(require("./calendar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('../config/config'); // Import routes


var app = (0, _express["default"])(); // Setting URL

var API = require('../config/config').API;

var url = API; // Routes

app.use(url + '/role', _role["default"]);
app.use(url + '/personType', _personType["default"]);
app.use(url + '/person', _person["default"]);
app.use(url + '/college', _college["default"]);
app.use(url + '/user', _user["default"]);
app.use(url + '/login', _login["default"]);
app.use(url + '/country', _country["default"]);
app.use(url + '/province', _province["default"]);
app.use(url + '/canton', _canton["default"]);
app.use(url + '/city', _city["default"]);
app.use(url + '/address', _address["default"]);
app.use(url + '/phoneOperator', _phoneOperator["default"]);
app.use(url + '/telephone', _telephone["default"]);
app.use(url + '/teacher', _teacher["default"]);
app.use(url + '/student', _student["default"]);
app.use(url + '/course', _course["default"]);
app.use(url + '/content', _content["default"]);
app.use(url + '/subject', _subject["default"]);
app.use(url + '/task', _task["default"]);
app.use(url + '/enrollmentStatus', _enrollmentStatus["default"]);
app.use(url + '/academicPeriod', _academicPeriod["default"]);
app.use(url + '/enrollment', _enrollment["default"]);
app.use(url + '/taskResource', _taskResource["default"]);
app.use(url + '/taskEvaluation', _taskEvaluation["default"]);
app.use(url + '/taskResolution', _taskResolution["default"]);
app.use(url + '/taskResolutionResource', _taskResolutionResource["default"]);
app.use(url + '/exam', _exam["default"]);
app.use(url + '/examQuestion', _examQuestion["default"]);
app.use(url + '/examAnswer', _examAnswer["default"]);
app.use(url + '/studentAnswer', _studentAnswer["default"]);
app.use(url + '/examRegister', _examRegister["default"]);
app.use(url + '/examGrade', _examGrade["default"]);
app.use(url + '/holiday', _holiday["default"]);
app.use(url + '/calendar', _calendar["default"]);
module.exports = app;