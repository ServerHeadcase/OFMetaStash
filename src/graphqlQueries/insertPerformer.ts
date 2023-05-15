import { gql } from 'graphql-request';

const gqlInsertPerfomer = gql`
  mutation AddPerformer($name: String!, $url: String!, $image: String) {
    performerCreate(input: { name: $name, url: $url, image: $image }) {
      id
    }
  }
`;

export default gqlInsertPerfomer;
