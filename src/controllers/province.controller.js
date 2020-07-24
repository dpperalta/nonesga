import Province from '../models/Province';
import Country from '../models/Country';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';

// Create a new Province
export async function createProvince(req, res) {
    const {
        provinceCode,
        provinceName,
        details,
        countryID
    } = req.body;
    try {
        let newProvince = await Province.create({
            provinceCode,
            provinceName,
            details,
            countryID
        }, {
            fields: ['provinceCode', 'provinceName', 'details', 'countryID'],
            returning: ['provinceID', 'provinceCode', 'provinceName', 'details', 'isActive', 'registeredDate', 'unregisteredDate', 'countryID']
        });
        if (newProvince) {
            return res.status(200).json({
                ok: true,
                message: 'Province created successfully',
                province: newProvince
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Province');
    }
}

// Get information about provinces
export async function getProvinces(req, res){
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try{
        const provinces = await Province.findAndCountAll({
            attributes: ['provinceID', 'provinceCode', 'provinceName', 'details', 'isActive', 'registeredDate', 'countryID'],
            where: {
                isActive: true
            }, 
            include: [{
                model: Country,
                attributes: ['countryID', 'countryCode', 'countryName']
            }],
            limit,
            offset: from
        });
        if(provinces.count > 0){
            return res.status(200).json({
                ok: true,
                provinces
            });
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Get Provinces');
    }
}

// Get information of a province
export async function getProvince(req, res){
    const { provinceID } = req.params;
    try{
        const province = await Province.findOne({
            attributes: [ 'provinceID', 'provinceCode', 'provinceName', 'details', 'isActive', 'registeredDate', 'unregisteredDate', 'countryID' ],
            where: {
                provinceID
            },
            include: [{
                model: Country,
                attributes: ['countryCode', 'countryName']
            }]
        });
        if(province){
            return res.status(200).json({
                ok: true,
                province
            });
        }else{
            returnNotFound(res, 'Province ID');
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Get Province by ID');
    }
}

// Update a province
export async function updateProvince(req, res){
    const { provinceID } = req.params;
    const {
        provinceCode,
        provinceName,
        details,
        countryID
    } = req.body;
    try{
        const dbProvince = await Province.findOne({
            attributes: [ 'provinceID', 'provinceCode', 'provinceName', 'details', 'isActive', 'registeredDate', 'unregisteredDate', 'countryID' ],
            where: {
                provinceID
            }
        });
        if(dbProvince === null || dbProvince === undefined){
            returnNotFound(res, 'Province ID');
        }else{
            const updateProvince = await Province.update({
                provinceCode,
                provinceName,
                details,
                countryID
            }, {
                where: {
                    provinceID
                }   
            });
            if(updateProvince){
                return res.status(200).json({
                    ok: true,
                    message: 'Province updated successfully'
                });
            }else{
                returnNotFound(res, 'ProvinceID');
            }
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Update Province');
    }
}

// Change to active or inactive a province
export async function changeActivationProvince(req, res){
    const { provinceID } = req.params;
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
            isActive: true,
            unregisteredDate: null
        };
    }else{
        if(type.toLowerCase() === 'inactivate'){
            value = false;
            action = 'Inactivating';
            afirmation = 'inactive';
            negation = 'active';
            changeActivationJSON = {
                isActive: false,
                unregisteredDate: sequelize.literal('CURRENT_TIMESTAMP')
            };
        }else{
            returnWrongError(res, 'type', 'request');
        }
    }
    try{
        const dbProvince = await Province.findOne({
            attributes: ['provinceID', 'provinceCode', 'provinceName', 'isActive', 'registeredDate'],
            where: {
                provinceID
            }
        });
        if(dbProvince){
            const changeActivation = await Province.update(
                changeActivationJSON, {
                    where: {
                        provinceID,
                        isActive: !value
                    }
                }
            );
            if(changeActivation > 0){
                return res.status(200).json({
                    ok: true,
                    message: 'Province ' + type.toLowerCase() + 'd successfully'
                });
            }else{
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Province or Province already ' + afirmation,
                    error: 'Error 0'
                });
            }
        }else{
            returnNotFound(res, 'Province ID');
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Province');
    }
}

// Delete a province
export async function deleteProvince(req, res){
    const { provinceID } = req.params;
    try{
        const countDeleted = await Province.destroy({
            where: {
                provinceID
            }
        });
        if(countDeleted > 0){
            return res.status(200).json({
                ok: true,
                message: 'Province deleted successfuylly'
            });
        }else{
            returnNotFound(res, 'Province ID');
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Delete Province');
    }
}

// Get all provinces of a country
export async function getProvincesCountry(req, res){
    const { countryID } = req.params;
    //const limit = req.query.limit || 25;
    //const from = req.query.from || 0;
    try{
        const provinces = await Province.findAndCountAll({
            attributes: ['provinceID', 'provinceCode', 'provinceName'],
            where: {
                isActive: true,
                countryID
            },
            include: [{
                model: Country,
                attributes: [ 'countryID', 'countryName' ]
            }]//,
            //limit,
            //offset: from
        });
        if(provinces){
            return res.status(200).json({
                ok: true,
                provinces
            })
        }else{
            returnNotFound(res, 'Country ID');
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Get Provinces of Contry');
    }
}