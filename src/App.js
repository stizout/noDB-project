import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AddMovie from './add-movie';
import Update from './updateMovie';

class App extends Component {
  constructor() {
    super();
    this.moviePicker = this.moviePicker.bind(this);
    this.reloadMovies = this.reloadMovies.bind(this);
    // this.updateMovie = this.updateMovie.bind(this);
    this.state = {
        movies: [],
        
    }
}
componentDidMount() {
  axios.get('api/viewMovies').then((movies) => {
      this.setState({movies: movies.data});
  })
}

moviePicker() {
  const num = Math.floor(Math.random() * this.state.movies.length)
  alert(this.state.movies[num].title);
}

reloadMovies() {
  axios.get('/api/viewMovies').then(res => {
    this.setState({movies: res.data})
  })
}

deleteMovie(id) {
  axios.delete(`/api/viewMovies/delete/${id}`).then(res => {
    this.setState({movies: res.data})
  }).catch(err => {console.log(err)})
}

  render() {
    const movies = this.state.movies.map((e,i) => {
      return (
        <div key={i} className="movie-container">
          <div className="image">
            <img src={e.poster} alt={"Movie poster"} />
          </div>
          <div className="movie-info">
            <h1>{e.title}<button onClick={() => this.deleteMovie(e.id)}>X</button></h1>
            <p>Release Year: {e.date}</p>
            <p>Genre: {e.genre}</p>
            <p>IMDB Rating: {e.imdb}</p>
            <Update 
              reloadMovies={this.reloadMovies}
              updateMovie={this.updateMovie}
              movies={this.state.movies}
              
            />
          </div>
        </div>
      )
      
    })
    return (
      <div>
        <h1>Welcome to TOP Thr33!</h1>
        <div className="primary">
          <div className="right-nav">
            <p><button onClick={() => this.moviePicker()}>Which movie should i watch?</button></p>
              <AddMovie 
                showAddMovie={this.showAddMovie}
                addMovie={this.state.addMovie}
                reloadMovies={this.reloadMovies}
              />
          </div>
          <div className="movies-container">
            {movies}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
