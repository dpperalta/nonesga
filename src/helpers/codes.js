import { sequelize } from "../database/database";

export async function codeGeneration(type) {

    let code = '';
    let counter = 0;

    switch (type) {
        case 'role':
            code = 'ROLE';
            counter = await getSequential('role'); //Sed data table name
            break;
        case 'college':
            code = 'COLN';
            counter = await getSequential('college');
            break;
        case 'personType':
            code = '';
            counter = await getSequential('personType');
            return counter;
        case 'enrollmentStatus':
            code = '';
            counter = await getSequential('enrollmentStatus');
            return counter;
        case 'teacher':
            code = 'TCHR';
            counter = await getSequential('teacher');
            break;
        case 'student':
            code = 'STUD';
            counter = await getSequential('student');
            break;
        case 'college':
            code = 'COLN';
            counter = await getSequential('college');
            break;
        case 'course':
            code = 'COUR';
            counter = await getSequential('course');
            break;
        case 'subject':
            code = 'SUBJ';
            counter = await getSequential('subject');
            break;
        case 'content':
            code = 'CONT';
            counter = await getSequential('content');
            break;
        case 'task':
            code = 'TSKC';
            counter = await getSequential('task');
            break;
        case 'enrollment':
            code = 'MATC';
            counter = await getSequential('enrollment');
            break;
        default:
            code = 'NONE';
            break;
    }

    return code + '00' + counter;
}

async function getSequential(table) {
    const number = await sequelize.query(`
        SELECT COUNT (*)
        FROM "${ table }";
    `);
    let value = parseInt(number[1].rows[0].count);
    return value + 1;
}