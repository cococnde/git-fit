import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      id
      username
      email
      exerciseCount
      savedExercises {
        id
        name
        force
        level
        mechanic
        equipment
        primaryMuscles
        secondaryMuscles
        instructions
      }
    }
  }
`;

export const SEARCH_EXERCISES = gql`
  query searchExercises($searchTerm: String!) {
    searchExercises(searchTerm: $searchTerm) {
      id
      name
      force
      level
      equipment
      instructions
    }
  }
`;
