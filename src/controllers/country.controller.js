import Country from '../models/Country';
import { sequelize } from '../database/database';
import { returnError, returnNotFound } from './errors';

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
            orderd: [ 'countryName', 'ASC' ], 
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
/*
export async function getColleges(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const colleges = await College.findAndCountAll({
            attributes: ['collegeID', 'collegeName', 'collegeShowName', 'collegeCode', 'detail', 'flag', 'mainColour', 'secondaryColour',
                'status', 'isActive', 'image', 'logo', 'description', 'registratedDate', 'unregistratedDate', 'lastChangeDate', 'changeDetail', 'lastChangeUser'
            ],
            limit,
            offset: from
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