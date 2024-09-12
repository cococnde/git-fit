import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      exerciseCount
      savedExercises {
        _id
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
