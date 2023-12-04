import { ApiError } from "../../handlers/errors";

export class QuoteNotFound extends ApiError {
  constructor() {
    super();
    this.code = 404;
    this.message = "Quote not found";
    this.name = "QuoteNotFound";
  }
}
