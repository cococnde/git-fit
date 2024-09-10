import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login(
    $email: String!
    $password: String!
  ) {
    login(
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation signup(
    $username: String!
    $email: String!
    $password: String!
  ) {
    signup(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
        email
        exerciseCount
        savedExercises{
          _id
          name
          force
          level
          mechanic
          equipment
          primaryMuscles
          secondaryMuscles
          intructions
          
        }
      }
    }
  }
`;

export const SAVE_WORKOUT = gql`
  mutation saveExercise($newExercise: ExerciseInput) {
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
          intructions
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
          intructions
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
          intructions
      }
    }
  }
`;