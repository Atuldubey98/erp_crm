import { ApiError } from "../../handlers/errors";

export class CustomerNotFound extends ApiError {
    constructor() {
        super();
        this.code = 404;
        this.message = "Customer not found";
        this.name = "CustomerNotFound";
    }
}