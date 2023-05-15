import { gql } from 'graphql-request';

export const generateUpdateImageByIDVariables = (
  id: number,
  title: string,
  url: string,
  date: string,
  studio_id: number,
  performer_ids: [number],
  gallery_ids?: [number]
) => {
  const variables = {
    id,
    title,
    url,
    date,
    studio_id,
    performer_ids,
    gallery_ids,
  };
  return variables;
};
const updateImageByID = gql`
  mutation updateImageById(
    $id: ID!
    $title: String
    $url: String
    $date: String
    $studio_id: ID
    $performer_ids: [ID!]
    $gallery_ids: [ID!]
  ) {
    imageUpdate(
      input: {
        id: $id
        title: $title
        url: $url
        date: $date
        studio_id: $studio_id
        performer_ids: $performer_ids
        gallery_ids: $gallery_ids
      }
    ) {
      id
    }
  }
`;

export default updateImageByID;
