import ExamRegister from '../models/ExamRegister';
import Student from '../models/Student';
import Exam from '../models/Exam';
import { returnError, returnNotFound } from './errors';
import Person from '../models/Person';
import User from '../models/User';
import { sequelize } from '../database/database';

// Create a new exam Register;
export async function createExamRegister(req, res) {
    const {
        generalDetail,
        studentID,
        examID,
        userID,
    } = req.body;
    try {
        const newExamRegister = await ExamRegister.create({
            status: 1,
            reviewNumber: 1,
            generalDetail,
            studentID,
            examID,
            userID
        }, {
            fields: ['status', 'reviewNumber', 'generalDetail', 'studentID', 'examID', 'userID'],
            returnint: ['registerID', 'registeredDate', 'userID', 'status', 'reviewNumber', 'lastStatus', 'lastStatusDate', 'lastStatusUser', 'reviewDetail', 'generalDetail', 'isRegistered', 'studentID', 'examID']
        });
        if (newExamRegister) {
            return res.status(200).json({
                ok: true,
                message: 'Exam Register created successfully',
                examRegister: newExamRegister
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Exam Register');
    }
}

// Get all Exam Registers
export async function getExamRegisters(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const examRegisters = await ExamRegister.findAndCountAll({
            attributes: ['registerID', 'registeredDate', 'userID', 'status', 'status', 'reviewNumber', 'isReviewed', 'lastStatus', 'lastStatusUser', 'lastStatusDate', 'reviewDetail', 'generalDetail', 'isRegistered', 'studentID', 'userID', 'examID'],
            include: [{
                model: Student,
                attributes: ['studentID', 'studentCode'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'completeName']
                }]
            }, {
                model: Exam,
                attributes: ['examID', 'startDate', 'endDate', 'topic']
            }, {
                model: User,
                attributes: ['userID', 'nick', 'email', 'status']
            }],
            limit,
            offset: from
        });
        if (examRegisters.count > 0) {
            return res.status(200).json({
                ok: true,
                examRegisters
            });
        } else {
            returnNotFound(res, 'Any Exam Register');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get all Exam Registers');
    }
}

// Get an Exam Register by ID
export async function getExamRegisterByID(req, res) {
    const { registerID } = req.params;
    try {
        const examRegister = await ExamRegister.findOne({
            attributes: ['registerID', 'registeredDate', 'userID', 'status', 'status', 'reviewNumber', 'isReviewed', 'lastStatus', 'lastStatusUser', 'lastStatusDate', 'reviewDetail', 'generalDetail', 'isRegistered', 'studentID', 'userID', 'examID'],
            where: {
                registerID
            },
            include: [{
                model: Student,
                attributes: ['studentID', 'studentCode'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'completeName']
                }]
            }, {
                model: Exam,
                attributes: ['examID', 'startDate', 'endDate', 'topic']
            }, {
                model: User,
                attributes: ['userID', 'nick', 'email', 'status']
            }]
        });
        if (examRegister) {
            return res.status(200).json({
                ok: true,
                examRegister
            });
        } else {
            returnNotFound(res, 'Exam Register ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Exam Register by ID');
    }
}

// Get all Exam Registers by Student
export async function getExamRegistersByStudent(req, res) {
    const { studentID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const examRegisters = await ExamRegister.findAndCountAll({
            attributes: ['registerID', 'registeredDate', 'userID', 'status', 'status', 'reviewNumber', 'isReviewed', 'lastStatus', 'lastStatusUser', 'lastStatusDate', 'reviewDetail', 'generalDetail', 'isRegistered', 'studentID', 'userID', 'examID'],
            where: {
                studentID
            },
            include: [{
                model: Student,
                attributes: ['studentID', 'studentCode'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'completeName']
                }]
            }, {
                model: Exam,
                attributes: ['examID', 'startDate', 'endDate', 'topic']
            }, {
                model: User,
                attributes: ['userID', 'nick', 'email', 'status']
            }],
            limit,
            offset: from
        });
        if (examRegisters.count > 0) {
            return res.status(200).json({
                ok: true,
                examRegisters
            });
        } else {
            returnNotFound(res, 'Student ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Exam Registers by Student');
    }
}

// Get all Exam Registers by Student for an Active/Inactive Exam
export async function getExamRegistersByStudentActiveExam(req, res) {
    const { studentID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const active = req.query.active || true;
    try {
        const examRegisters = await ExamRegister.findAndCountAll({
            attributes: ['registerID', 'registeredDate', 'userID', 'status', 'status', 'reviewNumber', 'isReviewed', 'lastStatus', 'lastStatusUser', 'lastStatusDate', 'reviewDetail', 'generalDetail', 'isRegistered', 'studentID', 'userID', 'examID'],
            where: {
                studentID
            },
            include: [{
                model: Student,
                attributes: ['studentID', 'studentCode'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'completeName']
                }]
            }, {
                model: Exam,
                attributes: ['examID', 'startDate', 'endDate', 'topic'],
                where: {
                    isActive: active
                }
            }, {
                model: User,
                attributes: ['userID', 'nick', 'email', 'status']
            }],
            limit,
            offset: from
        });
        if (examRegisters.count > 0) {
            return res.status(200).json({
                ok: true,
                examRegisters
            });
        } else {
            returnNotFound(res, 'Student ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Exam Registers by Student');
    }
}

