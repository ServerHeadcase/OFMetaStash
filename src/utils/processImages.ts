import moment from 'moment';
import { stashGraphQL } from '../app';
import { default as getMediaType } from './getMediaType';
import { MediaType } from './getMediaType';
import { log as logger, debug as debugLog } from './logger';
import {
  findImagesByPathRegexType,
  default as findImagesByPathRegex,
  generateFindImageByPathVariables,
  Image,
} from '../graphqlQueries/findImagesByPathRegex';
import updateImageByID, {
  generateUpdateImageByIDVariables,
} from '../graphqlQueries/updateImageByID';
import { sanitiseMediaDir, getGalleryId } from './sanitiseMediaDir';

export const processImages = async (
  media: MediaType[],
  performer: string,
  onlyfansStudioId: number,
  performerID: number
) => {
  const imagesToUpdate = [];

  if (media.length < 1) {
    return;
  }

  const mediaDirectory = await sanitiseMediaDir(media[0].directory, performer, true);
  const imageList: findImagesByPathRegexType = await stashGraphQL.request(
    findImagesByPathRegex,
    generateFindImageByPathVariables(mediaDirectory)
  );

  for (const file of media) {
    const mediaType = await getMediaType(file);
    const mediaDirectory = await sanitiseMediaDir(file.directory, performer);
    const linkToMediaPage = `https://onlyfans.com/${file.post_id}/${performer}`;
    const mediaFilename = file.filename;
    const mediaCreatedAt = moment(file.created_at).format('yyyy-MM-DD');

    const findImageInArray = async (
      basename: string,
      path: string,
      array: Image[]
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

    if (mediaType === 'images') {
      logger(`Processing ${mediaDirectory}/${mediaFilename}`);

      const imageKey = await findImageInArray(
        mediaFilename,
        mediaDirectory,
        imageList.findImages.images
      );

      const imageData = imageList.findImages.images[imageKey];
      const preposedTitle = `${performer} - ${mediaCreatedAt}`;
      const galleryTitle = `${performer} - ${mediaCreatedAt} - ${file.post_id}`;
      const gallery_ids = await getGalleryId(galleryTitle);
      if (imageData) {
        if (imageData.title !== preposedTitle) {
          imagesToUpdate.push({
            id: imageData.id,
            title: preposedTitle,
            url: linkToMediaPage,
            date: mediaCreatedAt,
            studio_id: onlyfansStudioId,
            performer_ids: [performerID],
            gallery_ids: gallery_ids ? [gallery_ids] : undefined,
          });
        }
      } else {
        logger(
          `No need to update the metadata for ${mediaDirectory}/${mediaFilename}`
        );
      }
    } else {
      logger(`Could not find scene ${mediaDirectory}/${mediaFilename} in stash`);
    }
  }
  imagesToUpdate.forEach(async (image) => {
    logger(`Updating Metadata for ${image.title}`);
    try {
      await stashGraphQL.request(
        updateImageByID,
        generateUpdateImageByIDVariables(
          image.id,
          image.title,
          image.url,
          image.date,
          image.studio_ud,
          image.performer_ids,
          image.gallery_ids
        )
      );
    } catch (err) {
      logger('Failed to update Metadata, Enable Debug mode to see error');
      debugLog('proceessVideo', err);
      return;
    }
  });
};
