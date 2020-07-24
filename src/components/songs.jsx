import React, { Component } from "react";
import { getSongs } from '../services/songService';
import { Link } from 'react-router-dom';
import Like from './common/like'
import SearchBox from "./searchBox";

class Songs extends Component {
  state = {
      songs: getSongs(),
      searchQuery: ""
  };

  handleSearch = query => {
    this.setState({ searchQuery: query});
  };
  handleDelete = (song) => {
    const songs = this.state.songs.filter(s => s._id !== song._id);
    this.setState({ songs }); 
  }

  handleLike = song => {
      const songs = [...this.state.songs];
      const index = songs.indexOf(song);
      songs[index] = { ...songs[index] }
      songs[index].liked = !songs[index].liked;
      this.setState({ songs });
  }

  getPagedData = () => {
    const {
      searchQuery,
      songs: allSongs
    } = this.state;

    
    let filtered = allSongs;
    if (searchQuery)
      filtered = allSongs.filter(m =>
        m.titulo.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        m.artista.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        m.genero.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    return { totalCount: filtered.length, data: filtered };
  };

  render() {

    const { length: count } = this.state.songs;

    if (count === 0) 
        return <p>No hay canciones en la base de datos</p>;

    const { totalCount, data: songs} = this.getPagedData();
    return ( 
        <React.Fragment>
            <h1>Lista de canciones</h1>
            <Link to="/newSong/new" 
                className="btn btn-primary" 
                style = {{ marginBottom: 20, marginTop:20 }}
            >
                Nueva canción
            </Link>
            <p>Hay {totalCount} canciones en la base de datos</p>
            <SearchBox value={this.state.searchQuery} onChange={this.handleSearch} />
            <table className="table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Artista</th>
                        <th>Género</th>
                        <th>Duración</th>
                        <th/>
                        <th/>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    { songs.map(song => (
                    <tr key={song._id}>
                        <td>{song.titulo}</td>
                        <td>{song.artista}</td>
                        <td>{song.genero}</td>
                        <td>{song.duracion}</td>
                        <td>
                            <Like liked={song.liked} onClick={() => this.handleLike(song)}/>
                        </td>
                        <td>
                            <Link to={`/newSong/${song._id}`}>
                                <button 
                                    className="btn btn-primary sm">
                                        <i class="fa fa-pencil-square-o" 
                                        aria-hidden="true">
                                        </i>
                                </button>
                            </Link>
                        </td>
                        <td>
                            <button 
                                onClick={() => this.handleDelete(song)} 
                                className="btn btn-danger sm">
                                    <i class="fa fa-trash" 
                                    aria-hidden="true">
                                    </i>
                            </button>
                        </td>
                    </tr>
                    ))}            
                </tbody>
            </table>
        </React.Fragment>
    );
  }
}

export default Songs;
