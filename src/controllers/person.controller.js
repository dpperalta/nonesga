import Person from '../models/Person';
import PersonType from '../models/PersonType';
import { sequelize } from '../database/database';
import { returnNotFound, returnError } from './errors';
import User from '../models/User';
import Student from '../models/Student';
import { nonesgaLog } from './log4js';

// Create a person
export async function createPerson(req, res) {

    const {
        dni,
        birthdate,
        names,
        lastNames,
        details,
        bio,
        image,
        sex,
        personTypeID
    } = req.body;

    let sexToCreate = '';
    let sexToRead = sex.toLowerCase();
    if (sexToRead === 'male' || sexToRead === 'masculino' || sexToRead === 'hombre' || sexToRead === 'hombres' || sexToRead === 'varon' || sexToRead === 'varones') {
        sexToCreate = 'Male'
    } else {
        if (sexToRead === 'female' || sexToRead === 'femenino' || sexToRead === 'femeninas' || sexToRead === 'mujer' || sexToRead === 'mujeres' || sexToRead === 'dama' || sexToRead === 'damas') {
            sexToCreate = 'Female'
        } else {
            sexToCreate = 'Unknown'
        }
    }
    try {
        let newPerson = await Person.create({
            dni,
            birthdate,
            names,
            lastNames,
            completeName: names + ' ' + lastNames,
            details,
            bio,
            image,
            sex: sexToCreate,
            personTypeID
        }, {
            fields: ['dni', 'birthdate', 'names', 'lastNames', 'completeName', 'image', 'details', 'bio', 'sex', 'personTypeID'],
            returning: ['personID', 'dni', 'birthdate', 'names', 'lastNames', 'completeName', 'image', 'details', 'bio', 'isActive', 'registeredDate', 'unregisteredDate', 'votes', 'sex', 'personTypeID']
        });
        if (newPerson) {
            return res.status(200).json({
                ok: true,
                message: 'Person created successfully',
                newPerson
            });
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Create Person', 'error');
        returnError(res, e, 'Create Person');
    }
}

// Get all people
export async function getPeople(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const people = await Person.findAndCountAll({
            attributes: ['personID', 'dni', 'names', 'lastNames', 'completeName', 'birthdate', 'isActive', 'registeredDate', 'image', 'details', 'bio', 'votes', 'sex', 'unregisteredDate', 'personTypeID'],
            limit,
            offset: from,
            order: [
                ['registeredDate', 'DESC']
            ]
        });
        if (people.count > 0) {
            return res.status(200).json({
                ok: true,
                people
            });
        } else {
            returnNotFound(res, 'All People');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Get People', 'error');
        returnError(res, e, 'Get People');
    }
}

// Get only active people
export async function getActivePeople(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const people = await Person.findAndCountAll({
            attributes: ['personID', 'dni', 'names', 'lastNames', 'completeName', 'birthdate', 'isActive', 'registeredDate', 'image', 'details', 'bio', 'votes', 'sex', 'unregisteredDate', 'personTypeID'],
            where: {
                isActive: true
            },
            limit,
            offset: from
        });
        if (people.count > 0) {
            return res.status(200).json({
                ok: true,
                people
            });
        } else {
            returnNotFound(res, 'Active People');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Get Active People', 'error');
        returnError(res, e, 'Get Active People');
    }
}

// Get information of a person by ID
export async function getPerson(req, res) {
    const { personID } = req.params;
    try {
        const person = await sequelize.query(`
        SELECT 	pe."personID" id, 
                pe."dni" cedula, 
                pe."birthdate" fechaNacimiento, 
                pe."names" nombres, 
                pe."lastNames" apellidos,
                pe."completeName" nombreCompleto,
                pe."image" foto,
                pe."details" detalles,
                pe."registeredDate" fechaAlta,
                pe."unregisteredDate" fechaBaja,
                pe."isActive" activo,
                pe."bio" biografia,
                pe."votes" votos,
                pe."sex" sexo,
                pt."personTypeID" idTipoPersona,
                pt."typeName" tipoPersona
        FROM "person" pe, "personType" pt
        WHERE pe."personTypeID" = pt."personTypeID"
            AND pe."personID" = ${personID}`);
        if (person) {
            return res.status(200).json({
                ok: true,
                person: person[0],
                counter: person[1].rowCount
            });
        } else {
            returnNotFound(res, 'Person ID');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Get Person', 'error');
        returnError(res, e, 'Get Person');
    }
}

// Get all inactive people
export async function getInactivePeople(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const people = await Person.findAndCountAll({
            attributes: ['personID', 'names', 'lastNames', 'completeName', 'birthdate', 'isActive', 'registeredDate', 'image', 'details', 'bio', 'votes', 'sex', 'unregisteredDate', 'personTypeID'],
            where: {
                isActive: false
            },
            limit,
            offset: from
        });
        if (people.count > 0) {
            return res.status(200).json({
                ok: true,
                people
            });
        } else {
            returnNotFound(res, 'Inacctive People');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Get Inactive People', 'error');
        returnError(res, e, 'Get Inactive People');
    }
}

// Get all active people with people type description
export async function getActivePeopleType(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    /*try {
        const people = await Person.findAndCountAll({
            attributes: ['personID', 'names', 'lastNames', 'completeName', 'birthdate', 'isActive', 'registeredDate', 'image', 'details', 'bio', 'votes', 'unregisteredDate', 'personTypeID'],
            where: {
                isActive: true
            },
            include: [{
                model: PersonType,
                attributes: ['personTypeID', 'typeName', 'personType']
            }]
        });
        if (people.count > 0) {
            return res.status(200).json({
                ok: true,
                people
            });
        } else {
            returnNotFound(res, 'Active People');
        }
    }*/
    try {
        const people = await sequelize.query(`
                SELECT "person"."completeName",  "person"."isActive", "person"."birthdate", "person"."bio", "person"."sex", "personType"."typeName"
                FROM "person", "personType" 
                WHERE "person"."personTypeID" = "personType"."personTypeID"
                    AND "person"."isActive" = true
                    limit: ${ limit }
                    offset: ${ from };`);

        if (people) {
            return res.status(200).json({
                ok: true,
                people: people[0],
                counter: people[1].rowCount
            });
        } else {
            returnNotFound(res, 'Active with Type');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Get Active People', 'error');
        returnError(res, e, 'Get Active People');
    }
}

// Update a Person providing personID
export async function updatePerson(req, res) {
    const { personID } = req.params;
    const {
        dni,
        names,
        lastNames,
        birthdate,
        image,
        details,
        bio,
        sex,
        personTypeID
    } = req.body;

    let sexToCreate = '';
    let sexToRead = sex.toLowerCase();
    if (sexToRead === 'masculino' || sexToRead === 'hombre' || sexToRead === 'hombres' || sexToRead === 'varon' || sexToRead === 'varones') {
        sexToCreate = 'Male'
    } else {
        if (sexToRead = 'femenino' || sexToRead === 'femeninas' || sexToRead === 'mujer' || sexToRead === 'mujeres' || sexToRead === 'dama' || sexToRead === 'damas') {
            sexToCreate = 'Female'
        } else {
            sexToCreate = 'Unknown'
        }
    }

    try {
        const dbPerson = await Person.findOne({
            attributes: ['dni', 'names', 'lastNames', 'completeName', 'image', 'birthdate', 'details', 'bio', 'sex', 'personTypeID'],
            where: {
                personID
            }
        });
        if (dbPerson === null || dbPerson === undefined) {
            returnNotFound(res, 'Person ID');
        } else {
            const updatedPerson = await Person.update({
                dni,
                names,
                lastNames,
                completeName: names + '  ' + lastNames,
                birthdate,
                details,
                bio,
                sex: sexToCreate,
                image,
                personTypeID
            }, {
                where: {
                    personID
                }
            });
            if (updatedPerson) {
                return res.status(200).json({
                    ok: true,
                    message: 'Person updated successfully',
                    count: updatedPerson
                })
            } else {
                returnNotFound(res, 'Person ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Update Person', 'error');
        returnError(res, e, "Update Person");
    }
}

// Inactivate a person
export async function inactivatePerson(req, res) {
    const { personID } = req.params;
    const isActive = false;
    try {
        const dbPerson = await Person.findOne({
            attributes: ['dni', 'completeName', 'birthdate', 'isActive', 'image', 'bio', 'sex', 'details'],
            where: {
                personID
            }
        });
        if (dbPerson) {
            const inactivatePerson = await Person.update({
                isActive,
                unregisteredDate: sequelize.fn('NOW')
            }, {
                where: {
                    personID,
                    isActive: true
                }
            });
            if (inactivatePerson > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Person inactivated successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while inactivating a Person or Person already inactive',
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Active Person');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Inactivate Person', 'error');
        returnError(res, e, 'Inactivate Person');
    }
}

// Inactivate a person
export async function activatePerson(req, res) {
    const { personID } = req.params;
    const isActive = true;
    try {
        const dbPerson = await Person.findOne({
            attributes: ['dni', 'completeName', 'birthdate', 'isActive', 'image', 'bio', 'details'],
            where: {
                personID
            }
        });
        if (dbPerson) {
            const inactivatePerson = await Person.update({
                isActive,
                unregisteredDate: null
            }, {
                where: {
                    personID,
                    isActive: false
                }
            });
            if (inactivatePerson > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Person activated successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while activating a Person or Person already active',
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Inactive Person');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Activate Person', 'error');
        returnError(res, e, 'Activate Person');
    }
}

// Delete a Person
export async function deletePerson(req, res) {
    const { personID } = req.params;
    try {
        // Validation of foreign tables
        const findUserPerson = await sequelize.query(`
            SELECT COUNT(*)
            FROM "user"
            WHERE "personID" = ${ personID }
        `);
        let countUser = findUserPerson[1].rows[0].count;

        if (countUser > 0) {
            return res.status(400).json({
                ok: false,
                message: 'Person is associated with a user, please change the values and try again'
            });
        }

        const findUserStudent = await sequelize.query(`
            SELECT COUNT(*)
            FROM "student"
            WHERE "personID" = ${ personID }
        `);

        let countStudent = findUserStudent[1].rows[0].count;
        if (countStudent > 0) {
            return res.status(400).json({
                ok: false,
                message: 'Person is associated with a student, please change the values and try again'
            })
        }

        // Try to delete the person
        const countDeleted = await Person.destroy({
            where: {
                personID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Person deleted successfully'
            });
        } else {
            returnNotFound(res, 'Person ID');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Delete Person', 'error');
        returnError(res, e, 'Delete Person');
    }
}

// Find a Person by DNI or Names
export async function findPerson(req, res) {
    let dni = req.query.dni;
    let names = req.query.names;

    if (dni.length === 0 && names.length === 0) {
        return res.status(400).json({
            ok: false,
            message: 'You must provide at least one searching parameter'
        });
    }

    if (dni.length > 0 && dni.length > 10) {
        return res.status(400).json({
            ok: false,
            message: 'DNI information is incorrect'
        });
    }
    if (names.length === 0 || dni.length === 10) {
        names = 'NN';
    }
    try {
        const people = await sequelize.query(`
            SELECT	"person"."personID" idPersona,
                    "person"."dni" cedula,
                    "person"."birthdate" nacimiento,
                    "person"."names" nombres,
                    "person"."lastNames" apellidos,
                    "person"."completeName" nombreCompleto,
                    "person"."image" foto,
                    "person"."details" detalles,
                    "person"."registeredDate" fechaRegistro,
                    "person"."isActive" activo,
                    "person"."bio" biografia,
                    "person"."votes" votos,
                    "person"."personTypeID" tipoPersonaID,
                    "person"."sex" sexo,
                    "personType"."typeName" tipoPersona
            FROM "person", "personType"
            WHERE "person"."personTypeID" = "personType"."personTypeID"
                AND ("person"."dni" = '${ dni }'
                OR upper("person"."completeName") like upper('%${ names }%'))
                AND "person"."isActive" = true
                ORDER BY apellidos, nombres;
        `);
        if (people) {
            return res.status(200).json({
                ok: true,
                people: people[0],
                total: people[1].rowCount
            });
        } else {
            returnNotFound(res, 'People with provided DNI or Names');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Find PErson by DNI or Names', 'error');
        returnError(res, e, 'Find Person by DNI or Names');
    }
}

// Find all people without an user
export async function getPeopleWhitoutUser(req, res) {
    try {
        const counter = await sequelize.query(`
            SELECT COUNT(*)
            FROM "person" per
            WHERE per."personID" NOT IN (SELECT DISTINCT("personID")
                                         FROM "user"
                                         WHERE "personID" IS NOT NULL);
        `);
        let total = parseInt(counter[1].rows[0].count);
        if (total > 0) {
            const people = await sequelize.query(`
                SELECT "personID",
                        "dni",
                        "birthdate",
                        "names",
                        "lastNames",
                        "completeName",
                        "image",
                        "details",
                        "registeredDate",
                        "unregisteredDate",
                        "isActive",
                        "bio",
                        "votes",
                        "personTypeID",
                        "sex"
                FROM "person" 
                WHERE "personID" NOT IN (SELECT DISTINCT("personID")
                                         FROM "user"
                                         WHERE "personID" IS NOT NULL)
                ORDER BY "personID" DESC;
            `);
            if (people) {
                return res.status(200).json({
                    ok: true,
                    count: total,
                    people: people[0]
                });
            }

        } else {
            return res.status(404).json({
                ok: false,
                message: 'Can not find people without user associated'
            });
        }

    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Get people whitout user', 'error');
        returnError(res, e, 'Get people withouy user');
    }
}