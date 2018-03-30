import React, { Component } from 'react';
import styles from './App.css';

import { SignInPlea } from './components/stateless';

import Navbar from './components/navbar/Navbar.js';
import Filter from './components/filterer/Filterer.js';
import Footer from './components/footer/Footer.js';

import { connect } from 'react-redux';

import { checkAuthentication } from './actions/authentication'; 
import { getArtistDiscography } from './actions/discographies';

class App extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.checkAuthentication();
  }
  render(){
    return(
      <div className={styles.app}>
        <div className={styles.content}>
          <Navbar 
            authentication={this.props.authentication}
          />
          {!this.props.authentication.authenticated && 
            <SignInPlea />
          }
          {this.props.authentication.authenticated && 
            <div>
              <div>
                <Filter
                  getArtistDiscography={this.props.getArtistDiscography}
                  authentication={this.props.authentication}
                  discographies={this.props.discographies}
                />
              </div>
          </div>
          }
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return{
    authentication : state.authentication,
    discographies : state.discographies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthentication : () => {
      dispatch(checkAuthentication());
    },
    getArtistDiscography : (artist, index) => {
      dispatch(getArtistDiscography(artist, index));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


/*
        {this.props.authentication.authenticated ?
          <Search
            authentication={this.props.authentication}
          />
          :
          <
            SignInPlea
          />
        }
        
*/