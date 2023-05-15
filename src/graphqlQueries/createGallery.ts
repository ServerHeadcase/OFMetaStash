import { gql } from 'graphql-request';
import { GalleriesType } from './findGalleryByTitle';

export const generateCreateGalleryVarables = (
  title: string,
  url: string,
  date: string,
  details: string,
  studio_id: number,
  performer_ids: number
) => {
  const variables = {
    title,
    url,
    date,
    details,
    studio_id,
    performer_ids: [performer_ids],
  };
  return variables;
};
const createGallery = gql`
  mutation createGallery(
    $title: String!
    $url: String
    $date: String
    $details: String
    $studio_id: ID
    $performer_ids: [ID!]
  ) {
    galleryCreate(
      input: {
        title: $title
        url: $url
        date: $date
        details: $details
        studio_id: $studio_id
        performer_ids: $performer_ids
      }
    ) {
      id
      title
      url
      details
      image_count
      studio {
        id
      }
      scenes {
        id
      }
      performers {
        id
      }
    }
  }
`;

// TYPES

export interface galleryCreateResponse {
  galleryCreate: GalleriesType;
}
export default createGallery;
