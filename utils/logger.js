const winston = require('winston');

// Create a format that removes sensitive information
const sensitiveFormat = winston.format((info) => {
    // Remove any potential sensitive data from the message
    if (info.message) {
        info.message = info.message.replace(/token=([^&\s]+)/g, 'token=[REDACTED]');
        info.message = info.message.replace(/password=([^&\s]+)/g, 'password=[REDACTED]');
        info.message = info.message.replace(/email=([^&\s]+)/g, 'email=[REDACTED]');
    }
    return info;
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        sensitiveFormat(),
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ 
            filename: 'error.log', 
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        new winston.transports.File({ 
            filename: 'combined.log',
            maxsize: 5242880, // 5MB
            maxFiles: 5
        })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            sensitiveFormat(),
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

module.exports = logger; 