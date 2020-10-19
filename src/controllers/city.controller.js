import City from '../models/City';
import Canton from '../models/Canton';
import Province from '../models/Province';
import Country from '../models/Country';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';

// Create a new City
export async function createCity(req, res) {
    const {
        cityCode,
        cityName,
        cityDetail,
        cantonID
    } = req.body;
    try {
        let newCity = await City.create({
            cityCode,
            cityName,
            cityDetail,
            cantonID
        }, {
            fields: ['cityCode', 'cityName', 'cityDetail', 'cantonID'],
            returning: ['cityID', 'cityCode', 'cityName', 'cityDetail', 'isActive', 'registeredDate', 'unregisteredDate', 'cantonID']
        });
        if (newCity) {
            return res.status(200).json({
                ok: true,
                message: 'City created successfully',
                city: newCity
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create City');
    }
}

// Get information about Cities
export async function getCities(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const cities = await City.findAndCountAll({
            attributes: ['cityID', 'cityCode', 'cityName', 'cityDetail', 'isActive', 'registeredDate', 'cantonID'],
            where: {
                isActive: true
            },
            include: [{
                model: Canton,
                attributes: ['cantonID', 'cantonCode', 'cantonName', 'capital'],
                include: [{
                    model: Province,
                    attributes: ['provinceID', 'provinceCode', 'provinceName'],
                    include: [{
                        model: Country,
                        attributes: ['countryID', 'countryCode', 'countryName']
                    }]
                }]
            }],
            limit,
            offset: from
        });
        if (cities.count > 0) {
            return res.status(200).json({
                ok: true,
                cities
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Cities');
    }
}

// Get information of a city
export async function getCity(req, res) {
    const { cityID } = req.params;
    try {
        const city = await City.findOne({
            attributes: ['cityID', 'cityCode', 'cityName', 'cityDetail', 'isActive', 'registeredDate', 'unregisteredDate', 'cantonID'],
            where: {
                cityID
            },
            include: [{
                model: Canton,
                attributes: ['cantonID', 'cantonCode', 'cantonName', 'capital'],
                include: [{
                    model: Province,
                    attributes: ['provinceID', 'provinceCode', 'provinceName'],
                    include: [{
                        model: Country,
                        attributes: ['countryID', 'countryCode', 'countryName']
                    }]
                }]
            }]
        });
        if (city) {
            return res.status(200).json({
                ok: true,
                city
            });
        } else {
            returnNotFound(res, 'City ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get City by ID');
    }
}

// Update a city
export async function updateCity(req, res) {
    const { cityID } = req.params;
    const {
        cityCode,
        cityName,
        cityDetail,
        cantonID
    } = req.body;
    console.log('cityID: ', cityID);
    try {
        const dbCity = await City.findOne({
            attributes: ['cityID', 'cityCode', 'cityName', 'cityDetail', 'isActive', 'registeredDate', 'unregisteredDate', 'cantonID'],
            where: {
                cityID
            }
        });

        if (dbCity === null || dbCity === undefined) {
            returnNotFound(res, 'City ID');
        } else {
            const updateCity = await City.update({
                cityCode,
                cityName,
                cityDetail,
                cantonID
            }, {
                where: {
                    cityID
                }
            });
            if (updateCity) {
                return res.status(200).json({
                    ok: true,
                    message: 'City updated successfully'
                });
            } else {
                returnNotFound(res, 'CityID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update City');
    }
}

// Change to active or inactive a city
export async function changeActivationCity(req, res) {
    const { cityID } = req.params;
    const type = req.query.type;
    let value;
    let action = '';
    let afirmation = '';
    let negation = '';
    let changeActivationJSON;
    if (type.toLowerCase() === 'activate') {
        value = true;
        action = 'Activating';
        afirmation = 'active';
        negation = 'inactive';
        changeActivationJSON = {
            isActive: true,
            unregisteredDate: null
        };
    } else {
        if (type.toLowerCase() === 'inactivate') {
            value = false;
            action = 'Inactivating';
            afirmation = 'inactive';
            negation = 'active';
            changeActivationJSON = {
                isActive: false,
                unregisteredDate: sequelize.literal('CURRENT_TIMESTAMP')
            };
        } else {
            returnWrongError(res, 'type', 'request');
        }
    }
    try {
        const dbCity = await City.findOne({
            attributes: ['cityID', 'cityCode', 'cityName', 'isActive', 'registeredDate'],
            where: {
                cityID
            }
        });
        if (dbCity) {
            const changeActivation = await City.update(
                changeActivationJSON, {
                    where: {
                        cityID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'City ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a City or City already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'City ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation City');
    }
}

// Delete a city
export async function deleteCity(req, res) {
    const { cityID } = req.params;
    try {
        const countDeleted = await City.destroy({
            where: {
                cityID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'City deleted successfuylly'
            });
        } else {
            returnNotFound(res, 'City ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete City');
    }
}

// Get all cities of a Canton
export async function getCitiesCanton(req, res) {
    const { cantonID } = req.params;
    //const limit = req.query.limit || 25;
    //const from = req.query.from || 0;
    try {
        const cities = await City.findAndCountAll({
            attributes: ['cityID', 'cityCode', 'cityName'],
            where: {
                isActive: true,
                cantonID
            },
            include: [{
                model: Canton,
                attributes: ['cantonID', 'cantonCode', 'cantonName', 'capital'],
                include: [{
                    model: Province,
                    attributes: ['provinceID', 'provinceCode', 'provinceName'],
                    include: [{
                        model: Country,
                        attributes: ['countryID', 'countryCode', 'countryName']
                    }]
                }]
            }]
        });
        if (cities) {
            return res.status(200).json({
                ok: true,
                cities
            })
        } else {
            returnNotFound(res, 'Canton ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Cities of Canton');
    }
}