import React from 'react';

import styles from '../App.css';

export const SignInPlea = () => {
  return(
    <div className={styles.plea}>
      <div className={styles.margin}>
          This website uses Spotify Webservices, so you need to sign in with a Spotify account to use it.
      </div>
      <div className={styles.margin}>
        Don't worry, it doesn't record any data, and shouldn't obliderate all your playlists. 
      </div>
      <div className={styles.margin}>
          Here is the code if your still unsure.
      </div>
      <div className={styles.center}>
        <a href='./auth/spotify'>
          <button>Sign In</button>
        </a>
      </div>
    </div>
  );
};