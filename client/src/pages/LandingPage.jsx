import React, { useState, useEffect } from 'react'; // Ensure useState and useEffect are imported
import '../styles/LandingPage.css';
import SearchExercises from './searchexercise.jsx'; // Import the SearchExercises component

const LandingPage = () => {
  return (
    <div className="landing-page">
      <main>
        <section id="search">
          <SearchExercises /> {/* Render the SearchExercises component */}
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
