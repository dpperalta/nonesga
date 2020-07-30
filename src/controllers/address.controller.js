import Address from '../models/Address';
import City from '../models/City';
import Person from '../models/Person';
import { sequelize } from '../database/database';
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

// Get all the information of addresses whit pagination
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

// Get information of an address
export async function getAddress(req, res) {
    const { addressID } = req.params;
    try {
        const address = await Address.findOne({
            attributes: ['addressID', 'addressName', 'mainStreet', 'number', 'secondStreet', 'references', 'zipCode', 'latitude', 'longitude', 'isActive', 'registeredDate', 'unregisteredDate', 'isFavourite', 'cityID', 'personID'],
            where: {
                addressID
            },
            include: [{
                model: City,
                attributes: ['cityName']
            }, {
                model: Person,
                attributes: ['completeName']
            }]
        });
        if (address) {
            return res.status(200).json({
                ok: true,
                address
            });
        } else {
            returnNotFound(res, 'Address ID');
        }
    } catch (e) {
        console.log('Error', e);
        returnError(res, e, 'Get Address');
    }
}

//Get all the informationf of an address of a person
export async function getAddressPerson(req, res) {
    const { personID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const addresses = await Address.findAndCountAll({
            attributes: ['addressID', 'addressName', 'mainStreet', 'number', 'secondStreet', 'references', 'zipCode', 'latitude', 'longitude', 'isFavourite', 'cityID'],
            where: {
                isActive: true,
                personID
            },
            order: [
                ['isFavourite', 'DESC']
            ],
            include: [{
                model: Person,
                attributes: ['personID', 'completeName']
            }, {
                model: City,
                attributes: ['cityID', 'cityName']
            }],
            limit,
            offset: from
        });
        if (addresses) {
            return res.status(200).json({
                ok: true,
                addresses
            });
        } else {
            returnNotFound(res, 'Address ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Address of Person');
    }
}

// Update the information of an address
export async function updateAddress(req, res) {
    const { addressID } = req.params;
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
    } = req.body
    try {
        const dbAddress = await Address.findOne({
            attributes: ['addressID', 'addressName', 'mainStreet', 'number', 'secondStreet', 'references', 'zipCode', 'latitude', 'longitude', 'addressType', 'isFavourite', 'cityID', 'personID'],
            where: {
                addressID
            }
        });
        if (dbAddress === null || dbAddress === undefined) {
            returnNotFound(res, 'Address ID');
        } else {
            const updatedAddress = await Address.update({
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
                where: {
                    addressID
                }
            });
            if (isFavourite) {
                const favourite = await sequelize.query(`
                    update "address"
                        set "isFavourite" = false
                        where "personID" = ${ dbAddress.personID }
                            and "addressID" != ${ addressID };
                `);
                console.log(favourite);
            }
            if (updateAddress) {
                return res.status(200).json({
                    ok: true,
                    message: 'Address updated successfully'
                });
            } else {
                returnNotFound(res, 'Address ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Address');
    }
}

// Change activation status
export async function changeActivationAddress(req, res) {
    const { addressID } = req.params;
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
        const dbAddress = await Address.findOne({
            attributes: ['addressID', 'addressName', 'isActive', 'registeredDate', 'unregisteredDate'],
            where: {
                addressID
            }
        });
        if (dbAddress) {
            const changeActivation = await Address.update(
                changeActivationJSON, {
                    where: {
                        addressID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Address ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' an Address or Address already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Address ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Address');
    }
}

// Delete an address
export async function deleteAddress(req, res) {
    const { addressID } = req.params;
    try {
        const countDeleted = await Address.destroy({
            where: {
                addressID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Address deleted successfuylly'
            });
        } else {
            returnNotFound(res, 'Address ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Address');
    }
}