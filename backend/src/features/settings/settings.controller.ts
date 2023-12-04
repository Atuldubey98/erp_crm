import { Request, Response } from "express";
import requestAsyncHandler from "../../middlewares/requestAsyncHandler";
import {
  ESettingType,
  getSettings,
  getSettingsByType,
  saveSetting,
  updateSetting,
} from "./settings.repository";
import { SettingNotFoundError } from "./errors";
import { loadSettingSchema, settingTypeSchema } from "./settings.request";

export const getSettingsController = requestAsyncHandler(
  async (_: Request, res: Response) => {
    const settings = await getSettings();
    return res.status(200).json({ status: true, data: settings });
  }
);

export const getSettingsByTypeController = requestAsyncHandler(
  async (req: Request, res: Response) => {
    const settingType = req.params.settingType;
    if (!settingType) {
      throw new SettingNotFoundError();
    }
    const setting = await getSettingsByType(settingType);
    if (!setting) {
      throw new SettingNotFoundError(settingType);
    }
    return res.status(200).json({ status: true, data: setting });
  }
);

export const saveSettingByTypeController = requestAsyncHandler(
  async (req: Request, res: Response) => {
    const settingType = await settingTypeSchema.validateAsync(
      req.params.settingType
    );
    const settingSchema = loadSettingSchema(settingType);
    if (!settingSchema) {
      throw new SettingNotFoundError();
    }
    const setting = await settingSchema.validateAsync(req.body);
    const existingSetting = await updateSetting(setting, settingType);
    if (existingSetting) {
      return res.status(201).json({ status: true, data: existingSetting });
    }
    const newSetting = await saveSetting(setting, settingType);
    return res.status(201).json({ status: true, data: newSetting });
  }
);
