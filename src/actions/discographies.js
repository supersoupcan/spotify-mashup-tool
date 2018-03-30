import axios from 'axios';
import _ from 'lodash';

import { scales } from '../models';

export function getArtistDiscography(artist, orgIndex){
  return (dispatch) => {
    console.log('0', 'i' + orgIndex, 'artist id', artist.id);
    axios.request({
      url : '/api/artist/' + artist.id + '/albums',
      params : {
        'album_type' :  'album',
        'limit' :  '20'
        }
    })
    .catch(err => {
      if(err) throw err;
    })
    .then(res => {
      //TODO: work around limits by sending multiple requests
      let albumIds = res.data.items.map(item => item.id).toString();
      
      console.log('2', 'i' + orgIndex, 'albumIds', albumIds);
      
      axios.request({
        url : '/api/albums',
        params : {
          ids : albumIds
        }
      })
      .catch(err => {
        if (err) throw err;
      })
      .then(res => {
        const albums = res.data.albums;
        
        let trackIds = [];
        let trackData = [];
        
        console.log('3', 'i' + orgIndex, 'albums', albums);
        
        albums.forEach(album => {
          const albumData = {
            name : album.name,
            //release_date : album.release_date,
            image : album.images[2],
          };
          
          const albumTrackData = album.tracks.items.map(track => (
            {
              album : albumData,
              id : track.id,
              name : track.name,
              track_number : track.track_number,
              disc_number : track.disc_number,
            }
          ));
          
          const albumTrackIds = album.tracks.items.map(track => track.id);
          trackData = trackData.concat(albumTrackData);
          trackIds = trackIds.concat(albumTrackIds);
        });

        console.log('4', 'i' + orgIndex, 'trackData', trackData);
        
        const limitedTrackIds = _.chunk(trackIds, 100);
        let limitedAudioFeatures = [];
        
        limitedTrackIds.forEach((trackIds, index) => {
          limitedAudioFeatures.push({
            completed : false,
            data : null
          });
          
          axios.request({
            url : '/api/audio-features',
            params : {
              ids : trackIds.toString()
            }
          })
          .catch(err => {
            if (err) throw err;
          })
          .then(res => {
            limitedAudioFeatures[index].data = res.data.audio_features;
            limitedAudioFeatures[index].completed = true;
            
            if(limitedAudioFeatures.every(chunk => chunk.completed)){
              console.log('limitedAudioFeatures', limitedAudioFeatures);
              
              const audioFeatures = _.concat(...limitedAudioFeatures.map(chunk => chunk.data));
              
              console.log('audio_features', audioFeatures);
              
              trackData.forEach((track, index) => {
                track.tempo = Math.round(audioFeatures[index].tempo);
                track.key = scales[1][audioFeatures[index].key % 12].value;
                track.mode = (audioFeatures[index].mode + 1) % 2;
                track.duration_ms = audioFeatures[index].duration_ms;
              });
              
              
              console.log('5', 'i' + orgIndex, 'trackData', trackData);
              
              dispatch({
                type : "SET_DISCOGRAPHY",
                payload : {
                  index : orgIndex,
                  discography : {
                    artist : artist,
                    tracks : trackData
                  }
                }
              });
            }
          });
        });
      });
    });
  };
}