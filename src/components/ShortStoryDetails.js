import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import AddChapter from './addChapter';
import ChapterDetails from './chapterDetails';
import ReactStars from "react-rating-stars-component";
import Likes from './Likes';
import LikeCommentStory from './LikeCommentStory';
import Rating from './Rating';
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
import { async } from 'q';
const commentPopup = {
    borderRadius: '10px 10px',
    border: '4px solid #F8A488',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.7)',
    padding: '2rem',
    width: '25rem',

}
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
            likes: [],
            writer: {},
            bookmark_style: {},
            bookmark_method: "",
            bookmark_string: "",
            follow_style: {},
            follow_method: "",
            follow_string: "",
            follow_icon: "",
            review_flag: false,
            reviews: [],
            storyRate: 0,
            stroylikeflag: false,
            commentStory: []

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
        this.setState({ review_flag: res.data.review_flag });
        this.setState({ reviews: res.data.reviews });
        this.setState({ storyRate: res.data.storyRate });
        this.setState({ likes: res.data.storyLikes });
        this.setState({ stroylikeflag: res.data.likeFlag });
        this.setState({ commentStory: res.data.commentStory });
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
                                                    <Rating rate={this.state.storyRate} />
                                                    {/* <StoryLikes likes={this.state.likes} /> */}
                                                    <span className=' m-2 ' style={{ fontSize: '1rem' }}>{this.state.reviews.length} Reviews</span>
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
                                            <div className='row mb-3'>
                                                <h4 className='col col-4'>About Story</h4>
                                                <div className='col col-8 mt-2' style={{ display: 'inline-block' }}><LikeCommentStory users={this.state.likes} story={this.state.shortStory} stroylikeflag={this.state.stroylikeflag} commentStory={this.state.commentStory} kind="Story" /></div>
                                            </div>

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
                                                return <div className="reviews my-6" style={{}} key={chapter.id}><Chapters key={chapter.id} chapter={chapter} date={chapter.created_at.slice(0, 10)} /></div>

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
                                    <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                                        {this.state.reviews.map(review => {
                                            return <div className="box-person" key={review.id}>
                                                <div className="img">
                                                    {review.user_avatar == "" ? <i className="fa fa-user"></i> :
                                                        <img className="rounded-circle" style={{ width: '40px', height: '40px', borderRadius: '50%' }} src={review.user_avatar} />}
                                                </div>
                                                <div className="info-details">
                                                    <h5>{review.user_name}</h5>
                                                    <div className="evaluation ">
                                                        <Rating rate={review.rate} />

                                                    </div>
                                                    <p>{review.review}</p>
                                                    {this.state.shortStory.user_id == localStorage.getItem('user_id') && <ReviewReport review={review} />}
                                                </div>

                                            </div>
                                        })}
                                    </div>

                                    <div className="box-person" style={{ margin: '0', padding: '3px', width: '100%', backgroundColor: '#F8F8F8' }}>
                                        {this.state.shortStory.user_id != localStorage.getItem('user_id') &&
                                            this.state.review_flag == false && < MakeRating story_id={this.state.shortStory.id} changeRateFlag={() => window.location.reload()} />}
                                    </div>


                                </div>
                                {this.state.shortStory.user_id != localStorage.getItem('user_id') && <div>


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
                                    </div> </div>}
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
            <div className="col col-3 "><ChapterDetails chapter={this.props.chapter} /></div>
            {/* <div className="col col-2"><i className="far fa-thumbs-up mr-4"> 2</i></div>
            <div className="col col-2"><i className="far fa-comment-alt"> 2</i></div> */}
            <div className='col col-6 px-0'>
                <LikeCommentStory users={this.props.chapter.likes} story={this.props.chapter} stroylikeflag={this.props.chapter.userLikeFlag} commentStory={this.props.chapter.comments} kind="Chapter" />
            </div>

            <div className="col col-3 p-0"><span style={{ padding: '0px', margin: '0px' }}>{this.props.date}</span></div>
        </div>)
    }
}
// class StoryLikes extends Component {
//     render() {
//         return (<Popup
//             trigger={<a className="mx-2" style={{ color: '#ADB4C3' }}>(17 likes)</a>}
//             modal
//             contentStyle={popupStyle}
//         >
//             <div>
//                 <Likes users={this.props.likes} />
//             </div>
//         </Popup >)
//     }


