import Country from '../models/Country';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';

// Create a new Country
export async function createCountry(req, res){
    const {
        countryCode,
        countryName,
        countryDetails,
        callCode,
        currency,
        currencySymbol,
        shortLanguage,
        longLanguage
     } = req.body;
     let status = 1;
     try{
        let newCountry = await Country.create({
            countryCode,
            countryName,
            countryDetails,
            callCode,
            currency,
            currencySymbol,
            longLanguage,
            shortLanguage,
            status
        }, {
            fields: [ 'countryCode', 'countryName', 'countryDetails', 'callCode', 'currency', 'currencySymbol', 'longLanguage', 'shortLanguage', 'status'],
            returning: ['countryID', 'countryCode', 'countryName', 'countryDetails', 'callCode', 'isActive', 'registeredDate', 'unregisteredDate', 'currency', 'currencySymbol', 'shortLanguage', 'longLanguage', 'status']
        });
        if(newCountry){
            return res.status(200).json({
                ok: true,
                message: 'Country created successfully',
                country: newCountry
            })          
        }
     }catch(e){
         console.log('Error:', e);
         returnError(res, e, 'Create Country');
     }
}

// Get all active countries
export async function getCountries(req, res){
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try{
        const countries = await Country.findAndCountAll({
            attributes: ['countryID', 'countryCode', 'countryName', 'countryDetails', 'isActive', 'registeredDate', 'unregisteredDate', 'currency', 'currencySymbol', 'shortLanguage', 'longLanguage', 'status'],
            order: [ 
                ['countryName', 'ASC'] 
            ], 
            where: {
                isActive: true
            },
            limit,
            offset: from
        });
        if(countries){
            return res.status(200).json({
                ok: true,
                countries
            });
        }
        else{
            returnNotFound(res, 'Any Country');
        }
    }catch(e){
        console.log('Error:', e);
        return res.status(500).json({ e });
    }
}

// Change to active or inactive to a country
export async function changeActivationCountry(req, res){
    const { countryID } = req.params;
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
            returnWrongError(res, 'type', 'request');
        }
    }
    try{
        const dbCountry = await Country.findOne({
            attributes: [ 'countryID', 'countryCode', 'countryName', 'isActive', 'registeredDate', 'unregisteredDate', 'shortLanguage'  ],
            where: {
                countryID
            }
        });
        if(dbCountry){
            const changeActivation = await Country.update(
                changeActivationJSON, {
                    where: {
                        countryID,
                        isActive: !value
                    }
                }
            );
            if(changeActivation > 0){
                return res.status(200).json({
                    ok: true,
                    message: 'Country ' + type.toLowerCase() + 'd successfully'
                });
            }else{
                return res.status(404).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Country or Country already ' + afirmation,
                    error: 'Error 0'
                });
            }
        }else{
            returnNotFound(res, 'Country ID');
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Country');
    }
}

// Update a country
export async function updateCountry(req, res){
    const { countryID } = req.params;
    const {
        countryCode,
        countryName,
        countryDetails,
        callCode,
        currency,
        currencySymbol,
        shortLanguage,
        longLanguage,
        status
    } = req.body;
    try{
        const dbCountry = await Country.findOne({
            attributes: [ 'countryID', 'countryName', 'countryCode', 'countryDetails', 'callCode', 'currency', 'currencySymbol', 'shortLanguage', 'longLanguage', 'status' ],
            where: {
                countryID
            }
        });
        if(dbCountry){
            const updateCountry = await Country.update({
                countryCode,
                countryName,
                countryDetails,
                callCode,
                currency,
                currencySymbol,
                shortLanguage,
                longLanguage,
                status
            }, {
                where: {
                    countryID
                }
            });
            if(updateCountry){
                return res.status(200).json({
                    ok: true,
                    message: 'Country updated successfully'
                });
            }else{
                returnNotFound(res, 'Country ID');
            }
        }else{
            returnNotFound(res, 'Country ID');
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Update Country');
    }
}

// Get information of a country by ID
export async function getCountry(req, res){
    const { countryID } = req.params;
    try{
        const country = await Country.findOne({
            attributes: ['countryID', 'countryCode', 'countryName', 'countryDetails', 'isActive', 'registeredDate', 'unregisteredDate', 'currency', 'currencySymbol', 'shortLanguage', 'longLanguage', 'status'],
            where: {
                countryID
            }
        });
        if(country){
            return res.status(200).json({
                ok: true,
                country
            });
        }
        else{
            returnNotFound(res, 'Country ID');
        }
    }catch(e){
        console.log('Error:', e);
        return res.status(500).json({ e });
    }
}

// Delete a country
export async function deleteCountry(req, res){
    const { countryID } = req.params;
    try{
        const countDeleted = await Country.destroy({
            where: {
                countryID
            }
        });
        if(countDeleted > 0){
            return res.status(200).json({
                ok: true,
                message: 'Country deleted successfully'
            });
        }else{
            returnNotFound(res, 'Country ID');
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Delete Country');
    }
}

/*
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
*/