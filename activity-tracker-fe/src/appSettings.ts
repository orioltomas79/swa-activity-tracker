import appInfo from "../package.json";

/**
 * This function takes two parameters: setting (a string or undefined) and settingName (a string).
 * This function is used to validate the value of a setting. If the setting is empty, starts with "%" or "#{", an error is thrown.
 */
const checkSetting = (setting: string | undefined, settingName: string) => {
  if (!setting?.length || setting.startsWith("%") || setting.startsWith("#{")) {
    throw new Error(`Variable ${settingName} value is not valid: ${setting}`);
  }
};

// Calls the checkSetting function to validate the value of the REACT_APP_API_BASE_URL environment variable.
// If the value is not valid, an error is thrown.
checkSetting(process.env.REACT_APP_API_BASE_URL, "REACT_APP_API_BASE_URL");

const environment = process.env.NODE_ENV;

/**
 * This is an object named appSettings that contains various configuration settings for the application.
 */
const appSettings = {
  name: appInfo.name,
  version: appInfo.version,
  nodeEnv: environment,
  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL!,
  },
};

export default appSettings;
