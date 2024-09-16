import React, { useState, useEffect } from 'react';
import '../styles/searchexercise.css';
import ExerciseCard from '../components/ExerciseCard';
import {
  saveExerciseIds,
  getSavedExerciseIds,
  removeExerciseId,
} from '../utils/localStorage';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_EXERCISE, REMOVE_EXERCISE } from '../utils/mutations';
import { SEARCH_EXERCISES } from '../utils/queries';

const SearchExercises = () => {
  const [searchedExercises, setSearchedExercises] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State variable for the search term
  const [savedExerciseIds, setSavedExerciseIds] = useState(
    getSavedExerciseIds()
  );
  const [saveExercise] = useMutation(SAVE_EXERCISE);
  const [removeExercise] = useMutation(REMOVE_EXERCISE);
  const [error, setError] = useState(''); // Error state

  // Execute the query only when searchTerm is set
  const {
    data,
    loading,
    error: queryError,
  } = useQuery(SEARCH_EXERCISES, {
    variables: { searchTerm: searchInput },
    skip: !searchTerm, // Skip query if searchTerm is empty
  });

  useEffect(() => {
    if (data) {
      const exerciseData = data.searchExercises.map((exercise) => ({
        key: exercise.id,
        exerciseId: exercise.id,
        name: exercise.name,
        force: exercise.force,
        level: exercise.level,
        equipment: exercise.equipment,
        instructions: exercise.instructions,
      }));
      setSearchedExercises(exerciseData);
    }

    if (queryError) {
      setError('Error fetching exercises. Please try again.');
      console.error(queryError);
    } else {
      setError(''); // Reset error if no error
    }
  }, [data, queryError]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!searchInput) {
      setError('Please enter a search term');
      return;
    }

    // Set the search term for the query
    setSearchTerm(searchInput);
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

      const updatedSavedExerciseIds = [
        ...savedExerciseIds,
        exerciseToSave.exerciseId,
      ];
      setSavedExerciseIds(updatedSavedExerciseIds);
      saveExerciseIds(updatedSavedExerciseIds); // Save to localStorage
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveExercise = async (exerciseId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeExercise({
        variables: { exerciseId },
      });

      console.log(data);

      const updatedSavedExerciseIds = savedExerciseIds.filter(
        (id) => id !== exerciseId
      );
      setSavedExerciseIds(updatedSavedExerciseIds);
      saveExerciseIds(updatedSavedExerciseIds); // Save to localStorage
    } catch (err) {
      console.error(err);
    }
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
              placeholder="Search for an exercise"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        {searchedExercises.length === 0 && (
          <h2 className="no-results-message">
            No exercises found. Try a different search!
          </h2>
        )}
        {searchedExercises.length > 0 && (
          <div className="search-results">
            <div className="search-results-header">
              <h1>Viewing {searchedExercises.length} Search Results</h1>
            </div>
            <div className="search-results-list">
              {searchedExercises.map((exercise) => (
                <div
                  key={exercise.exerciseId}
                  className="exercise-card-container"
                >
                  <ExerciseCard
                    exercise={exercise}
                    isSaved={savedExerciseIds.includes(exercise.exerciseId)}
                    onSave={handleSaveExercise}
                    onRemove={handleRemoveExercise}
                    savedExerciseIds={savedExerciseIds}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="saved-exercises-container">
        <div className="saved-exercises-header">
          <h1>Your Saved Exercises:</h1>
        </div>
        <div className="saved-exercises-list">
          {savedExerciseIds.map((exerciseId) => {
            const exercise = searchedExercises.find(
              (exercise) => exercise.exerciseId === exerciseId
            );
            return (
              <div key={exerciseId} className="exercise-card-container">
                <ExerciseCard
                  exercise={exerciseId}
                  onRemove={handleRemoveExercise}
                  savedExerciseIds={savedExerciseIds}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchExercises;
