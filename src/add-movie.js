import React, { Component } from 'react';
import axios from 'axios'

class AddMovie extends Component {
    constructor() {
        super();
        this.showAddMovie = this.showAddMovie.bind(this);
        this.state = {
            title: '',
            year: '',
            genre: '',
            imdb: '',
            poster: '',
            addMovie: false,
        }
    }

    handleInput(key, userInput) {
        this.setState({ [key]: userInput})
        }
    showAddMovie() {
        this.setState({addMovie: !this.state.addMovie})
          }

    handleAddMovie() {
        axios.post('/api/addmovie/', this.state).then((res) => {
            this.setState({
                title: '',
                year: '',
                genre: '',
                imdb: '',
                poster: '',
            })
            
        })
        this.props.reloadMovies()
    }

    render() {
        return (
            <div>
                <button onClick={this.showAddMovie}>Add Movie</button>
                    {this.state.addMovie ? 
                        <div>
                            <p>Title:<input value={this.state.title} onChange={(e) => this.handleInput('title', e.target.value)}/></p>
                            <p>Date: <input value={this.state.year} onChange={(e) => this.handleInput('year', e.target.value)}/></p>
                            <p>Genre: <input value={this.state.genre} onChange={(e) => this.handleInput('genre', e.target.value)}/></p>
                            <p>IMDB Rating:<input value={this.state.imdb} onChange={(e) => this.handleInput('imdb', e.target.value)}/></p>
                            <p>Poster: <input value={this.state.poster} onChange={(e) => this.handleInput('poster', e.target.value)}/></p>
                            <p><button onClick={() => this.handleAddMovie()}>Add</button></p>
                        </div>
                        : null}
            </div>
        )
    }
}

export default AddMovie