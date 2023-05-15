export interface MediaType {
  text: string;
  directory: string;
  filename: string;
  size: number;
  created_at: Date;
  post_id: number;
  media_type: 'Images' | 'Videos' | 'Audios';
}
const getMediaType = async (file: MediaType) => {
  if (file.media_type == 'Videos' && !file.filename.endsWith('.gif')) {
    return 'video';
  } else if (file.media_type === 'Images' || file.filename.endsWith('.gif')) {
    return 'images';
  } else {
    return 'audio';
  }
};
export default getMediaType;
