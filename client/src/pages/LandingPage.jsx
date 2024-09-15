import React from 'react'; // Ensure useState and useEffect are imported
import '../styles/LandingPage.css';
import LoginForm from '../components/LoginForm'; // Import the SearchExercises component

import image from '../../assets/hiking.png';


const styles = {
background: {
  backgroundImage: `url{${image}}`,
  backgroundColor: "#7fc7d9",
  backgroundPosition: "center",
  backgroundSize: "cover",
},
};

const LandingPage = () => {
  return (
    <div className="landing-page" style={styles.backgroundPosition}>
      <main>
        <section id="search">
          <LoginForm /> {/* Render the SearchExercises component */}
        </section>
        {/* <img className='image'
    
          src={image}
          alt="hiking"
          style={{ width: "100%", height: "auto" }}
          /> */}
      </main>
    </div>
  );
};

export default LandingPage;
