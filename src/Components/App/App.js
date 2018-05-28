import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Spotify from '../../util/Spotify.js';
import {SearchResults} from '../SearchResults/SearchResult';
import {SearchBar} from '../SearchBar/SearchBar';
import {PlayList} from '../Playlist/Playlist';
class App extends React.Component {
    constructor (props) {
        super (props);
        this.state = { 
            searchResults: /*[{
                name: 'a',
                album: 'b',
                artist: 'c',
                id: 0
            }, {
                name: 'd',
                album: 'e',
                artist: 'f',
                id: 1
            }],*/[{
                name: 'We Cry',
                artist: 'The Script',
                album: 'The Script',
                id: 0
            }],
            playlistName: "aaabb",
            playlistTracks: [{
                name: 'Turn Back Time',
                artist: 'Daniel Schulz',
                album: 'Turn Back Time',
                id: 1
            }]
        }
        this.addTrack = this.addTrack.bind (this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }
    addTrack (track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        }
        
        this.setState (prevState => ({playlistTracks: [...prevState.playlistTracks, track]}));
    }
    removeTrack (track) {
        let  newplaylistTracks = this.state.playlistTracks.filter (savedTrack => savedTrack.id !== track.id);
        console.log(newplaylistTracks);
        this.setState( {playlistTracks: newplaylistTracks} );
    }
    updatePlaylistName (name) {
        this.setState( {playlistName: name});
    }
    savePlaylist () {
        let trackURIs = this.state.playlistTracks.map(saveTrack => saveTrack.uri);
        Spotify.savePlaylist(this.state.playlistName, trackURIs);
        this.setState({playlistName: 'New Playlist',
                      playlistTracks: [] });
    }
    search (term) {
        //Spotify.getAccessToken();
        console.log(term);
        Spotify.search(term).then(results => {
            this.setState({searchResults: results});
            console.log(results); 
            }
        )

    }
    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                    <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
