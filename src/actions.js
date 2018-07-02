import React, { Component } from 'react';
import axios from 'axios';



const Actions = (props) => {
    const moviePicker = () =>  {
          const num = Math.floor(Math.random() * props.movies.length)
          alert(props.movies[num].title);
        }

        const deleteAll = () => {
            axios.delete('/api/deleteAll')
            props.reload();
        }
    return (
        <div>
            <button onClick={() => moviePicker()} disabled={props.handleDisable}>What should I watch?</button>
            <button onClick={() => deleteAll()}>Delete All</button>
        </div>
    )
}

export default Actions