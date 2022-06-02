import React, {Component} from 'react';
import Pagination from '@mui/material/Pagination';
import {GalleryList, Container, PaginationContainer} from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

export default class ImageGallery extends Component {
    state = {
        results: null,
        error: null,
        status: 'idle',
        showModal: false,
        modalImg: null,
        page: 1,
        totalResults: null
    };

    fetchAPI = (keyWord) => {
        const myKey = '24296809-9b93a2a7fdd6c9a326bbfa052';
        this.setState({results: null, error: null, status: 'pending'});

        fetch(`https://pixabay.com/api/?q=${keyWord}&page=${this.state.page}&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response => {
                return response.json();
            })
            .then(arr => {
                if(arr.hits.length === 0) {
                    return this.setState({status: 'rejected', error: `No images with ${keyWord}`});
                };
                this.setState({totalResults: arr.totalHits});
                return this.setState({results: arr.hits, status: 'resolved'});
            })
            .catch(error => this.setState({status: 'rejected'}));
    };

    handleClick = (event) => {
        if(!event.target.textContent) {
            return;
        };
        this.setState({page: Number(event.target.textContent)});
    };

    toggleModal = () => {
        this.setState( ({showModal}) => ({
          showModal: !showModal,
        }));
    };
    
    getModalPhoto = (url) => {
        this.setState({modalImg: url});
    };

    loadMorePhotos = () => {
        this.setState(({page}) => ({
            page: page + 1
        }));
    };

    componentDidUpdate (prevProps, prevState) {
        const prevKeyWord = prevProps.searchWord;
        const keyWord = this.props.searchWord;

        if(prevKeyWord !== keyWord) {
            this.setState({page: 1});
            return this.fetchAPI(keyWord);
        }

        if(prevState.page === this.state.page) {
            return;
        } else {this.fetchAPI(keyWord);
            window.scrollTo(0, 0);
        }
    };

    render () {
        const {results, error, status, modalImg} = this.state;

        if(status === 'idle') {
            return <h2>Enter some word to search!</h2>;
        }

        if(status === 'pending') {
            return <Loader></Loader>;
        }

        if(status === 'resolved') {
            return <>
                <GalleryList >
                    {results.map(result => 
                        <ImageGalleryItem 
                            key={result.id} 
                            result={result} 
                            onClick={this.toggleModal} 
                            modalPhoto={this.getModalPhoto}
                        />
                    )}
                </GalleryList>
                {this.state.page !== Math.ceil(this.state.totalResults / 12) && 
                    <Container><Button onClick={this.loadMorePhotos}></Button></Container>
                }
                <PaginationContainer>
                    <Pagination 
                        count={Math.ceil(this.state.totalResults / 12)}
                        page={this.state.page}
                        showFirstButton 
                        showLastButton 
                        shape='rounded' 
                        variant="outlined"
                        onClick={this.handleClick}
                    />
                </PaginationContainer>
                {this.state.showModal && <Modal onClick={this.toggleModal} modalImg={modalImg}><button type='button' onClick={this.toggleModal}></button></Modal>}
                </>
        }

        if(status === 'rejected') {
            return <h2>{error}</h2>;
        }
       };
    };
