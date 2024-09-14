import React from 'react';
import ClientHeader from '../components/ClientHeader'; // Import the client-specific header
import SearchExercises from './searchexercise.jsx'; // Import the SearchExercises component
import '../styles/ClientPage.css'; // Import any specific styles for the Client Page

const ClientPage = () => {
  return (
    <div className="client-page">
      <ClientHeader /> {/* Render the Client-specific Header component */}
      <main>
        <h1>Welcome to Client Page</h1>
        <section id="search">
          <SearchExercises /> {/* Render the SearchExercises component */}
        </section>
      </main>
    </div>
  );
};

export default ClientPage;
