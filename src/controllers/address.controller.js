import Address from '../models/Address';
import City from '../models/City';
import Person from '../models/Person';
import sequelize from '../database/database';
import { returnError, returnNotFound } from './errors';

// Create a new Address
export async function createAddress(req, res) {
    const {
        addressName,
        mainStreet,
        number,
        secondStreet,
        references,
        zipCode,
        latitude,
        longitude,
        addressType,
        isFavourite,
        cityID,
        personID
    } = req.body;
    try {
        const newAddress = await Address.create({
            addressName,
            mainStreet,
            number,
            secondStreet,
            references,
            zipCode,
            latitude,
            longitude,
            addressType,
            isFavourite,
            cityID,
            personID
        }, {
            fields: ['addressName', 'mainStreet', 'number', 'secondStreet', 'references', 'zipCode', 'latitude', 'longitude', 'addressType', 'isFavourite', 'cityID', 'personID'],
            returning: ['addressID', 'addressName', 'mainStreet', 'number', 'secondStreet', 'references', 'zipCode', 'latitude', 'longitude', 'addressType', 'registeredDate', 'isActive', 'isFavourite', 'cityID', 'personID']
        });
        if (newAddress) {
            return res.status(200).json({
                ok: true,
                message: 'Address created successfully',
                address: newAddress
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Address');
    }
}

// Get all information of addresses whit pagination
export async function getAddresses(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const addresses = await Address.findAndCountAll({
            attributes: ['addressID', 'addressName', 'mainStreet', 'number', 'secondStreet', 'references', 'zipCode', 'latitude', 'longitude', 'addressType', 'registeredDate', 'unregisteredDate', 'isActive', 'isFavourite', 'cityID', 'personID'],
            where: {
                isActive: true
            },
            include: [{
                model: City,
                Person,
                attributes: ['cityName']
            }, {
                model: Person,
                attributes: ['names', 'lastNames']
            }],
            limit,
            offset: from
        });
        if (addresses.count > 0) {
            return res.status(200).json({
                ok: true,
                addresses
            });
        } else {
            returnNotFound(res, 'Any Address');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Addresses');
    }
}

/*
 */