import { gql } from 'graphql-request';

export const generatePerformerByNameVariables = (performer: string) => {
  const variables = {
    performer_filter: {
      name: {
        value: performer,
        modifier: 'INCLUDES',
      },
      OR: {
        aliases: {
          value: performer,
          modifier: 'INCLUDES',
        },
      },
    },
  };
  return variables;
};
const getPerformerByName = gql`
  query findPerformerByName($performer_filter: PerformerFilterType) {
    findPerformers(performer_filter: $performer_filter) {
      count
      performers {
        id
      }
    }
  }
`;

export default getPerformerByName;
