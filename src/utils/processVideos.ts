import moment from 'moment';
import { stashGraphQL } from '../app';
import { default as getMediaType } from './getMediaType';
import { MediaType } from './getMediaType';
import { log as logger, debug as debugLog } from './logger';
import {
  default as updateSceneByID,
  generateUpdateSceneIDVarables,
} from '../graphqlQueries/updateSceneByID';
import {
  findScenesByPathRegexType,
  default as findScenesByPathRegex,
  generateFindScenesByPathRegexVariables,
  Scene,
} from '../graphqlQueries/findScenesByPathRegex';
import { sanitiseMediaDir, getGalleryId } from './sanitiseMediaDir';

export const processVideos = async (
  media: MediaType[],
  performer: string,
  onlyfansStudioId: number,
  performerID: number
) => {
  logger('Processing Videos');
  const scenesToUpdate = [];
  if (media.length < 1) {
    return;
  }
  const mediaDirectory = await sanitiseMediaDir(media[0].directory, performer, true);
  const sceneList: findScenesByPathRegexType = await stashGraphQL.request(
    findScenesByPathRegex,
    generateFindScenesByPathRegexVariables(mediaDirectory)
  );

  // writeJSONSync('text.json', sceneList.findScenesByPathRegex.scenes);
  for (const file of media) {
    const mediaType = await getMediaType(file);
    const mediaDirectory = await sanitiseMediaDir(file.directory, performer);
    const linkToMediaPage = `https://onlyfans.com/${file.post_id}/${performer}`;
    const mediaFilename = file.filename;
    const mediaCreatedAt = moment(file.created_at).format('yyyy-MM-DD');

    const findSceneInArray = async (
      basename: string,
      path: string,
      array: Scene[]
    ) => {
      for (let i = 0; i < array.length; i++) {
        if (
          array[i].files[0].basename === basename &&
          (await sanitiseMediaDir(array[i].files[0].path, performer)).includes(path)
        ) {
          return i;
        }
      }
    };
    if (mediaType === 'video') {
      logger(`Processing ${mediaDirectory}/${mediaFilename}`);
      // console.log(sceneList.findScenesByPathRegex.scenes);
      const sceneKey = await findSceneInArray(
        mediaFilename,
        mediaDirectory,
        sceneList.findScenesByPathRegex.scenes
      );

      const sceneData = sceneList.findScenesByPathRegex.scenes[sceneKey];
      const preposedTitle = `${performer} - ${mediaCreatedAt}`;
      const galleryTitle = `${performer} - ${mediaCreatedAt} - ${file.post_id}`;
      const gallery_ids = await getGalleryId(galleryTitle);
      if (sceneData) {
        if (sceneData.title !== preposedTitle || sceneData.details !== file.text) {
          scenesToUpdate.push({
            id: sceneData.id,
            preposedTitle,
            details: file.text,
            mediaCreatedAt,
            linkToMediaPage,
            onlyfansStudioId,
            performerID: [performerID],
            gallery_ids: gallery_ids ? [gallery_ids] : undefined,
          });
        } else {
          logger(
            `No need to update the metadata for ${mediaDirectory}/${mediaFilename}`
          );
        }
      } else {
        logger(`Could not find scene ${mediaDirectory}/${mediaFilename} in stash`);
      }
    }
  }
  scenesToUpdate.forEach(async (scene) => {
    logger(`Updating metadata`);
    try {
      await stashGraphQL.request(
        updateSceneByID,
        generateUpdateSceneIDVarables(
          scene.id,
          scene.preposedTitle,
          scene.details,
          scene.mediaCreatedAt,
          scene.linkToMediaPage,
          scene.onlyfansStudioId,
          scene.performerID,
          scene.gallery_ids
        )
      );
    } catch (err) {
      logger('Failed to update Metadata, Enable Debug mode to see error');
      debugLog('proceessVideo', err);
      return;
    }
  });
};
