import NoneModule from '../models/NoneModule';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';
import { nonesgaLog } from './log4js';
import { Op } from 'sequelize';

// Create a Module
export async function createModule(req, res) {
    const {
        name,
        description,
        privileges,
        user
    } = req.body;
    if (user === null || user === undefined) {
        return res.status(400).json({
            ok: true,
            message: 'User is required, please validate'
        });
    }
    try {
        const newModule = await NoneModule.create({
            name,
            description,
            privileges,
            updatedDate: sequelize.literal('CURRENT_TIMESTAMP'),
            updatedUser: user,
            updatedReason: 'Creation of module ' + name
        }, {
            fields: ['name', 'description', 'privileges', 'updatedDate', 'updatedUser', 'updatedReason'],
            returning: ['moduleID', 'name', 'description', 'privileges', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'updatedUser', 'updatedReason', 'parentID']
        });
        if (newModule) {
            return res.status(200).json({
                ok: true,
                message: 'Module created successfully',
                module: newModule
            });
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Error creating Module ' + e, 'error');
        returnError(res, e, 'Create Module');
    }
}

// Create a SubModule
export async function createSubModule(req, res) {
    const {
        name,
        description,
        privileges,
        parentID,
        user
    } = req.body;
    if (user === undefined || user === null) {
        return res.status(400).json({
            ok: false,
            message: 'User is required, please validate'
        });
    }
    if (parentID === undefined || parentID === null) {
        return res.status(400).json({
            ok: false,
            message: 'Parent Module is required, please validate'
        });
    }
    try {
        const newSubModule = await NoneModule.create({
            name,
            description,
            privileges,
            updatedDate: sequelize.literal('CURRENT_TIMESTAMP'),
            updatedUser: user,
            updatedReason: 'Creation of submodule ' + name,
            parentID
        }, {
            fields: ['name', 'description', 'privileges', 'updatedDate', 'updatedUser', 'updatedReason', 'parentID'],
            returning: ['moduleID', 'name', 'description', 'privileges', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'updatedUser', 'updatedReason', 'parentID']
        });
        if (newSubModule) {
            return res.status(200).json({
                ok: true,
                message: 'Submodule created successfully',
                submodule: newSubModule
            });
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Error Creating Submodule ' + e, 'error');
        returnError(res, e, 'Create Submodule');
    }
}

// Get all modules
export async function getModules(req, res) {
    const limit = req.params.limit || 25;
    const from = req.params.from || 0;
    try {
        const modules = await NoneModule.findAndCountAll({
            attributes: ['moduleID', 'name', 'description', 'privileges', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'updatedUser', 'updatedReason', 'parentID'],
            where: {
                parentID: null
            },
            limit,
            offset: from
        });
        if (modules.count > 0) {
            return res.status(200).json({
                ok: true,
                modules
            });
        } else {
            returnNotFound(res, 'Any Module');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Error getting Modules ' + e, 'error');
        returnError(res, e, 'Get all Modules');
    }
}

// Get all submodules
export async function getSubModules(req, res) {
    const limit = req.params.limit || 25;
    const from = req.params.from || 0;
    try {
        /*const submodules = await NoneModule.findAndCountAll({
            attributes: ['moduleID', 'name', 'description', 'privileges', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'updatedUser', 'updatedReason', 'parentID'],
            where: {
                parentID: {
                    [Op.ne]: null
                },
            },
            include: [{
                model: NoneModule,
                as: 'Module',
                attributes: ['moduleID', 'name', 'description']
            }],
            limit,
            offset: from
        });
        if (submodules.count > 0) {
            return res.status(200).json({
                ok: true,
                submodules
            });
        } else {
            returnNotFound(res, 'Any Submodule');
        }*/
        const total = await sequelize.query(`
            SELECT	count (*)
            FROM "noneModule" mo, "noneModule" sb
            WHERE mo."moduleID" = sb."moduleID"
            AND sb."parentID" IS NOT NULL
        `);
        let count = total[1].rows[0].count;
        if (count > 0) {
            const submodules = await sequelize.query(`
                SELECT	mo."moduleID" sbidentificator,
                        mo."name" submoduleName,
                        mo."description" submoduleDescription, 
                        mo."privileges" submodulePrivileges,
                        mo."isActive" active,
                        mo."registeredDate" registration,
                        mo."unregisteredDate" unregistration,
                        mo."updatedDate" dateUpdate,
                        mo."updatedUser" userUpdate,
                        mo."updatedReason" reasonUpdate,
                        mo."parentID" moduleIdentificator,
                        (SELECT mm."name" FROM "noneModule" mm WHERE mm."moduleID" = mo."parentID") moduleName,
                        (SELECT mm."description" FROM "noneModule" mm WHERE mm."moduleID" = mo."parentID") modDescription
                FROM "noneModule" mo, "noneModule" sb
                WHERE mo."moduleID" = sb."moduleID"
                AND sb."parentID" IS NOT NULL
                ORDER BY mo."moduleID"
                LIMIT ${ limit }
                OFFSET ${ from };
            `);
            if (submodules) {
                return res.status(200).json({
                    ok: true,
                    submodule: submodules[0]
                });
            } else {
                returnNotFound(res, 'Any Submodule');
            }
        } else {
            returnNotFound(res, 'Any Submodule');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Error getting Submodules ' + e, 'error');
        returnError(res, e, 'Get all Submodules');
    }
}

// Get Module by ID
export async function getModuleByID(req, res) {
    const { moduleID } = req.params;
    try {
        const module = await NoneModule.findOne({
            attributes: ['moduleID', 'name', 'description', 'privileges', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'updatedUser', 'updatedReason', 'parentID'],
            where: {
                parentID: null,
                moduleID
            }
        });
        if (module) {
            return res.status(200).json({
                ok: true,
                module
            });
        } else {
            returnNotFound(res, 'Module ID');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Error getting Module by ID: ' + e, 'error');
        returnError(res, e, 'Get Module by ID');
    }
}

// Get Submodule by ID
export async function getSubModuleByID(req, res) {
    const { submoduleID } = req.params;
    try {
        const submodule = await sequelize.query(`
            SELECT	mo."moduleID" sbidentificator,
                    mo."name" submoduleName,
                    mo."description" submoduleDescription, 
                    mo."privileges" submodulePrivileges,
                    mo."isActive" active,
                    mo."registeredDate" registration,
                    mo."unregisteredDate" unregistration,
                    mo."updatedDate" dateUpdate,
                    mo."updatedUser" userUpdate,
                    mo."updatedReason" reasonUpdate,
                    mo."parentID" moduleIdentificator,
                    (SELECT mm."name" FROM "noneModule" mm WHERE mm."moduleID" = mo."parentID") moduleName,
                    (SELECT mm."description" FROM "noneModule" mm WHERE mm."moduleID" = mo."parentID") modDescription
            FROM "noneModule" mo, "noneModule" sb
            WHERE mo."moduleID" = sb."moduleID"
            AND sb."parentID" IS NOT NULL
            AND sb."moduleID" = ${ submoduleID };
        `);
        if (submodule) {
            return res.status(200).json({
                ok: true,
                submodule: submodule[0]
            });
        } else {
            returnNotFound(res, 'Submodule ID');
        }
    } catch (e) {
        console.log('Error: ', e);
        nonesgaLog('Error while getting Submodule by ID ' + e, 'error');
        returnError(res, e, 'Get Submodule by ID');
    }
}

// Get all Submodules of a Module
export async function getSubmodulesOfModule(req, res) {
    const { moduleID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const total = await sequelize.query(`
            SELECT	count (*)
            FROM "noneModule" mo, "noneModule" sb, "user" us, "person" pr
            WHERE mo."moduleID" = sb."moduleID"
            AND mo."updatedUser" = us."userID"
            AND us."personID" = pr."personID"
            AND sb."parentID" IS NOT NULL
            AND sb."parentID" = ${ moduleID };
        `);
        let count = total[1].rows[0].count;
        if (count > 0) {
            const submodules = await sequelize.query(`
                SELECT	mo."moduleID" identificator,
                        mo."name" moduleName,
                        mo."description" moduleDescription, 
                        mo."privileges" modulePrivileges,
                        mo."isActive" active,
                        mo."registeredDate" registration,
                        mo."unregisteredDate" unregistration,
                        mo."updatedDate" dateUpdate,
                        mo."updatedUser" userUpdate,
                        mo."updatedReason" reasonUpdate,
                        mo."parentID" moduleIdentificator,
                        (SELECT mm."name" FROM "noneModule" mm WHERE mm."moduleID" = mo."parentID") submodule,
                        (SELECT mm."description" FROM "noneModule" mm WHERE mm."moduleID" = mo."parentID") sbdescription,
                        pr."completeName" userUpdate
                FROM "noneModule" mo, "noneModule" sb, "user" us, "person" pr
                WHERE mo."moduleID" = sb."moduleID"
                AND mo."updatedUser" = us."userID"
                AND us."personID" = pr."personID"
                AND sb."parentID" IS NOT NULL
                AND sb."parentID" = ${ moduleID }
                ORDER BY mo."moduleID"
                LIMIT ${ limit }
                OFFSET ${ from };
            `);
            if (submodules) {
                return res.status(200).json({
                    ok: true,
                    count,
                    submodules: submodules[0]
                });
            } else {
                returnNotFound(res, 'Module ID');
            }
        }
    } catch (e) {
        console.log('Error: ', e);
        nonesgaLog('Error getting Submodules of a Module: ' + e, 'error');
        returnError(res, e, 'Get Submodules of a Module');
    }
}

// Update a Module
export async function updateModule(req, res) {
    const { moduleID } = req.params;
    const {
        name,
        description,
        privileges,
        updatedReason
    } = req.body;
    let user = req.user.userID;
    if (updatedReason === undefined || updatedReason === null || updatedReason === '') {
        return res.status(400).json({
            ok: false,
            message: 'A reason for update is required, please validate'
        });
    }
    try {
        const dbModule = await NoneModule.findOne({
            attributes: ['moduleID', 'name', 'description', 'privileges', 'isActive', 'updatedDate', 'updatedUser', 'updatedReason'],
            where: {
                moduleID,
                parentID: null
            }
        });
        if (dbModule === undefined || dbModule === null) {
            returnNotFound(res, 'Module ID');
        } else {
            const updatedModule = await NoneModule.update({
                name,
                description,
                privileges,
                updatedDate: sequelize.literal('CURRENT_TIMESTAMP'),
                updatedUser: user,
                updatedReason,
                parentID: null
            }, {
                where: {
                    moduleID
                }
            });
            if (updatedModule) {
                return res.status(200).json({
                    ok: true,
                    message: 'Module updated successfully'
                });
            } else {
                returnNotFound(res, 'Module ID');
            }
        }
    } catch (e) {
        console.log('Error: ', e);
        nonesgaLog('Error updating Module: ' + e, 'error');
        returnError(res, e, 'Update Module');
    }
}

// Update a Submodule
export async function updateSubmodule(req, res) {
    const { submoduleID } = req.params;
    const {
        name,
        description,
        privileges,
        user,
        updatedReason,
        parentModule,
    } = req.body;
    if (user === undefined || user === null || user === '') {
        return res.status(400).json({
            ok: false,
            message: 'User is required, please validate'
        });
    }
    if (updatedReason === undefined || updatedReason === null || updatedReason === '') {
        return res.status(400).json({
            ok: false,
            message: 'A reason for update is required, please validate'
        });
    }
    try {
        const dbSubmodule = await NoneModule.findOne({
            attributes: ['moduleID', 'name', 'description', 'privileges', 'isActive', 'updatedDate', 'updatedUser', 'updatedReason', 'parentID'],
            where: {
                moduleID: submoduleID,
                parentID: {
                    [Op.ne]: null
                }
            }
        });
        if (dbSubmodule === undefined || dbSubmodule === null) {
            returnNotFound(res, 'Submodule ID');
        } else {
            let parent = dbSubmodule.parentID;
            let aditionalMessage = '';
            if (parseInt(parentModule) !== parent && parentModule !== undefined) {
                aditionalMessage = ' - Module changed ';
            }
            const updatedSubmodule = await NoneModule.update({
                name,
                description,
                privileges,
                updatedUser: user,
                updatedReason,
                updatedDate: sequelize.literal('CURRENT_TIMESTAMP'),
                parentID: parentModule
            }, {
                where: {
                    moduleID: submoduleID
                }
            });
            if (updatedSubmodule) {
                return res.status(200).json({
                    ok: true,
                    message: 'Submodule updated successfully' + aditionalMessage
                });
            } else {
                returnNotFound(res, 'Submodule ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Error while updating submodule: ' + e, 'error');
        returnError(res, e, 'Update Submodule');
    }

}

// Delete a module
export async function deleteModule(req, res) {
    const { moduleID } = req.params;
    try {
        const countDeleted = await NoneModule.destroy({
            where: {
                moduleID,
                parentID: null
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Module deleted successfully'
            });
        } else {
            returnNotFound(res, 'Module ID');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Error while deleting Module: ' + e, 'error');
        returnError(res, e, 'Delete Module');
    }
}

// Delete a submodule
export async function deleteSubmodule(req, res) {
    const { submoduleID } = req.params;
    try {
        const countDeleted = await NoneModule.destroy({
            where: {
                moduleID: submoduleID,
                parentID: {
                    [Op.ne]: null
                }
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Submodule deleted successfully'
            });
        } else {
            returnNotFound(res, 'Submodule ID');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Error while deleting Submodule: ' + e, 'error');
        returnError(res, e, 'Delete Submodule');
    }
}

// Change to inactive a Module or Submodule
export async function changeActivationModule(req, res) {
    const { moduleID } = req.params;
    const type = req.query.type;
    const user = req.query.user;
    let value;
    let action = '';
    let afirmation = '';
    let negation = '';
    let changeActivationJSON;
    if (user === undefined || user === '' || user === null) {
        return res.status(404).json({
            ok: false,
            message: 'User is required, please validate'
        });
    }
    if (type.toLowerCase() === 'activate') {
        value = true;
        action = 'Activating';
        afirmation = 'active';
        negation = 'inactive';
        changeActivationJSON = {
            isActive: true,
            unregisteredDate: null,
            updatedUser: user,
            updatedDate: sequelize.literal('CURRENT_TIMESTAMP')
        };
    } else {
        if (type.toLowerCase() === 'inactivate') {
            value = false;
            action = 'Inactivating';
            afirmation = 'inactive';
            negation = 'active';
            changeActivationJSON = {
                isActive: false,
                unregisteredDate: sequelize.literal('CURRENT_TIMESTAMP'),
                updatedUser: user,
                updatedDate: sequelize.literal('CURRENT_TIMESTAMP')
            };
        } else {
            returnWrongError(res, 'type', 'request');
        }
    }
    try {
        const dbModule = await NoneModule.findOne({
            attributes: ['moduleID', 'name', 'description', 'isActive', 'registeredDate', 'unregisteredDate', 'parentID'],
            where: {
                moduleID
            }
        });
        let parent = dbModule.parentID;
        console.log('parent', parent);
        let typeOfModule = '';
        if (parent === null || parent === undefined) {
            typeOfModule = 'Module';
        } else {
            typeOfModule = 'Submodule';
        }
        let reason = action + ' ' + typeOfModule;
        if (dbModule) {
            changeActivationJSON.updatedReason = reason;
            const changeActivation = await NoneModule.update(
                changeActivationJSON, {
                    where: {
                        moduleID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: typeOfModule + ' ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a ' + typeOfModule + ' or ' + typeOfModule + ' already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, typeOfModule + 'ID');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Error while changin activation:' + e, 'error');
        returnError(res, e, 'Change Activation Module or Submodule');
    }
}