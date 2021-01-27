const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;
import User from '../models/User';
import { sequelize } from '../database/database';
import { returnNotFound, returnError } from '../controllers/errors';

/* ==================================
            TOKEN VALIDATION
   ================================== */

let roleName = '';

let tokenValidation = function(req, res, next) {
    //let token = req.query.token;
    let token = req.header('none-token');

    jwt.verify(token, SEED, (error, decoded) => {
        if (error) {
            return res.status(403).json({
                ok: false,
                message: 'ERROR: Wrong token',
                token,
                error
            });
        }
        req.user = decoded.user;
        req.role = decoded.role;
        next();
    });
}

/* ==================================
        SUPER ADMIN VALIDATION
   ================================== */

let superAdminValidation = async function(req, res, next) {
    let user = req.user;
    let userID = user.userID;
    let roleName;
    try {
        const dbUser = User.findOne({
            attributes: ['userID', 'nick', 'email', 'pass', 'isActive', 'status', 'registeredDate', 'roleID', 'collegeID', 'personID'],
            where: {
                userID
            }
        });
        if (!dbUser) {
            returnNotFound(res, 'User ID');
        } else {
            let dbRole = user.roleID;
            const role = await sequelize.query(`
                    SELECT r."roleName" nameOfRole
                    FROM role r
                    WHERE r."roleID" = ${dbRole};        
        `);
            let name = role[0];
            roleName = name[0].nameofrole;
        }
        if (roleName === 'Super Administrator') {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                message: 'ERROR! You do not have super powers',
                error: {
                    message: 'Forbbiden action, contact with your administrator'
                }
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Super Administrator Validation');
    }
}

/* ==================================
           ADMIN VALIDATION
   ================================== */
let adminValidation = async function(req, res, next) {
    let user = req.user;
    let userID = user.userID;
    let roleName;
    try {
        const dbUser = User.findOne({
            attributes: ['userID', 'nick', 'email', 'pass', 'isActive', 'status', 'registeredDate', 'roleID', 'collegeID', 'personID'],
            where: {
                userID
            }
        });
        if (!dbUser) {
            returnNotFound(res, 'User ID');
        } else {
            let dbRole = user.roleID;
            const role = await sequelize.query(`
                    SELECT r."roleName" nameOfRole
                    FROM role r
                    WHERE r."roleID" = ${dbRole};        
        `);
            let name = role[0];
            roleName = name[0].nameofrole;
        }
        if (roleName === 'Super Administrator' || roleName === 'Administrator') {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                message: 'ERROR! You do not have powers',
                error: {
                    message: 'Forbbiden action, contact with your administrator'
                }
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Administrator Validation');
    }
}

/* ==================================
           TEACHER VALIDATION
   ================================== */
let teacherValidation = async function(req, res, next) {
    let user = req.user;
    let userID = user.userID;
    let roleName;
    try {
        const dbUser = User.findOne({
            attributes: ['userID', 'nick', 'email', 'pass', 'isActive', 'status', 'registeredDate', 'roleID', 'collegeID', 'personID'],
            where: {
                userID
            }
        });
        if (!dbUser) {
            returnNotFound(res, 'User ID');
        } else {
            let dbRole = user.roleID;
            const role = await sequelize.query(`
                    SELECT r."roleName" nameOfRole
                    FROM role r
                    WHERE r."roleID" = ${dbRole};        
        `);
            let name = role[0];
            roleName = name[0].nameofrole;
        }
        if (roleName === 'Teacher' || roleName === 'Super Administrator' || roleName === 'Administrator') {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                message: 'ERROR! You does not have enough teacher privileges',
                error: {
                    message: 'Forbbiden action, contact with your administrator'
                }
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Administrator Validation');
    }
}

/* ==================================
           OPERATIVE VALIDATION
   ================================== */
let operativeValidation = async function(req, res, next) {
    let user = req.user;
    let userID = user.userID;
    let roleName;
    try {
        const dbUser = User.findOne({
            attributes: ['userID', 'nick', 'email', 'pass', 'isActive', 'status', 'registeredDate', 'roleID', 'collegeID', 'personID'],
            where: {
                userID
            }
        });
        if (!dbUser) {
            returnNotFound(res, 'User ID');
        } else {
            let dbRole = user.roleID;
            const role = await sequelize.query(`
                    SELECT r."roleName" nameOfRole
                    FROM role r
                    WHERE r."roleID" = ${dbRole};        
        `);
            let name = role[0];
            roleName = name[0].nameofrole;
        }
        if (roleName === 'Operative' || roleName === 'Super Administrator' || roleName === 'Administrator') {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                message: 'ERROR! You does not have enough operative privileges',
                error: {
                    message: 'Forbbiden action, contact with your administrator'
                }
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Operative Validation');
    }
}

module.exports = {
    tokenValidation,
    superAdminValidation,
    adminValidation,
    teacherValidation,
    operativeValidation
}