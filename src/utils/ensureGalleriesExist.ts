import moment from 'moment';
import { stashGraphQL } from '../app';
import { default as getMediaType } from './getMediaType';
import { MediaType } from './getMediaType';
import { log as logger, debug as debugLog } from './logger';
import findGalleryByTitle, {
  findGalleryByTitleResponse,
  generateFindGalleryByTitleVariables,
} from '../graphqlQueries/findGalleryByTitle';
import createGallery, {
  generateCreateGalleryVarables,
  galleryCreateResponse,
} from '../graphqlQueries/createGallery';
import { performerGalleries } from './processPerformerMedia';
export interface galleryToCreateType {
  title: string;
  url: string;
  date: string;
  details: string;
  studio_id: number;
  performer_id: number;
}
export const ensureGalleriesExist = async (
  media: MediaType[],
  performer: string,
  studio_id: number,
  performer_id: number
) => {
  const galleriesToCreate = [];
  const galleryList: findGalleryByTitleResponse = await stashGraphQL.request(
    findGalleryByTitle,
    generateFindGalleryByTitleVariables(performer, 'INCLUDES')
  );
  for (const file of media) {
    const mediaType = await getMediaType(file);
    if (mediaType === 'images') {
      const mediaCreatedAt = moment(file.created_at).format('yyyy-MM-DD');
      const galleryTitle = `${performer} - ${mediaCreatedAt} - ${file.post_id}`;
      const linkToMediaPage = `https://onlyfans.com/${file.post_id}/${performer}`;
      const galleryKey = galleryList.findGalleries.galleries.find((value) => {
        return value.title === galleryTitle;
      });
      if (!!galleryKey) {
        logger(`Found Gallery By the title of ${galleryTitle}`);
        performerGalleries.push(galleryKey);
      } else {
        logger(`Did not find Gallery by the title of ${galleryTitle}`);
        if (
          !!galleriesToCreate.find((value) => {
            return value.title === galleryTitle;
          }) === false
        ) {
          galleriesToCreate.push({
            title: galleryTitle,
            url: linkToMediaPage,
            date: mediaCreatedAt,
            details: file.text,
            studio_id,
            performer_id,
          });
        }
      }
    }
  }
  for (const galleryObj of galleriesToCreate) {
    const gallery: galleryToCreateType = galleryObj;
    try {
      logger(`Creating gallery ${gallery.title}`);
      const createGalleryQuery: galleryCreateResponse = await stashGraphQL.request(
        createGallery,
        generateCreateGalleryVarables(
          gallery.title,
          gallery.url,
          gallery.date,
          gallery.details,
          gallery.studio_id,
          gallery.performer_id
        )
      );

      performerGalleries.push(createGalleryQuery.galleryCreate);
    } catch (err) {
      logger('Error creating gallery, enable debug to see error');
      debugLog('ensureGalleriesExist', err);
    }
  }
};
