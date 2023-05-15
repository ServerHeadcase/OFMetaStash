import { gql } from 'graphql-request';

export const generateFindGalleryByTitleVariables = (
  title: string,
  modifier: 'EQUALS' | 'INCLUDES' = 'EQUALS'
) => {
  const variables = {
    title: {
      value: title,
      modifier,
    },
  };
  return variables;
};
const findGalleryByTitle = gql`
  query getGalleryByName($title: StringCriterionInput) {
    findGalleries(gallery_filter: { title: $title }, filter: { per_page: -1 }) {
      count
      galleries {
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
  }
`;

// TYPES
export interface GalleriesType {
  id: number;
  title: string;
  url: string;
  details: string;
  image_count: number;
  studio: {
    id: number;
  };
  scenes: {
    id: number;
  };
  performers: {
    id: number;
  };
}

export interface findGalleryByTitleResponse {
  findGalleries: {
    count: number;
    galleries: [GalleriesType];
  };
}

export default findGalleryByTitle;
