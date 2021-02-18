import Enrollment from '../models/Enrollment';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';
import AcademicPeriod from '../models/AcademicPeriod';
import Student from '../models/Student';
import Person from '../models/Person';
import User from '../models/User';
import Course from '../models/Course';
import { codeGeneration } from '../helpers/codes';

// Create a new Enrollment
export async function createEnrollment(req, res) {
    const {
        studentID,
        userID,
        periodID,
        courseID
    } = req.body;
    try {
        let newEnrollment = await Enrollment.create({
            enrollmentCode: await codeGeneration('enrollment'),
            statusChangeDate: sequelize.literal('CURRENT_TIMESTAMP'),
            statusID: 1,
            studentID,
            userID,
            periodID,
            courseID
        }, {
            fields: ['enrollmentCode', 'statusChangeDate', 'statusID', 'studentID', 'userID', 'periodID', 'courseID'],
            returnint: ['enrollmentID', 'enrollmentCode', 'isActive', 'registeredDate', 'unregisteredDate', 'statusChangeDate', 'statusID', 'studentID', 'userID', 'periodID', 'courseID']
        });
        if (newEnrollment) {
            return res.status(200).json({
                ok: true,
                message: 'Enrollment created successfully',
                enrollment: newEnrollment
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Enrollment');
    }
}

// Get all Enrollments
export async function getEnrollments(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const enrollments = await Enrollment.findAndCountAll({
            attributes: ['enrollmentID', 'enrollmentCode', 'isActive', 'registeredDate', 'unregisteredDate', 'statusChangeDate', 'statusID', 'studentID', 'userID', 'periodID', 'courseID'],
            order: [
                ['registeredDate', 'ASC']
            ],
            include: [{
                    model: AcademicPeriod,
                    attributes: ['periodID', 'periodName', 'detail']
                },
                {
                    model: Student,
                    attributes: ['studentID', 'bio'],
                    include: [{
                        model: Person,
                        attributes: ['personID', 'completeName']
                    }]
                },
                {
                    model: User,
                    attributes: ['userID', 'email']
                        /*,
                                            include: [{
                                                model: Person,
                                                attributes: ['personID', 'completeName']
                                            }]*/
                },
                {
                    model: Course,
                    attributes: ['courseID', 'courseName', 'description']
                }
            ],
            limit,
            offset: from
        });
        if (enrollments) {
            return res.status(200).json({
                ok: true,
                enrollments
            });
        } else {
            returnNotFound(res, 'Any Enrollment');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get all Enrollments');
    }
}

// Get an Enrollment by ID
export async function getEnrollment(req, res) {
    const { enrollmentID } = req.params;
    try {
        const enrollment = await Enrollment.findOne({
            attributes: ['enrollmentID', 'enrollmentCode', 'registeredDate', 'unregisteredDate', 'isActive', 'statusChangeDate', 'statusID', 'studentID', 'userID', 'periodID', 'courseID'],
            where: {
                enrollmentID
            },
            include: [{
                    model: AcademicPeriod,
                    attributes: ['periodID', 'periodName', 'detail']
                },
                {
                    model: Student,
                    attributes: ['studentID', 'bio'],
                    include: [{
                        model: Person,
                        attributes: ['personID', 'completeName']
                    }]
                },
                {
                    model: User,
                    attributes: ['userID', 'email']
                        /*,
                                            include: [{
                                                model: Person,
                                                attributes: ['personID', 'completeName']
                                            }]*/
                },
                {
                    model: Course,
                    attributes: ['courseID', 'courseName', 'description']
                }
            ]
        });
        if (enrollment) {
            return res.status(200).json({
                ok: true,
                enrollment
            });
        } else {
            returnNotFound(res, 'Enrollment ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get an Enrollment');
    }
}

// Get enrollment by parameter (student, course, user, period, status) ID
export async function getEnrollmentByParameter(req, res) {
    const parameter = req.query.parameter;
    let searchParameter = parameter.toLowerCase() + 'ID';
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const { valueID } = req.params;
    let total = 0;
    if (searchParameter === 'statusID' || searchParameter === 'studentID' || searchParameter === 'userID' || searchParameter === 'periodID' || searchParameter === 'courseID') {
        try {

            const count = await sequelize.query(`
                SELECT	COUNT(*)
                FROM 	"enrollment" e, 
                        "enrollmentStatus" es, 
                        "student" s, 
                        "user" u, 
                        "academicPeriod" ap, 
                        "course" cu
                WHERE e."statusID" = es."statusID"
                    AND e."studentID" = s."studentID"
                    AND e."userID" = u."userID"
                    AND e."periodID" = ap."periodID"
                    AND e."courseID" = cu."courseID"
                    AND e."${ parameter.toLowerCase() }ID" = ${ valueID }
            `);

            const enrollments = await sequelize.query(`
                    SELECT	e."enrollmentID" idEnrollment,
                            e."enrollmentCode" codeEnrollment,
                            e."isActive" active,
                            e."registeredDate" createdAt,
                            e."statusChangeDate" updatedAt,
                            es."code" codeEnrollment,
                            es."description" enrollmentDescription,
                            s."studentCode" codeStudent,
                            s."bio" studentBio,
                            (SELECT xp."completeName" FROM "student" xs, "person" xp WHERE xs."personID" = xp."personID" AND xs."studentID" = s."studentID") studentName,
                            u."email" userMail,
                            (SELECT xp."completeName" FROM "user" xu, "person" xp WHERE xu."personID" = xp."personID" AND xu."userID" = u."userID") userName,
                            ap."periodName" academicPeriod,
                            ap."detail" periodDetail,
                            cu."courseCode" codeCourse,
                            cu."courseName" curseName,
                            cu."description" curseDescription
                    FROM 	"enrollment" e, 
                            "enrollmentStatus" es, 
                            "student" s, 
                            "user" u, 
                            "academicPeriod" ap, 
                            "course" cu
                    WHERE e."statusID" = es."statusID"
                        AND e."studentID" = s."studentID"
                        AND e."userID" = u."userID"
                        AND e."periodID" = ap."periodID"
                        AND e."courseID" = cu."courseID"
                        AND e."${ parameter.toLowerCase() }ID" = ${ valueID }
                        ORDER BY e."isActive", e."registeredDate" DESC
                        LIMIT ${ limit }
                        OFFSET ${ from }
            `);
            total = parseInt(enrollments[1].rowCount);
            let totalCount = parseInt(count[1].rows[0].count);
            if (total > 0) {
                return res.status(200).json({
                    ok: true,
                    enrollments: enrollments[0],
                    total: totalCount
                });
            } else {
                returnNotFound(res, 'Enrollmente by ' + searchParameter);
            }
        } catch (e) {
            console.log('Error: ', e);
            returnError(res, e, 'Search Enrrollment by Parameter ' + searchParameter);
        }
    } else {
        return res.status(400).json({
            ok: false,
            message: 'Invalid parameter for search',
        });
    }
}

// Get enrollment by college
export async function getEnrollmentByCollege(req, res) {
    const { collegeID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {

        const count = await sequelize.query(`
            SELECT 	COUNT(*)
            FROM	"enrollment" e, 
                    "enrollmentStatus" es, 
                    "student" s, 
                    "user" u, 
                    "academicPeriod" ap, 
                    "course" cu,
                    "college" co
            WHERE   e."statusID" = es."statusID"
                AND e."studentID" = s."studentID"
                AND e."userID" = u."userID"
                AND e."periodID" = ap."periodID"
                AND e."courseID" = cu."courseID"
                AND u."collegeID" = co."collegeID"
                AND u."collegeID" = ${ collegeID }
        `);

        const enrollments = await sequelize.query(`
            SELECT 	e."enrollmentID" idEnrollment,
                    e."enrollmentCode" codeEnrollment,
                    e."isActive" active,
                    e."registeredDate" createdAt,
                    e."statusChangeDate" updatedAt,
                    es."code" codeEnrollment,
                    es."description" enrollmentDescription,
                    s."studentCode" codeStudent,
                    s."bio" studentBio,
                    (SELECT xp."completeName" FROM "student" xs, "person" xp WHERE xs."personID" = xp."personID" AND xs."studentID" = s."studentID") studentName,
                    u."email" userMail,
                    (SELECT xp."completeName" FROM "user" xu, "person" xp WHERE xu."personID" = xp."personID" AND xu."userID" = u."userID") "userName",
                    ap."periodName" academicPeriod,
                    ap."detail" periodDetail,
                    cu."courseCode" codeCourse,
                    cu."courseName" curseName,
                    cu."description" curseDescription,
                    co."collegeName" college
            FROM	"enrollment" e, 
                    "enrollmentStatus" es, 
                    "student" s, 
                    "user" u, 
                    "academicPeriod" ap, 
                    "course" cu,
                    "college" co
            WHERE   e."statusID" = es."statusID"
                AND e."studentID" = s."studentID"
                AND e."userID" = u."userID"
                AND e."periodID" = ap."periodID"
                AND e."courseID" = cu."courseID"
                AND u."collegeID" = co."collegeID"
                AND u."collegeID" = ${ collegeID }
                ORDER BY e."isActive", e."registeredDate" DESC
                LIMIT ${ limit }
                OFFSET ${ from }
        `);
        let total = parseInt(count[1].rows[0].count);
        if (total > 0) {
            return res.status(200).json({
                ok: true,
                enrollments: enrollments[0],
                total
            });
        } else {
            returnNotFound(res, 'College ID');
        }
    } catch (e) {
        console.log('Error', e);
        returnError(res, e, 'Get Enrollment by College');
    }
}

// Ger enrollment by DNI
export async function getEnrollmentByDNI(req, res) {
    const { dni } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const enrollment = await sequelize.query(`
            SELECT 	e."enrollmentID" idEnrollment,
                    e."enrollmentCode" codeEnrollment,
                    e."isActive" active,
                    e."registeredDate" createdAt,
                    e."statusChangeDate" updatedAt,
                    es."code" codeEnrollment,
                    es."description" enrollmentDescription,
                    s."studentCode" codeStudent,
                    s."bio" studentBio,
                    (SELECT xp."completeName" FROM "student" xs, "person" xp WHERE xs."personID" = xp."personID" AND xs."studentID" = s."studentID") studentName,
                    u."email" userMail,
                    (SELECT xp."completeName" FROM "user" xu, "person" xp WHERE xu."personID" = xp."personID" AND xu."userID" = u."userID") "userName",
                    ap."periodName" academicPeriod,
                    ap."detail" periodDetail,
                    cu."courseCode" codeCourse,
                    cu."courseName" curseName,
                    cu."description" curseDescription
            FROM	"enrollment" e, 
                    "enrollmentStatus" es, 
                    "student" s, 
                    "user" u, 
                    "academicPeriod" ap, 
                    "course" cu,
                    "person" pe
            WHERE   e."statusID" = es."statusID"
                AND e."studentID" = s."studentID"
                AND e."userID" = u."userID"
                AND e."periodID" = ap."periodID"
                AND e."courseID" = cu."courseID"
                AND u."personID" = pe."personID"
                AND u."isActive" = true
                AND pe."dni" = '${ dni }'
                ORDER BY e."isActive", e."registeredDate" DESC
                LIMIT ${ limit }
                OFFSET ${ from }
        `);
        if (enrollment) {
            return res.status(200).json({
                ok: true,
                enrollment: enrollment[0],
                total: enrollment[1].rowCount
            });
        } else {
            returnNotFound(res, 'DNI');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Enrollment by DNI');
    }
}

// Update the enrollment
export async function updateEnrollment(req, res) {
    const { enrollmentID } = req.params;
    const {
        enrollmentCode,
        statusChangeDate,
        statusID,
        studentID,
        isActive,
        userID,
        periodID,
        courseID
    } = req.body
    try {
        const dbEnrollment = await Enrollment.findOne({
            attributes: ['enrollmentID', 'enrollmentCode', 'statusChangeDate', 'statusID', 'studentID', 'isActive', 'userID', 'periodID', 'courseID'],
            where: {
                enrollmentID
            }
        });
        if (dbEnrollment === null || dbEnrollment === undefined) {
            returnNotFound(res, 'Enrollment ID');
        } else {
            const updateEnrollment = await Enrollment.update({
                enrollmentCode,
                statusChangeDate,
                statusID,
                studentID,
                isActive,
                userID,
                periodID,
                courseID
            }, {
                where: {
                    enrollmentID
                }
            });
            if (updateEnrollment) {
                return res.status(200).json({
                    ok: true,
                    message: 'Enrollment updated successfully'
                });
            } else {
                returnNotFound(res, 'Enrollment ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Enrollment');
    }
}

// Update an Enrollment for the enrollment process
export async function updateProcessEnrollment(req, res) {
    const { enrollmentID } = req.params;
    const status = req.query.status;
    let statusCode;
    let udpateQuery;
    try {
        const dbCode = await sequelize.query(`
            SELECT "code"
            FROM "enrollmentStatus"
            WHERE lower("description") LIKE (lower('${ status }'));
        `);
        if (dbCode[1].rowCount > 0) {
            statusCode = parseInt(dbCode[0][0].code);
        } else {
            returnWrongError(res, 'Status Description', 'Status Code');
            return;
        }
        if (statusCode === 1 || statusCode === 2 || statusCode === 3 || statusCode === 4 || statusCode === 5) {
            udpateQuery = `
                    UPDATE "enrollment"
                    SET "statusID" = (SELECT "statusID" FROM "enrollmentStatus" WHERE "code" = ${ statusCode }),
                        "statusChangeDate" = current_timestamp
                    WHERE "enrollmentID" = ${ enrollmentID };    
                `;
        } else {
            if (statusCode === 6 || statusCode === 7 || statusCode === 8 || statusCode === 9 || statusCode === 10 || statusCode === 11 || statusCode === 12) {
                udpateQuery = `
                    UPDATE "enrollment"
                    SET "statusID" = (SELECT "statusID" FROM "enrollmentStatus" WHERE "code" = ${ statusCode }),
                        "statusChangeDate" = current_timestamp,
                        "isActive" = false,
                        "unregisteredDate" = current_timestamp
                    WHERE "enrollmentID" = ${ enrollmentID };
                `;
            }
        }
        const updateEnrollment = await sequelize.query(udpateQuery);
        if (updateEnrollment[1].rowCount > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Enrollment updated successfully'
            });
        } else {
            returnNotFound(res, 'Enrrollment ID');
        }
    } catch (e) {
        console.log('Error', e);
        return res.status(500).json({ error: e });
    }
}

export async function deleteEnrollment(req, res) {
    const { enrollmentID } = req.params;
    try {
        const countDeleted = await Enrollment.destroy({
            where: {
                enrollmentID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Enrollment deleted successfully'
            });
        } else {
            returnNotFound(res, 'Enrollment ID');
        }
    } catch (e) {
        console.log('Error: ', e);
        returnError(res, e, 'Delete Enrollment');
    }
}