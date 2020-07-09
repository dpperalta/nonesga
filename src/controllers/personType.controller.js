import PersonType from '../models/PersonType';
import ErrorLog from '../models/ErrorLog';
import { sequelize } from '../database/database';

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
    try {
        const personTypes = await PersonType.findAndCountAll({
            attributes: ['personTypeID', 'personType', 'typeName', 'details', 'isActive', 'registeredDate'],
            where: {
                'isActive': true
            }
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


/*


*/

function returnError(res, e, module) {
    const error = e.original.hint || e.original.detail || 'Unknown error - maybe datatype';
    ErrorLog.create({
        errorDate: sequelize.fn('NOW'),
        errorDetail: e,
        errorModule: module
    }, {
        fields: ['errorDate', 'errorDetail', 'errorModule'],
        returning: ['errorLogID', 'errorDate', 'errorDetail', 'errorModule'],
    });
    return res.status(500).json({
        ok: false,
        message: 'Database Error, see details for information',
        error
    });
}

function returnNotFound(res, value) {
    value = 'Could not find any ' + value + ' with this searching parameter(s)';
    return res.status(404).json({
        ok: false,
        message: value
    });
}