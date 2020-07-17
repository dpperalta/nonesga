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
                    WHERE r."roleName" = 'User';        
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
            returning: ['userID', 'email', 'nick', 'isActive', 'registeredDate', 'personID', 'collegeID']
        });
        if (newUser) {
            return res.status(200).json({
                ok: true,
                message: 'User created successfully',
                user: {
                    userID: newUser.userID,
                    email: newUser.email,
                    pass: 'passw0rd',
                    nick: newUser.nick,
                    isActive: newUser.isActive,
                    registeredDate: newUser.registeredDate
                }
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Default User');
    }
}

// Get information of all users
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
                users: users[0],
                count: users[1].rowCount
            });
        }else{
            return res.status(400).json({
                ok: false,
                message: 'Any user was founded please contact your administrator',
                error: '0'
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Users');
    }
}

// Get a user by an ID
export async function getUser(req, res){
    const { userID } = req.params;
    try{
        const user = await sequelize.query(`
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
                where "user"."userID" = ${userID};
        `);
        if(user){
            return res.status(200).json({
                ok: true,
                user: user[0]
            });
        }else{
            returnNotFound(res, 'User ID');
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Get User');
    }
}

// Update a User
export async function updateUser(req, res){
    const { userID } = req.params;
    const {
        nick,
        roleID,
        collegeID,
        personID,
        email,
        status
    } = req.body;
    try{
        const dbUser = await User.findOne({
            attributes: ['nick', 'email', 'isActive', 'status', 'registeredDate', 'roleID', 'collegeID', 'personID'],
            where: {
                userID
            }
        });
        if(dbUser){
            const updateUser = await User.update({
                nick,
                email,
                status,
                roleID,
                personID,
                collegeID
            }, {
                where: {
                    userID
                }
            });
            if(updateUser){
                return res.status(200).json({
                    ok: true,
                    message: 'User updated successfully'
                });
            }else{
                returnNotFound(res, 'User ID');
            }
        }else{
            returnNotFound(res, 'User ID');
        }
    }catch(e){
        console.log('Error:', e);
        return res.status(500).json({ e });
        //returnError(res, e, 'Update User');
    }
}

// Delete a user by ID
export async function deleteUser(req, res){
    const { userID } = req.params;
    try{
        const countDeleted = await User.destroy({
            where: {
                userID
            }
        });
        if(countDeleted > 0){
            return res.status(200).json({
                ok: true,
                message: 'User deleted successfully'
            });
        }else{
            returnNotFound(res, 'User ID');
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Delete User');
    }
}

// Change activate or inactivate a college
export async function changeActivationUser(req, res){
    const { userID } = req.params;
    const type = req.query.type;
    let value;
    let action = '';
    let afirmation = '';
    let negation = '';
    let changeActivationJSON;
    if(type.toLowerCase() === 'activate'){
        value = true;
        action = 'Activating';
        afirmation = 'active';
        negation = 'inactive';
        changeActivationJSON = {
            isActive: value,
            unregisteredDate: null
        };
    }else{
        if(type.toLowerCase() === 'inactivate'){
            value = false;
            action = 'Inactivating';
            afirmation = 'inactive';
            negation = 'active';
            changeActivationJSON = {
                isActive: value,
                unregisteredDate: sequelize.literal('CURRENT_TIMESTAMP')
            };
        }else{
            return res.status(400).json({
                ok: false,
                message: 'Wrong type for the request'
            });
        }
    }
    try{
        const dbUser = await User.findOne({
            attributes: ['userID', 'nick', 'email', 'isActive', 'unregisteredDate', 'registeredDate', 'status'],
            where: {
                userID
            }
        });
        if(dbUser){
            const changeActivation = await User.update(changeActivationJSON, {
                    where: {
                        userID,
                        isActive: !value
                    }
                }
            );
            if(changeActivation > 0){
                return res.status(200).json({
                    ok: true,
                    message: 'User ' + type.toLowerCase() + 'd successfully'
                });
            }else{
                return res.status(404).json({
                    ok: false,
                    message: 'Error while ' + action + ' a User or User already ' + afirmation,
                        error: 'Error 0'
                });
            }
        }else{
            returnNotFound(res, negation + ' User');
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Activating/Inactivating User');
    }
}

// Create an user from administration mode
export async function createUser(req, res){
    const {
        email,
        pass,
        nick,
        personID,
        collegeID,
        roleID
    } = req.body;
    const salt = bcrypt.genSaltSync();
    let cryptoPass = bcrypt.hashSync(pass, salt);
    try{
        let newUser = await User.create({
            email,
            nick,
            pass: cryptoPass,
            status: 1,
            personID,
            collegeID,
            roleID
        }, {
            fields: ['email', 'nick', 'pass', 'isActive', 'status', 'registeredDate', 'roleID', 'collegeID', 'personID'],
            returning: ['userID', 'email', 'nick', 'isActive', 'status', 'registeredDate', 'personID', 'collegeID', 'roleID']
        });
        if(newUser){
            return res.status(200).json({
                ok: true,
                message: 'User created successfully',
                user: {
                    userID: newUser.userID,
                    email: newUser.email,
                    pass: 'passw0rd',
                    nick: newUser.nick,
                    isActive: newUser.isActive,
                    status: newUser.status,
                    registeredDate: newUser.registeredDate,
                    roleID: newUser.roleID,
                    personID: newUser.personID,
                    collegeID: newUser.collegeID
                }
            });
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Create User from Admin');
    }
}