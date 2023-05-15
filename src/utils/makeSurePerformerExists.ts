import { log as logger, debug as debugLog } from './logger';
import { stashGraphQL } from '../app';
import {
  generatePerformerByNameVariables,
  default as getperformerByName,
} from '../graphqlQueries/getPerformerByName';
import { default as insertPerfomerGql } from '../graphqlQueries/insertPerformer';
import { default as performerAvatarToURL } from './performerAvatarToURL';
type performerQuery = {
  id?: number;
};
type performerAliasQuery = {
  performer_id?: number;
};
type gqlFindPerformerPerformer = {
  id: number;
};
type gqlFindPerformer = {
  findPerformers: {
    count: number;
    performers: [gqlFindPerformerPerformer];
  };
};
type gqlInsertPerformer = {
  performerCreate: {
    id: number;
  };
};
const makeSurePerformerExists = async (performer: string) => {
  const stashInsertPerformer = `INSERT INTO performers (name, url, created_at, updated_at) VALUES (?, ?, datetime('now', 'localtime'), datetime('now', 'localtime'))`;

  const getPerformerByNameQuery: gqlFindPerformer = await stashGraphQL.request(
    getperformerByName,
    generatePerformerByNameVariables(performer)
  );

  if (getPerformerByNameQuery.findPerformers.count === 1) {
    return getPerformerByNameQuery.findPerformers.performers[0].id;
  }

  logger(`Adding performer ${performer} to stash`);

  const avatarData = await performerAvatarToURL(performer);
  try {
    const insertPerformerQuery: gqlInsertPerformer = await stashGraphQL.request(
      insertPerfomerGql,
      {
        name: performer,
        url: `https://www.onlyfans.com/${performer}`,
        image: avatarData,
      }
    );

    if (insertPerformerQuery.performerCreate.id) {
      return insertPerformerQuery.performerCreate.id;
    }
  } catch (err) {
    logger(`Something went wrong... enable debug to see error`);
    debugLog('makeSurePerfomerExists', err);
    return null;
  }
};
export default makeSurePerformerExists;
