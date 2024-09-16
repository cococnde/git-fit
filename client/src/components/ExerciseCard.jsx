import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import '../styles/ExerciseCard.css';
import Auth from '../utils/auth';

export const ExerciseCard = ({
  exercise,
  onSave,
  onRemove,
  savedExerciseIds = [], // Default to an empty array if not provided
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
      {Auth.loggedIn() && (
        <>
          <button
            className="save-button"
            disabled={isSaved}
            onClick={handleSaveClick}
            aria-label={isSaved ? 'Exercise already saved' : 'Save Exercise'}
          >
            {isSaved ? 'Saved' : 'Save Exercise'}
          </button>
          {isSaved && onRemove && (
            <button
              className="remove-button"
              onClick={() => onRemove(exercise.exerciseId)}
              aria-label="Remove Exercise"
            >
              Remove Exercise
            </button>
          )}
        </>
      )}
    </div>
  );
};

// Prop validation
ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    exerciseId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    force: PropTypes.string,
    level: PropTypes.string,
    equipment: PropTypes.string,
    instructions: PropTypes.arrayOf(PropTypes.string),
  }),
  onSave: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  savedExerciseIds: PropTypes.arrayOf(PropTypes.string),
};

export default ExerciseCard;
