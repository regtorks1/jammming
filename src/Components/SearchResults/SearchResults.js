import React from 'react';
import Tracklist from './Tracklist/TrackList';
import './SearchResults.css';

class SearchResults extends React.Component{
    render(){
        return(
            <div className="SearchResults">
  <h2>Results</h2>
<Tracklist tracks ={this.props.SearchResults} onAdd = {this.props.onAdd} isRemoval ={false}/>
</div>
        )
    }
}

export default SearchResults