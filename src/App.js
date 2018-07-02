import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AddMovie from './add-movie';
import Update from './updateMovie';
import Actions from './actions';
import Search from './searchMovie'

class App extends Component {
  constructor(props) {
    super(props);
    this.reloadMovies = this.reloadMovies.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.state = {
        movies: [],
        temp: '',
        tempShow: false,
        
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
  })
}

weather() {
  axios.get("http://api.openweathermap.org/data/2.5/weather?zip=85086,us&APPID=dd66dd4ac43dc27c0168320dc3d024c7").then((res) => {
    this.setState({
      temp: Math.floor(res.data.main.temp * (9/5) - 459.67),
      tempShow: !this.state.tempShow
    })
  })
}
  render() {
    return (
      <div>
        <h1 id="header">Welcome to TOP Thr33!</h1>
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
              {this.state.tempShow ?
                <div id="temp">
                  Phoenix: {this.state.temp}
                </div>
              : null}
              <Search />
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
// ***************************************************************************
// ***************************************************************************
// ***************************************************************************
//                        Below are movie components
// ***************************************************************************
// ***************************************************************************
// ***************************************************************************
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
            <img className="image1" src={props.movie.poster} alt={"Movie poster"} />
          </div>
          <div className="movie-info">
            <h1>{props.movie.title}<button onClick={() => props.deleteMovie(props.movie.id)} className="insideButtons">X</button></h1>
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
