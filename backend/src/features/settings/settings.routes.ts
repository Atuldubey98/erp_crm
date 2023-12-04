import { Router } from "express";
import {
  getSettingsByTypeController,
  getSettingsController,
  saveSettingByTypeController,
} from "./settings.controller";

const settingsRouter = Router();

settingsRouter.get("/", getSettingsController);
settingsRouter.get("/:settingType", getSettingsByTypeController);
settingsRouter.post("/:settingType", saveSettingByTypeController);


export default settingsRouter;
