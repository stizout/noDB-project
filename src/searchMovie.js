import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            movieTitles: [],
        }
    }

    search(userInput) {
        this.setState({search: userInput})
    }

    handleSearch() {
        axios.get(`http://www.omdbapi.com/?s=${this.state.search}&apikey=41510aa9`).then(res => {
            console.log(res.data.Search)
            this.setState({movieTitles: res.data.Search})
        })
    }

    render() {
        return (
            <div>
                <input onChange={(e) => this.search(e.target.value)} className="movieSearch"/>
                <button onClick={() => this.handleSearch()}>Search</button>
                {this.state.movieTitles.map((movie, i) => {
                    return (
                        <div key={i} className="searchResults">
                            <p>Title: {movie.Title}</p>
                            <p>Release Year: {movie.Year}</p>
                            {/* <p id="posterLink">Poster: {movie.Poster}</p> */}
                            <div id="posterLink">Poster: <img src={movie.Poster}/></div>
                        </div>
                    )
                        
                    
                })}

            </div>
        )
    }
}

export default Search