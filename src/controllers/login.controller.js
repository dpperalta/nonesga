import { sequelize } from '../database/database';
import { returnError, returnNotFound } from './errors';
import User from '../models/User';
import Session from '../models/Session';

//Imports for variables
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;
const TOKEN_END = require('../config/config').TOKEN_END;

// Function to login a user
export async function login(req, res) {
    const {
        email,
        nick,
        pass
    } = req.body;
    let roleName = '';
    let room;
    let ip = req.connection.remoteAddress.toString();
    let device = req.query.device || 'Web Application';
    let code;
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
        let codeDate = new Date();
        let month = codeDate.getMonth() + 1;
        code = codeDate.getDate().toString() + month.toString() + codeDate.getFullYear().toString() + loggedUser.userID

        const isLogged = await Session.findOne({
            attributes: ['sessionID', 'sessionDate', 'sessionDevice', 'sessionIP', 'userID'],
            where: {
                userID: loggedUser.userID
            }
        });

        if (isLogged) {
            return res.status(400).json({
                ok: false,
                message: 'User is already logged in since ' + isLogged.sessionDate + ' from ' + isLogged.sessionDevice
            });
        } else {
            Session.create({
                sessionRoom: room,
                sessionToken: token,
                sessionExpiration: TOKEN_END,
                sessionIP: ip,
                sessionDevice: device,
                sessionCode: code,
                userID: loggedUser.userID
            }, {
                fields: ['sessionRoom', 'sessionToken', 'sessionExpiration', 'sessionIP', 'sessionDevice', 'sessionCode', 'userID'],
                returning: ['sessionID', 'sessionRoom', 'sessionToken', 'sessionExpiration', 'sessionIP', 'sessionDevice', 'sessionCode', 'userID']
            });
        }
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

export async function logout(req, res) {
    const { userID } = req.params;
    try {
        const isLogged = await Session.findOne({
            attributes: ['sessionID', 'sessionRoom', 'sessionDate', 'sessionToken', 'sessionExpiration', 'sessionCode', 'sessionDevice', 'sessionIP', 'userID'],
            where: {
                userID
            }
        });
        if (isLogged) {
            const logout = await Session.destroy({
                where: {
                    userID
                }
            });
            if (logout > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'User logged out successfully'
                });
            }
        } else {
            return res.status(400).json({
                ok: false,
                message: 'User is not logged yet'
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Logout');
    }
}

// Function to renew a token to refresh the login
export async function tokenRenew(req, res) {

    let token = jwt.sign({ user: req.user }, SEED, { expiresIn: TOKEN_END });
    const { userID } = req.user;

    const userUpdate = Session.findOne({
        attributes: ['sessionID', 'sessionRoom', 'sessionDate', 'sessionToken', 'sessionExpiration', 'sessionCode', 'sessionDevice', 'sessionIP', 'userID'],
        where: {
            userID
        }
    });

    if (!userUpdate) {
        return res.status(400).json({
            ok: false,
            message: 'User not authenticated or session has ended, please login again'
        })
    } else {
        Session.update({
            sessionToken: token,
            sessionDate: sequelize.literal('CURRENT_TIMESTAMP')
        }, {
            where: {
                userID
            }
        });
    }

    return res.status(200).json({
        ok: true,
        token
    });
}