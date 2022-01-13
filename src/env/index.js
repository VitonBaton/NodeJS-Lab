const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    db: {
        name: process.env.DB_NAME || 'taxidb',
        user: process.env.DB_USER || 'test',
        pass: process.env.DB_PASS || '12345678',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '5432'
    },
    app: {
        port: process.env.APP_PORT || '9999'
    },
    secretKey: process.env.JWT_SECRET_KEY || 'MEGA_SECRET_KEY'
};