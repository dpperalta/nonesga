import Task from '../models/Task';
import Subject from '../models/Subject';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';
import { codeGeneration } from '../helpers/codes';


// Crate a new Task
export async function createTask(req, res) {
    const {
        startDate,
        endDate,
        taskName,
        taskDetail,
        permitsDelay,
        maxDelay,
        image,
        subjectID
    } = req.body;
    try {
        const newTask = await Task.create({
            taskCode: await codeGeneration('task'),
            startDate,
            endDate,
            taskName,
            taskDetail,
            permitsDelay,
            maxDelay,
            image,
            subjectID
        }, {
            fields: ['taskCode', 'startDate', 'endDate', 'taskName', 'taskDetail', 'permitsDelay', 'maxDelay', 'image', 'subjectID'],
            returning: ['taskID', 'taskCode', 'startDate', 'endDate', 'taskName', 'taskDetail', 'isActive', 'permitsDelay', 'maxDelay', 'image', 'subjectID']
        });
        if (newTask) {
            return res.status(200).json({
                ok: true,
                message: 'Task created successfully',
                task: newTask
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Task');
    }
}

// Get all task
export async function getTasks(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const tasks = await Task.findAndCountAll({
            attributes: ['taskID', 'taskCode', 'startDate', 'endDate', 'taskName', 'taskDetail', 'isActive', 'permitsDelay', 'maxDelay', 'image', 'subjectID'],
            include: [{
                model: Subject,
                attributes: ['subjectID', 'subjectName']
            }],
            limit,
            offset: from
        });
        if (tasks.count > 0) {
            return res.status(200).json({
                ok: true,
                tasks
            });
        } else {
            returnNotFound(res, 'Any Tasks');
        }
    } catch (e) {
        console.log('Error: ', e);
        returnError(res, e, 'Get Tasks');
    }
}

// Get a task by task ID
export async function getTask(req, res) {
    const { taskID } = req.params;
    try {
        const task = await Task.findOne({
            attributes: ['taskID', 'taskCode', 'startDate', 'endDate', 'taskName', 'taskDetail', 'isActive', 'permitsDelay', 'maxDelay', 'image', 'subjectID'],
            where: {
                taskID
            },
            include: [{
                model: Subject,
                attributes: ['subjectID', 'subjectName']
            }]
        });
        if (task) {
            return res.status(200).json({
                ok: true,
                task
            });
        } else {
            returnNotFound(res, 'Task ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Task by ID');
    }
}

// Get a task by subject ID
export async function getSubjectTasks(req, res) {
    const { subjectID } = req.params;
    try {
        const tasks = await Task.findAndCountAll({
            attributes: ['taskID', 'taskCode', 'startDate', 'endDate', 'taskName', 'taskDetail', 'isActive', 'permitsDelay', 'maxDelay', 'image', 'subjectID'],
            where: {
                subjectID
            },
            include: [{
                model: Subject,
                attributes: ['subjectID', 'subjectName']
            }]
        });
        if (tasks) {
            return res.status(200).json({
                ok: true,
                tasks
            });
        } else {
            returnNotFound(res, 'Subject ID');
        }
    } catch (e) {
        console.log('Error: ', e);
        returnError(res, e, 'Get Task by Subject');
    }
}

// Get task by Student
export async function getTaskByStudent(req, res) {
    const { studentID } = req.params;
    const limit = req.query.limit || 100;
    const from = req.query.from || 0;
    const active = req.query.active || true;
    try {
        const tasks = await sequelize.query(`
            SELECT	ta."taskCode" codeTask,
                    ta."startDate" dateStart,
                    ta."endDate" dateFinish,
                    ta."taskName" nameTask,
                    ta."taskDetail" details,
                    ta."isActive" active,
                    ta."permitsDelay" delay,
                    ta."maxDelay" delayDate,
                    ta."image" preview,
                    su."subjectCode" codeSubject,
                    su."subjectName" nameSubject,
                    cu."courseName" nameCourse,
                    cu."description" descriptionCourse,
                    en."enrollmentCode" enrollment,
                    st."studentCode" codeStudent
            FROM 	"task" ta, 
                    "subject" su, 
                    "course" cu, 
                    "enrollment" en, 
                    "student" st
            WHERE 	ta."subjectID" = su."subjectID"
                AND su."courseID" = cu."courseID"
                AND cu."courseID" = en."courseID"
                AND en."studentID" = st."studentID"
                AND st."studentID" = ${ studentID }
                AND ta."isActive" = ${ active }
                ORDER BY ta."startDate", ta."endDate" DESC
                LIMIT ${ limit }
                OFFSET ${ from };
        `);
        if (tasks) {
            return res.status(200).json({
                ok: true,
                tasks: tasks[0],
                total: tasks[1].rowCount
            });
        } else {
            returnNotFound(res, 'Student ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnrError(res, e, 'Get Task by Student');
    }
}

// Get tasks by Student and Subject
export async function getTaskByStudentSubject(req, res) {
    const {
        studentID,
        subjectID
    } = req.params;
    const active = req.query.active || true;
    try {
        const tasks = await sequelize.query(`
            SELECT	ta."taskCode" codeTask,
                    ta."startDate" dateStart,
                    ta."endDate" dateFinish,
                    ta."taskName" nameTask,
                    ta."taskDetail" details,
                    ta."isActive" active,
                    ta."permitsDelay" delay,
                    ta."maxDelay" delayDate,
                    ta."image" preview,
                    su."subjectCode" codeSubject,
                    su."subjectName" nameSubject,
                    cu."courseName" nameCourse,
                    cu."description" descriptionCourse,
                    en."enrollmentCode" enrollment,
                    st."studentCode" codeStudent
            FROM 	"task" ta, 
                    "subject" su, 
                    "course" cu, 
                    "enrollment" en, 
                    "student" st
            WHERE 	ta."subjectID" = su."subjectID"
                AND su."courseID" = cu."courseID"
                AND cu."courseID" = en."courseID"
                AND en."studentID" = st."studentID"
                AND st."studentID" = ${ studentID }
                AND ta."isActive" = ${ active }
                AND su."subjectID" = ${ subjectID }
                ORDER BY ta."startDate", ta."endDate" DESC;
        `);
        if (tasks) {
            return res.status(200).json({
                ok: true,
                tasks: tasks[0],
                total: tasks[1].rowCount
            });
        } else {
            returnNotFound(res, 'Student ID or Subject ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnrError(res, e, 'Get Task by Student and Course');
    }
}

// Update a task
export async function updateTask(req, res) {
    const { taskID } = req.params;
    let delayDate;
    const {
        taskCode,
        startDate,
        endDate,
        taskName,
        taskDetail,
        permitsDelay,
        maxDelay,
        image,
        subjectID
    } = req.body;
    try {
        const dbTask = await Task.findOne({
            attributes: ['taskID', 'taskCode', 'startDate', 'endDate', 'isActive', 'taskName', 'taskDetail', 'permitsDelay', 'maxDelay', 'image', 'subjectID'],
            where: {
                taskID
            }
        });
        if (dbTask === null || dbTask === undefined) {
            returnNotFound(res, 'Task ID');
        } else {
            if (permitsDelay) {
                delayDate = maxDelay
            } else {
                delayDate = null;
            }
            const updatedTask = await Task.update({
                taskCode,
                startDate,
                endDate,
                taskName,
                taskDetail,
                permitsDelay,
                maxDelay: delayDate,
                image,
                subjectID
            }, {
                where: {
                    taskID
                }
            });
            if (updatedTask) {
                return res.status(200).json({
                    ok: true,
                    message: 'Task updated successfully'
                });
            } else {
                returnNotFound(res, 'Task for update');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Task');
    }
}

// Change to active or inactive a task
export async function changeActivationTask(req, res) {
    const { taskID } = req.params;
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
        const dbTask = await Task.findOne({
            attributes: ['taskID', 'taskCode', 'isActive', 'subjectID'],
            where: {
                taskID
            }
        });
        if (dbTask) {
            const changeActivation = await Task.update(
                changeActivationJSON, {
                    where: {
                        taskID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Task ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Task or Task alread ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Task ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Task');
    }
}

// Delte a task
export async function deleteTask(req, res) {
    const { taskID } = req.params;
    try {
        const countDeleted = await Task.destroy({
            where: {
                taskID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Task deleted successfully'
            });
        } else {
            returnNotFound(res, 'Task ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Task');
    }
}