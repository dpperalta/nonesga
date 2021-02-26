import Teacher from '../models/Teacher';
import Person from '../models/Person';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';
import { codeGeneration } from '../helpers/codes';
import { nonesgaLog } from './log4js';

// Create a new Teacher
export async function createTeacher(req, res) {
    const {
        teacherCode,
        status,
        details,
        bio,
        personID
    } = req.body;
    try {
        const newTeacher = await Teacher.create({
            teacherCode: await codeGeneration('teacher'),
            status,
            details,
            bio,
            personID
        }, {
            fields: ['teacherCode', 'status', 'details', 'bio', 'personID'],
            returning: ['teacherID', 'teacherCode', 'status', 'isActive', 'registeredDate', 'details', 'bio', 'personID']
        });
        if (newTeacher) {
            return res.status(200).json({
                ok: true,
                message: 'Teacher created successfully',
                teacher: newTeacher
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Teacher');
    }
}

// Get all teachers with person 
export async function getTeachers(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const teachers = await Teacher.findAndCountAll({
            attributes: ['teacherID', 'teacherCode', 'status', 'isActive', 'registeredDate', 'unregisteredDate', 'details', 'bio', 'ratting', 'personID'],
            where: {
                isActive: true
            },
            include: [{
                model: Person,
                attributes: ['personID', 'completeName']
            }],
            limit,
            offset: from
        });
        if (teachers.count > 0) {
            return res.status(200).json({
                ok: true,
                teachers
            });
        } else {
            returnNotFound(res, 'Any Teacher');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Teachers');
    }
}

// Update a teacher
export async function updateTeacher(req, res) {
    const { teacherID } = req.params;
    const {
        teacherCode,
        status,
        details,
        bio,
        ratting,
        personID
    } = req.body
    try {
        const dbTeacher = await Teacher.findOne({
            attributes: ['teacherID', 'teacherCode', 'status', 'isActive', 'details', 'bio', 'ratting', 'personID'],
            where: {
                teacherID
            }
        });
        if (dbTeacher === null || dbTeacher === undefined) {
            returnNotFound(res, 'Teacher ID');
        } else {
            const updatedTeacher = await Teacher.update({
                teacherCode,
                status,
                details,
                bio,
                ratting,
                personID
            }, {
                where: {
                    teacherID
                }
            });
            if (updateTeacher) {
                return res.status(200).json({
                    ok: true,
                    message: 'Teacher updated successfully'
                });
            } else {
                returnWrongError(res, 'Teahcer', 'for Update');
            }
        }
    } catch (e) {
        console.log('Error:', error);
        returnError(res, e, 'Update Teacher');
    }
}

// Change to active or inactive to a teacher
export async function changeActivationTeacher(req, res) {
    const { teacherID } = req.params;
    const type = req.query.type;
    let value;
    let action = '';
    let afirmation = '';
    let negation = '';
    let changeActivationJSON;
    if (type.toLowerCase() === 'activate') {
        value = true;
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
            };
        } else {
            returnWrongError(res, 'type', 'request');
        }
    }
    try {
        const dbTeacher = await Teacher.findOne({
            attributes: ['teacherID', 'teacherCode', 'isActive', 'status', 'personID'],
            where: {
                teacherID
            }
        });
        if (dbTeacher) {
            const changeActivation = await Teacher.update(
                changeActivationJSON, {
                    where: {
                        teacherID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Teacher ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Teacher or Teacher already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Teacher ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Teacher');
    }
}

// Get a teacher
export async function getTeacher(req, res) {
    const { teacherID } = req.params;
    try {
        const teacher = await Teacher.findOne({
            attributes: ['teacherID', 'teacherCode', 'status', 'isActive', 'registeredDate', 'unregisteredDate', 'details', 'bio', 'ratting', 'personID'],
            where: {
                teacherID
            },
            include: [{
                model: Person,
                attributes: ['personID', 'completeName']
            }]
        });
        if (teacher) {
            return res.status(200).json({
                ok: true,
                teacher
            });
        } else {
            returnNotFound(res, 'Teacher ID');
        }
    } catch (e) {
        console.log('Error:', e);
    }
}

// Delete a teacher
export async function deleteTeacher(req, res) {
    const { teacherID } = req.params;
    try {
        const countDeleted = await Teacher.destroy({
            where: {
                teacherID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Teacher deleted successfully'
            });
        } else {
            returnNotFound(res, 'Teacher');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Teacher');
    }
}

// Get teacher by college
export async function getTeacherByCollege(req, res) {
    const { collegeID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    let total;
    try {
        const teachers = await sequelize.query(`
            select 	"person"."personID" persona,
                    "user"."userID" usuario,
                    "college"."collegeID" colegio,
                    "teacher"."teacherID" profesor,
                    "person"."names" nombres,
                    "person"."lastNames" apellidos,
                    "person"."completeName" completo,
                    "person"."dni" cedula,
                    "college"."collegeName" colegio,
                    "user"."email"
            from "teacher", "college", "person", "user"
            where "teacher"."personID" = "person"."personID"
                and "user"."personID" = "person"."personID"
                and "user"."collegeID" = "college"."collegeID"
                and "college"."collegeID" = ${ collegeID }
                order by "person"."lastNames"
                limit ${ limit }
                offset ${ from };
        `);
        total = parseInt(teachers[1].rowCount)
        if (total > 0) {
            return res.status(200).json({
                ok: true,
                teachers: teachers[0],
                total
            });
        } else {
            returnNotFound(res, 'Any Teacher for this College');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, "Get Teacher by College");
    }
}

// Get teacher by personID
export async function getTeacherByPerson(req, res) {
    const { personID } = req.params;
    let total;
    try {
        const teachers = await sequelize.query(`
            SELECT 	"person"."personID" personID,
                    "user"."userID" userID,
                    "college"."collegeID" collegeID,
                    "teacher"."teacherID" teacherID,
                    "person"."names" firstName,
                    "person"."lastNames" lastNames,
                    "person"."completeName" completeName,
                    "person"."dni" dni,
                    "college"."collegeName" collegeName,
                    "user"."email" email
            FROM "teacher", "college", "person", "user"
            WHERE "teacher"."personID" = "person"."personID"
                AND "user"."personID" = "person"."personID"
                AND "user"."collegeID" = "college"."collegeID"
                AND "person"."personID" = ${ personID }
                ORDER BY "person"."lastNames";
        `);
        total = parseInt(teachers[1].rowCount)
        if (total > 0) {
            let data = teachers[0];
            return res.status(200).json({
                ok: true,
                teacher: data[0],
                total
            });
        } else {
            returnNotFound(res, 'Any Teacher for this Person');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Get Teacher by Person', 'error');
        returnError(res, e, "Get Teacher by Person");
    }
}