import React, { Component } from 'react';
import styles from './Filterer.css';

import { keys, scales, modes, settings, keyFilters, tempoFilters } from '../../models.js';

import Discography from './discography/Discography.js';
import Search from './search/Search.js';

export default class Filterer extends Component{
  constructor(props){
    super(props);
    this.state = {
      settings: 0,
      tempoFilter: 5,
      keyFilter: 3,
      tempo: 100,
      scale: 0,
      mode: 1,
    };
    
    this.setTargets = this.setTargets.bind(this);
  }
  
  getKeyTarget(){
    let modifiedScale = this.state.scale;
    if(this.state.mode === 1){
      if(this.state.settings === 1){
        modifiedScale = (this.state.scale + 9)%12;
      }
    }
    return (this.state.mode * 12) + modifiedScale;
  }
  
  setTargets(tempo, mode, scale){
    let modifiedScale = scale;
    
    
    if(mode === 1){
      if(this.state.settings === 1){
        modifiedScale = (scale + 3)%12;
      }
    }
    
    console.log(scale);
    console.log(modifiedScale);
    
    this.setState({
      tempo,
      mode,
      scale : modifiedScale
    });
  }
  
  
  changeSettings(e){
    const nextSettings = parseInt(e.target.value, 10);
    let nextScale = this.state.scale;
    if(this.state.mode === 1){
      if(nextSettings === 0){
        nextScale = (this.state.scale + 9)%12;
      }else if(nextSettings === 1){
        nextScale = (this.state.scale + 3)%12;
      }
    }
    
    this.setState({
      settings: nextSettings,
      scale : nextScale
    });
  }
  
  render(){
    return(
      <div>
        <div className={styles.filters}>
          <div className={styles.key}>
            <span>
              <div className={styles.label}>Key</div>
              <Filter 
                options={scales[this.state.settings]}
                value={this.state.scale}
                handleChange={
                  (e) => this.setState({scale : parseInt(e.target.value, 10)})
                }
              />
              <Filter
                options={modes[this.state.settings]}
                value={this.state.mode}
                handleChange={
                  (e) => this.setState({mode : parseInt(e.target.value, 10)})
                }
              />
            </span>
            <div>
              <Filter
                options={keyFilters}
                value={this.state.keyFilter}
                handleChange={
                  (e) => this.setState({keyFilter: parseInt(e.target.value, 10)})
                }
              />
            </div>
          </div>
          <div className={styles.settings}>
            <div className={styles.label}>Mode</div>
            <Filter 
              options={settings}
              value={this.state.settings}
              handleChange={(e) => this.changeSettings(e)}
            />
          </div>
          <div className={styles.tempo}>
            <div>
              <span>
                <div className={styles.label}>BPM</div>
                <input
                  className={styles.tempoInput}
                  value={this.state.tempo} 
                  onChange={(e) => this.setState({tempo : e.target.value})}
                />
              </span>
            </div>
            <div>
              <Filter
                options={tempoFilters}
                value={this.state.tempoFilter}
                handleChange={
                  (e) => this.setState({tempoFilter: parseInt(e.target.value, 10)})
                }
              />
            </div>
          </div>
        </div>
        
          <Search
            getArtistDiscography={this.props.getArtistDiscography}
            discographies={this.props.discographies}
            authentication={this.props.authentication}
          />
          <div className={styles.discographies}>
            {this.props.discographies.map((discography, index) => {
              const component = discography.hasOwnProperty('tracks') ? 
                <Discography
                  settings={this.state.settings}
                  keyFilter={this.state.keyFilter}
                  keyTarget={this.getKeyTarget()}
                  tempoFilter={this.state.tempoFilter}
                  tempo={this.state.tempo}
                  setTargets={this.setTargets}
                  key={index}
                  discography={discography}
                  index={index}
                />
                : <div className={styles.discography} key={index}></div>
                return(
                  component
                );
            })}
          </div>
      </div>
    );
  }
}

export const Filter = (props) => {
  const { name, options, value, handleChange} = props;
  return(
    <span>
      {name && 
        <label>{name}</label>
      }
      <select 
        value={value} 
        onChange={(e) => handleChange(e)}
        className={styles.filterSelect}
      >
        {options.map((option, index) => {
          return(
            <option 
              key={index} 
              value={option.value}
            >{option.name}</option>
          );
        })}
      </select>
    </span>
  );
};