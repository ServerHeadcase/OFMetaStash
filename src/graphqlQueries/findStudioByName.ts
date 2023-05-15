import { gql } from 'graphql-request';

export const generateFindStudioByNameVariables = (name: string) => {
  const variables = {
    name,
  };
  return variables;
};
const findStudioByName = gql`
  query findStudios($name: String!) {
    findStudios(studio_filter: { name: { value: $name, modifier: INCLUDES } }) {
      count
      studios {
        id
      }
    }
  }
`;

export interface Studios {
  id: number;
}
export interface findStudioByNameType {
  findStudios: {
    count: number;
    studios: [Studios];
  };
}
export default findStudioByName;
