import { gql } from 'graphql-request';
export const generateFindImageByDirAndBasenameVariables = (
  path: string,
  filename: string
) => {
  const variables = {
    image_filter: {
      path: {
        value: path,
        modifier: 'INCLUDES',
      },
    },
    filter: {
      q: filename,
    },
  };
  return variables;
};
const findImageByDirAndBasename = gql`
  query findImageByPath($image_filter: ImageFilterType, $filter: FindFilterType) {
    findImages(image_filter: $image_filter, filter: $filter) {
      count
      images {
        id
        title
        url
        files {
          path
          basename
          parent_folder_id
        }
      }
    }
  }
`;

export default findImageByDirAndBasename;
