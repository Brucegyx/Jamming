import React from 'react';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList';

export class PlayList extends React.Component {
    constructor (props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleNameChange (e) {
        this.props.onNameChange(e.target.value);
    }
    render () {
        return (
            <div className="Playlist">
              <input defaultValue={'New Playlist'}/>
              <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval= {true} onChange={this.handleNameChange}/>
              <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
            </div>
        )
    }
}