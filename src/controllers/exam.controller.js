import Exam from '../models/Exam';
import Subject from '../models/Subject';
import { sequelize } from '../database/database';
import { returnError, returnNotFound } from './errors';

// Create a new Exam
export async function createExam(req, res) {
    const {
        startDate,
        startHour,
        endDate,
        endHour,
        minGrade,
        maxGrade,
        status,
        topic,
        isDelayed,
        minDelayed,
        maxDelayed,
        delayedDate,
        isPartial,
        isFinal,
        subjectID
    } = req.body;
    let partialExam
    let finalExam;
    if (isPartial === undefined && isFinal === undefined) {
        partialExam = true;
        finalExam = false;
    } else {
        if ((isPartial && isFinal) || (!isPartial && !isFinal)) {
            partialExam = true;
            finalExam = false;
        } else {
            if (isPartial) {
                partialExam = true;
                finalExam = false;
            } else {
                partialExam = false;
                finalExam = true;
            }
        }
    }
    try {
        const newExam = await Exam.create({
            startDate,
            startHour,
            endDate,
            endHour,
            minGrade,
            maxGrade,
            status,
            topic,
            isDelayed,
            minDelayed,
            maxDelayed,
            delayedDate,
            isPartial: partialExam,
            isFinal: finalExam,
            subjectID
        }, {
            fields: ['startDate', 'startHour', 'endDate', 'endHour', 'minGrade', 'maxGrade', 'status', 'topic', 'isDelayed', 'minDelayed', 'maxDelayed', 'delayedDate', 'isPartial', 'isFinal', 'subjectID'],
            returning: ['examID', 'startDate', 'startHour', 'endDate', 'endHour', 'minGrade', 'maxGrade', 'status', 'topic', 'isDelayed', 'minDelayed', 'maxDelayed', 'delayedDate', 'registeredDate', 'unregisteredDate', 'isPartial', 'isFinal', 'isActive', 'subjectID']
        });
        if (newExam) {
            return res.status(200).json({
                ok: true,
                message: 'Exam created successfully',
                exam: newExam
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Exam');
    }
}

// Get all Examns
export async function getExams(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const exams = await Exam.findAndCountAll({
            attributes: ['examID', 'startDate', 'startHour', 'endDate', 'endHour', 'minGrade', 'maxGrade', 'status', 'topic', 'isDelayed', 'minDelayed', 'maxDelayed', 'delayedDate', 'registeredDate', 'isPartial', 'isFinal', 'isActive', 'unregisteredDate', 'subjectID'],
            include: [{
                model: Subject,
                attributes: ['subjectID', 'subjectName']
            }],
            limit,
            offset: from
        });
        if (exams.count > 0) {
            return res.status(200).json({
                ok: true,
                exams
            });
        } else {
            returnNotFound(res, 'Any Exam');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get all Exams');
    }
}

// Get an exam by ID
export async function getExamByID(req, res) {
    const { examID } = req.params;
    try {
        const exam = await Exam.findOne({
            attributes: ['examID', 'startDate', 'startHour', 'endDate', 'endHour', 'minGrade', 'maxGrade', 'status', 'topic', 'isDelayed', 'minDelayed', 'maxDelayed', 'delayedDate', 'registeredDate', 'unregisteredDate', 'isPartial', 'isFinal', 'isActive', 'subjectID'],
            where: {
                examID
            },
            include: [{
                model: Subject,
                attributes: ['subjectID', 'subjectName']
            }]
        });
        if (exam) {
            return res.status(200).json({
                ok: true,
                exam
            });
        } else {
            returnNotFound(res, 'Exam ID');
        }
    } catch (e) {
        console.log('Error: ', e);
        returnError(res, e, 'Get Exam by ID');
    }
}

// Get exams by Subject IS
export async function getExamsBySubject(req, res) {
    const { subjectID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const exams = await Exam.findAndCountAll({
            attributes: ['examID', 'startDate', 'startHour', 'endDate', 'endHour', 'minGrade', 'maxGrade', 'status', 'topic', 'isDelayed', 'minDelayed', 'maxDelayed', 'delayedDate', 'registeredDate', 'unregisteredDate', 'isPartial', 'isFinal', 'isActive', 'subjectID'],
            where: {
                subjectID
            },
            include: [{
                model: Subject,
                attributes: ['subjectID', 'subjectName']
            }],
            limit,
            offset: from
        });
        if (exams.count > 0) {
            return res.status(200).json({
                ok: true,
                exams
            });
        } else {
            returnNotFound(res, 'Subject ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Exams by Subject');
    }
}

// Get Exams by Student
export async function getExamsByStudent(req, res) {
    const { studentID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const active = req.query.active || true;
    try {
        const count = await sequelize.query(`
            SELECT	count (*)
            FROM	"exam" ex,
                    "subject" su,
                    "course" co,
                    "enrollment" en,
                    "student" st
            WHERE 	ex."subjectID" = su."subjectID"
                AND	su."courseID" = co."courseID"
                AND co."courseID" = en."courseID"
                AND en."studentID" = st."studentID"
                AND st."studentID" = ${ studentID }
                AND ex."isActive" = ${ active };
        `);
        let total = count[1].rows[0].count;
        if (total > 0) {
            const exams = await sequelize.query(`
                SELECT	ex."examID" idExam,
                        ex."startDate" dstart,
                        ex."startHour" hstart,
                        ex."endDate" dend,
                        ex."endHour" hend,
                        ex."minGrade" gradeMin,
                        ex."maxGrade" gradeMax,
                        ex."status" status,
                        ex."topic" topic,
                        ex."isDelayed" permitsDelay,
                        ex."minDelayed" delayedMin,
                        ex."maxDelayed" delayedMax,
                        ex."registeredDate" regDate,
                        ex."unregisteredDate" unregDate,
                        ex."isPartial" partialExam,
                        ex."isFinal" finalExam,
                        ex."isActive" acive,
                        su."subjectCode" codeSubject,
                        su."subjectName" nameSuject,
                        co."courseName" nameCourse,
                        co."description" descriptionCourse,
                        en."enrollmentCode" enrollment,
                        st."studentCode" codeStudent
                FROM	"exam" ex,
                        "subject" su,
                        "course" co,
                        "enrollment" en,
                        "student" st
                WHERE 	ex."subjectID" = su."subjectID"
                    AND	su."courseID" = co."courseID"
                    AND co."courseID" = en."courseID"
                    AND en."studentID" = st."studentID"
                    AND st."studentID" = ${ studentID }
                    AND ex."isActive" = ${ active }
                    ORDER BY ex."endDate", ex."endHour"
                    LIMIT ${ limit }
                    OFFSET ${ from };
            `);
            if (exams) {
                return res.status(200).json({
                    ok: true,
                    exams: exams[0],
                    count: total
                });
            }
        } else {
            returnNotFound(res, 'Student ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Exams by Student');
    }
}

// Get Exams by Student and Subject
export async function getExamsByStudentAndSubject(req, res) {
    const {
        studentID,
        subjectID
    } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const active = req.query.active || true;
    try {
        const count = await sequelize.query(`
            SELECT	count (*)
            FROM	"exam" ex,
                    "subject" su,
                    "course" co,
                    "enrollment" en,
                    "student" st
            WHERE 	ex."subjectID" = su."subjectID"
                AND	su."courseID" = co."courseID"
                AND co."courseID" = en."courseID"
                AND en."studentID" = st."studentID"
                AND st."studentID" = ${ studentID }
                AND su."subjectID" = ${ subjectID }
                AND ex."isActive" = ${ active };
        `);
        let total = count[1].rows[0].count;
        if (total > 0) {
            const exams = await sequelize.query(`
                SELECT	ex."examID" idExam,
                        ex."startDate" dstart,
                        ex."startHour" hstart,
                        ex."endDate" dend,
                        ex."endHour" hend,
                        ex."minGrade" gradeMin,
                        ex."maxGrade" gradeMax,
                        ex."status" status,
                        ex."topic" topic,
                        ex."isDelayed" permitsDelay,
                        ex."minDelayed" delayedMin,
                        ex."maxDelayed" delayedMax,
                        ex."registeredDate" regDate,
                        ex."unregisteredDate" unregDate,
                        ex."isPartial" partialExam,
                        ex."isFinal" finalExam,
                        ex."isActive" acive,
                        su."subjectCode" codeSubject,
                        su."subjectName" nameSuject,
                        co."courseName" nameCourse,
                        co."description" descriptionCourse,
                        en."enrollmentCode" enrollment,
                        st."studentCode" codeStudent
                FROM	"exam" ex,
                        "subject" su,
                        "course" co,
                        "enrollment" en,
                        "student" st
                WHERE 	ex."subjectID" = su."subjectID"
                    AND	su."courseID" = co."courseID"
                    AND co."courseID" = en."courseID"
                    AND en."studentID" = st."studentID"
                    AND st."studentID" = ${ studentID }
                    AND su."subjectID" = ${ subjectID }
                    AND ex."isActive" = ${ active }
                    ORDER BY ex."endDate", ex."endHour"
                    LIMIT ${ limit }
                    OFFSET ${ from };
            `);
            if (exams) {
                return res.status(200).json({
                    ok: true,
                    exams: exams[0],
                    count: total
                });
            }
        } else {
            returnNotFound(res, 'Student ID or Subject IS');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Exams by Student');
    }
}

// Update an exam
export async function updateExam(req, res) {
    const { examID } = req.params;
    const {
        startDate,
        startHour,
        endDate,
        endHour,
        minGrade,
        maxGrade,
        status,
        topic,
        isDelayed,
        minDelayed,
        maxDelayed,
        delayedDate,
        isPartial,
        isFinal,
        subjectID
    } = req.body;
    let partialExam
    let finalExam;
    if (isPartial === undefined && isFinal === undefined) {
        partialExam = true;
        finalExam = false;
    } else {
        if ((isPartial && isFinal) || (!isPartial && !isFinal)) {
            partialExam = true;
            finalExam = false;
        } else {
            if (isPartial) {
                partialExam = true;
                finalExam = false;
            } else {
                partialExam = false;
                finalExam = true;
            }
        }
    }
    try {
        const dbExam = await Exam.findOne({
            attributes: ['examID', 'startDate', 'startHour', 'endDate', 'endHour', 'minGrade', 'maxGrade', 'status', 'topic', 'isDelayed', 'minDelayed', 'maxDelayed', 'delayedDate', 'isPartial', 'isFinal', 'subjectID'],
            where: {
                examID
            }
        });
        if (dbExam === null || dbExam === undefined) {
            returnNotFound(res, 'Exam ID');
        } else {
            const updatedExam = await Exam.update({
                startDate,
                startHour,
                endDate,
                endHour,
                minGrade,
                maxGrade,
                status,
                topic,
                isDelayed,
                minDelayed,
                maxDelayed,
                delayedDate,
                isPartial: partialExam,
                isFinal: finalExam,
                subjectID
            }, {
                where: {
                    examID
                }
            });
            if (updatedExam) {
                return res.status(200).json({
                    ok: true,
                    message: 'Exam updated successfully'
                });
            } else {
                returnNotFound(res, 'Exam ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Exam');
    }
}

// Change activation status of an exam
export async function changeActivationExam(req, res) {
    const { examID } = req.params;
    const type = req.query.type;
    let value;
    let action = '';
    let afirmation = '';
    let negation = '';
    let changeActivationJSON;
    if (type.toLowerCase() === 'activate') {
        value = true,
            action = 'Activating';
        afirmation = 'active';
        negation = 'inactive';
        changeActivationJSON = {
            isActive: true,
            unregisteredDate: null
        };
    } else {
        if (type.toLowerCase() === 'inactivate') {
            value = false;
            action = 'Inactivating';
            afirmation = 'inactive';
            negation = 'active';
            changeActivationJSON = {
                isActive: false,
                unregisteredDate: sequelize.literal('CURRENT_TIMESTAMP')
            }
        } else {
            returnWrongError(res, 'type', 'request');
        }
    }
    try {
        const dbExam = await Exam.findOne({
            attributes: ['examID', 'registeredDate', 'unregisteredDate', 'isActive', 'subjectID'],
            where: {
                examID
            }
        });
        if (dbExam) {
            const changeActivation = await Exam.update(
                changeActivationJSON, {
                    where: {
                        examID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Exam' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Exam or Exam alread ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Exam ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Exam');
    }
}

// Delete an exam
export async function deleteExam(req, res) {
    const { examID } = req.params;
    try {
        const countDeleted = await Exam.destroy({
            where: {
                examID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Exam deleted successfully'
            });
        } else {
            returnNotFound(res, 'Exam ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Exam');
    }
}