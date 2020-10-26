import Holiday from '../models/Holiday';
import Country from '../models/Country';
import Province from '../models/Province';
import Canton from '../models/Canton';
import City from '../models/City';
import { returnError, returnNotFound, returnWrongError } from './errors';
import { sequelize } from '../database/database';

// Create a new Holiday
export async function createHoliday(req, res) {
    const {
        name,
        date,
        details,
        isNational,
        isOptional,
        isReprogramed,
        reprogramedDate,
        countryID,
        provinceID,
        cantonID,
        cityID
    } = req.body;
    let country;
    let province;
    let canton;
    let city;
    let newHolidayDate;
    if (isNational === true) {
        country = countryID;
        province = null;
        canton = null;
        city = null;
    } else {
        country = countryID;
        province = provinceID;
        canton = cantonID;
        city = cityID;
    }
    if (isReprogramed === true) {
        if (reprogramedDate === undefined || reprogramedDate === null) {
            return res.status(200).json({
                ok: false,
                message: 'Important field required - Reprogramed Date'
            });
        } else {
            newHolidayDate = reprogramedDate;
        }
    } else {
        newHolidayDate = null;
    }
    try {
        let newHoliday = await Holiday.create({
            name,
            date,
            details,
            isNational,
            isOptional,
            isReprogramed,
            reprogramedDate: newHolidayDate,
            countryID: country,
            provinceID: province,
            cantonID: canton,
            cityID: city
        }, {
            fields: ['name', 'date', 'details', 'isNational', 'isOptional', 'isReprogramed', 'reprogramedDate', 'countryID', 'provinceID', 'cantonID', 'cityID'],
            returning: ['holidayID', 'name', 'date', 'details', 'registeredDate', 'unregisteredDate', 'isActive', 'isOptional', 'isReprogramed', 'reprogramedDate', 'countryID', 'provinceID', 'cantonID', 'cityID']
        });
        if (newHoliday) {
            return res.status(200).json({
                ok: true,
                message: 'Holiday created successfully',
                holiday: newHoliday
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Holiday');
    }
}

// Get all Holidays
export async function getHolidays(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const holidays = await Holiday.findAndCountAll({
            attributes: ['holidayID', 'name', 'details', 'date', 'registeredDate', 'unregisteredDate', 'isActive', 'isNational', 'isOptional', 'isReprogramed', 'reprogramedDate', 'countryID', 'provinceID', 'cantonID', 'cityID'],
            include: [{
                model: Country,
                attributes: ['countryID', 'countryCode', 'countryName']
            }, {
                model: Province,
                attributes: ['provinceID', 'provinceCode', 'provinceName']
            }, {
                model: Canton,
                attributes: ['cantonID', 'cantonCode', 'cantonName', 'capital']
            }, {
                model: City,
                attributes: ['cityID', 'cityCode', 'cityName']
            }],
            limit,
            offset: from
        });
        if (holidays.count > 0) {
            return res.status(200).json({
                ok: true,
                holidays
            });
        } else {
            returnNotFound(res, 'Any Holiday');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get all Holidays');
    }
}

// Get a Holiday by ID
export async function getHoliday(req, res) {
    const { holidayID } = req.params;
    try {
        const holiday = await Holiday.findOne({
            attributes: ['holidayID', 'name', 'details', 'date', 'registeredDate', 'unregisteredDate', 'isActive', 'isNational', 'isOptional', 'isReprogramed', 'reprogramedDate', 'countryID', 'provinceID', 'cantonID', 'cityID'],
            where: {
                holidayID
            },
            include: [{
                model: Country,
                attributes: ['countryID', 'countryCode', 'countryName']
            }, {
                model: Province,
                attributes: ['provinceID', 'provinceCode', 'provinceName']
            }, {
                model: Canton,
                attributes: ['cantonID', 'cantonCode', 'cantonName', 'capital']
            }, {
                model: City,
                attributes: ['cityID', 'cityCode', 'cityName']
            }]
        });
        if (holiday) {
            return res.status(200).json({
                ok: true,
                holiday
            })
        } else {
            returnNotFound(res, 'Holiday ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get a Holiday by ID')
    }
}

// Get all Holidays by name
export async function searchHolidayByNameOrDetail(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const name = req.query.name;
    const details = req.query.details;
    const active = req.query.active;
    let queryString = '';
    let activeQuery;
    if (active === undefined || active === null) {
        activeQuery = '';
    } else {
        activeQuery = `AND ho."isActive" = ${ active }`
    }
    if (name === undefined && details === undefined) {
        return res.status(400).json({
            ok: false,
            message: 'Name or Details for search are required'
        });
    }
    if (name !== undefined || details !== undefined) {
        console.log(name, ' || ', details);
        if (name !== undefined && details !== undefined) {
            queryString = `WHERE (LOWER(ho."name") LIKE LOWER('%${ name.trim() }%') OR LOWER(ho."details") LIKE LOWER('%${ details.trim() }%'))`;
        } else {
            if (name !== undefined) {
                queryString = `WHERE LOWER(ho."name") LIKE LOWER('%${ name.trim() }%')`;
            } else {
                queryString = `WHERE LOWER(ho."details") LIKE LOWER('%${ details.trim() }%')`;
            }
        }
    }

    try {
        const counter = await sequelize.query(`
            SELECT	COUNT (*)
            FROM  "holiday" ho
                INNER JOIN "country" co ON co."countryID" = ho."countryID"
                LEFT OUTER JOIN "province" pr ON pr."provinceID" = ho."provinceID"
                LEFT OUTER JOIN "canton" ca ON ca."cantonID" = ho."cantonID"
                LEFT OUTER JOIN "city" ci ON ci."cityID" = ho."cityID"
                ${ queryString }
                ${ activeQuery }     
        `);
        let total = counter[1].rows[0].count;
        if (total > 0) {
            const holidays = await sequelize.query(`
                SELECT 	ho."holidayID" identificator,
                        ho."name" holidayName,
                        ho."date" holidayDate,
                        ho."details" holidayDetails,
                        ho."registeredDate" registration,
                        ho."unregisteredDate" unregistration,
                        ho."isActive" active,
                        ho."isNational" nationalHoliday,
                        ho."isOptional" optional,
                        ho."isReprogramed" reprogramed,
                        ho."reprogramedDate" reprogramedDate,
                        co."countryID" country,
                        co."countryCode" codeCountry,
                        co."countryName" nameCountry,
                        pr."provinceID" province,
                        pr."provinceCode" codeProvince,
                        pr."provinceName" nameProvince,
                        ca."cantonID" canton,
                        ca."cantonCode" codeCanton,
                        ca."cantonName" nameCanton,
                        ca."capital" capitalCanton,
                        ci."cityID" city,
                        ci."cityCode" codeCity,
                        ci."cityName" nameCity
                FROM  "holiday" ho
                INNER JOIN "country" co ON co."countryID" = ho."countryID"
                LEFT OUTER JOIN "province" pr ON pr."provinceID" = ho."provinceID"
                LEFT OUTER JOIN "canton" ca ON ca."cantonID" = ho."cantonID"
                LEFT OUTER JOIN "city" ci ON ci."cityID" = ho."cityID"
                ${ queryString }
                ${ activeQuery }
                ORDER BY ho."date"
                LIMIT ${ limit }
                OFFSET ${ from }
            `);
            if (holidays) {
                return res.status(200).json({
                    ok: true,
                    holidays: holidays[0],
                    count: total
                })
            } else {
                returnNotFound(res, 'Holiday');
            }
        } else {
            returnNotFound(res, 'Holiday');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Holiday by name');
    }
}

// Get all Holidays by location
export async function searchHolidayByLocation(req, res) {
    const country = req.query.country;
    const province = req.query.province;
    const canton = req.query.canton;
    const city = req.query.city;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const active = req.query.active;
    let queryString = '';
    let queryActive;

    active ? queryActive = `AND ho."isActive" = ${ active }` : queryActive = '';

    if (country !== undefined) {
        queryString = `WHERE LOWER(co."countryName") LIKE LOWER('%${ country.trim() }%')`
        if (province !== undefined) {
            queryString = queryString + ` AND LOWER(pr."provinceName") LIKE LOWER('%${ province.trim() }%')`;
        }
        if (canton !== undefined) {
            queryString = queryString + ` AND LOWER(ca."cantonName") LIKE LOWER('%${ canton.trim() }%')`;
        }
        if (city !== undefined) {
            queryString = queryString + ` AND LOWER(ci."cityName") LIKE LOWER('%${ city.trim() }%')`;
        }
    } else {
        return res.status(400).json({
            ok: false,
            message: 'Required values not found - Country'
        });
    }
    console.log('QueryString', queryString);
    try {
        const counter = await sequelize.query(`
            SELECT	COUNT (*)
            FROM  "holiday" ho
                INNER JOIN "country" co ON co."countryID" = ho."countryID"
                LEFT OUTER JOIN "province" pr ON pr."provinceID" = ho."provinceID"
                LEFT OUTER JOIN "canton" ca ON ca."cantonID" = ho."cantonID"
                LEFT OUTER JOIN "city" ci ON ci."cityID" = ho."cityID"
                ${ queryString }
                ${ queryActive }     
        `);
        let total = counter[1].rows[0].count;

        if (total > 0) {
            const holidays = await sequelize.query(`
                SELECT 	ho."holidayID" identificator,
                        ho."name" holidayName,
                        ho."date" holidayDate,
                        ho."details" holidayDetails,
                        ho."registeredDate" registration,
                        ho."unregisteredDate" unregistration,
                        ho."isActive" active,
                        ho."isNational" nationalHoliday,
                        ho."isOptional" optional,
                        ho."isReprogramed" reprogramed,
                        ho."reprogramedDate" reprogramedDate,
                        co."countryID" country,
                        co."countryCode" codeCountry,
                        co."countryName" nameCountry,
                        pr."provinceID" province,
                        pr."provinceCode" codeProvince,
                        pr."provinceName" nameProvince,
                        ca."cantonID" canton,
                        ca."cantonCode" codeCanton,
                        ca."cantonName" nameCanton,
                        ca."capital" capitalCanton,
                        ci."cityID" city,
                        ci."cityCode" codeCity,
                        ci."cityName" nameCity
                FROM  "holiday" ho
                INNER JOIN "country" co ON co."countryID" = ho."countryID"
                LEFT OUTER JOIN "province" pr ON pr."provinceID" = ho."provinceID"
                LEFT OUTER JOIN "canton" ca ON ca."cantonID" = ho."cantonID"
                LEFT OUTER JOIN "city" ci ON ci."cityID" = ho."cityID"
                ${ queryString }
                ${ queryActive }
                ORDER BY ho."date"
                LIMIT ${ limit }
                OFFSET ${ from }
            `);
            if (holidays) {
                return res.status(200).json({
                    ok: true,
                    holidays: holidays[0],
                    count: total
                })
            } else {
                returnNotFound(res, 'Holiday');
            }
        } else {
            returnNotFound(res, 'Holiday');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Holiday by Location');
    }
}

// Get all Holidays by date (format date yyyy-mm-dd -> year-month-day)
export async function searchHolidayByDate(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const firstDate = req.query.firstDate;
    const secondDate = req.query.secondDate;
    const active = req.query.active;
    const national = req.query.national;
    let queryString = '';
    let queryActive;
    let queryNational;
    active ? queryActive = `AND ho."isActive" = ${ active }` : queryActive = '';
    national ? queryNational = `AND ho."isNational" = ${ national } ` : queryNational = '';

    if (firstDate === undefined && secondDate === undefined) {
        return res.status(400).json({
            ok: false,
            message: 'At least one date is required to search a Holiday'
        });
    }
    if (firstDate !== undefined || secondDate !== undefined) {
        if (firstDate !== undefined && secondDate !== undefined) {
            queryString = `WHERE ho."date" BETWEEN to_date('${ firstDate }', 'yyyy-mm-dd') AND to_date('${ secondDate }', 'yyyy-mm-dd')`;
        } else {
            queryString = `WHERE ho."date" = to_date('${ firstDate }', 'yyyy-mm-dd')`;
        }
    }

    try {
        const counter = await sequelize.query(`
            SELECT	COUNT (*)
            FROM  "holiday" ho
                INNER JOIN "country" co ON co."countryID" = ho."countryID"
                LEFT OUTER JOIN "province" pr ON pr."provinceID" = ho."provinceID"
                LEFT OUTER JOIN "canton" ca ON ca."cantonID" = ho."cantonID"
                LEFT OUTER JOIN "city" ci ON ci."cityID" = ho."cityID"
                ${ queryString }
                ${ queryNational }
                ${ queryActive }
        `);
        let total = counter[1].rows[0].count;
        if (total > 0) {
            const holidays = await sequelize.query(`
                SELECT 	ho."holidayID" identificator,
                        ho."name" holidayName,
                        ho."date" holidayDate,
                        ho."details" holidayDetails,
                        ho."registeredDate" registration,
                        ho."unregisteredDate" unregistration,
                        ho."isActive" active,
                        ho."isNational" nationalHoliday,
                        ho."isOptional" optional,
                        ho."isReprogramed" reprogramed,
                        ho."reprogramedDate" reprogramedDate,
                        co."countryID" country,
                        co."countryCode" codeCountry,
                        co."countryName" nameCountry,
                        pr."provinceID" province,
                        pr."provinceCode" codeProvince,
                        pr."provinceName" nameProvince,
                        ca."cantonID" canton,
                        ca."cantonCode" codeCanton,
                        ca."cantonName" nameCanton,
                        ca."capital" capitalCanton,
                        ci."cityID" city,
                        ci."cityCode" codeCity,
                        ci."cityName" nameCity
                FROM  "holiday" ho
                INNER JOIN "country" co ON co."countryID" = ho."countryID"
                LEFT OUTER JOIN "province" pr ON pr."provinceID" = ho."provinceID"
                LEFT OUTER JOIN "canton" ca ON ca."cantonID" = ho."cantonID"
                LEFT OUTER JOIN "city" ci ON ci."cityID" = ho."cityID"
                ${ queryString }
                ${ queryNational }
                ${ queryActive }
                ORDER BY ho."date"
                LIMIT ${ limit }
                OFFSET ${ from }
            `);
            if (holidays) {
                return res.status(200).json({
                    ok: true,
                    holidays: holidays[0],
                    count: total
                })
            } else {
                console.log(queryString);
                returnNotFound(res, 'Holiday');
            }
        } else {
            console.log('query 2:', queryString);
            returnNotFound(res, 'Holiday');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Holiday by name');
    }
}

// Get all national or local Holidays
export async function getNationalHolidays(req, res) {
    const { countryID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const national = req.query.national || true;
    try {
        const holidays = await Holiday.findAndCountAll({
            attributes: ['holidayID', 'name', 'details', 'date', 'registeredDate', 'unregisteredDate', 'isActive', 'isNational', 'isOptional', 'isReprogramed', 'reprogramedDate', 'countryID', 'provinceID', 'cantonID', 'cityID'],
            where: {
                countryID,
                isNational: national
            },
            include: [{
                model: Country,
                attributes: ['countryID', 'countryCode', 'countryName']
            }, {
                model: Province,
                attributes: ['provinceID', 'provinceCode', 'provinceName']
            }, {
                model: Canton,
                attributes: ['cantonID', 'cantonCode', 'cantonName', 'capital']
            }, {
                model: City,
                attributes: ['cityID', 'cityCode', 'cityName']
            }],
            limit,
            offset: from
        });
        if (holidays.count > 0) {
            return res.status(200).json({
                ok: true,
                holidays
            });
        } else {
            returnNotFound(res, 'Country ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get all Holidays by Country');
    }
}

// Update a Holiday
export async function updateHoliday(req, res) {
    const { holidayID } = req.params;
    const {
        name,
        details,
        date,
        isNational,
        isOptional,
        isReprogramed,
        reprogramedDate,
        countryID,
        provinceID,
        cantonID,
        cityID
    } = req.body;
    try {
        const dbHoliday = await Holiday.findOne({
            attributes: ['holidayID', 'name', 'details', 'date'],
            where: {
                holidayID
            }
        });
        console.log('response:', dbHoliday);
        if (dbHoliday === null || dbHoliday === undefined) {
            returnNotFound(res, 'Holiday ID');
        } else {
            const updatedHoliday = await Holiday.update({
                name,
                details,
                date,
                isNational,
                isOptional,
                isReprogramed,
                reprogramedDate,
                countryID,
                provinceID,
                cantonID,
                cityID
            }, {
                where: {
                    holidayID
                }
            });
            if (updatedHoliday) {
                return res.status(200).json({
                    ok: true,
                    message: 'Holiday updated successfully'
                });
            } else {
                returnNotFound(res, 'Holiday ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update a Holiday');
    }
}

// Change to active or inactive a Holiday
export async function changeActivationHoliday(req, res) {
    const { holidayID } = req.params;
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
        const dbHoliday = await Holiday.findOne({
            attributes: ['holidayID', 'name', 'details', 'date', 'isActive', 'registeredDate', 'unregisteredDate'],
            where: {
                holidayID
            }
        });
        if (dbHoliday) {
            const changeActivation = await Holiday.update(
                changeActivationJSON, {
                    where: {
                        holidayID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Holiday ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Holiday or Holiday already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Holiday ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Holiday');
    }
}

// Delete a Holiday
export async function deleteHoliday(req, res) {
    const { holidayID } = req.params;
    try {
        const countDeleted = await Holiday.destroy({
            where: {
                holidayID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Holiday deleted successfully'
            });
        } else {
            returnNotFound(res, 'Holiday ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Holiday');
    }
}