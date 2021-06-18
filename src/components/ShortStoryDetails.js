import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";

class ShortStoryDetails extends Component {

    constructor(props) {
        super();
        this.state = {
            shortStory: {},
            chapters: []
        }

    }
    async componentDidMount() {
        let data = {
            id: this.props.match.params.id
        }
        const res = await axios.post("http://localhost:3000/shortStoryDetails", data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type",

            }
        });

    }
    render() {
        // return (<h1>short story details{this.props.match.params.id}</h1>)
        return (<div>

        </div>)
    }
}

export default ShortStoryDetails;
