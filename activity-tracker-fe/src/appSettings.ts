import appInfo from "../package.json";

const checkSetting = (setting: string | undefined, settingName: string) => {
  if (!setting?.length || setting.startsWith("%") || setting.startsWith("#{")) {
    throw new Error(`Variable ${settingName} value is not valid: ${setting}`);
  }
};

checkSetting(process.env.REACT_APP_API_BASE_URL, "REACT_APP_API_BASE_URL");

const environment = process.env.NODE_ENV;

const appSettings = {
  name: appInfo.name,
  version: appInfo.version,
  nodeEnv: environment,
  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL!,
  },
};

export default appSettings;
