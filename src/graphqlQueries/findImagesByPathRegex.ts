import { gql } from 'graphql-request';

export const generateFindImageByPathVariables = (path: string) => {
  const variables = {
    path,
  };
  return variables;
};

const findImagesByPathRegex = gql`
  query findImagesByPathRegex($path: String!) {
    findImages(
      image_filter: { path: { value: $path, modifier: INCLUDES } }
      filter: { per_page: -1 }
    ) {
      count
      images {
        id
        title
        url
        date
        files {
          path
          basename
        }
      }
    }
  }
`;

export interface Image {
  id: number;
  title: string;
  url: string;
  date: string;
  files: [ImageFiles];
}
export interface ImageFiles {
  path: string;
  basename: string;
}
export interface findImagesByPathRegexType {
  findImages: {
    count: number;
    images: [Image];
  };
}

export default findImagesByPathRegex;
