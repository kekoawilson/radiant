/* eslint-disable space-before-function-paren */
import React, { Component } from "react";
import "./App.css";
import ImgModal from './ImageModal';
import ImageCard from './ImageCard';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import axios from 'axios';
import { THUMBNAIL } from './constants';
import { Grid } from "semantic-ui-react";

class App extends Component {
    constructor() {
        super();
        this.state = {
            images: [],
            id: null,
            open: false,
            userInput: '',
            perPage: 0,
            total: 0
        };
        this.urlBuilder = this.urlBuilder.bind(this);
        this.imageFinder = this.imageFinder.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.close = this.close.bind(this);
    }

    componentWillMount() {
    }

    handleChange(event) {
        this.setState({ userInput: event.target.value });
    }

    handleSearch() {
        axios.get('http://localhost:3001/api/search', {
            params: {
                keyword: this.state.userInput
            }
        }).then(res => {
            this.setState({
                images: res.data.photos.photo,
                perPage: res.data.photos.perpage,
                total: res.data.photos.total
            });
        }).catch(error => console.error(error));
    }

    urlBuilder(obj, imgSize) {
        const { id, secret, server, farm, title } = obj;
        const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_${imgSize}.jpg`;
        return {
            url,
            id,
            title
        };
    }

    imageFinder(array, id) {
        let correctImgObj;
        array.forEach(imageObj => {
            if (imageObj.id === id) {
                correctImgObj = imageObj;
            }
        });
        return correctImgObj;
    }

    handleClick(id) {
        this.setState({
            id: id,
            open: true
        });
    }

    close() {
        this.setState({ open: false });
    }

    render() {
        const { open, images, id } = this.state;
        const picture = images.map(element => {
            const { url, id, title } = this.urlBuilder(element, THUMBNAIL);
            return <ImageCard key={id} url={url} title={title} onClick={() => this.handleClick(id)} />;
        });
        console.log('picture', picture);

        return (
            <div className="App">
                <header className="header">
                    <h1>The Search Shindig</h1>
                </header>
                <body className="body">
                    <SearchInput onChange={this.handleChange} />
                    <SearchButton onClick={this.handleSearch} />
                    {images.length > 0 &&
                    <Grid centered relaxed divided columns={4}>
                        <Grid.Column divided verticalAlign="middle">
                            {picture}
                        </Grid.Column>
                    </Grid>
                    }
                    {open && <ImgModal images={images} id={id} urlBuilder={this.urlBuilder} open={open} close={this.close} />}
                </body>
                <footer className="footer">
                    <p>Showing {this.state.perPage} of {this.state.total} results.</p>
                </footer>
            </div>
        );
    }
}

export default App;
