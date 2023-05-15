import { gql } from 'graphql-request';

export const generateUpdateSceneIDVarables = (
  scene_id: number,
  title: string,
  details: string,
  date: string,
  url: string,
  studio_id: number,
  performer_id: number[],
  gallery_ids: number[]
) => {
  const variables = {
    id: scene_id,
    title,
    details,
    date,
    url,
    studio_id,
    performer_id,
    gallery_ids,
  };
  return variables;
};
const updateSceneByID = gql`
  mutation updateScene(
    $id: ID!
    $title: String
    $details: String
    $date: String
    $url: String
    $studio_id: ID
    $performer_id: [ID!]
    $gallery_ids: [ID!]
  ) {
    sceneUpdate(
      input: {
        id: $id
        title: $title
        details: $details
        date: $date
        url: $url
        studio_id: $studio_id
        performer_ids: $performer_id
        gallery_ids: $gallery_ids
      }
    ) {
      id
    }
  }
`;

export default updateSceneByID;
