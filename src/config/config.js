/************************************
    PROCESS ENVIRONMENT PORT
************************************/
process.env.PORT = process.env.PORT || 4000;

/************************************
    PROCESS ENVIRONMENT
************************************/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/************************************
    ACTUAL API ROUTE
************************************/
module.exports.API = '/api/v0.1';


/************************************
    SEED FOR TOKEN VALIDATION
************************************/
module.exports.SEED = process.env.SEED || '#@_d332-f0-tn3mp013v3d_@#';

/************************************
    TIME OF TOKEN EXPIRATION
************************************/
module.exports.TOKEN_END = '4h';