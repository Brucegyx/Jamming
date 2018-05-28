import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';
export class TrackList extends React.Component {
    /*constructor (props) {
        super(props);
        this.renderTracks = this.renderTracks.bind(this);
    }
    
    renderTracks (newtracks) {
        console.log(newtracks);
        if (newtracks === []) {
            console.log('no track');
            return;
        }
        newtracks.map (track => {
        console.log(track);
        return <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
        })
    }*/
    
    render () {
        console.log(this.props.tracks);
        let renderedTracks = this.props.tracks.map(track =>{
                return <Track key={track.id} track={track} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove}/>
                        
                    });
        console.log(renderedTracks);
        return (
            
            <div className="TrackList">
                
                {renderedTracks}
                 
                
                
            
            </div>
        
        )
    }
}
