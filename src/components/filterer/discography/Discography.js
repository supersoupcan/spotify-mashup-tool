import React, { Component } from 'react';
import styles from './Discography.css';

import { keyFilters, tempoFilters, keys } from '../../../models';

export default class Discograpy extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const filteredOnce = this.props.discography.tracks.filter(item => {
      if(!keyFilters[this.props.keyFilter].mode.filter){
        return true;
      }else{
        return keyFilters[this.props.keyFilter].mode.select.some(testInterval => (
          (this.props.keyTarget + testInterval) % 24 === (item.mode * 12) + item.key
        ));
      }
    });
    const filteredTwice = filteredOnce.filter(item => {
      if(!tempoFilters[this.props.tempoFilter].mode.filter){
        return(true); 
      }else{
        const tempoArr = [item.tempo/2, item.tempo, item.tempo*2];
        const percent = tempoFilters[this.props.tempoFilter].mode.select;
        const lower = this.props.tempo*(1+percent) ;
        const higher = this.props.tempo*(1-percent);
        
        return tempoArr.some((testTempo, index) => {
          if(testTempo <= lower && testTempo >= higher){
            item.times=index;
            return true;
          }else{
            return false;
          }
        });
      }
    });
    
    return(
      <div className={styles.discography}>
        {filteredTwice.map((track, index) => {
          return(
            <Song
              setTargets={this.props.setTargets}
              key={index}
              track={track}
              settings={this.props.settings}
            />
          );
        })}
        {
          filteredTwice.length === 0 && 
          <div className={styles.noResults}>
            No results found
          </div>
        }
      </div>
    );
  }
}

export class Song extends Component{
  render(){
    const duration = this.props.track.duration_ms;
    let seconds = ((duration/1000)%60).toFixed(0);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    
    let minutes = ((duration/(1000*60))%60).toFixed(0);

    const key = this.props.track.mode === 1 
      ? this.props.track.key + 12 
      : this.props.track.key;
    
    let times;
    switch(this.props.track.times){
      case 0 : {
        times = "(0.5x) ";
        break;
      }
      case 2: {
        times = "(2x) ";
        break;
      }
      default: {
        times = "";
        break;
      }
    }
    return(
      <div 
        className={styles.song}
        onClick={() => this.props.setTargets(
          this.props.track.tempo, this.props.track.mode, this.props.track.key
        )}
      >
        <span className={styles.name}>
          {this.props.track.name}
        </span>
        <span className={styles.time}>
          {minutes + ":" + seconds}
        </span>
        <span className={styles.key}>
          {keys[key][this.props.settings]}
        </span>
        <span className={styles.tempo}>
          {(times) + this.props.track.tempo + " BPM"}
        </span>
      </div>
    );
  }
}