import React from 'react';
import './App.css'; // Import the global styles
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Header from './components/Header.jsx'; // Default Header
import Footer from './components/Footer.jsx';
import LandingPage from './pages/LandingPage.jsx';
import SearchExercises from './pages/searchexercise.jsx';
import LoginForm from './components/LoginForm.jsx';
import ClientPage from './pages/ClientPage.jsx'; // Import your client page

// Set up HTTP link to GraphQL endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        {/* Always render the Footer */}
        <Routes>
          {/* Default route with Header */}
          <Route path="/" element={<><Header /><LandingPage /></>} />
          
          {/* Other routes with Header */}
          <Route path="/search" element={<><Header /><SearchExercises /></>} />
          <Route path="/login" element={<><Header /><LoginForm /></>} />
          
          {/* ClientPage route without the default Header */}
          <Route path="/client" element={<ClientPage />} />
        </Routes>
        {/* Place Footer outside of Routes to ensure it appears on all pages */}
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
