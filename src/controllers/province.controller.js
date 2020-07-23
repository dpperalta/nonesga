import Province from '../models/Province';
import { sequelize } from '../database/database';
import { returnError, returnNotFound } from './errors';

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

/*
import Country from '../models/Country';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';

// Create a new Country
export async function createCountry(req, res) {
    
        if (newCountry) {
            return res.status(200).json({
                ok: true,
                message: 'Country created successfully',
                country: newCountry
            })
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Country');
    }
}
*/