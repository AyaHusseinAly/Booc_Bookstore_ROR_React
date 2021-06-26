import React, { Component } from 'react';
import axios from 'axios';
import '../style/shortStory.css';
import ShortStory from './ShortStory';
import '../style/UserPage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/slider.css';
import Slider from "react-slick";
import Rating from './Rating';
import { Link } from "react-router-dom";






const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
const arrowStyle = { color: '#000' }; // style for an svg element
const contentStyle = {
    maxWidth: "600px",
    width: "90%"
};

class MyStories extends Component {

    state = {
        shortstoiesNotFinished: [],
        shortstoiesFinished: [],
        empty: true,
        chapters: [],
        bookmark: [],

    }


    async componentDidMount() {
        let data = {
            writer_id: localStorage.getItem('user_id')
        };
        let response = await axios.post("http://localhost:3000/writerStories", data,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type"
                }
            });

        this.setState({ shortstoiesNotFinished: response.data.NotFinishedYet });
        this.setState({ shortstoiesFinished: response.data.Finished });
        this.setState({ bookmark: response.data.bookmark })
        console.log(response.data);


    }




    render() {

        return (

            <div className='container' >
                {!localStorage.getItem('user_id') && <div className='mt-5 pt-5' style={{ width: '100%', height: '100%' }}>
                    <h3 className='d-flex justify-content-center'>You need to login </h3>
                    <div className='d-flex justify-content-center'> <button className="py-2 px-5  my-3 ml-3 btn btn-lg" style={{ backgroundColor: '#F8A488', borderColor: '#F8A488' }} ><i className="" style={{ color: 'black', border: 'none' }} onClick={() => this.props.history.push('/login')}>Go To Login</i></button></div>
                </div>}
                {localStorage.getItem('user_id') &&
                    this.state.shortstoiesNotFinished.length + this.state.shortstoiesFinished.length == 0 && <div className='mt-5 pt-5' style={{ width: '100%', height: '100%' }}>
                        <h3 className='d-flex justify-content-center'>You haven't add any stories </h3>
                        <div className='d-flex justify-content-center'> <button className="py-2 px-5  my-3 ml-3 btn btn-lg" style={{ backgroundColor: '#F8A488', borderColor: '#F8A488' }} ><i className="fa fa-plus-circle" style={{ color: 'black', border: 'none' }} onClick={() => this.props.history.push('/addstory')}>Add New Story</i></button></div>
                    </div>
                }
                {localStorage.getItem('user_id') &&
                    this.state.shortstoiesNotFinished.length + this.state.shortstoiesFinished.length > 0 && <div className='ml-5'>
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
                    </div>
                }
                {localStorage.getItem('user_id') && <div style={{ border: "3px #E5E5E5 solid", borderRadius: "10px", height: "350px", margin: "20px 0" }}>
                    {this.state.bookmark.length == 0 ? <h3 className="mt-5 pt-5" style={{ textAlign: "center", fontWeight: 'bold', fontFamily: "arial" }} >No Bookmarks Yet</h3> : <h3 className="mt-2" style={{ textAlign: "center", fontWeight: 'bold', fontFamily: "arial" }} >Bookmarks</h3>}

                    {this.state.bookmark.length != 0 && <div className="row" style={{ width: "1300px", marginTop: "-120px" }}>
                        <Bookmark items={this.state.bookmark} />
                    </div>}
                </div>}
            </div >


        );
    }
}

function Bookmark(props) {
    const renderSlides = () =>
        props.items.map(story => (
            <Link to={`/shortStory/${story.id}`} style={{ width: "155px" }}>
                <div >{<img src={story.cover} style={{ width: "150px", height: "200px", margin: "auto" }} />}</div>
                <figcaption style={{ textAlign: "center", fontSize: "15px", color: "var(--primaryColor)" }}><p className="mb-0 pb-0">{story.title}</p><p className="mt-0 pt-0"><Rating rate={story.rate} /></p></figcaption>

            </Link>
        ));


    return (
        <div className="Appi" style={{ width: '850px', marginLeft: '-300px' }}>

            {props.items.length != 0 && props.items.length <= 5 && <Slider dots={true} infinite={true} slidesToShow={props.items.length} slidesToScroll={1}>
                {renderSlides()}
            </Slider>}
            {props.items.length > 5 && <Slider dots={true} infinite={true} slidesToShow={5} slidesToScroll={1}>
                {renderSlides()}
            </Slider>}


        </div>


    )



}

export default MyStories;