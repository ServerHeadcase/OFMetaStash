import { basename, dirname } from 'path';
import { default as makeSurePerformerExists } from './makeSurePerformerExists';
import processPerformerMedia from './processPerformerMedia';
import { log as logger } from './logger';
import { usernameMetadataPathNumber } from '../app';

const processPerformer = async (file: string, onlyfansStudioId: number) => {
  const fileNameArray = dirname(file).split('/');
  const performer = fileNameArray[fileNameArray.length - usernameMetadataPathNumber];
  const databaseType = basename(file).replace('.db', '');
  logger(`Found ${databaseType} database for ${performer}`);
  switch (databaseType) {
    case 'user_data':
      const performerId = await makeSurePerformerExists(performer);
      await processPerformerMedia(performer, performerId, file, onlyfansStudioId);
      break;
    case 'posts':
      break;
    default:
      logger('Not sure what to do here...');
      break;
  }
};
export default processPerformer;
