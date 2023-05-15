import fs from 'fs-extra';
import path from 'path';
import { log as logger } from './logger';

export interface DirectoryMappings {
  search: [string];
  replace: [string];
}
export interface configFile {
  stash_url: string;
  ultima_scraper_config: string;
  content_dir: string;
  metadata_dir: string;
  mappings: DirectoryMappings;
}
const readAppConfig = async () => {
  const configFilePath = path.resolve(
    path.dirname(path.dirname(process.argv[1])),
    'config.json'
  );
  if (fs.existsSync(configFilePath)) {
    const config: configFile = await fs.readJSONSync(configFilePath);
    return config;
  } else {
    logger(`Cannot find config file at ${configFilePath}`);
    return null;
  }
  return null;
};

export default readAppConfig;
