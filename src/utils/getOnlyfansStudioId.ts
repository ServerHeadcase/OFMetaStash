import { log as logger, debug as debugLog } from './logger';
import { stashGraphQL } from '../app';
import {
  default as findStudioByName,
  generateFindStudioByNameVariables,
  findStudioByNameType,
} from '../graphqlQueries/findStudioByName';

import {
  default as createStudio,
  generateCreateStudioVariables,
} from '../graphqlQueries/createStudio';

const getOnlyfansStudioId = async () => {
  debugLog('getOnlyfansStudioId', 'Getting Onlyfans ID from Stash');
  const findStudioByNameQuery: findStudioByNameType = await stashGraphQL.request(
    findStudioByName,
    generateFindStudioByNameVariables('Onlyfans')
  );

  if (findStudioByNameQuery.findStudios.count === 0) {
    logger("Didn't Find and Onlyfans Studio... Creating");
    const createStudioQuery = await stashGraphQL.request(
      createStudio,
      generateCreateStudioVariables('Onlyfans', 'https://www.onlyfans.com')
    );

    return createStudioQuery[0].id;
  }

  return findStudioByNameQuery.findStudios.studios[0].id;
};

export default getOnlyfansStudioId;
