// decode a token and get the user's information
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    console.log('Token:', token);
    const isLoggedIn = !!token && !this.isTokenExpired(token);
    console.log('Is Logged In:', isLoggedIn);
    return isLoggedIn;
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      console.log('Decoded Token:', decoded);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      console.error('Token decoding error:', err);
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    const token = localStorage.getItem('token');
    console.log('Retrieved Token:', token);
    return token;
  }

  login(idToken) {
    // Saves user token to localStorage
    console.log('Saving Token:', idToken);
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  setToken(idToken) {
    // Saves user token to localStorage without reloading
    console.log('Setting Token:', idToken);
    localStorage.setItem('token', idToken);
  }

  logout() {
    // Clear user token and profile data from localStorage
    console.log('Removing Token');
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
