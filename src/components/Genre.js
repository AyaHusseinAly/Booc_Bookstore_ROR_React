import React, { Component } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/headerFooter.css';

class Genre extends Component {
    state={
        results:[]
    }

    async componentDidMount(){ //API Links will be edited to use from implemented Facade Class methods

        axios.get("https://www.googleapis.com/books/v1/volumes?q=+subject:"+this.props.match.params.id+"&startIndex=0&maxResults=40&orderBy=newest&key=AIzaSyBPgNZgauQGDO-H2QeZUREJ_ift0AZmyXY")
        .then(response => {
            this.setState({results:response.data.items});
        });
    }
    render() {

        return (
           < SearchResults items={this.state.results} flag={1}/>
    );
    }
}


    export default Genre;