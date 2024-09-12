import React, { useState, useEffect } from 'react';
import '../styles/searchexercise.css';
import { ExerciseCard } from '../components/ExerciseCard'; // Use curly braces for named exports
import { saveExerciseIds, getSavedExerciseIds } from '../utils/localStorage';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { SAVE_EXERCISE } from '../utils/mutations';

// Simulated search function
const searchExercises = async (query) => {
  // Simulate an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        json: async () => ({
          items: [
            {
              id: '1',
              volumeInfo: {
                name: 'Push Up',
                force: 'Push',
                level: 'Beginner',
                equipment: 'None',
                instructions: 'Start in a plank position...',
              },
            },
            {
              id: '2',
              volumeInfo: {
                name: 'Pull Up',
                force: 'Pull',
                level: 'Intermediate',
                equipment: 'Pull-up bar',
                instructions: 'Hang from the bar...',
              },
            },
          ],
        }),
      });
    }, 1000);
  });
};

const SearchExercises = () => {
  const [searchedExercises, setSearchedExercises] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedExerciseIds, setSavedExerciseIds] = useState(
    getSavedExerciseIds()
  );
  const [saveExercise] = useMutation(SAVE_EXERCISE);
  const [searchPerformed, setSearchPerformed] = useState(false); // New state variable
  const [error, setError] = useState(''); // Error state

  useEffect(() => {
    return () => saveExerciseIds(savedExerciseIds);
  }, [savedExerciseIds]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      setError('Please enter a search term');
      return false;
    }

    try {
      const response = await searchExercises(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const exerciseData = items.map((exercise) => ({
        exerciseId: exercise.id,
        name: exercise.volumeInfo.name,
        force: exercise.volumeInfo.force,
        level: exercise.volumeInfo.level,
        equipment: exercise.volumeInfo.equipment,
        instructions: exercise.volumeInfo.instructions,
      }));

      setSearchedExercises(exerciseData);
      setSearchInput('');
      setError(''); // Clear previous errors
      setSearchPerformed(true); // Set search performed to true
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveExercise = async (exerciseId) => {
    const exerciseToSave = searchedExercises.find(
      (exercise) => exercise.exerciseId === exerciseId
    );

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveExercise({
        variables: {
          newExercise: exerciseToSave,
        },
      });

      console.log(data);

      setSavedExerciseIds([...savedExerciseIds, exerciseToSave.exerciseId]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveExercise = (exerciseId) => {
    const updatedSavedExercises = savedExerciseIds.filter(
      (id) => id !== exerciseId
    );
    setSavedExerciseIds(updatedSavedExercises);
  };

  return (
    <div className="search-exercises-container">
      <div className="search-exercises-section">
        <div className="search-exercises-header">
          <h1>Search for Exercises!</h1>
        </div>
        <div className="search-form-container">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Search GitFit"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        {searchPerformed && searchedExercises.length === 0 && (
          <h2 className="no-results-message">
            No exercises found. Try a different search!
          </h2>
        )}
        {searchedExercises.length > 0 && (
          <div className="search-results">
            <div className="search-results-header">
              <h1>Search Results</h1>
            </div>
            <ul className="search-results-list">
              {searchedExercises.map((exercise) => (
                <li key={exercise.exerciseId}>
                  <ExerciseCard
                    exercise={exercise}
                    onSave={handleSaveExercise}
                    savedExerciseIds={savedExerciseIds}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="saved-workouts-container">
        <div className="search-exercises-header">
          <h1>Your Saved Exercises</h1>
        </div>
        <ul className="saved-workouts-list">
          {savedExerciseIds.map((exerciseId) => (
            <li key={exerciseId}>
              <ExerciseCard
                exercise={searchedExercises.find(
                  (exercise) => exercise.exerciseId === exerciseId
                )}
                onSave={handleRemoveExercise}
                savedExerciseIds={savedExerciseIds}
              />
              <button onClick={() => handleRemoveExercise(exerciseId)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchExercises;
