import Student from '../models/Student';
import Person from '../models/Person';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';

// Create a new Student
export async function createStudent(req, res){
    const {
        studentCode,
        status,
        previousCourse,
        actualCourse,
        grade,
        details,
        ratting,
        bio,
        personID
    } = req.body;
    try{
        const newStudent = await Student.create({
            studentCode,
            status,
            previousCourse,
            actualCourse,
            grade,
            details,
            ratting,
            bio,
            personID
        }, {
            fields: ['studentCode', 'status', 'previousCourse', 'actualCourse', 'grade', 'details', 'ratting', 'bio', 'personID'],
            returning: ['studentID', 'studentCode', 'status', 'isActive', 'registeredDate', 'previousCourse', 'actualCourse', 'grade', 'details', 'ratting', 'bio', 'personID']
        });
        if(newStudent){
            return res.status(200).json({
                ok: true,
                message: 'Student created successfully',
                student: newStudent
            });
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Create Student');
    }
}

export async function getStudents(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try{
        const students = await Student.findAndCountAll({
            attributes: ['studentID', 'studentCode', 'status', 'isActive', 'registeredDate', 'bio', 'details', 'personID', 'ratting', 'grade', 'actualCourse', 'previousCourse'],
            include: [{
                model: Person,
                attributes: ['personID', 'completeName']
            }],
            limit,
            offset: from
        });
        if(students.count > 0){
            return res.status(200).json({
                ok: true,
                students
            });
        }else{
            returnNotFound(res, 'Any Student');
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Get Studdents');
    }
}

// Update a student
export async function updateStudent(req, res){
    const { studentID } = req.params;
    const {
        studentCode,
        status,
        previousCourse,
        actualCourse,
        grade,
        details,
        ratting,
        bio,
        personID
    } = req.body;
    try{
        const dbStudent = await Student.findOne({
            attributes: ['studentID', 'studentCode', 'status', 'isActive', 'registeredDate', 'unregisteredDate', 'previousCourse', 'actualCourse', 'grade', 'bio', 'details', 'ratting', 'personID'],
            where: {
                studentID
            }
        });
        if(dbStudent === null || dbStudent === undefined){
            returnNotFound(res, 'Student ID');
        }else{
            const updatedStudent = await Student.update({
                studentCode,
                status,
                previousCourse,
                actualCourse,
                grade,
                details,
                ratting,
                bio,
                personID
            }, {
                where: {
                    studentID
                }
            });
            if(updatedStudent){
                return res.status(200).json({
                    ok: true,
                    message: 'Student updated successfully'
                });
            }else{
                returnWrongError(res, 'Student', 'for Update');
            }
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Update Student');
    }
}

// Change to active or inactive an student
export async function changeActivationStudent(req, res) {
    const { studentID } = req.params;
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
        const dbStudent = await Student.findOne({
            attributes: ['studentID', 'studentCode', 'isActive', 'status', 'personID'],
            where: {
                studentID
            }
        });
        if (dbStudent) {
            const changeActivation = await Student.update(
                changeActivationJSON, {
                    where: {
                        studentID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Student ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Student or Student already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Student ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Student');
    }
}

// Get the information of an Student
export async function getStuddent(req, res){
    const { studentID } = req.params;
    try{
        const student = await Student.findOne({
            attributes: ['studentID', 'studentCode', 'status', 'isActive', 'registeredDate', 'unregisteredDate', 'details', 'bio', 'ratting', 'grade', 'previousCourse', 'actualCourse', 'personID'],
            where: {
                studentID
            },
            include: [{
                model: Person,
                attributes: ['personID', 'completeName']
            }]
        });
        if(student){
            return res.status(200).json({
                ok: true,
                student
            });
        }else{
            returnNotFound(res, 'Student ID');
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Get an Student');
    }
}

// Delete a student
export async function deleteStudent(req, res) {
    const { studentID } = req.params;
    try {
        const countDeleted = await Student.destroy({
            where: {
                studentID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Student deleted successfully'
            });
        } else {
            returnNotFound(res, 'Student');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Student');
    }
}

// Get teacher by college
export async function getStudentByCollege(req, res){
    const { collegeID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    let total;
    try {
         const students = await sequelize.query(`
            SELECT 	"person"."personID" persona,
                    "user"."userID" usuario,
                    "college"."collegeID" colegio,
                    "student"."studentID" estudiante,
                    "person"."names" nombres,
                    "person"."lastNames" apellidos,
                    "person"."completeName" completo,
                    "person"."dni" cedula,
                    "college"."collegeName" colegio,
                    "user"."email"
            FROM "student", "college", "person", "user"
            WHERE "student"."personID" = "person"."personID"
                AND "user"."personID" = "person"."personID"
                AND "user"."collegeID" = "college"."collegeID"
                AND "college"."collegeID" = ${ collegeID }
                ORDER BY "person"."lastNames"
                LIMIT ${ limit }
                OFFSET ${ from };
        `);
        total = parseInt(students[1].rowCount)
        if(total > 0){
            return res.status(200).json({
                ok: true,
                students: students[0],
                total
            });
        }else{
            returnNotFound(res, 'Any Student for this College');
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, "Get Student by College");
    }
}