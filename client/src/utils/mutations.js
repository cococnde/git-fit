import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
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
  mutation signup($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const SAVE_EXERCISE = gql`
  mutation saveExercise($newExercise: ExerciseInput) {
    saveExercise(newExercise: $newExercise) {
      _id
      username
      email
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

export const UPDATE_WORKOUT = gql`
  mutation updateExercise($exerciseId: ID!) {
    updateExercise(exerciseId: $exerciseId) {
      _id
      username
      email
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

export const REMOVE_WORKOUT = gql`
  mutation removeExercise($exerciseId: ID!) {
    removeExercise(exerciseId: $exerciseId) {
      _id
      username
      email
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
