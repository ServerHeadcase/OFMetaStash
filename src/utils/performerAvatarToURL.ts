import { lstatSync, readdirSync, existsSync, readFileSync } from 'fs-extra';
import { default as mime } from 'mime-types';
import { default as path } from 'path';

import { ofPerformerContentDir } from '../app';

const encoding = 'base64';

const getLatestPerformerAvatar = (performer: string) => {
  // TODO: Detect where the "Avatar" Folder should be
  const avatarDirectory = `${ofPerformerContentDir}/${performer}/Profile/Avatars`;
  if (!existsSync(avatarDirectory)) {
    return undefined;
  }

  const orderReccentFiles = (dir) => {
    return readdirSync(dir)
      .filter((file) => lstatSync(path.join(dir, file)).isFile())
      .map((file) => ({ file, mtime: lstatSync(path.join(dir, file)).mtime }))
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
  };

  const files = orderReccentFiles(avatarDirectory);

  return files.length ? `${avatarDirectory}/${files[0].file}` : undefined;
};
const performerAvatarToURL = async (performer: string) => {
  const latestAvatar = getLatestPerformerAvatar(performer);

  if (latestAvatar === undefined) {
    return undefined;
  }

  const mimeType = mime.lookup(latestAvatar);
  const avatarBuffer = readFileSync(latestAvatar).toString(encoding);

  return `data:${mimeType};${encoding},${avatarBuffer}`;
};

export default performerAvatarToURL;
