class NotAcceptableError extends Error {
    constructor(message) {
        super(message);
        this.status = 406;
    }
};

module.exports = NotAcceptableError;