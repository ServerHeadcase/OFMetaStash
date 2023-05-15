import sqlite3 from 'sqlite3';
import { open as sqliteOpen } from 'sqlite';
import { MediaType } from './getMediaType';
import { GalleriesType } from '../graphqlQueries/findGalleryByTitle';
import { ensureGalleriesExist } from './ensureGalleriesExist';
import { processVideos } from './processVideos';
import { processImages } from './processImages';

export const performerGalleries: GalleriesType[] = [];
export const performerImages = [];
export const performerScenes = [];
const processPerformerMedia = async (
  performer: string,
  performerID: number,
  dbpath: string,
  onlyfansStudioId: number
) => {
  const mediaQuery = `SELECT messages.text, medias.directory, medias.filename, medias.size, medias.created_at, medias.post_id, medias.media_type FROM medias INNER JOIN messages ON messages.post_id=medias.post_id UNION SELECT posts.text, medias.directory, medias.filename, medias.size, medias.created_at, medias.post_id, medias.media_type FROM medias INNER JOIN posts ON posts.post_id=medias.post_id WHERE medias.media_type <> 'Audios'`;
  const performerDB = await sqliteOpen({
    filename: dbpath,
    driver: sqlite3.Database,
  });

  const media = await performerDB.all<MediaType[]>(mediaQuery);

  if (media !== undefined) {
    await ensureGalleriesExist(media, performer, onlyfansStudioId, performerID);
    await processVideos(media, performer, onlyfansStudioId, performerID);
    await processImages(media, performer, onlyfansStudioId, performerID);
  }
};

export default processPerformerMedia;
