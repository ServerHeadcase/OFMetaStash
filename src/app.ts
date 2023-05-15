import { glob } from 'glob';
import { log as logger, debug as debugLog } from './utils/logger';
import { default as getOnlyfansStudioId } from './utils/getOnlyfansStudioId';
import {
  default as getUltimaScraperConfig,
  getMetadataPathUserNumber,
  getContentPathUserNumber,
} from './utils/readUltimaScraperConfig';
import { DirectoryMappings } from './utils/readConfig';
import { default as readAppConfig, configFile } from './utils/readConfig';
import processPerformer from './utils/processPerformer';

// TODO: Make dynamic from DS-OF config

import { GraphQLClient } from 'graphql-request';
import { UltimaScraperConfigType } from 'utils/ultimaScraper';

//////////////////////////////////////////////////////
// Code Losely Based off https://github.com/ALonelyJuicebox/OFMetadataToStash/blob/main/OFMetadataToStash.ps1
/////////////////////////////////////////////////////

// Stash DB
// export const stashDB = new sqlite(stashDatabase, { fileMustExist: true });
export let stashGraphQL;

export let usernameMetadataPathNumber: number;
export let usernameContentPathNumber: number;
export let stashGraphqlUrl: string;
export let ofPerformerContentDir: string;
export let ultimaScraperConfig: string;
export let folderMap: DirectoryMappings;
let ofMetadataDir: string;

const main = async () => {
  const appConfig: configFile = await readAppConfig();
  if (!appConfig) {
    logger('You need to copy the sample configuration and edit it');
    process.exit(1);
  }
  stashGraphqlUrl = `${appConfig.stash_url}/graphql`;
  ofMetadataDir = appConfig.metadata_dir;
  ofPerformerContentDir = appConfig.content_dir;
  ultimaScraperConfig = appConfig.ultima_scraper_config;
  stashGraphQL = new GraphQLClient(stashGraphqlUrl);
  folderMap = appConfig.mappings;
  const ultimaConfig: UltimaScraperConfigType = await getUltimaScraperConfig();
  usernameMetadataPathNumber = await getMetadataPathUserNumber(ultimaConfig);
  usernameContentPathNumber = await getContentPathUserNumber(ultimaConfig);
  const onlyfansStudioId = await getOnlyfansStudioId();
  debugLog('Startup', `Onlyfans StudioID: ${onlyfansStudioId}`);
  const files = await glob(`${ofMetadataDir}/**/{user_data,posts}.db`);
  if (files.length > 0 && files.length > 1) {
    for (const file of files) {
      await processPerformer(file, onlyfansStudioId);
    }
  } else if (files.length === 1) {
    console.log('Only found one sir!');
    await processPerformer(files[0], onlyfansStudioId);
  } else {
    console.log("Didn't find any databases");
  }
};

main();
