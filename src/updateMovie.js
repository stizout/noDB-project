import React, { Component } from 'react';
import axios from 'axios'


class Update extends Component {
    constructor() {
        super();
        this.handlePostUpdate = this.handlePostUpdate.bind(this);
        this.state = {
            title: '',
            date: '',
            genre: '',
            imdb: '',
            poster: '',
            update: false,
        }
    }

    showUpdate() {
        this.setState({update: !this.state.update})
    }

    handleUpdate(key, userInput) {
        this.setState({[key]: userInput})
    }

    handlePostUpdate(id) {
        axios.put(`/api/update/${id}`, this.state).then(res => {
            
            this.setState({
                title: '',
                date: '',
                genre: '',
                imdb: '',
                poster: '',
            })
        })
        this.props.reloadMovies();
    }
   
    render() {
        return (
            <div>
                <button onClick={() => this.showUpdate()} className="insideButtons">Edit</button>
                {this.state.update ? 
                <div>
                    <p>Title: <input value={this.state.title} onChange={(e) => this.handleUpdate('title', e.target.value)}/></p>
                    <p>Date: <input value={this.state.date} onChange={(e) => this.handleUpdate('date', e.target.value)}/></p>
                    <p>Genre: <input value={this.state.genre} onChange={(e) => this.handleUpdate('genre', e.target.value)}/></p>
                    <p>IMDB: <input value={this.state.imdb} onChange={(e) => this.handleUpdate('imdb', e.target.value)}/></p>
                    <p>Poster URL: <input value={this.state.poster} onChange={(e) => this.handleUpdate('poster', e.target.value)}/></p>
                    <p><button onClick={() => this.handlePostUpdate(this.props.id)}>Update</button></p>
                </div>
                    : null}
              
            </div>
        )
    }
}

export default Update