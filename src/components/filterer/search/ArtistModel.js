export default class Artist{
  constructor(artist){
    if(artist !== null){
      this.input = "";
      this.results = [];
      this.hasSelected = false;
      this.selection = {};
    }else{
      this.input = artist.name;
      this.results = [];
      this.hasSelected = true;
      this.selection = artist;
    }
    this.timeoutID = null;
    this.isSearching = false;
    Object.freeze(this);
  }
}