import React, {Component} from 'react';
import "./App.css";
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    inputWord: null,
  };

  inputSearch = (inputWord) => {
    this.setState({inputWord: inputWord});
  };

  render () {
    const {inputWord} = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.inputSearch}></Searchbar>
        <ImageGallery searchWord={inputWord}></ImageGallery>
      </div>
    );
  };
};

