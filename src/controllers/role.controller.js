import Role from '../models/Role';
import ErrorLog from '../models/ErrorLog';
import { sequelize } from '../database/database';

export async function createRole(req, res) {
    const {
        roleCode,
        roleName,
        privileges,
        description
    } = req.body;
    try {
        let newRole = await Role.create({
            roleCode,
            roleName,
            privileges,
            description
        }, {
            fields: ['roleCode', 'roleName', 'privileges', 'description'],
            returning: ['roleID', 'roleCode', 'roleName', 'privileges', 'description', 'isActive', 'registeredDate', 'unregisteredDate']
        });
        if (newRole) {
            return res.status(200).json({
                ok: true,
                message: 'Role created successfully',
                role: newRole
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'createRole');
        /*return res.status(500).json({
            ok: false,
            message: 'Internal Server Error',
            error: e//e.original.detail
        });*/
    }
}

export async function getRoles(req, res) {
    try {
        const roles = await Role.findAll({
            attributes: ['roleID', 'roleCode', 'roleName', 'description', 'privileges', 'isActive', 'registeredDate', 'unregisteredDate'],
            order: [
                ['roleID', 'ASC']
            ]
        });
        if (roles.length > 0) {
            return res.status(200).json({
                ok: true,
                roles
            });
        } else {
            return res.status(404).json({
                ok: false,
                message: 'Any role was founded',
                error: {
                    message: 'Could not find any role, contact to administrator'
                }
            });
        }
    } catch (e) {
        console.log('Error:', e);
        return res.status(500).json({
            ok: false,
            message: 'An Database error occurrs',
            error: e
        });
    }
}

export async function getActiveRolesWithCounter(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const roles = await Role.findAndCountAll({
            attributes: ['roleID', 'roleCode', 'roleName', 'description', 'isActive'],
            where: {
                'isActive': true
            },
            limit,
            offset: from
        });
        if (roles.count > 0) {
            return res.status(200).json({
                ok: true,
                roles
            });
        } else {
            returnNotFound(res, 'Active Role');
        }
    } catch (e) {
        console.log('Error: ', e);
        returnError(res, e);
    }
}

export async function getActiveRolesWitoutCounter(req, res) {
    try {
        const roles = await Role.findAll({
            attributes: ['roleID', 'roleCode', 'roleName', 'description', 'privileges', 'isActive', 'registeredDate', 'unregisteredDate'],
            where: {
                'isActive': true
            }
        });
        if (roles.length > 0) {
            return res.status(200).json({
                ok: true,
                roles
            });
        } else {
            return res.status(404).json({
                ok: false,
                message: 'Any active role finded',
                error: {
                    message: 'Could not find any active role, contact to administrator'
                }
            });
        }
    } catch (e) {
        console.log('Error: ', e);
        returnError(res, e);
        /*return res.status(500).json({
            ok: false,
            message: 'A Database error occurrs',
            error: e
        });*/
    }
}

export async function updateRole(req, res) {
    const { roleID } = req.params;
    const {
        roleCode,
        roleName,
        privileges,
        description,
        isActive,
        unregisteredDate
    } = req.body;
    console.log('roleID:', roleID);
    try {
        const role = await Role.findOne({
            attributes: ['roleCode', 'roleName', 'privileges', 'description', 'isActive', 'unregisteredDate'],
            where: {
                roleID
            },
            returning: ['roleID', 'roleCode', 'roleName', 'descirption', 'privileges', 'isActive', 'unregisteredDate']
        });
        if (role) {
            const updatedRole = await Role.update({
                roleCode,
                roleName,
                privileges,
                description,
                isActive,
                unregisteredDate
            }, {
                where: {
                    roleID
                }
            });
            if (updateRole) {
                return res.status(200).json({
                    ok: true,
                    message: 'Role updated successfully',
                    count: updatedRole
                });
            }
        } else {
            //No se ha encontrado el roleID
            returnNotFound(res, 'Role');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e);
        /*return res.status(500).json({
            ok: false,
            message: 'A Database error occurrs',
            error: e
        });*/
    }
}

export async function inactivateRole(req, res) {
    const { roleID } = req.params;
    const isActive = false;
    try {
        const role = await Role.findOne({
            attributes: ['roleCode', 'roleName', 'privileges', 'description', 'isActive', 'unregisteredDate'],
            where: {
                roleID
            },
            returning: ['roleID', 'roleCode', 'roleName', 'descirption', 'privileges', 'isActive', 'unregisteredDate']
        });
        if (role) {
            const inactivateRole = await Role.update({ isActive, unregisteredDate: sequelize.fn('NOW') }, {
                where: {
                    roleID
                }
            });
            console.log('result', inactivateRole);
            if (inactivateRole > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Role inactivated successfully'
                });
            } else {
                console.log('Error 0');
                return res.status(400).json({
                    ok: false,
                    message: 'Error while inactivating role'
                });
            }
        } else {
            returnNotFound(res, 'Active Role');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e);
    }
}

export async function activateRole(req, res) {
    const { roleID } = req.params;
    const isActive = true;
    try {
        const role = await Role.findOne({
            attributes: ['roleCode', 'roleName', 'privileges', 'description', 'isActive', 'unregisteredDate'],
            where: {
                roleID
            },
            returning: ['roleID', 'roleCode', 'roleName', 'descirption', 'privileges', 'isActive', 'unregisteredDate']
        });
        if (role) {
            const inactivateRole = await Role.update({ isActive, registeredDate: sequelize.fn('NOW') }, {
                where: {
                    roleID
                }
            });
            console.log('result', inactivateRole);
            if (inactivateRole > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Role activated successfully'
                });
            } else {
                console.log('Error 0');
                return res.status(400).json({
                    ok: false,
                    message: 'Error while activating role'
                });
            }
        } else {
            returnNotFound(res, 'Active Role');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e);
    }
}

export async function deleteRole(req, res) {
    const { roleID } = req.params;
    try {
        const countDeleted = await Role.destroy({
            where: {
                roleID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Role deleted successfully'
            });
        } else {
            returnNotFound(res, 'Role ID: ' + roleID + ',');
        }
    } catch (e) {
        console.log('Error', e);
        returnError(res, e);
    }
}

function returnError(res, e, module) {
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

function returnNotFound(res, value) {
    value = 'Could not find any ' + value + ' with this searching parameter(s)';
    return res.status(404).json({
        ok: false,
        message: value
    });
}