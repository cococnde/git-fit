import React from 'react';
import '../styles/ExerciseCard.css';
import Auth from '../utils/auth';

export const ExerciseCard = ({
  exercise,
  onSave,
  onRemove,
  savedExerciseIds,
}) => {
  if (!exercise) {
    return null; // Return null if exercise is undefined
  }

  const isSaved = savedExerciseIds.includes(exercise.exerciseId);

  const handleSaveClick = () => {
    console.log('Save button clicked');
    onSave(exercise.exerciseId);
  };

  return (
    <div className="exercise-card">
      <h3>{exercise.name}</h3>
      <p>Force: {exercise.force}</p>
      <p>Level: {exercise.level}</p>
      <p>Equipment: {exercise.equipment}</p>
      <p>Instructions: {exercise.instructions}</p>
      {Auth.loggedIn() && onSave && (
        <button
          className="save-button"
          disabled={isSaved}
          onClick={handleSaveClick}
        >
          {isSaved ? 'Saved' : 'Save Exercise'}
        </button>
      )}
      {isSaved && onRemove && (
        <button
          className="remove-button"
          onClick={() => onRemove(exercise.exerciseId)}
        >
          Remove Exercise
        </button>
      )}
    </div>
  );
};

export default ExerciseCard;
