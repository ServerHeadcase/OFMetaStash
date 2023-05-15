import { folderMap } from '../app';

export const mapDir = async (directory: string) => {
  for (let i = 0; i <= folderMap.search.length; ++i) {
    if (directory.includes(folderMap.search[i])) {
      return directory.replace(folderMap.search[i], folderMap.replace[i]);
    }
  }
  return directory;
};
