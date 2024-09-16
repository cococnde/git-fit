// Retrieve saved exercise IDs from localStorage
export const getSavedExerciseIds = () => {
  const savedExerciseIds = localStorage.getItem('saved_exercises')
    ? JSON.parse(localStorage.getItem('saved_exercises'))
    : [];

  return savedExerciseIds;
};

// Save exercise IDs to localStorage
export const saveExerciseIds = (exerciseIdArr) => {
  if (exerciseIdArr.length) {
    localStorage.setItem('saved_exercises', JSON.stringify(exerciseIdArr));
  } else {
    localStorage.removeItem('saved_exercises'); // Clear localStorage if empty
  }
};

// Remove a specific exercise ID from localStorage
export const removeExerciseId = (exerciseId) => {
  const savedExerciseIds = localStorage.getItem('saved_exercises')
    ? JSON.parse(localStorage.getItem('saved_exercises'))
    : null;

  if (!savedExerciseIds) {
    return false;
  }

  // Filter out the exercise to be removed
  const updatedSavedExerciseIds = savedExerciseIds.filter(
    (savedExerciseId) => savedExerciseId !== exerciseId
  );

  if (updatedSavedExerciseIds.length) {
    localStorage.setItem(
      'saved_exercises',
      JSON.stringify(updatedSavedExerciseIds)
    );
  } else {
    localStorage.removeItem('saved_exercises'); // Remove key if no exercises are left
  }

  return true; // Operation successful
};

// Save exercises to localStorage
export const saveExercises = (exercises) => {
  localStorage.setItem('saved_exercises_data', JSON.stringify(exercises));
};

// Retrieve saved exercises from localStorage
export const getSavedExercises = () => {
  const savedExercises = localStorage.getItem('saved_exercises_data');
  return savedExercises ? JSON.parse(savedExercises) : [];
};
