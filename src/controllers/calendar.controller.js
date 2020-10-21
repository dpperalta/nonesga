import Calendar from '../models/Calendar';
import { sequelize } from '../database/database';
import { returnError, returnMissingError, returnNotFound, returnWrongError } from './errors';
import moment from 'moment';
import cron from 'node-cron';
import { nonesgaLog } from './log4js';

//Generate Calendar
export async function generateCalendar(req, res) {

    const year = req.body.year || new Date().getFullYear();
    let totalDays;
    let dates = [];
    let totalDates = 0;
    console.log(year);
    try {

        const dbCalendar = await Calendar.findAndCountAll({
            attributes: ['calendarID', 'year'],
            where: {
                year: year.toString()
            }
        });
        if (dbCalendar.count > 364) {
            return res.status(400).json({
                ok: false,
                message: 'Calendar for ' + year + ' already generated'
            })
        } else {
            const countDeleted = await Calendar.destroy({
                where: {
                    year: year.toString()
                }
            });
            if (countDeleted < 0) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while deleting calendar for ' + year
                });
            } else {
                const generatedCalendar = await sequelize.query(`
                        SELECT generate_series(
                            (date '${ year }-01-01')::date,
                            (date '${ year }-12-31')::date,
                            INTERVAL '1 day'
                        );
                `);

                totalDays = generatedCalendar[1].rowCount;
                let calendar = generatedCalendar[0];
                let currentDate = moment().format('YYYY-MM-DD');
                calendar.forEach(day => {
                    let calendarDay = {
                            date: day.generate_series,
                            year,
                            detail: 'Autogenerated day',
                            visible: moment(day.generate_series).isAfter(currentDate) ? true : false
                        }
                        //console.log('day:', day.generate_series, ' visible:', calendarDay.visible);
                    insertCalendarDay(calendarDay.date, calendarDay.year, calendarDay.visible);
                    dates.push(calendarDay);
                });
                return res.status(200).json({
                    ok: true,
                    message: 'Calendar generated successfully',
                    dates,
                    totalDates
                });
            }
        }
    } catch (e) {
        console.log('Error', e);
        returnError(res, e, 'Create Calendar');
    }
}

// Get all days in calendar
export async function getAllCalendarDays(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const calendarDays = await Calendar.findAndCountAll({
            attributes: ['calendarID', 'registeredDate', 'unregisteredDate', 'isActive', 'date', 'year', 'detail', 'updatedDate', 'updatedReason', 'updatedUser', 'isVisible'],
            limit,
            offset: from,
            order: [
                ['date', 'ASC']
            ]
        });
        if (calendarDays.count > 0) {
            return res.status(200).json({
                ok: true,
                calendarDays
            });
        } else {
            returnNotFound(res, 'Any Calendar Day');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get All Calendar Days');
    }
}

