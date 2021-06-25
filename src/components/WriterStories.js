import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import '../style/shortStory.css';
import ShortStory from './ShortStory';




const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
const arrowStyle = { color: '#000' }; // style for an svg element
const contentStyle = {
    maxWidth: "600px",
    width: "90%"
};

class WriterStories extends Component {

    state = {
        shortstoiesNotFinished: [],
        shortstoiesFinished: [],
        empty: true,
        chapters: [
            {
                title: "chapter 1",
                created_at: "15 April 2021",
                no_likes: 23

            },
            {
                title: "chapter 2",
                created_at: "15 April 2021",
                no_likes: 44

            },
            {
                title: "chapter 3",
                created_at: "15 April 2021",
                no_likes: 14

            },

        ]
    }


    async componentDidMount() {
        let data = {
            writer_id: this.props.match.params.id
        };
        let response = await axios.post("http://localhost:3000/writerStories", data,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type"
                }
            });

        console.log(response.data.NotFinishedYet.length);
        this.setState({ shortstoiesNotFinished: response.data.NotFinishedYet });
        this.setState({ shortstoiesFinished: response.data.Finished });
        console.log(response.data);


    }




    render() {

        return (

            <div >
                {this.state.shortstoiesNotFinished.length + this.state.shortstoiesFinished.length == 0 && <div className='mt-5 pt-5' style={{ width: '100%', height: '100%' }}>
                    <h3 className='d-flex justify-content-center'>You haven't add any stories </h3>
                    <div className='d-flex justify-content-center'> <button className="py-2 px-5  my-3 ml-3 btn btn-lg" style={{ backgroundColor: '#F8A488', borderColor: '#F8A488' }} ><i className="fa fa-plus-circle" style={{ color: 'black', border: 'none' }} onClick={() => this.props.history.push('/addstory')}>Add New Story</i></button></div>
                </div>}
                {this.state.shortstoiesNotFinished.length + this.state.shortstoiesFinished.length > 0 && <div className='ml-5'>
                    <div className='d-flex justify-content-end mr-2'>

                        <button className="py-1 px-3  my-4 mr-4 btn btn-lg" style={{ backgroundColor: '#F8A488', borderColor: '#F8A488' }} ><i className="fa fa-plus-circle" style={{ color: 'black', border: 'none' }} onClick={() => this.props.history.push('/addstory')}>Add New Story</i></button>
                    </div>
                    <h2 className='ml-3'>Previous Work</h2>
                    <br />
                    <div className="row d-flex justify-content-end ml-2">
                        <div className="col col-lg-6 col-md-12 col-xs-12 " style={{ display: "inline-block" }}>

                            <h4 className=''>Not finished yet</h4>

                            {this.state.shortstoiesNotFinished.length > 0 ? this.state.shortstoiesNotFinished.map(shortstory => {
                                return <ShortStory shortstory={shortstory} chapters={this.state.chapters} />


                            }) : <div ><br /><span className="p-3 m-5" style={{ backgroundColor: '#ADB4C3', color: 'black', fontSize: '1.3rem' }}>No Stories yet</span></div>}
                        </div>
                        <div className="col col-lg-6 col-md-12 col-xs-12 " style={{ display: "inline-block" }}>
                            <h4 style={{}}>Finished</h4>

                            {this.state.shortstoiesFinished.length > 0 ? this.state.shortstoiesFinished.map(shortstory => {
                                return <ShortStory shortstory={shortstory} chapters={this.state.chapters} />

                            }) : <div ><br /><span className="p-3 m-5" style={{ backgroundColor: '#ADB4C3', color: 'black', fontSize: '1.3rem' }}>No Stories yet</span></div>}
                        </div>

                    </div>
                </div>}

            </div>

        );
    }
}

export default WriterStories;