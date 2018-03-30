import React, { Component } from 'react';
import styles from './Search.css';

import axios from 'axios';

import ArtistModel from './ArtistModel';

import FA from 'react-fontawesome';

export default class Searcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
        artists : [
          new ArtistModel(),
          new ArtistModel(),
        ]
    };
    
    this.handleInput = this.handleInput.bind(this);
    this.nextArtists = this.nextArtists.bind(this);
    this.confirmation = this.confirmation.bind(this);
  }

  handleInput(artist, index, event) {
    if (artist.timeoutID) {
      clearInterval(artist.timeoutID);
    }
    if (event.target.value === "") {
      this.nextArtists(
        index, {
          input: event.target.value,
          results: [],
          isSearching : false,
        }
      );
    }
    else {
      this.nextArtists(
        index, {
          input: event.target.value,
          timeoutID: setTimeout(() => {
            this.search(index, "artist");
          }, 300),
        }
      );
    }
  }
  
  confirmation(artist, index){
    if(this.props.discographies[index].hasOwnProperty('artist')){
      if(this.props.discographies[index].artist.id !== artist.id){
        this.props.getArtistDiscography(artist, index);
      }
    }else{
      this.props.getArtistDiscography(artist, index);
    }
  
    this.nextArtists(
      index,
      { hasSelected : true, 
         selection : artist
      }
    );
  }
  

  search(index, type) {
    this.nextArtists(
      index,
      { isSearching : true }
    );
    
    axios.request({
      url: "api/search",
      params: {
        q: this.state.artists[index].input.replace(" ", "+"),
        limit: 10,
        type
    }})
    .catch(err => {
      if (err) throw err;
    })
    .then(res => {
      this.nextArtists(
        index, 
        { results: res.data.artists.items, 
         isSearching : false 
        }
      );
    });
  }
  
  nextArtists(index, overwrite) {
    this.setState({
      artists: [
        ...this.state.artists.slice(0, index),
        Object.assign({}, this.state.artists[index], overwrite),
        ...this.state.artists.slice(index + 1)
      ]
    });
  }

  render() {
    const canSubmit = this.state.artists.every(artist => artist.hasSelected);
    return (
      <div className={styles.container}>
        <div className={styles.artists}>
          {this.state.artists.map((artist, index) => {
            return(
              <div key={index} className={styles.artist}>
                {artist.hasSelected ? 
                  <div className={styles.selectedContainer}>
                    <img 
                      className={styles.selectedImage}
                      src={artist.selection.images[2].url}
                    />
                    <div className={styles.selectedName}>
                      {artist.selection.name} 
                    </div>
                    <FA 
                      className={styles.selectedDelete}
                      name="times"
                      onClick={() => this.nextArtists(
                        index,
                        { 
                          hasSelected : false
                        }
                      )}
                    />
                  </div>
                  : 
                  <UnconfirmedArtist 
                    artist={artist}
                    index={index}
                    handleInput={this.handleInput}
                    confirmation={this.confirmation}
                  />
                }
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const UnconfirmedArtist = (props) => {
  const { artist, index } = props;
  return(
    <div className={styles.searchBarHolder}>
      <div className={styles.searchBar}>
        <FA 
          className={styles.icon}
          name='search'
        />
        <input 
          placeholder="Search Artist"
          value={artist.input}
          onChange={(event) => props.handleInput(artist, index, event)}
        />
      </div>
        {(artist.results.length > 0 || artist.isSearching) && 
          <div className={styles.dropDown}>
            {artist.isSearching && 
              <div>
                <FA
                  className={styles.icon}
                  name="spinner"
                  spin
                />
              </div>
            }
            {artist.results.length > 0 &&
              <div>
                {artist.results.map((result, resIndex) => {
                  let src = result.images.length > 0 
                    ? result.images[result.images.length-1].url 
                    : "";
                  return(
                  <div
                    key={resIndex} 
                    className={styles.dropDownItem}
                    onClick={() => props.confirmation(result, index)}
                  >
                    <img 
                      src={src}
                      className={styles.dropDownImage}
                    />
                    <div className={styles.dropDownName}>{result.name}</div>
                  </div>
                )})}
              </div>
            }
          </div>
        }
    </div>
  );
};