// }
class MakeRating extends Component {
    constructor(props) {
        super();
        this.state = {
            rating: 0,
            review: "",
            errors: []
        }
    }
    ratingChanged = (newRating) => {
        console.log(newRating);
        this.setState({ rating: newRating });
    }
    handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.target);
        const errors = this.validate();

        if (errors === null) {
            const obj = {
                rating: this.state.rating,
                review: this.state.review,
                user_id: localStorage.getItem('user_id'),
                story_id: this.props.story_id


            }
            Object.keys(obj).forEach((key, value) => {
                return data.append(key, obj[key])
            })

            const res = await axios.post("http://localhost:3000/addRateReviewStory", data, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type",

                }
            });
            console.log(res.data);
            this.setState({ rating: 0 });
            this.setState({ review: "" });
            this.props.changeRateFlag();

        }
        else {
            console.log('no submit');
            this.activeError = true;
        }

    }
    validate = () => {
        const errors = {};
        if (this.state.rating == 0)
            errors.rate = "Rate is required"
        this.setState({ errors });
        return Object.keys(errors).length === 0 ? null : errors;
    }

    render() {
        return (
            <div className="m-0" style={{ backgroundColor: '#F8F8F8' }}>
                <form onSubmit={this.handleSubmit}>
                    <h4 className="pb-2 pl-1" style={{ color: '#2630044' }}>Add Rating & Review :
                        <button type='submit' className=" btn ml-4" style={{ backgroundColor: '#F8F8F8' }}>
                            <i class="fa fa-paper-plane" aria-hidden="true" style={{ color: '#F8A488' }}></i>
                        </button>
                    </h4>
                    <div className='ml-5'>
                        {this.state.errors.rate && (<div className="alert alert-danger" role="alert">{this.state.errors.rate}</div>)}
                        <input className="px-1 ml-4" type="text" name="review" placeholder="Add review..." style={{ display: 'inline-block', width: '80%' }} value={this.state.review} onChange={(e) => this.setState({ review: e.currentTarget.value })} />
                        {/* <input type='hidden' name='rating' value={this.state.rating} /> */}
                        {/* <input type='hidden' name='user_id' value={localStorage.getItem('user_id')} />
                        <input type='hidden' name='story_id' value={this.props.story_id} /> */}

                        <div className="row ml-2" >
                            <div style={{ display: 'inline-block', textAlign: 'end' }} className='col col-8 pr-0 mr-0'>
                                <ReactStars
                                    count={5}
                                    onChange={(e) => this.setState({ rating: e })}
                                    value={this.state.rating}
                                    size={25}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={< i className="fa fa-star-half-alt" ></i >}
                                    fullIcon={< i className="fa fa-star" ></i >}
                                    activeColor="#ffd700"

                                />
                            </div>

                            <span className='col col-1 pl-0 ml-0 mt-2'>{this.state.rating}/5</span>

                        </div>

                    </div>
                </form>
            </div>
        )
    }

}

class ReviewReport extends Component {

    render() {
        const sendReport = (post) => {
            if (document.getElementById("reportReason").value != "") {

                let data = {
                    kind: "review",
                    reason: document.getElementById("reportReason").value,
                    related_record_id: post.id,
                    user_id: window.localStorage.getItem('user_id')
                };
                axios.post("http://localhost:3000/report", data, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PUT",
                        "Access-Control-Allow-Headers": "Content-Type",

                    }
                }).then(response => {
                    if (response) {
                        console.log(response);
                        document.getElementById("thanksMsg").innerText = response.data.message
                    }
                    else {
                        console.log(response);
                    }
                });
            }
            else {
                document.getElementById("thanksMsg").innerText = "Please Enter the reason";

            }

        }


        return (
            <Popup
                trigger={<a style={{ color: '#CD3700', marginRight: '1.2rem' }}><strong >Report</strong></a>
                }
                modal
                contentStyle={popupStyle}
            >
                <React.Fragment>

                    <div className="form-outline" >
                        <textarea rows="3" id="reportReason" placeholder="Please mention reasons for reporting this post" className="form-control" style={{ backgroundColor: '#F8F8F8', paddingLeft: '0.5rem' }}></textarea>
                    </div>
                    <div className="row m-2">
                        <div className="col-9 " id="thanksMsg" style={{ color: '#F8A488' }}></div>
                        <button type="button" onClick={() => { sendReport(this.props.review) }} className=" btn ml-1 col-2" style={{ backgroundColor: '#F8F8F8', border: "1px solid #F8A488" }}>
                            <i class="fa fa-paper-plane" aria-hidden="true" style={{ color: '#F8A488' }}></i>
                        </button>
                    </div>
                </React.Fragment>
            </Popup >


        );
    }
}



export default ShortStoryDetails;

