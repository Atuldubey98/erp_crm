import { ApiError } from "../../handlers/errors";

export class SettingNotFoundError extends ApiError {
    constructor(typeOfSetting?: string) {
        super();
        this.code = 404;
        this.name = "SettingNotFoundError";
        this.message = `Setting ${typeOfSetting ||" "}not found`
    }
}