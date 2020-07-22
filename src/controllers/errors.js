import ErrorLog from "../models/ErrorLog";
import { sequelize } from '../database/database';

export function returnError(res, e, module) {
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

export function returnNotFound(res, value) {
    value = 'Could not find any ' + value + ' with this searching parameter(s)';
    return res.status(404).json({
        ok: false,
        message: value
    });
}

export function returnWrongError(res, argument, value){
    let error = 'Wrong ' + argument + ' for the ' + value + ' please validate';
    return res.status(400).json({
        ok: false,
        message: error
    });
}