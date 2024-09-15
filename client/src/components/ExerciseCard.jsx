import React from 'react';
import '../styles/ExerciseCard.css';
// import Auth from '../utils/auth'; // Removed Auth import to test save exercise button (see below)

export const ExerciseCard = ({
  exercise, // Exercise details passed as a prop
  onSave, // Function to save the exercise to the user's list
  onRemove, // Function to remove the exercise from the user's saved list (optional)
  savedExerciseIds, // Array of exercise IDs that the user has already saved
}) => {
  // Check if the exercise object exists before accessing its properties
  if (!exercise || !exercise.exerciseId) {
    return <p>Exercise data is unavailable.</p>; // Fallback UI if exercise is undefined or missing exerciseId
  }

  // Determine if the current exercise is already saved
  const isSaved = savedExerciseIds.includes(exercise.exerciseId);

  // The JSX returned by the component

  /* return (
    <div className="exercise-card">
      <h3>{exercise.name}</h3>
      <p>Force: {exercise.force}</p>
      <p>Level: {exercise.level}</p>
      <p>Equipment: {exercise.equipment}</p>
      <p>Instructions: {exercise.instructions}</p>
      {Auth.loggedIn() && (
        <button disabled={isSaved} onClick={() => onSave(exercise.exerciseId)}>
          {isSaved ? 'Saved' : 'Save Exercise'}
        </button>
      )}
    </div>
  ); */

  // Added this to remove Auth.loggedIn() so that the button to save the exercise to the user's list is always displayed (checked when had issues logging in and needed to look at styling and button functionality)
  return (
    <div className="exercise-card">
      {/* Display the exercise details */}
      <h3>{exercise.name}</h3>
      <p>Force: {exercise.force}</p>
      <p>Level: {exercise.level}</p>
      <p>Equipment: {exercise.equipment}</p>
      <p>Instructions: {exercise.instructions}</p>

      {/* Button to save the exercise */}
      {/* Conditionally render the save button only if onSave is provided */}
      {onSave && (
        <button
          className="save-button"
          disabled={isSaved} // Disable button if the exercise is already saved
          onClick={() => {
            console.log(
              `Button clicked for exercise ID: ${exercise.exerciseId}`
            ); // Log click event for debugging
            onSave(exercise.exerciseId); // Call onSave function with the exercise ID
          }}
        >
          {/* Show "Saved" if exercise is already saved, otherwise show "Save Exercise" */}
          {isSaved ? 'Saved' : 'Save Exercise'}
        </button>
      )}

      {/* If the exercise is saved and onRemove is provided, show the "Remove" button */}
      {isSaved && onRemove && (
        <button
          className="remove-button"
          onClick={() => {
            console.log(
              `Remove button clicked for exercise ID: ${exercise.exerciseId}`
            ); // Log click event for debugging
            onRemove(exercise.exerciseId); // Call onRemove function with the exercise ID
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default ExerciseCard;