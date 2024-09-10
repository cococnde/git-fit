import { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveExerciseIds, getSavedExerciseIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_EXERCISE } from '../utils/mutations';

const SearchExercises = () => {
  
  const [searchedExercises, setSearchedExercises] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved exerciseId values
  const [savedExerciseIds, setSavedExerciseIds] = useState(getSavedExerciseIds());

  // SAVE_EXERCISE mutation in the handleSaveExercise() function 
  const [saveExercise, { error }] = useMutation(SAVE_EXERCISE);

  // set up useEffect hook to save `savedExerciseIds` list to localStorage on component unmount
  useEffect(() => {
    return () => saveExerciseIds(savedExerciseIds);
  });

  // create method to search for exercises and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
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
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving an exercise to our database
  const handleSaveExercise = async (exerciseId) => {
    // find the exercise in `searchedExercises` state by the matching id
    const exerciseToSave = searchedExercises.find((exercise) => exercise.exerciseId === exerciseId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // const response = await saveExercise(exerciseToSave, token);
      const { data } = await saveExercise({
        variables: {
          newExercise: exerciseToSave
        }
      })

      console.log(data)

    
      setSavedExerciseIds([...savedExerciseIds, exerciseToSave.exerciseId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Exercises!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a workout'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedExercises.length
            ? `Viewing ${searchedExercises.length} results:`
            : 'Search for an exercise to begin'}
        </h2>
        <Row>
          {searchedExercises.map((exercise) => {
            return (
              <Col md="4" key={exercise.exerciseId}>
                <Card border='dark'>
                  <Card.Body>
                    <Card.Name>{exercise.name}</Card.Name>
                    <p className='small'>Force: {exercise.force}</p>
                    <p className='small'>Level: {exercise.level}</p>
                    <Card.Text>{exercise.equipment}</Card.Text>
                    <Card.Text>{exercise.instructions}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedExerciseIds?.some((savedExerciseId) => savedExerciseId === exercise.exerciseId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveExercise(exercise.exerciseId)}>
                        {savedExerciseIds?.some((savedExerciseId) => savedExerciseId === exercise.exerciseId)
                          ? 'This exercise has already been saved!'
                          : 'Save this Exercise!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchExercises;