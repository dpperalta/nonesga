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