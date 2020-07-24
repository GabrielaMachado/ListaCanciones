import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getSong, saveSong } from '../services/songService';

class SongsForm extends Form {
    state = {
        data: { 
            titulo: "",
            artista: "",
            genero: "",
            duracion: ""
        },
        genero:[],
        errors:{}
    };

    schema = {
        _id: Joi.string(),
        titulo: Joi.string()
          .required()
          .label("Titulo"),
        generoId: Joi.string()
          .label("Género"),
        artista: Joi.string()
          .required()
          .label("Artista"),
        duracion: Joi.string()
          .required()
          .label("Duración")
      };
    
    componentDidMount() {
        const songId = this.props.match.params.id;
        if (songId === "new") return;

        const song = getSong(songId);
        if (!song) return this.props.history.replace("/");

        this.setState( {data: this.mapToViewModel(song) });
    }

    mapToViewModel(song) {
        return {
            _id: song._id,
            titulo: song.titulo,
            artista: song.artista,
            duracion: song.duracion,
            genero: song.genero
        };
    }

    doSubmit = () => {
        saveSong(this.state.data);
        this.props.history.push("/");
    }

    render(){
        return (
            <div>
                <h1>Nueva canción</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("titulo", "Titulo")}
                    {this.renderInput("artista", "Artista")}
                    {this.renderInput("genero", "Género")}
                    {this.renderInput("duracion", "Duración")}
                    {this.renderButton("Guardar")}
                </form>
            </div>
        )
    }
}

export default SongsForm;