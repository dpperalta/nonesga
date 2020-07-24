import PersonType from '../models/PersonType';
import { sequelize } from '../database/database';
import { returnError, returnNotFound } from './errors';

// Function to create a person type
export async function createPersonType(req, res) {
    const {
        personType,
        typeName,
        details
    } = req.body;
    try {
        let newPersonType = await PersonType.create({
            personType,
            typeName,
            details
        }, {
            fields: ['personType', 'typeName', 'details'],
            returning: ['personTypeID', 'personType', 'typeName', 'registeredDate', 'details', 'isActive']
        });
        if (newPersonType) {
            return res.status(200).json({
                ok: true,
                message: 'Person Type created successfully',
                personType: newPersonType
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Person Type');
    }
}

// Function to get all persons types
export async function getPersonTypes(req, res) {
    try {
        const personTypes = await PersonType.findAll({
            attributes: ['personTypeID', 'personType', 'typeName', 'details', 'isActive', 'registeredDate', 'unregisteredDate'],
            order: [
                ['personTypeID', 'ASC']
            ]
        });
        if (personTypes.length > 0) {
            return res.status(200).json({
                ok: true,
                personTypes
            });
        } else {
            returnNotFound(res, 'Person Type');
        }
    } catch (e) {
        console.log('Error:', e);
    }
}

// Function to get only active person types
export async function getActivePersonTypes(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const personTypes = await PersonType.findAndCountAll({
            attributes: ['personTypeID', 'personType', 'typeName', 'details', 'isActive', 'registeredDate'],
            where: {
                'isActive': true
            },
            limit,
            offset: from
        });
        if (personTypes.count > 0) {
            return res.status(200).json({
                ok: true,
                personTypes
            });
        } else {
            returnNotFound(res, 'Active Person Types');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get all Active Person Type');
    }
}

// Update a Person Type providing personTypeID
export async function updatePersonType(req, res) {
    const { personTypeID } = req.params;
    const {
        personType,
        typeName,
        details
    } = req.body;
    try {
        const dbPersonType = await PersonType.findOne({
            attributes: ['personType', 'typeName', 'details'],
            where: {
                personTypeID
            },
            returning: ['personTypeID', 'personType', 'typeName', 'details', 'registeredDate', 'unregisteredDate', 'isActive']
        });

        if(dbPersonType === null || dbPersonType === undefined){
            returnNotFound(res, 'Person Type ID');
        }else{
            const updatePersonType = await PersonType.update({
                personType,
                typeName,
                details
            }, {
                where: {
                    personTypeID
                }
            });
            if (updatePersonType) {
                res.status(200).json({
                    ok: true,
                    message: 'Person Type updated successfully',
                    count: updatePersonType
                });
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Person Type');
    }
}

// Inactive a Person Type
export async function inactivatePersonType(req, res) {
    const { personTypeID } = req.params;
    const isActive = false;
    try {
        const dbPersonType = await PersonType.findOne({
            attributes: ['personType', 'typeName', 'details', 'isActive', 'unregisteredDate'],
            where: {
                personTypeID
            },
            returning: ['personTypeID', 'personType', 'typeName', 'details', 'isActive', 'regsiteredDate', 'unregisteredDate']
        });
        if (dbPersonType) {
            const inactivatePersonType = await PersonType.update({
                isActive,
                unregisteredDate: sequelize.fn('NOW')
            }, {
                where: {
                    personTypeID,
                    isActive: true
                }
            });
            if (inactivatePersonType > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Person Type inactivated successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while inactivating a Person Type or Person Type already inactive',
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Active Person Type');
        }
    } catch (e) {
        console.log('Error', e);
        returnError(res, e, 'Inactivate Person Type');
    }
}

// Activate a Person Type
export async function activatePersonType(req, res) {
    const { personTypeID } = req.params;
    const isActive = true;
    try {
        const dbPersonType = await PersonType.findOne({
            attributes: ['personType', 'typeName', 'details', 'isActive', 'unregisteredDate'],
            where: {
                personTypeID
            },
            returning: ['personTypeID', 'personType', 'typeName', 'details', 'isActive', 'regsiteredDate', 'unregisteredDate']
        });
        if (dbPersonType) {
            const activatePersonType = await PersonType.update({
                isActive
            }, {
                where: {
                    personTypeID,
                    isActive: false
                }
            });
            if (activatePersonType > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Person Type activated successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while activating a Person Type or Person Type already active',
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Inactivate Person Type');
        }
    } catch (e) {
        console.log('Error', e);
        returnError(res, e, 'Activate Person Type');
    }
}

export async function deletePersonType(req, res) {
    const { personTypeID } = req.params;
    try {
        const countDeleted = await PersonType.destroy({
            where: {
                personTypeID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Person Type deleted successfully'
            });
        } else {
            returnNotFound(res, 'Person Type ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Person Type');
    }
}