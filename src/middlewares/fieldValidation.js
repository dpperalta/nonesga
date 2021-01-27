import { validationResult } from 'express-validator';

export function fieldValidation(req, res = response, next) {
    // Error handled for fields in json request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let errorArray = errors.array();
        let errorMessage = '';
        for (let i = 0; i < errorArray.length; i++) {
            i > 0 ? errorMessage = `${ errorMessage }, ${ errorArray[i]['msg'] }` : errorMessage = `${ errorMessage } ${ errorArray[i]['msg'] }`
        }
        return res.status(400).json({
            ok: false,
            //message: 'An error occurrs with data fields',
            message: 'This errors occurrs: ' + errorMessage,
            errors: errors.mapped()
        });
    }

    next();
}