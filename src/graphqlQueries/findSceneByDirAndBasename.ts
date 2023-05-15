import { gql } from 'graphql-request';

export const generateFindSceneByDirAndBasenameVariables = (
  path: string,
  filename: string
) => {
  const variables = {
    path,
    filename,
  };
  return variables;
};
const findSceneByDirAndBasename = gql`
  query findSceneByPath($path: String!, $filename: String) {
    findScenes(
      scene_filter: { path: { value: $path, modifier: INCLUDES } }
      filter: { q: $filename }
    ) {
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

export default findSceneByDirAndBasename;
