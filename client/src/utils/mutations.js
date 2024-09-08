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
        workoutCount
        savedWorkouts {
          workoutId
          title
          description
        }
      }
    }
  }
`;

export const SAVE_WORKOUT = gql`
  mutation saveWorkout($newWorkout: WorkoutInput!) {
    saveWorkout(newWorkout: $newWorkout) {
      _id
      username
      email
      savedWorkouts {
        workoutId
        title
        description
      }
    }
  }
`;

export const REMOVE_WORKOUT = gql`
  mutation removeWorkout($workoutId: ID!) {
    removeWorkout(workoutId: $workoutId) {
      _id
      username
      email
      savedWorkouts {
        workoutId
        title
        description
      }
    }
  }
`;