import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/headerFooter.css';
import axios from 'axios';


class Writer extends Component {
    state={
        shortstoies:[]
    }

componentDidMount(){
    axios.get("http://localhost:3000/api/shortStories",
    {headers: {"Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type"}
})
    .then(response => {
        this.setState({shortstoies:response.data.short_stories});
        console.log(this.state.shortstoies);
    });
  
}



    render() {

        return (
            <h1>Writer</h1>

    );
    }
}


    export default Writer;