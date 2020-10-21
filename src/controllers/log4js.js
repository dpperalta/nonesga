import log4js from 'log4js';

log4js.configure({
    appenders: {
        fileAppender: {
            type: 'file',
            filename: './logs/errorLogs.log'
        }
    },
    categories: {
        default: {
            appenders: ['fileAppender'],
            level: 'error'
        }
    }
});

const logger = log4js.getLogger();

export function nonesgaLog(message, type) {
    if (type === 'error') {
        logger.error(message);
    }
    if (type === 'trace') {
        logger.trace(message);
    }
    if (type === 'debug') {
        logger.debug(message);
    }
    if (type === 'info') {
        logger.debug(message);
    }
    if (type === 'warn') {
        logger.warn(message);
    }
    if (type === 'fatal') {
        logger.fatal(message);
    }
    if (type !== 'error' && type !== 'trace' || type !== 'debug' || type !== 'info' || type !== 'warn' || type !== 'fatal') {
        logger.error('[Unknown]:' + message);
    }
}