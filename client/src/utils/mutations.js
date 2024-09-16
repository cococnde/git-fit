import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

/*
exerciseCount
        saveExercises {
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
*/

export const ADD_USER = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const SAVE_EXERCISE = gql`
  mutation saveExercise($newExercise: ExerciseInput!) {
    saveExercise(newExercise: $newExercise) {
      id
      email
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

export const UPDATE_EXERCISE = gql`
  mutation updateExercise($exerciseId: ID!) {
    updateExercise(exerciseId: $exerciseId) {
      id
      email
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

export const REMOVE_EXERCISE = gql`
  mutation removeExercise($exerciseId: ID!) {
    removeExercise(exerciseId: $exerciseId) {
      id
      email
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
