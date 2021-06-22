import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import AddChapter from './addChapter';
import ChapterDetails from './chapterDetails';
import Likes from './Likes';

import '../style/admin.css';
import '../style/BookDetails.css';
import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,

} from "react-share";

const contentStyle = {
    // maxWidth: "600px",
    width: "60%"
};
const popupStyle = {
    borderRadius: '10px 10px',
    border: '4px solid #F8A488',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.7)',
    padding: '2rem',
    width: '25rem',
    maxHeight: '30rem',
    overflowY: 'scroll'

}
class ShortStoryDetails extends Component {

    constructor(props) {
        super();
        this.state = {
            shortStory: {},
            chapters: [],
            genre: [],
            date: '',
            image: '',
            likes: [
                { user_name: 'Fatma Tarek', user_img: "img/avatar.jpeg", user_id: '1' },
                { user_name: 'Mona Youssef', user_img: "img/avatar.jpeg", user_id: '2' },
                { user_name: 'Eman Hussein', user_img: "img/avatar.jpeg", user_id: '3' },
                { user_name: 'Amal Tamam', user_img: "img/avatar.jpeg", user_id: '4' },
                { user_name: 'Fatma Tarek', user_img: "img/avatar.jpeg", user_id: '1' },
                { user_name: 'Mona Youssef', user_img: "img/avatar.jpeg", user_id: '2' },
                { user_name: 'Eman Hussein', user_img: "img/avatar.jpeg", user_id: '3' },
                { user_name: 'Amal Tamam', user_img: "img/avatar.jpeg", user_id: '4' }
            ],
            writer: {}
        }

    }
    setStoryStatus = async (id) => {
        let data = {
            id: id
        }
        const res = await axios.post("http://localhost:3000/storyFinished", data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type",

            }
        });
        window.location.reload();
        console.log(res);
    }
    async componentDidMount() {
        let data = {
            id: this.props.match.params.id,
            login: localStorage.getItem("user_id")
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
        this.setState({ image: res.data.image });
        this.setState({ writer: res.data.writer });


    }
    addToBookmark = async (id) => {
        let data = {
            story_id: id,
            user_id: localStorage.getItem('user_id')

        }
        const res = await axios.post("http://localhost:3000/addToBookmark", data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type",

            }
        });

        console.log(res);

    }
    render() {


        return (

            <>

                <div className="product">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3">
                                <div className="parent-box">
                                    <div className="box-img text-center">
                                        <img src={this.state.image} style={{ width: '400px' }} />
                                        <div className="button">
                                            {this.state.shortStory.user_id == localStorage.getItem('user_id') && this.state.shortStory.status == 'Not finished yet' && <div> <AddChapter shortStory={this.state.shortStory.id} />
                                                <div className="btn rounded-corners" style={{ backgroundColor: 'white', color: '#F8A488', borderColor: '#F8A488', borderRadius: '5px', display: 'inline-block' }}
                                                    onClick={() => this.setStoryStatus(this.state.shortStory.id)}>Finish</div>
                                            </div>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-7 col-lg-6">
                                <div className="box-info">
                                    <div className="heading">
                                        <h2>{this.state.shortStory.title}</h2>
                                        <div className='row'>
                                            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                                                <h5>from {this.state.genre.map((genre, index) => {
                                                    return <span style={{ color: '#535964' }} key={genre.id}>
                                                        {genre.title}
                                                        {index < this.state.genre.length - 1 && <span> _ </span>}
                                                    </span>
                                                })} section</h5>
                                                <p>
                                                    <span className="fa fa-star checked"></span>
                                                    <span className="fa fa-star checked"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    {/* <a className="mx-2" style={{ color: '#ADB4C3' }}>(17 likes)</a> */}
                                                    <StoryLikes likes={this.state.likes} />
                                                </p>
                                            </div>
                                            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                                                {this.state.shortStory.user_id != localStorage.getItem('user_id') && <button className="btn-shelf mt-0" onClick={() => {
                                                    this.addToBookmark(this.state.shortStory.id)
                                                }}> <i className="fa fa-plus"></i> Add To Bookmark</button>}
                                            </div>
                                        </div>

                                    </div>

                                    <ul className="list-unstyled details" style={{}}>
                                        {this.state.shortStory.user_id != localStorage.getItem('user_id') && <li><span>Author</span> {this.state.writer.name}_ <p style={{ color: "#263044", fontSize: ".85rem", margin: '0', padding: "0", tetxtAlign: "center", display: "inline-block" }}> {this.state.writer.username}</p> _</li>}
                                        <li><span>No. Of Chapters</span>: {this.state.chapters.length}</li>
                                        <li><span>Publication Date</span>: {this.state.date}</li>
                                    </ul>
                                    <div className="about-product">
                                        <div className="about-info">
                                            <h4>About Story</h4>
                                            <p>{this.state.shortStory.summary}.</p>
                                        </div>
                                        {/* <div className="about-info">
                                            <h4>About Author</h4>
                                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia nemo atque porro,
                                                quod cum odio consectetur architecto veritatis vel incidunt dolore at corporis!
                                                Accusantium eum consequuntur incidunt, sed quisquam delectus.</p>
                                        </div> */}

                                        <div className="about-info">
                                            <h4>Chapters</h4>
                                            {/* <div className="reviews"> */}

                                            {this.state.chapters.map((chapter) => {
                                                return <div className="reviews my-6"><Chapters key={chapter.id} chapter={chapter} date={chapter.created_at.slice(0, 10)} /></div>

                                            })}
                                            {/* </div> */}
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3">
                                <div className="replay">
                                    <h4>Reviews</h4>
                                    <div className="box-person">
                                        <div className="img">
                                            <i className="fa fa-user"></i>
                                        </div>
                                        <div className="info-details">
                                            <h5>Ola Gamal</h5>
                                            <div className="evaluation">
                                                <i className="fa fa-star" style={{ color: 'orange' }}></i>
                                                <i className="fa fa-star" style={{ color: 'orange' }} ></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                            <a href="#" className="report">Report</a>
                                        </div>
                                    </div>
                                    <div className="box-person">
                                        <div className="img">
                                            <i className="fa fa-user"></i>
                                        </div>
                                        <div className="info-details">
                                            <h5>Ahmed Emara</h5>
                                            <div className="evaluation ">
                                                <i className="fa fa-star" style={{ color: 'orange' }}></i>
                                                <i className="fa fa-star" style={{ color: 'orange' }} ></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>

                                            </div>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                            <a href="#" className="report">Report</a>
                                        </div>
                                    </div>
                                    {/* <a href="#" className="more">See More..</a> */}

                                </div>
                                {/* <input type="text" name="mail" placeholder="Add review" style={{ width: '254px', marginBottom: '5px' }} /> */}

                                {/* <div className="evaluation">
                                    rate this book :
                                    <i className="fa fa-star" style={{ fontSize: '20px', color: 'gray', marginLeft: '10px' }}></i>
                                    <i className="fa fa-star" style={{ fontSize: '20px', color: 'gray' }}></i>
                                    <i className="fa fa-star" style={{ fontSize: '20px', color: 'gray' }}></i>
                                    <i className="fa fa-star" style={{ fontSize: '20px', color: 'gray' }}></i>
                                    <i className="fa fa-star" style={{ fontSize: '20px', color: 'gray', marginRight: '10px' }}></i>
                                    0/5
                                </div>
                                <div className="mail">
                                    <h4>Share with Friends</h4>
                                    <EmailShareButton
                                        body="I Strong Recommend This Book For You!"
                                    >
                                        <EmailIcon size={30} logoFillColor="#f5b17b" round={true} style={{ marginTop: '10px', marginLeft: '10px' }} /> </EmailShareButton>

                                    <TwitterShareButton
                                        url={window.location.href}
                                        quote="I Strong Recommend This Book For You!"
                                    >
                                        <TwitterIcon size={30} logoFillColor="#f5b17b" round={true} style={{ marginTop: '10px', marginLeft: '10px' }} /> </TwitterShareButton>


                                    <FacebookShareButton
                                        url={window.location.href}
                                        quote={"I Strong Recommend This Book For You!"}
                                        hashtag="#my favourite book"

                                    >
                                        <FacebookIcon size={30} logoFillColor="#f5b17b" round={true} style={{ marginTop: '10px', marginLeft: '10px' }} /> </FacebookShareButton>


                                    <LinkedinShareButton
                                        url={window.location.href}
                                    >
                                        <LinkedinIcon size={30} logoFillColor="#f5b17b" round={true} style={{ marginTop: '10px', marginLeft: '10px' }} /> </LinkedinShareButton>


                                    <WhatsappShareButton
                                        title="I Strong Recommend This Book For You!"
                                        url={window.location.href}
                                    >
                                        <WhatsappIcon size={30} logoFillColor="#f5b17b" round={true} style={{ marginTop: '10px', marginLeft: '10px' }} /></WhatsappShareButton>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )

    }
}
class Chapters extends Component {
    render() {
        return (<div className="row my-6">
            {/* <u className="mr-4" style={{ display: "inline-block", cursor: "pointer" }}>{this.props.chapter.title}</u> */}
            <div className="col col-4"><ChapterDetails chapter={this.props.chapter} /></div>
            <div className="col col-2"><i className="far fa-thumbs-up mr-4"> 2</i></div>
            <div className="col col-2"><i className="far fa-comment-alt"> 2</i></div>
            <div className="col col-4"><span>{this.props.date}</span></div>
        </div>)
    }
}
class StoryLikes extends Component {
    render() {
        return (<Popup
            trigger={<a className="mx-2" style={{ color: '#ADB4C3' }}>(17 likes)</a>}
            modal
            contentStyle={popupStyle}
        >
            <div>
                <Likes users={this.props.likes} />
            </div>
        </Popup >)
    }


}

export default ShortStoryDetails;

