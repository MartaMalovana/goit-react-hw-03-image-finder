import React, {Component} from 'react';
import {FcSearch} from 'react-icons/fc';
import { IconContext } from "react-icons";
import {Header, SearchForm, Button, Input} from './Searchbar.styled';



export default class Searchbar extends Component {
    state = {
        searchWord: null
    };

    handleChange = event => {
        this.setState({searchWord: event.currentTarget.value});
    };

    handleSubmit = event => {
        event.preventDefault();

        if(this.state.searchWord.trim() === '') {
            return;
        };

        this.props.onSubmit(this.state.searchWord);
        this.setState({searchWord: ''});
    };

    render () {
        return (
            <Header className="searchbar">
                <SearchForm className="form" onSubmit={this.handleSubmit}>
                    <Button type="submit" className="button">
                        <IconContext.Provider value={{size: "2em"}}><FcSearch/></IconContext.Provider>
                    </Button>
                
                    <Input
                        onChange={this.handleChange}
                        className="input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.searchWord}
                    />
                </SearchForm>
            </Header>
      );
    };   
};