// Get a Day by ID
export async function getCalendarDayByID(req, res) {
    const { calendarID } = req.params;
    try {
        const calendarDay = await Calendar.findOne({
            attributes: ['calendarID', 'registeredDate', 'unregisteredDate', 'isActive', 'date', 'year', 'detail', 'updatedDate', 'updatedReason', 'updatedUser', 'isVisible'],
            where: {
                calendarID
            }
        });
        if (calendarDay) {
            return res.status(200).json({
                ok: true,
                calendarDay
            });
        } else {
            returnNotFound(res, 'Calendar Day ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Calendar Day by ID')
    }
}

// Get a Day by Date
export async function getCalendarDayByDate(req, res) {
    const { date } = req.params;
    try {
        const calendarDay = await Calendar.findOne({
            attributes: ['calendarID', 'registeredDate', 'unregisteredDate', 'isActive', 'date', 'year', 'detail', 'updatedDate', 'updatedReason', 'updatedUser', 'isVisible'],
            where: {
                date
            }
        });
        if (calendarDay) {
            return res.status(200).json({
                ok: true,
                calendarDay
            });
        } else {
            returnNotFound(res, 'Calendar Day DAte');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Calendar Day by Date');
    }
}

// Update a Date
export async function updateCalendarDay(req, res) {
    const { calendarID } = req.params;
    const {
        updatedUser,
        updatedReason,
        isVisible,
        detail
    } = req.body;

    if (updatedReason === undefined || updatedUser === undefined) {
        let message = '';
        if (updatedReason === undefined && updatedUser === undefined) {
            message = 'Updated Reason or Updated User';
        } else {
            if (updatedUser) {
                message = 'Updated User';
            } else {
                message = 'Updated Reason';
            }
        }
        returnMissingError(res, message);
    } else {
        try {
            const dbCalendarDay = await Calendar.findOne({
                attributes: ['calendarID', 'date', 'isActive', 'year'],
                where: {
                    calendarID
                }
            });
            if (dbCalendarDay === null || dbCalendarDay === undefined) {
                returnNotFound(res, 'Calendar Day ID');
            } else {
                const updatedCalendar = await Calendar.update({
                    updatedUser,
                    updatedReason,
                    updatedDate: sequelize.literal('CURRENT_TIMESTAMP'),
                    isVisible,
                    detail
                }, {
                    where: {
                        calendarID
                    }
                });
                if (updatedCalendar) {
                    return res.status(200).json({
                        ok: true,
                        message: 'Calendar Day updated successfully'
                    });
                } else {
                    returnNotFound(res, 'Calendar Day ID');
                }
            }
        } catch (e) {
            console.log('Error:', e);
            nonesgaLog('Error: ' + e, 'debug');
            returnError(res, e, 'Update Calendar Day');
        }
    }
}

// Change to inactive a Day
export async function changeToInactiveDay(req, res) {
    let currentUpdates = 0;
    //cron.schedule('*/5 * * * * *', () => { // Se ejecutaría cada 5 segundos los segundos son opcionales
    cron.schedule('0-58 59 23 * * *', () => { //Se ejecutaría a las 23 horas 59 minutos 58 segundos
        let dateToUpdate = moment().format('yyyy-MM-DD');
        console.log('dateToUpdate:', dateToUpdate);
        updatePastDay(dateToUpdate);
        console.log('Day updated: ', dateToUpdate, 'at', moment().format(), 'total updates for session:', currentUpdates++);
    });
    return res.status(200).json({
        ok: true,
        message: 'Task programed successfully'
    })
}

// Delete a yer in calendar
export async function deleteYear(req, res) {
    const { year } = req.params;
    try {
        const countDeleted = await Calendar.destroy({
            where: {
                year
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                daysDeleted: countDeleted,
                message: 'Year ' + year + ' deleted successfully'
            });
        } else {
            returnNotFound(res, 'Year ' + year);
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Delete Day Error: ' + e, 'error');
        returnError(res, e, 'Delete year');
    }
}

// Function to insert the data of calendar in database
async function insertCalendarDay(day, year, visible, totalDates) {
    try {
        const createdDay = await Calendar.create({
            date: day,
            year,
            detail: 'Autogenerated day',
            isVisible: visible
        }, {
            fields: ['date', 'year', 'detail', 'isVisible'],
            returning: ['calendarID', 'date', 'detail', 'isVisible']
        });
        if (createdDay) {
            totalDates++
        }
        return totalDates;
    } catch (e) {
        console.log('Error', e);
        returnError(res, e, 'Create a Day in Calendar');
        return;
    }
}

async function updatePastDay(dateToUpdate, currentUpdates) {
    try {
        const dbCalendarDay = await Calendar.findOne({
            attributes: ['calendarID', 'date', 'isActive', 'year', 'unregisteredDate'],
            where: {
                date: dateToUpdate
            }
        });
        if (dbCalendarDay === undefined || dbCalendarDay === null) {
            console.log('Day to updated does not exists, please validate');
        } else {
            const updateDay = await Calendar.update({
                isActive: false,
                unregisteredDate: sequelize.literal('CURRENT_TIMESTAMP'),
                detail: 'Automatic disable day at: ' + moment().format()
            }, {
                where: {
                    date: dateToUpdate
                }
            });
            if (updateDay) {
                currentUpdates++;
            }
            return currentUpdates;
        }
    } catch (e) {
        console.log('Error:', e);
    }
}