import Person from '../models/Person';
import PersonType from '../models/PersonType';
import { sequelize } from '../database/database';
import { returnNotFound, returnError } from './errors';

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
        returnError(res, e, 'Create Person');
    }
}

// Get all people
export async function getPeople(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const people = await Person.findAndCountAll({
            attributes: ['personID', 'names', 'lastNames', 'completeName', 'birthdate', 'isActive', 'registeredDate', 'image', 'details', 'bio', 'votes', 'sex', 'unregisteredDate', 'personTypeID'],
            limit,
            offset: from
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
        returnError(res, e, 'Get People');
    }
}

// Get only active people
export async function getActivePeople(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const people = await Person.findAndCountAll({
            attributes: ['personID', 'names', 'lastNames', 'completeName', 'birthdate', 'isActive', 'registeredDate', 'image', 'details', 'bio', 'votes', 'sex', 'unregisteredDate', 'personTypeID'],
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
        if(dbPerson === null || dbPerson === undefined){
            returnNotFound(res, 'Person ID');
        }else{
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
                isActive
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
        returnError(res, e, 'Activate Person');
    }
}

// Delete a Person
export async function deletePerson(req, res) {
    const { personID } = req.params;
    try {
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
        returnError(res, e, 'Delete Person');
    }
}