
import './App.css';
import React from 'react';
import {SearchBar} from '../Components/SearchBar';
import {SearchResults} from '/Components/SearchResults';
import {Playlist} from './Components/Playlist';
import {Spotify} from './util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchResults: [],
      playlistNames: "",
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }


  addTrack(track){
    if( !this.state.playlistTracks.some(playlistTrack => (playlistTrack.id === track.id)) ) {
      this.state.playlistTracks.push(track);
      this.setState({playlistTracks : this.state.playlistTracks});
    }
  }

  removeTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks.filter(playlistTrack => (playlistTrack.id !== track.id));
    this.setState({playlistTracks: newPlaylistTracks});
  }

  updatePlaylistName(name){
       this.setState({playlistName: name})
  }

  savePlaylist(){
    console.log("in save playlist app.js")
    let tracksUri = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, tracksUri);
  }

  async search(term){
    console.log(`You are searching for the song ${term}`);
    Spotify.getAccessToken();
    let searchResults = await Spotify.search(term);
    this.setState({searchResults: searchResults})
  }


 
  render(){
  return (
    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSeacrh = {this.search} />
    <div className="App-playlist">
      <SearchResults searchResult = {this.state.searchResults} onAdd = {this.addTrack} />
      <Playlist playlistName = {this.state.playlistNames} playlistTracks = {this.state.playlistTracks} onRemove = {this.removeTrack} onNameChange = {this.updatePlaylistName} onSave = {this.savePlaylist}/>
    </div>
  </div>
</div>
  );
}
}
export default App;