// Get all Exam Registers by Exam
export async function getExamRegistersByAllExams(req, res) {
    const { examID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const examRegisters = await ExamRegister.findAndCountAll({
            attributes: ['registerID', 'registeredDate', 'userID', 'status', 'status', 'reviewNumber', 'isReviewed', 'lastStatus', 'lastStatusUser', 'lastStatusDate', 'reviewDetail', 'generalDetail', 'isRegistered', 'studentID', 'userID', 'examID'],
            where: {
                examID
            },
            include: [{
                model: Student,
                attributes: ['studentID', 'studentCode'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'completeName']
                }]
            }, {
                model: Exam,
                attributes: ['examID', 'startDate', 'endDate', 'topic']
            }, {
                model: User,
                attributes: ['userID', 'nick', 'email', 'status']
            }],
            limit,
            offset: from
        });
        if (examRegisters.count > 0) {
            return res.status(200).json({
                ok: true,
                examRegisters
            });
        } else {
            returnNotFound(res, 'Exam ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Exam Registers by all Exam ID');
    }
}

// Get all Exam Registers by Active Exam
export async function getExamRegistersByActiveExams(req, res) {
    const { examID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const active = req.query.active || true;
    try {
        const examRegisters = await ExamRegister.findAndCountAll({
            attributes: ['registerID', 'registeredDate', 'userID', 'status', 'status', 'reviewNumber', 'isReviewed', 'lastStatus', 'lastStatusUser', 'lastStatusDate', 'reviewDetail', 'generalDetail', 'isRegistered', 'studentID', 'userID', 'examID'],
            where: {
                examID
            },
            include: [{
                model: Student,
                attributes: ['studentID', 'studentCode'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'completeName']
                }]
            }, {
                model: Exam,
                attributes: ['examID', 'startDate', 'endDate', 'topic'],
                where: {
                    isActive: active
                }
            }, {
                model: User,
                attributes: ['userID', 'nick', 'email', 'status']
            }],
            limit,
            offset: from
        });
        if (examRegisters.count > 0) {
            return res.status(200).json({
                ok: true,
                examRegisters
            });
        } else {
            returnNotFound(res, 'Exam ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Exam Registers by all Exam ID');
    }
}

