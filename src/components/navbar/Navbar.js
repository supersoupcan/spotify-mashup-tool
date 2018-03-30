import React, { Component } from 'react';
import styles from './Navbar.css';

export default class Navbar extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div className={styles.navBar}>
        <div className={styles.menuRegion}>
          <div className={styles.leftBox}>
            <div className={styles.item}>
              Mashup Tool
            </div>
          </div>
          <div className={styles.rightBox}>
            {
              this.props.authentication.authenticated ?
                <SignedIn data={this.props.authentication} /> : 
                <SignedOut />
            }
          </div>
        </div>
      </div>
    );
  }
}

const SignedOut = (props) => {
  return(
    <div className={styles.item}>
      <a href="/auth/spotify"> Sign In </a>
    </div>
  );
};

const SignedIn = (props) => {
  const photos = props.data.profile.photos;
  const src = photos.length > 0 ? photos[photos.length - 1] : "";
  return(
    <div className={styles.item}>
      <img
        className={styles.profileImg} 
        src={src}
      />
      <a className={styles.item} >Sign Out</a>
    </div>
  );
};
