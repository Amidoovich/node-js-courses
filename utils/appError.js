class AppError extends Error {
    constructor(message,statusCode,httpStatusText) {
        super();
    }

    create(message ,statusCode ,httpStatusText) {
        this.message = message;
        this.statusCode = statusCode;
        this.httpStatusText = httpStatusText;
        return this;
    }
}

module.exports = new AppError();