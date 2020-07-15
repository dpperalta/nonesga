import User from '../models/User';
import { sequelize } from '../database/database';
import { returnError, returnNotFound } from './errors';
//import { bcrypt } from 'bcryptjs';
const bcrypt = require('bcryptjs');

export async function createDefaultUser(req, res) {
    const {
        email,
        pass,
        nick
    } = req.body;
    const salt = bcrypt.genSaltSync();
    let cryptoPass = bcrypt.hashSync(pass, salt);
    console.log('Pass', pass);
    console.log('CryptoPass:', cryptoPass);
    let roleID;
    let roleName;
    let roledb;
    try {
        const role = await sequelize.query(`
                    SELECT  r."roleID" identificador,
                            r."roleName" nombre
                    FROM role r
                    WHERE r."roleCode" = 'NONE006';        
        `);
        if (role) {
            roledb = role[0];
            roleID = roledb[0].identificador;
            roleName = roledb[0].nombre;
        } else {
            returnNotFound(res, 'Role ID');
        }
    } catch (e) {
        console.log('Error', e);
    }
    try {
        let newUser = await User.create({
            email,
            pass: cryptoPass,
            nick,
            status: 10,
            roleID
        }, {
            fields: ['email', 'nick', 'pass', 'isActive', 'status', 'registeredDate', 'roleID'],
            returning: ['userID', 'email', 'nick', 'pass', 'isActive', 'registeredDate', 'personID', 'collegeID']
        });
        if (newUser) {
            return res.status(200).json({
                ok: true,
                message: 'User created successfully',
                user: newUser
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Default User');
    }
}