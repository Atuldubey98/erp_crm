export abstract class ApiError extends Error {
  code: number;
  constructor() {
    super("Internal server error");
    this.code = 500;
    this.name = "INTERNAL_SERVER_ERROR";
  }
}