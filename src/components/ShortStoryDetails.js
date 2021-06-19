import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";

class ShortStoryDetails extends Component {

    constructor(props) {
        super();
        this.state = {
            shortStory: {},
            chapters: [],
            genre: [],
            date: ''
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
        console.log(res);
        this.setState({ shortStory: res.data.shortStory });
        this.setState({ chapters: res.data.chapters });
        this.setState({ genre: res.data.genres });
        this.setState({ date: res.data.date })

    }
    render() {
        // return (<h1>short story details{this.props.match.params.id}</h1>)
        return (<div className="row m-5">
            <div className="col col-3">
                <img className="book mx-3" style={{ width: '80%', height: "100%", display: 'inline-block', borderRadius: '10px' }} src={this.state.shortStory.cover} />
            </div>
            <div className="col col-9">
                <h2>{this.state.shortStory.title}</h2>
                <p> <span>from : </span>
                    {this.state.genre.map((genre, index) => {
                        return <span style={{ color: '#535964' }}>
                            {genre.title}
                            {index < this.state.genre.length - 1 && <span> _ </span>}
                        </span>
                    })}
                </p>
                <p>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <a className="mx-2" style={{ color: '#ADB4C3' }}>(17 Reviews)</a>
                </p>
                <div>
                    <h4>About Story</h4>
                    <p>{this.state.shortStory.summary}</p>
                </div>
                <div>
                    <h4>Chapters</h4>
                    {this.state.chapters.map((chapter) => {
                        return <Chapters key={chapter.id} chapter={chapter} date={this.state.date} />

                    })}
                </div>

            </div>
        </div>)
    }
}
class Chapters extends Component {
    render() {
        return (<div>
            <u className="mr-4" style={{ display: "inline-block", cursor: "pointer" }}>{this.props.chapter.title}</u>
            <i className="far fa-thumbs-up mr-4">2</i>
            <span>{this.props.date}</span>
        </div>)
    }
}
export default ShortStoryDetails;
