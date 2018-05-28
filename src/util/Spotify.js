let token= '';
let clientID = '6f6390ffab564e97913738b1aa561d87';
let redURI = 'http://gyxjammming.surge.sh';
let expireTime = null;
let Spotify  = {
    getAccessToken() {
        if (token !== '') {
            return token;
        } else {
            
            let matchUrl = window.location.href.match(/access_token([^&]*)/);
            let matchTime = window.location.href.match(/expires_in=([^&]*)/);
            //console.log(token);
            if (matchUrl === null || matchTime === null) {
                window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redURI}`;
                return;
            } else {
                token = matchUrl[0].slice(13);
                expireTime = matchTime[0].slice(10);
                window.setTimeout(()=> token = '', expireTime * 1000);
                console.log(expireTime);
                window.history.pushState('Acces Token', null, '/');
                //return token;
            }
            
            
        }
    },
    search (term) {
        
        this.getAccessToken();
        console.log(token);
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { 'Authorization': `Bearer ${token}`}
        }).then(response => {
            //console.log(response.json());
            return response.json();
        }).then(data => {
            console.log(data);
            if (data.tracks.items === {}) {
                console.log('undefined');
                return [];
            }
            console.log(data.tracks.items);
            return data.tracks.items.map (track => {
                     return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                
            
                });
            
            }
            
        );
    },
    savePlaylist(playlistName, trackURIs) {
        if (playlistName === null && trackURIs === null) {
            return;
        }
        let dtoken = token;
        console.log(dtoken);
        let dHeaders = {Authorization: `Bearer ${dtoken}` };
        let dUserID = '';
        let playlistID = '';
        fetch ('https://api.spotify.com/v1/me', { 
            headers: {dHeaders}
            
        }).then (response => {
            let ans = response.json();
            console.log(ans);
            return ans;
        }).then (ans => {
            console.log (ans);
            //dUserID = data.id;
        }).catch(error => (console.log('failed', error)));
        
        fetch (`https://api.spotify.com/v1/users/${dUserID}/playlists`, {
            headers: {dHeaders, 
                      'Content-Type': 'application/json'
                    },
            method: 'POST',
            body: {'name' : playlistName}
        }).then (response => {
            
            let ans = response.json();
            console.log(ans);
            return ans;
        }).then(data => {
            console.log (data);
            playlistID = data.id;
            return playlistID;
        }).catch(error => (console.log('failed', error)));
        
        fetch (`https://api.spotify.com/v1/users/${dUserID}/playlists/${playlistID}/tracks`, {
            headers: {dHeaders,
                      'Content-Type': 'application/json'
                     },
            method: 'POST',
            body: {
                'uris': trackURIs
            }
        }).then (response => {
            let ans = response.json();
            console.log(ans);
            return ans;
        })
        .then (data => {
            console.log (data);
                playlistID = data.id;
        }).catch (error => (console.log('failed', error)));
    }
};

export default Spotify;