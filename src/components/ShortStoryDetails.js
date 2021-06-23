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
            writer: {},
            // bookmark_flag: false,
            bookmark_style: {},
            bookmark_method: "",
            bookmark_string: "",
            // followed_flag: false
            follow_style: {},
            follow_method: "",
            follow_string: "",
            follow_icon: ""
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
        // this.setState({ bookmark_flag: res.data.bookmarked_flag });
        // this.setState({ followed_flag: res.data.followed_flag });
        if (res.data.bookmarked_flag == false) {
            this.setState({ bookmark_style: { backgroundColor: '#F8A488', color: 'white', borderRadius: '5px' } });
            this.setState({ bookmark_string: "Add To Bookmark" });
            this.setState({ bookmark_method: "addToBookmark" });
        }
        else if (res.data.bookmarked_flag == true) {
            this.setState({ bookmark_style: { backgroundColor: 'white', color: '#F8A488', borderRadius: '5px', borderColor: "#F8A488" } });
            this.setState({ bookmark_string: "Remove from Bookmark" });
            this.setState({ bookmark_method: "removeFromBookmark" });
        }
        if (res.data.followed_flag == false) {
            this.setState({ follow_style: { textAlign: 'center', backgroundColor: '#F8A488', color: 'white', borderRadius: '5px' } });
            this.setState({ follow_string: "Follow" });
            this.setState({ follow_method: "followWriter" });
            this.setState({ follow_icon: "fas fa-user-plus mr-2" });
        }
        else if (res.data.followed_flag == true) {
            this.setState({ follow_style: { textAlign: 'center', backgroundColor: 'white', color: '#F8A488', borderRadius: '5px', borderColor: "#F8A488" } });
            this.setState({ follow_string: "UnFollow" });
            this.setState({ follow_method: "unFollowWriter" });
            this.setState({ follow_icon: "fas fa-user-minus mr-2" });
        }


    }
    addToBookmark = async (id, url) => {
        let data = {
            story_id: id,
            user_id: localStorage.getItem('user_id')

        }
        const res = await axios.post(`http://localhost:3000/${url}`, data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type",

            }
        });

        console.log(res);
        if (url == "addToBookmark") {
            this.setState({ bookmark_style: { backgroundColor: 'white', color: '#F8A488', borderRadius: '5px', borderColor: "#F8A488" } });
            this.setState({ bookmark_string: "Remove from Bookmark" });
            this.setState({ bookmark_method: "removeFromBookmark" });
        }
        else if (url == "removeFromBookmark") {
            this.setState({ bookmark_style: { backgroundColor: '#F8A488', color: 'white', borderRadius: '5px' } });
            this.setState({ bookmark_string: "Add To Bookmark" });
            this.setState({ bookmark_method: "addToBookmark" });
        }

    }
    followWriter = async (url) => {
        let data = {
            writer_id: this.state.writer.id,
            reader_id: localStorage.getItem('user_id')

        }
        const res = await axios.post(`http://localhost:3000/${url}`, data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type",

            }
        });
        console.log(res.data);
        if (url == "followWriter") {
            this.setState({ follow_style: { textAlign: 'center', backgroundColor: 'white', color: '#F8A488', borderRadius: '5px', borderColor: "#F8A488" } });
            this.setState({ follow_string: "UnFollow" });
            this.setState({ follow_method: "unFollowWriter" });
            this.setState({ follow_icon: "fas fa-user-minus mr-2" });
        }
        else if (url == "unFollowWriter") {
            this.setState({ follow_style: { textAlign: 'center', backgroundColor: '#F8A488', color: 'white', borderRadius: '5px' } });
            this.setState({ follow_string: "Follow" });
            this.setState({ follow_method: "followWriter" });
            this.setState({ follow_icon: "fas fa-user-plus mr-2" });
        }

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
                                            {this.state.shortStory.user_id != localStorage.getItem('user_id') && <div className="btn rounded-corners" style={this.state.bookmark_style}
                                                onClick={() => {
                                                    this.addToBookmark(this.state.shortStory.id, this.state.bookmark_method)
                                                }}> <i className="fa fa-heart mr-3"></i>{this.state.bookmark_string}</div>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-7 col-lg-6">
                                <div className="box-info">
                                    <div className="heading">
                                        <h2>{this.state.shortStory.title}</h2>
                                        <div className='row'>
                                            <div className='col-xs-12 col-sm-12 col-md-7 col-lg-7'>
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
                                            <div className='col-xs-12 col-sm-12 col-md-5 col-lg-5'>
                                                {this.state.shortStory.user_id != localStorage.getItem('user_id') && <div className="" style={this.state.follow_style}
                                                    onClick={() => this.followWriter(this.state.follow_method)}><i class={this.state.follow_icon}></i>{this.state.follow_string}</div>}
                                            </div>
                                        </div>

                                    </div>

                                    <ul className="list-unstyled details" style={{}}>
                                        {this.state.shortStory.user_id != localStorage.getItem('user_id') && <li><span>Author</span>: {this.state.writer.name}_ <p style={{ color: "#263044", fontSize: ".85rem", margin: '0', padding: "0", tetxtAlign: "center", display: "inline-block" }}> {this.state.writer.username}</p> _</li>}
                                        <li><span>No. Of Chapters</span>: {this.state.chapters.length}</li>
                                        <li><span>Publication Date</span>: {this.state.date}</li>
                                    </ul>
                                    <div className="about-product">
                                        <div className="about-info">
                                            <h4>About Story</h4>
                                            <p>{this.state.shortStory.summary}.</p>
                                        </div>
                                        {this.state.writer.id != localStorage.getItem('user_id') && <div className="about-info">
                                            <h4>About Author</h4>
                                            <p>{this.state.writer.bio}</p>
                                        </div>}

                                        {this.state.chapters.length > 0 ? <div className="about-info">
                                            <h4>Chapters</h4>
                                            {/* <div className="reviews"> */}

                                            {this.state.chapters.map((chapter) => {
                                                return <div className="reviews my-6"><Chapters key={chapter.id} chapter={chapter} date={chapter.created_at.slice(0, 10)} /></div>

                                            })}
                                            {/* </div> */}
                                        </div> : <div className="about-info">
                                            <h4>No Chapters Yet</h4></div>}

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

