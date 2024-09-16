import React, { useState, useEffect } from 'react';
import '../styles/searchexercise.css';
import ExerciseCard from '../components/ExerciseCard';
import {
  saveExerciseIds,
  getSavedExerciseIds,
  saveExercises,
  getSavedExercises,
} from '../utils/localstorage';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_EXERCISE, REMOVE_EXERCISE } from '../utils/mutations';
import { SEARCH_EXERCISES } from '../utils/queries';

const SearchExercises = () => {
  const [searchedExercises, setSearchedExercises] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedExerciseIds, setSavedExerciseIds] = useState(
    getSavedExerciseIds()
  );
  const [savedExercisesMap, setSavedExercisesMap] = useState(
    new Map(
      getSavedExercises().map((exercise) => [exercise.exerciseId, exercise])
    )
  );
  const [saveExercise] = useMutation(SAVE_EXERCISE);
  const [removeExercise] = useMutation(REMOVE_EXERCISE);
  const [error, setError] = useState('');

  const {
    data,
    loading,
    error: queryError,
  } = useQuery(SEARCH_EXERCISES, {
    variables: { searchTerm: searchInput },
    skip: !searchTerm,
    fetchPolicy: 'network-only',
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
      setError('');
    }
  }, [data, queryError]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!searchInput) {
      setError('Please enter a search term');
      return;
    }
    setSearchTerm(searchInput);
  };

  const handleSaveExercise = async (exerciseId) => {
    const exerciseToSave = searchedExercises.find(
      (exercise) => exercise.exerciseId === exerciseId
    );

    if (!exerciseToSave) {
      console.log('Exercise not found for saving:', exerciseId);
      return;
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveExercise({
        variables: {
          newExercise: {
            name: exerciseToSave.name,
            force: exerciseToSave.force,
            level: exerciseToSave.level,
            mechanic: exerciseToSave.mechanic,
            equipment: exerciseToSave.equipment,
            primaryMuscles: exerciseToSave.primaryMuscles,
            secondaryMuscles: exerciseToSave.secondaryMuscles,
            instructions: exerciseToSave.instructions,
          },
        },
      });

      const updatedSavedExerciseIds = [
        ...savedExerciseIds,
        exerciseToSave.exerciseId,
      ];
      setSavedExerciseIds(updatedSavedExerciseIds);
      saveExerciseIds(updatedSavedExerciseIds);

      // Update the savedExercisesMap
      const updatedSavedExercisesMap = new Map(savedExercisesMap).set(
        exerciseToSave.exerciseId,
        exerciseToSave
      );
      setSavedExercisesMap(updatedSavedExercisesMap);
      saveExercises(Array.from(updatedSavedExercisesMap.values()));

      // Remove from searchedExercises
      setSearchedExercises((prevExercises) =>
        prevExercises.filter((exercise) => exercise.exerciseId !== exerciseId)
      );
    } catch (err) {
      console.error('Error Saving Exercise:', err);
    }
  };

  const handleRemoveExercise = async (exerciseId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeExercise({ variables: { exerciseId } });

      const updatedSavedExerciseIds = savedExerciseIds.filter(
        (id) => id !== exerciseId
      );
      setSavedExerciseIds(updatedSavedExerciseIds);
      saveExerciseIds(updatedSavedExerciseIds);

      // Update the savedExercisesMap
      const updatedSavedExercisesMap = new Map(savedExercisesMap);
      updatedSavedExercisesMap.delete(exerciseId);
      setSavedExercisesMap(updatedSavedExercisesMap);
      saveExercises(Array.from(updatedSavedExercisesMap.values()));

      // Add back to searchedExercises
      const exerciseToRestore = savedExercisesMap.get(exerciseId);

      if (exerciseToRestore) {
        setSearchedExercises((prevExercises) => [
          ...prevExercises,
          exerciseToRestore,
        ]);
      }
    } catch (err) {
      console.error('Error Removing Exercise:', err);
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
        {error && <p className="error-message">{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && searchedExercises.length > 0 && (
          <div className="search-results">
            <div className="search-results-header">
              <h1>Viewing {searchedExercises.length} Search Results:</h1>
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
          {savedExerciseIds.length === 0 ? (
            <p>No saved exercises yet.</p>
          ) : (
            savedExerciseIds.map((exerciseId) => {
              const exercise = savedExercisesMap.get(exerciseId);
              return exercise ? (
                <div key={exerciseId} className="exercise-card-container">
                  <ExerciseCard
                    exercise={exercise}
                    onSave={handleSaveExercise}
                    onRemove={handleRemoveExercise}
                    savedExerciseIds={savedExerciseIds}
                  />
                </div>
              ) : (
                <p className="exercise-data-not-found" key={exerciseId}>
                  Exercise not found.
                </p>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchExercises;
