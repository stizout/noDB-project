import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AddMovie from './add-movie';
import Update from './updateMovie';
import Actions from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.reloadMovies = this.reloadMovies.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.state = {
        movies: [],
        temp: '',
        
    }
}
componentDidMount() {
  axios.get('api/viewMovies').then((movies) => {
      this.setState({movies: movies.data});
  })
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

weather() {
  axios.get("https://weather-ydn-yql.media.yahoo.com/forecastrss?w=2459115").then((res) => {
    console.log(res.data.query.results.channel.item.condition.temp);
  })
}


  render() {
    return (
      <div>
        <h1>Welcome to TOP Thr33!</h1>
        <div className="primary">
          <div className="right-nav">
            <Actions 
              movies={this.state.movies}
              reload={this.reloadMovies}
              handleDisable={!this.state.movies.length > 0}
            /> 
              <AddMovie 
                showAddMovie={this.showAddMovie}
                addMovie={this.state.addMovie}
                reloadMovies={this.reloadMovies}
              />
              <button onClick={() => this.weather()}>Temp</button>
          </div>
          <div className="movies-container">
            <Movies
              movies={this.state.movies}
              deleteMovie={this.deleteMovie}
              reloadMovies={this.reloadMovies}
            />
          </div>
        </div>
      </div>
    );
  }
}

const Movies = (props) => {
  return (
    <div>
      {props.movies.map((movie, i) => {
        return (
        <Movie
          key={i}
          movie={movie}
          id={movie.id}
          deleteMovie={props.deleteMovie}
          reloadMovies={props.reloadMovies}
        />
        )
      })}
    </div>
  )
}

const Movie = (props) => {
  return (
    <div>
       <div className="movie-container">
          <div className="image">
            <img src={props.movie.poster} alt={"Movie poster"} />
          </div>
          <div className="movie-info">
            <h1>{props.movie.title}<button onClick={() => props.deleteMovie(props.movie.id)}>X</button></h1>
            <p>Release Year: {props.movie.date}</p>
            <p>Genre: {props.movie.genre}</p>
            <p>IMDB Rating: {props.movie.imdb}</p>
            <Update 
              reloadMovies={props.reloadMovies}
              movies={props.movies}
              id={props.movie.id}
              
            />
          </div>
        </div>
    </div>
  )
}

export default App;
