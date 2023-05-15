import { gql } from 'graphql-request';

export const generateFindScenesByPathRegexVariables = (path: string) => {
  const variables = {
    path,
  };
  return variables;
};
const findScenesByPathRegex = gql`
  query findSceneByPathRegex($path: String!) {
    findScenesByPathRegex(filter: { q: $path, per_page: -1 }) {
      count
      scenes {
        id
        title
        files {
          path
          basename
          parent_folder_id
        }
        details
      }
    }
  }
`;
export interface Scene {
  id: number;
  title: string;
  files: [SceneFiles];
  details: string;
}
export interface SceneFiles {
  path: string;
  basename: string;
  parent_folder_id: number;
}
export interface findScenesByPathRegexType {
  findScenesByPathRegex: {
    count: number;
    scenes: [Scene];
  };
}
export default findScenesByPathRegex;
