import Canton from '../models/Canton';
import Province from '../models/Province';
import Country from '../models/Country';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';

// Create a new Canton
export async function createCanton(req, res) {
    const {
        cantonCode,
        cantonName,
        details,
        capital,
        provinceID
    } = req.body;
    try {
        let newCanton = await Canton.create({
            cantonCode,
            cantonName,
            capital,
            details,
            provinceID
        }, {
            fields: ['cantonCode', 'cantonName', 'details', 'capital', 'provinceID'],
            returning: ['cantonID', 'cantonCode', 'cantonName', 'details', 'capital', 'isActive', 'registeredDate', 'unregisteredDate', 'provinceID']
        });
        if (newCanton) {
            return res.status(200).json({
                ok: true,
                message: 'Canton created successfully',
                canton: newCanton
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Canton');
    }
}

// Get information about Cantons
export async function getCantons(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const cantons = await Canton.findAndCountAll({
            attributes: ['cantonID', 'cantonCode', 'cantonName', 'details', 'capital', 'isActive', 'registeredDate', 'provinceID'],
            where: {
                isActive: true
            },
            include: [{
                model: Province,
                attributes: ['provinceID', 'provinceCode', 'provinceName'],
                include: [{
                    model: Country,
                    attributes: ['countryID', 'countryCode', 'countryName']
                }]
            }],
            limit,
            offset: from
        });
        if (cantons.count > 0) {
            return res.status(200).json({
                ok: true,
                cantons
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Cantons');
    }
}

// Get information of a Canton
export async function getCanton(req, res) {
    const { cantonID } = req.params;
    try {
        const canton = await Canton.findOne({
            attributes: ['cantonID', 'cantonCode', 'cantonName', 'details', 'capital', 'isActive', 'registeredDate', 'unregisteredDate', 'provinceID'],
            where: {
                cantonID
            },
            include: [{
                model: Province,
                attributes: ['provinceCode', 'provinceName'],
                include: [{
                    model: Country,
                    attributes: ['countryCode', 'countryName']
                }]
            }]
        });
        if (canton) {
            return res.status(200).json({
                ok: true,
                canton
            });
        } else {
            returnNotFound(res, 'Canton ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Canton by ID');
    }
}

// Get all city of a province
export async function getCantonsProvince(req, res) {
    const { provinceID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const cantons = await Canton.findAndCountAll({
            attributes: ['cantonID', 'cantonCode', 'cantonName', 'details', 'capital'],
            where: {
                isActive: true,
                provinceID
            },
            include: [{
                model: Province,
                attributes: ['provinceID', 'provinceName'],
                include: [{
                    model: Country,
                    attributes: ['countryID', 'countryName']
                }]
            }],
            limit,
            offset: from
        });
        if (cantons) {
            return res.status(200).json({
                ok: true,
                cantons
            })
        } else {
            returnNotFound(res, 'Province ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Cantons of Province');
    }
}

// Update a Canton
export async function updateCanton(req, res) {
    const { cantonID } = req.params;
    const {
        cantonCode,
        cantonName,
        details,
        capital,
        provinceID
    } = req.body;
    try {
        const dbCanton = await Canton.findOne({
            attributes: ['cantonID', 'cantonCode', 'cantonName', 'details', 'capital', 'isActive', 'registeredDate', 'unregisteredDate', 'provinceID'],
            where: {
                cantonID
            }
        });

        if (dbCanton === null || dbCanton === undefined) {
            returnNotFound(res, 'Canton ID');
        } else {
            const updateCanton = await Canton.update({
                cantonCode,
                cantonName,
                details,
                capital,
                provinceID
            }, {
                where: {
                    cantonID
                }
            });
            if (updateCanton) {
                return res.status(200).json({
                    ok: true,
                    message: 'Canton updated successfully'
                });
            } else {
                returnNotFound(res, 'Canton ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Canton');
    }
}

// Change to active or inactive a Canton
export async function changeActivationCanton(req, res) {
    const { cantonID } = req.params;
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
        const dbCanton = await Canton.findOne({
            attributes: ['cantonID', 'cantonCode', 'cantonName', 'isActive', 'registeredDate'],
            where: {
                cantonID
            }
        });
        if (dbCanton) {
            const changeActivation = await Canton.update(
                changeActivationJSON, {
                    where: {
                        cantonID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Canton ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Canton or Canton already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Canton ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Canton');
    }
}

// Delete a Canton
export async function deleteCanton(req, res) {
    const { cantonID } = req.params;
    try {
        const countDeleted = await Canton.destroy({
            where: {
                cantonID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Canton deleted successfuylly'
            });
        } else {
            returnNotFound(res, 'Canton ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Canton');
    }
}