// Get all Eam Registers by Subject
export async function getExamRegisterBySubject(req, res) {
    const { subjectID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const active = req.query.active;
    let activeQuery;
    if (active === undefined || active === null) {
        activeQuery = '';
    } else {
        activeQuery = `AND su."isActive" = ${ active }`;
    }
    console.log('activeQuery', activeQuery);
    try {
        const counter = await sequelize.query(`
            SELECT	COUNT(*)
                FROM 	"examRegister" er, 
                        "student" st, 
                        "exam" ex, 
                        "user" us, 
                        "person" pe, 
                        "subject" su
                WHERE er."studentID" = st."studentID"
                    AND er."examID" = ex."examID"
                    AND er."userID" = us."userID"
                    AND st."personID" = pe."personID"
                    AND ex."subjectID" = su."subjectID"
                    AND su."subjectID" = ${ subjectID }
                    ${ activeQuery };
        `);
        let total = counter[1].rows[0].count;
        if (total > 0) {
            const examRegisters = await sequelize.query(`
                SELECT	er."registerID" IDRegister,
                        er."registeredDate" dateRegister,
                        er."status" status,
                        er."reviewNumber" numReview,
                        er."isReviewed" reviewed,
                        er."lastStatus" previousStatus,
                        er."lastStatusDate" previousDate,
                        er."lastStatusUser" previousUser,
                        er."reviewDetail" detailRev,
                        er."generalDetail" detailGen,
                        er."isRegistered" registerd,
                        er."studentID" idStudent,
                        st."studentCode" code,
                        pe."personID" idPerson,
                        pe."completeName" namecomplete,
                        ex."examID" idExam,
                        ex."startDate" dateStart,
                        ex."endDate" dateEnd,
                        ex."topic" theme,
                        us."nick" nickname,
                        us."email" mail,
                        us."status" status,
                        su."subjectName" subject,
                        su."description" subjectDescription
                FROM "examRegister" er, "student" st, "exam" ex, "user" us, "person" pe, "subject" su
                WHERE er."studentID" = st."studentID"
                    AND er."examID" = ex."examID"
                    AND er."userID" = us."userID"
                    AND st."personID" = pe."personID"
                    AND ex."subjectID" = su."subjectID"
                    AND su."subjectID" = ${ subjectID }
                    ${ activeQuery }
                    ORDER BY pe."lastNames" ASC
                    LIMIT ${ limit }
                    OFFSET ${ from };
            `);
            if (examRegisters) {
                return res.status(200).json({
                    ok: true,
                    examRegisters: examRegisters[0],
                    count: total
                });
            } else {
                returnNotFound(res, 'Subject ID');
            }
        } else {
            returnNotFound(res, 'Subject ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Exam Register by Subject');
    }
}

// Update an Exam Register
export async function updateExamRegister(req, res) {
    const { registerID } = req.params;
    const {
        generalDetail,
        status,
        studentID,
        examID,
        userID
    } = req.body;
    try {
        const dbExamRegister = await ExamRegister.findOne({
            attributes: ['registerID', 'registeredDate', 'status', 'reviewNumber', 'userID'],
            where: {
                registerID
            }
        });
        let number = dbExamRegister.dataValues.reviewNumber;
        const dateOfRegister = dbExamRegister.dataValues.registeredDate;
        const actualStatus = dbExamRegister.dataValues.status;
        const actualUser = dbExamRegister.dataValues.userID;
        console.log('Actual number', number);
        console.log('New number', number + 1);
        if (dbExamRegister === undefined || dbExamRegister === null) {
            returnNotFound(res, 'Exam Register ID');
        } else {
            const updatedExamRegister = await ExamRegister.update({
                generalDetail,
                status,
                studentID,
                examID,
                userID,
                reviewNumber: number + 1,
                lastStatus: actualStatus,
                lastStatusDate: dateOfRegister,
                lastStatusUser: actualUser,
                registeredDate: sequelize.literal('CURRENT_TIMESTAMP')
            }, {
                where: {
                    registerID
                }
            });
            if (updatedExamRegister) {
                return res.status(200).json({
                    ok: true,
                    message: 'Exam Register updated successfully'
                });
            } else {
                returnNotFound(res, 'Exam Register ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Exam Register');
    }
}

// Review an Exam Register
export async function reviewExamRegister(req, res) {
    const { registerID } = req.params;
    const {
        reviewDetail,
        userID
    } = req.body;
    try {
        const dbExamRegister = await ExamRegister.findOne({
            attributes: ['registerID', 'registeredDate', 'status', 'reviewNumber', 'userID'],
            where: {
                registerID
            }
        });

        let number = dbExamRegister.dataValues.reviewNumber;
        const dateOfRegister = dbExamRegister.dataValues.registeredDate;
        const actualStatus = dbExamRegister.dataValues.status;
        const actualUser = dbExamRegister.dataValues.userID;

        if (dbExamRegister === undefined || dbExamRegister === null) {
            returnNotFound(res, 'Exam Register ID');
        } else {
            const reviewExamRegister = await ExamRegister.update({
                reviewDetail,
                status: 2,
                userID,
                reviewNumber: number + 1,
                lastStatus: actualStatus,
                lastStatusDate: dateOfRegister,
                lastStatusUser: actualUser,
                registeredDate: sequelize.literal('CURRENT_TIMESTAMP'),
                isReviewed: true
            }, {
                where: {
                    registerID
                }
            });
            if (reviewExamRegister) {
                return res.status(200).json({
                    ok: true,
                    message: 'Exam Register reviewed successfully'
                });
            } else {
                returnNotFound(res, 'Exam Register ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Review Exam Register');
    }
}

// Register an Exam Register
export async function registerExamRegister(req, res) {
    const { registerID } = req.params;
    const {
        userID
    } = req.body;
    try {
        const dbExamRegister = await ExamRegister.findOne({
            attributes: ['registerID', 'registeredDate', 'status', 'reviewNumber', 'userID'],
            where: {
                registerID
            }
        });

        let number = dbExamRegister.dataValues.reviewNumber;
        const dateOfRegister = dbExamRegister.dataValues.registeredDate;
        const actualStatus = dbExamRegister.dataValues.status;
        const actualUser = dbExamRegister.dataValues.userID;

        if (dbExamRegister === undefined || dbExamRegister === null) {
            returnNotFound(res, 'Exam Register ID');
        } else {
            const registerExamRegister = await ExamRegister.update({
                status: 6,
                userID,
                reviewNumber: number + 1,
                lastStatus: actualStatus,
                lastStatusDate: dateOfRegister,
                lastStatusUser: actualUser,
                registeredDate: sequelize.literal('CURRENT_TIMESTAMP'),
                isRegistered: true
            }, {
                where: {
                    registerID
                }
            });
            if (registerExamRegister) {
                return res.status(200).json({
                    ok: true,
                    message: 'Exam Register registered successfully'
                });
            } else {
                returnNotFound(res, 'Exam Register ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Register Exam Register');
    }
}

// Delete an Exam Register
export async function deleteExamRegister(req, res) {
    const { registerID } = req.params;
    try {
        const countDeleted = await ExamRegister.destroy({
            where: {
                registerID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Exam Register deleted successfully'
            });
        } else {
            returnNotFound(res, 'Exam Register ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Exam Register');
    }
}