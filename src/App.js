/* eslint-disable space-before-function-paren */
import React, { Component } from "react";
import "./App.css";
import ImgModal from './ImageModal';
import ImageCard from './ImageCard';
import axios from 'axios';
import { THUMBNAIL } from './constants';
import { Button, Input, Grid } from "semantic-ui-react";

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
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.close = this.close.bind(this);
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
        try {
            if (!obj || !imgSize) {
                throw new Error("Missing params to build URL.");
            }
            const { id, secret, server, farm, title } = obj;
            const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_${imgSize}.jpg`;
            return {
                url,
                id,
                title
            };
        } catch (error) {
            console.error(error);
        }
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
        const { open, images, id, perPage, total } = this.state;
        const pictureArray = images.map(element => {
            const { url, id, title } = this.urlBuilder(element, THUMBNAIL);
            return (
                <Grid.Column key={id} stretched width={3}>
                    <ImageCard key={id} url={url} title={title} onClick={() => this.handleClick(id)} />
                </Grid.Column>
            );
        });

        return (
            <div className="App">
                <header className="header">
                    <p>Created for Radiant</p>
                </header>
                <main className="main">
                    <h1>The Search Shindig</h1>
                    <Input size="large" onChange={this.handleChange} placeholder="Search..." />
                    <Button size="large" onClick={this.handleSearch}>Click Here to Search</Button>
                </main>
                <section className="image-section">
                    {images.length > 0 &&
                    <Grid centered relaxed divided columns={5}>
                        <Grid.Row divided>
                            {pictureArray}
                        </Grid.Row>
                    </Grid>
                    }
                    {open && <ImgModal images={images} id={id} urlBuilder={this.urlBuilder} open={open} close={this.close}/>}
                </section>
                <footer className="footer">
                    <p>Showing {perPage} of {total} results.</p>
                </footer>
            </div>
        );
    }
}

export default App;
