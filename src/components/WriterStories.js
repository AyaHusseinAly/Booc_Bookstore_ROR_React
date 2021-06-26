import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
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

class WriterStories extends Component {

    state = {
        shortstoiesNotFinished: [],
        shortstoiesFinished: [],
        empty: true,
        chapters: [],
        user: {},
        bookmarks: [],
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
        this.setState({ user: response.data.writer_info });
        this.setState({ bookmarks: response.data.bookmark });
        console.log(response.data);


    }




    render() {

        return (

            <div >
                <div className='ml-5'>
                    <div className="info-person">
                        <div className="container">
                            <div className="content-info">
                                <div className="img">
                                    <img className="rounded-circle" style={{ width: '150px', height: '150px', borderRadius: '50%', display: 'block' }} src={this.state.user.avatar} />

                                </div>
                                <div className="text-content">
                                    <h3>{this.state.user.name}</h3>
                                    <span><strong>{this.state.user.following}</strong> Following</span>
                                    <span><strong>{this.state.user.follower}</strong> Followers</span>
                                </div>
                            </div>

                            <div className="section-select text-center">
                                <div className="active" >Writer Previous Work</div>

                            </div>

                            <div className="container light" style={{ border: '2px #ADB4C3 solid' }}>
                                <div >
                                    <div >
                                        <div className="">
                                            <div className="" style={{ marginBottom: "130px" }}>
                                                <h3>Fininshed Stories</h3>
                                                {this.state.shortstoiesFinished && this.state.shortstoiesFinished.length > 0 && <div className="img">
                                                    <div className="row" style={{ width: "1300px", marginTop: "-120px" }}>
                                                        <Favr items={this.state.shortstoiesFinished} style={{ height: "250px", marginTop: '-130px' }} />

                                                    </div>
                                                </div>}
                                                {this.state.shortstoiesFinished && this.state.shortstoiesFinished.length == 0 && <div className="section-select text-center">No Fininshed Stories</div>}
                                            </div>



                                            <div className="" style={{}}>
                                                <h3>Unfinished Stories</h3>
                                                {this.state.shortstoiesNotFinished && this.state.shortstoiesNotFinished.length > 0 && <div className="img">
                                                    <div className="row" style={{ width: "1300px", marginTop: "-120px" }}>
                                                        <Favr items={this.state.shortstoiesNotFinished} style={{ height: "250px", marginTop: '-130px' }} />

                                                    </div>
                                                </div>}
                                                {this.state.shortstoiesNotFinished && this.state.shortstoiesNotFinished.length == 0 && <div className="section-select text-center">No Unfinished Stories</div>}

                                            </div>

                                            <div className="" style={{ marginTop: "150px" }}>
                                                {/* <h3 style={{}}>Book Marks</h3> */}
                                                <div className="img">
                                                    <div className="row" style={{ width: "1300px" }}>


                                                    </div>
                                                </div>
                                            </div>


                                        </div>


                                    </div>
                                </div>
                            </div>
                            {/* } */}

                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

function Favr(props) {
    const renderSlides = () =>
        props.items.map(story => (
            <Link to={`/shortStory/${story.id}`}>
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
    );
}


export default WriterStories;