import { mapDir } from './mapDir';
import { performerGalleries } from './processPerformerMedia';

export const sanitiseMediaDir = async (
  directory: string,
  performer: string,
  splitToUser: boolean = false
) => {
  let directoryTmp = directory;
  if (splitToUser) {
    directoryTmp = `${directory.split(performer)[0]}${performer}`;
  }
  directoryTmp = await mapDir(directoryTmp);
  return directoryTmp;
};
export const getGalleryId = async (title: string) => {
  for (let i = 0; i < performerGalleries.length; i++) {
    if (performerGalleries[i].title === title) {
      return performerGalleries[i].id;
    }
  }
  return undefined;
};
