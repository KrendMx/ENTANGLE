import { Errors } from 'utils/Errors';

class ApplicationError extends Error {
    public status: number = Errors.asdf;

    constructor(message: string, status = Errors.asdf) {
        super(message);
        this.status = status;
    }
}

export { ApplicationError };
