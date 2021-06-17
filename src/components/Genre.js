import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/headerFooter.css';

class Genre extends Component {

    render() {

        return (
            <h1>Genre selected with id ={this.props.match.params.id}</h1>

    );
    }
}


    export default Genre;