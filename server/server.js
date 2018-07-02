const express = require('express'),
bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

let movies = [
    {
        title: 'The Shawshank Redemption',
        date: 1994,
        genre: 'Drama',
        imdb: 9.3,
        poster: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
        id: 0,
    },
    {
        title: 'The Dark Knight',
        date: 2008,
        genre: 'Drama, Action, Crime',
        imdb: 9.0,
        poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg',
        id: 1,
    },
    {
        title: 'Fight Club',
        date: 1999,
        genre: 'Drama',
        imdb: 8.8,
        poster: 'https://m.media-amazon.com/images/M/MV5BMjM1NzUwMjgtZDMyZC00OTdmLWE2YjYtMzQxOTg5MDY4MTQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg',
        id: 2,
    }
];

app.get('/api/viewMovies', (req, res) => {
    res.json(movies)
})

app.post('/api/addmovie', (req,res) => {
    const { title, date, genre, imdb, poster} = req.body
    const length = movies.length - 1
    console.log(length);
    let newMovie = {
        title: title,
        date: Number(date),
        genre: genre,
        imdb: Number(imdb),
        poster: poster,
        id: length + 1
    }

    movies.push(newMovie);
    console.log(movies)
    res.json(movies);
})

app.delete(`/api/viewMovies/delete/:id`, (req, res) => {
    let index = null
    movies.forEach((movie, i) => {
        if(movie.id == req.params.id) {
            // index = movie.id
            index = i
        }
        return index
    })
    console.log(index)

    // movies.splice(+req.params.id,1)
    movies.splice(index, 1)
    res.json(movies)
})

app.delete('/api/deleteAll', (req, res) => {
    movies = [];
    res.json(movies);
})

app.put(`/api/update/:id`, (req, res) => {
    const { title, date, genre, imdb, poster} = req.body
    const { id } = req.params
    let index = null;
    movies.forEach((movie, i) => {
        if(movie.id == id) {
            index = i
            console.log("index", index)
        }
        return index
    })
    movies[index] = {
        title: title || movies[index].title,
        date: date || movies[index].date,
        genre: genre || movies[index].genre,
        imdb: imdb || movies[index].genre,
        poster: poster || movies[index].poster,
        // id: movies[index].id
    }
    res.json(movies);
})



app.listen(4500, () => console.log("Server Started NoDB!"))