import { ultimaScraperConfig } from '../app';
import { readJson } from 'fs-extra';
import { UltimaScraperConfigType } from './ultimaScraper';
import { debug as debugLog } from '../utils/logger';

const getUltimaScraperConfig = async () => {
  debugLog('getUltimaScraperConfig', 'Loading Ultima Scraper Config');
  const config: UltimaScraperConfigType = await readJson(ultimaScraperConfig);
  return config;
};

export const getMetadataPathUserNumber = async (config: UltimaScraperConfigType) => {
  debugLog('getMetadataPathUserNumber', 'Getting Metadata Path segment');
  const metadataDirectoriesFormat =
    config.supported.onlyfans.settings.metadata_directory_format;
  const metadataDirectoriesFormatSplit = metadataDirectoriesFormat.split('/');

  const findModelFolder = metadataDirectoriesFormatSplit.findIndex((value) => {
    return value === '{model_username}';
  });
  const value = metadataDirectoriesFormatSplit.length - findModelFolder;
  return value;
};
export const getContentPathUserNumber = async (config: UltimaScraperConfigType) => {
  debugLog('getContentPathUserNumber', 'Getting Download Path segment');
  const downloadDirectoriesFormat =
    config.supported.onlyfans.settings.file_directory_format;
  const downloadDirectoriesFormatSplit = downloadDirectoriesFormat.split('/');

  const findModelFolder = downloadDirectoriesFormatSplit.findIndex((value) => {
    return value === '{model_username}';
  });
  const value = downloadDirectoriesFormatSplit.length - findModelFolder;
  return value;
};

export default getUltimaScraperConfig;
