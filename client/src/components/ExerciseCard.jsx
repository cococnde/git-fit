import React from 'react';
import '../styles/ExerciseCard.css';
import Auth from '../utils/auth';

export const ExerciseCard = ({ exercise, onSave, savedExerciseIds }) => {
  const isSaved = savedExerciseIds.includes(exercise.exerciseId);

  return (
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
  );
};

export default ExerciseCard;
