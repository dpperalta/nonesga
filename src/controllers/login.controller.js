import User from '../models/User';
import { sequelize } from '../database/database';
import { returnError, returnNotFound } from './errors';

//Imports for variables
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;
const TOKEN_END = require('../config/config').TOKEN_END;

export async function login(req, res) {
    const {
        email,
        nick,
        pass
    } = req.body;
    let roleName = '';
    try {
        const loggedUser = await User.findOne({
            attributes: ['userID', 'nick', 'email', 'pass', 'isActive', 'status', 'registeredDate', 'roleID', 'collegeID', 'personID'],
            where: {
                email
            }
        });
        if (!loggedUser) {
            return res.status(400).json({
                ok: false,
                message: 'Incorrect authentication information - email'
            })
        }
        console.log('loggedUser:', loggedUser);
        console.log('email: ', loggedUser.email);
        console.log('pass:', loggedUser.pass);
        if (!bcrypt.compareSync(pass, loggedUser.pass)) {
            return res.status(400).json({
                ok: false,
                message: 'Incorrect authentication information - pass'
            });
        }
        if (!loggedUser.isActive) {
            return res.status(300).json({
                ok: false,
                message: 'The user is disabled, please contact with your Administrator'
            });
        }
        let dbRole = loggedUser.roleID;
        const role = await sequelize.query(`
                    SELECT r."roleName" nameOfRole
                    FROM role r
                    WHERE r."roleID" = ${dbRole};        
        `);
        let name = role[0];
        roleName = name[0].nameofrole;
        loggedUser.pass = '|m|';
        let token = jwt.sign({ user: loggedUser }, SEED, { expiresIn: TOKEN_END });
        return res.status(200).json({
            ok: true,
            user: loggedUser,
            token,
            role: roleName
        });
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Login');
    }
}

export function validateUser(req, res) {
    return res.status(200).json({
        ok: true,
        message: 'VALIDATED'
    });
}

/*
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
*/