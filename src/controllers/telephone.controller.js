import Telephone from '../models/Telephone';
import PhoneOperator from '../models/PhoneOperator';
import Person from '../models/Person';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';

// Create a new Telephone
export async function createTelephone(req, res) {
    const {
        number,
        phoneName,
        detail,
        isFavourite,
        isWork,
        phoneType,
        operatorID,
        personID
    } = req.body;
    try {
        const newTelephone = await Telephone.create({
            number,
            phoneName,
            detail,
            isFavourite,
            isWork,
            phoneType,
            operatorID,
            personID
        }, {
            fields: ['number', 'phoneName', 'detail', 'isFavourite', 'isWork', 'phoneType', 'operatorID', 'personID'],
            returning: ['telephoneID', 'number', 'phoneName', 'detail', 'isFavourite']
        });
        if (newTelephone) {
            return res.status(200).json({
                ok: true,
                message: 'Telephone created successfully',
                telephone: newTelephone
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Telephone');
    }
}

// Get telephones
export async function getTelephones(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const telephones = await Telephone.findAndCountAll({
            attributes: ['telephoneID', 'number', 'phoneName', 'detail', 'isFavourite', 'isWork', 'phoneType', 'registeredDate', 'unregisteredDate', 'isActive', 'operatorID', 'personID'],
            where: {
                isActive: true
            },
            include: [{
                model: Person,
                attributes: ['personID', 'completeName']
            }, {
                model: PhoneOperator,
                attributes: ['operatorID', 'operatorName']
            }],
            limit,
            offset: from
        });
        if (telephones.count > 0) {
            return res.status(200).json({
                ok: true,
                telephones
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Telephones');
    }
}

// Get a telephone
export async function getTelephone(req, res) {
    const { telephoneID } = req.params;
    try {
        const telephone = await Telephone.findOne({
            attributes: ['telephoneID', 'number', 'phoneName', 'detail', 'isFavourite', 'isWork', 'phoneType', 'registeredDate', 'unregisteredDate', 'isActive', 'operatorID', 'personID'],
            where: {
                telephoneID
            },
            include: [{
                model: Person,
                attributes: ['personID', 'completeName']
            }, {
                model: PhoneOperator,
                attributes: ['operatorID', 'operatorName']
            }]
        });
        if (telephone) {
            return res.status(200).json({
                ok: true,
                telephone
            });
        } else {
            returnNotFound(res, 'Telephone ID');
        }
    } catch (e) {
        console.log('Error:', e);
    }
}

// Update a telephone
export async function updateTelephone(req, res) {
    const { telephoneID } = req.params;
    const {
        number,
        phoneName,
        detail,
        isFavourite,
        isWork,
        phoneType,
        operatorID,
        personID
    } = req.body;
    try {
        const dbTelephone = await Telephone.findOne({
            attributes: ['telephoneID', 'number', 'phoneName', 'detail', 'isFavourite', 'isWork', 'phoneType', 'registeredDate', 'unregisteredDate', 'operatorID', 'personID'],
            where: {
                telephoneID
            }
        });
        if (dbTelephone === null || dbTelephone === undefined) {
            returnNotFound(res, 'Telephone ID');
        } else {
            if (isFavourite) {
                const favourite = await sequelize.query(`
                    update "telephone"
                        set "isFavourite" = false
                        where "personID" = ${ dbTelephone.personID }
                            and "telephoneID" != ${ telephoneID };
                `);
            }
            const updatedTelephone = await Telephone.update({
                number,
                phoneName,
                detail,
                isFavourite,
                isWork,
                phoneType,
                operatorID,
                personID
            }, {
                where: {
                    telephoneID
                }
            });
            if (updatedTelephone) {
                return res.status(200).json({
                    ok: true,
                    message: 'Telephone updated successfully'
                });
            } else {
                returnNotFound(res, 'Telephone ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Telephone');
    }
}

// Change to active or inactive a telephone
export async function changeActivationTelephone(req, res) {
    const { telephoneID } = req.params;
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
        const dbTelephone = await Telephone.findOne({
            attributes: ['telephoneID', 'number', 'phoneName', 'detail', 'isFavourite', 'isWork', 'phoneType'],
            where: {
                telephoneID
            }
        });
        if (dbTelephone) {
            const changeActivation = await Telephone.update(
                changeActivationJSON, {
                    where: {
                        telephoneID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Telephone ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Telephone or Telephone already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Telephone ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Telephone');
    }
}

// Physical Delete a telephone
export async function deleteTelephone(req, res) {
    const { telephoneID } = req.params;
    try {
        const countDeleted = await Telephone.destroy({
            where: {
                telephoneID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Telephone deleted successfully'
            });
        } else {
            returnNotFound(res, 'Telephone ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Telephone ID');
    }
}

// Get phone information of a person
export async function getPersonTelephones(req, res) {
    const { personID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    let rows;
    let totalRows;
    try {
        const total = await sequelize.query(`
        select count(*) 
        from "telephone", "phoneOperator", "person", "user"
        where "telephone"."operatorID" = "phoneOperator"."operatorID"
            and "telephone"."personID" = "person"."personID"
            and "person"."personID" = "user"."personID"
            and "person"."personID" = ${ personID }
            and "telephone"."isActive" = true;
        `);
        rows = total[0];
        totalRows = parseInt(rows[0].count);
        const telephones = await sequelize.query(`
            select "telephone"."telephoneID" tid,
                    "telephone"."number" tnumber,
                    "telephone"."phoneName" tname,
                    "telephone"."detail" tdetail,
                    "telephone"."isFavourite" tfav,
                    "telephone"."isWork" twork,
                    "telephone"."isActive" tactive,
                    "person"."completeName" pname,
                    "phoneOperator"."operatorName" oname
            from "telephone", "phoneOperator", "person", "user"
            where "telephone"."operatorID" = "phoneOperator"."operatorID"
                and "telephone"."personID" = "person"."personID"
                and "person"."personID" = "user"."personID"
                and "person"."personID" = ${ personID }
                and "telephone"."isActive" = true
                order by "telephone"."isFavourite" DESC
                limit ${ limit }
                offset ${ from };
        `);
        if (telephones) {
            if (totalRows > 0) {
                return res.status(200).json({
                    ok: true,
                    telephones: telephones[0],
                    total: totalRows
                });
            } else {
                returnNotFound(res, 'Person ID', 'Telephone search');
            }
        } else {
            returnWrongError(res, 'Person ID')
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Telephones of Person');
    }
}