import { gql } from 'graphql-request';

export const generateCreateStudioVariables = (name: string, url: string) => {
  const variables = {
    name,
    url,
  };
  return variables;
};

const createStudio = gql`
  mutation createStudio($name: String!, $url: String) {
    studioCreate(input: { name: $name, url: $url }) {
      id
    }
  }
`;

export default createStudio;
