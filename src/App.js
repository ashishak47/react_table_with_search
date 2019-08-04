import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchString: ""
    }
  }

  onSubmit = () => {
    // event.stopPropagation();

    let movieName = document.getElementById('name-input').value;
    let ratings = document.getElementById('ratings-input').value;
    let duration = document.getElementById('duration-input').value;
    let durationInMin = 0;
    if (!movieName || !ratings || !duration) {
      return;
    }
    if (!duration.includes('h') && !duration.includes('m')) {
      return;
    }
    document.getElementById('name-input').value = "";
    document.getElementById('ratings-input').value = "";
    document.getElementById('duration-input').value = "";



    if (duration.includes('h')) {
      durationInMin = Number(duration.split('h')[0]) * 60;
    }
    else if (duration.includes('m')) {
      durationInMin = Number(duration.split('m')[0]);
    }
    else {
      durationInMin = NaN;
    }
    let movies = [...this.state.movies];
    let finalMovies = [], isDuplicate = false;
    const newMovie = { name: movieName, ratings: ratings, duration: duration, durationInMin: durationInMin };
    for (let i = 0; i < movies.length; i++) {
      let movie = movies[i];
      if (movie.name === movieName) {
        finalMovies.push(newMovie);
        isDuplicate = true;
      }
      else {
        finalMovies.push(movie);
      }
    }
    if (!isDuplicate) {
      finalMovies.push(newMovie);
    }

    this.setState({ movies: finalMovies })



  }
  handleUserInput = (filterText) => {
    this.setState({ searchString: filterText });
  };



  render() {
    return (
      <>
        <Form onSubmit={this.onSubmit} />
        <SearchBar onUserInput={this.handleUserInput} />
        <Table movies={this.state.movies} filterText={this.state.searchString} />

      </>
    );
  }
}

const Form = (props) => {
  return (
    <div>
      <label>Movie Name</label>
      <input name="movieName" type="text" id="name-input" />

      <label>Ratings</label>
      <input name="ratings" type="text" id="ratings-input" />

      <label>Duration</label>
      <input name="duration" type="text" id="duration-input" />

      <button onClick={props.onSubmit} id="submit-button" >Submit</button>
    </div>


  )
}

class SearchBar extends React.Component {
  handleChange = () => {
    if (!this.refs.input.value.length || this.refs.input.value.length > 2) {
      this.props.onUserInput(this.refs.input.value);
    }

  }
  render() {
    return (
      <div>

        <input id="search-input" type="text" value={this.props.filterText} ref="input" onChange={this.handleChange} />

      </div>

    );
  }

}

class Table extends Component {

  render() {
    let filterText = this.props.filterText;
    let moviesList = [...this.props.movies];
    let sortedList = moviesList.sort(function (a, b) {
      return parseFloat(b.durationInMin) - parseFloat(a.durationInMin);
    });
    let list = sortedList.filter(function (movie) {
      return movie.name.indexOf(filterText) !== -1
    });
    const style = {
      display: list.length === 0 ? "" : "none"
    }


    return (
      <table id="directory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Ratings</th>
            <th>Duration</th>
          </tr>
        </thead>

        <tbody>
          
              <tr style={style} key="No-Results-Found" id="no-result">
                <td>No Results Found</td>
                <td></td>
                <td></td>
              </tr>
              
          {list.map(movie =>
            (<tr key={movie.name}>
              <td>{movie.name}</td>
              <td>{movie.ratings}</td>
              <td>{movie.duration}</td>
            </tr>)
          )
          }

        </tbody>

      </table>


    )

  }
}



export default App;
