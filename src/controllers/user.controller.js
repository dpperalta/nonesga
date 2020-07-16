import User from '../models/User';
import { sequelize } from '../database/database';
import { returnError, returnNotFound } from './errors';
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

// Get information of an user
export async function getUsers(req, res) {
    try {
        const users = await sequelize.query(`
                    select 	"user"."userID" identificador,
                    "user"."nick" nick,
                    "user"."email" correo,
                    "user"."registeredDate" alta,
                    case when "user"."status" = 0 then 'Demo'
                        when "user"."status" = 1 then 'Activo'
                        when "user"."status" = 2 then 'Activo con solicitud de pago'
                        when "user"."status" = 3 then 'Activo con pago verificado'
                        when "user"."status" = 4 then 'Activo con pago retrasado'
                        when "user"."status" = 5 then 'Activo con pago retrasado verificado'
                        when "user"."status" = 6 then 'Activo sin acceso por pago'
                        when "user"."status" = 7 then 'Activo sin acceso por prohibición'
                        when "user"."status" = 8 then 'Accesso prohibido'
                        when "user"."status" = 9 then 'Acceso restringido'
                        when "user"."status" = 10 then 'Necesita Verificación ADM'
                    end status,
                    "user"."unregisteredDate" baja,
                    "user"."lastLogin" ultimoLogin,
                    "user"."isActive",
                    "person"."completeName" nombre,
                    "role"."roleName" rol,
                    "college"."collegeShowName" colegio
            from "user"
            left join "role"  on "user"."roleID" = "role"."roleID"
            left join "person" on "user"."personID" = "person"."personID"
            left join "college" on "user"."collegeID" = "college"."collegeID"
                where "user"."isActive" = true;
        `);
        if (users) {
            return res.status(200).json({
                ok: true,
                users: users[0]
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Users');
    }
}

/*
export async function getColleges(req, res) {
    try {
        const colleges = await College.findAndCountAll({
            attributes: ['collegeID', 'collegeName', 'collegeShowName', 'collegeCode', 'detail', 'flag', 'mainColour', 'secondaryColour',
                'status', 'isActive', 'image', 'logo', 'description', 'registratedDate', 'unregistratedDate', 'lastChangeDate', 'changeDetail', 'lastChangeUser'
            ]
        });
        if (colleges.count > 0) {
            return res.status(200).json({
                ok: true,
                colleges
            })
        } else {
            returnNotFound(res, 'All Colleges');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Colleges');
    }
}
*/