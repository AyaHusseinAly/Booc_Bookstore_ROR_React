import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import Likes from './Likes';




const commentPopup = {
    borderRadius: '10px 10px',
    border: '4px solid #F8A488',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.7)',
    padding: '2rem',
    width: '25rem',

}

const popupStyle = {
    borderRadius: '10px 10px',
    border: '4px solid #F8A488',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.7)',
    padding: '2rem',
    width: '25rem',
    maxHeight: '30rem',
    overflowY: 'scroll'

}

class LikeCommentStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storyLikeUsers: this.props.users,
            stroylikeflag: false,
            commentStorylength: 0
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ storyLikeUsers: this.props.users });
        this.setState({ stroylikeflag: this.props.stroylikeflag });
        this.setState({ commentStorylength: this.props.commentStory.length });

    }
    likeStory = async (story_id, url) => {
        let data = {};
        if (this.props.kind == 'Story') {
            data = {
                story_id: story_id,
                user_id: window.localStorage.getItem('user_id')
            };
        }
        else {
            data = {
                chapter_id: story_id,
                user_id: window.localStorage.getItem('user_id')
            };
        }

        let response = await axios.post(`http://localhost:3000/${url}`, data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type"
            }
        });
        console.log("idk",response);
        this.setState({ storyLikeUsers: response.data.storyLikes });
        this.setState({ stroylikeflag: response.data.likeFlag });

    }
    render() {
        return (

            <div className="row p-0 m-0">
                <div className="col-6" >
                    {this.state.stroylikeflag == false ? <a className="mr-2" style={{ color: '#535964' }} onClick={() => { this.likeStory(this.props.story.id, `like${this.props.kind}`) }}><i className="far fa-thumbs-up"></i></a> : <a className="mr-2" style={{ color: '#F8A488' }} onClick={() => { this.likeStory(this.props.story.id, `unlike${this.props.kind}`) }}><i className="fas fa-thumbs-up" ></i></a>}
                    <Popup
                        trigger={<a>{this.state.storyLikeUsers.length} Likes</a>
                        }
                        modal
                        contentStyle={popupStyle}
                    >
                        <Likes users={this.state.storyLikeUsers}></Likes>
                    </Popup >
                </div>

                <div className="col-6 " >

                    <Popup
                        trigger={<div><a className=" mr-2" style={{ color: '#535964' }} onClick={() => { }}><i className="far fa-comment-alt"></i></a> {this.state.commentStorylength} </div>

                        }
                        modal
                        contentStyle={commentPopup}
                    >
                        <Comments comments={this.props.commentStory} post={this.props.story} kind={this.props.kind} setNoComments={(len) => { this.setState({ commentStorylength: len }) }}></Comments>
                    </Popup >
                </div>
            </div >

        )
    }
}
class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: this.props.comments,
            string: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({ comments: this.props.comments });
    }

    render() {
        const scrollableContainer = {
            maxHeight: '25rem',
            overflowY: 'scroll'
        }
        const addComment = async (record_id, kind) => {
            if (window.localStorage.getItem('user_id')) {
                let string = this.state.string;
                if (string != "") {

                    if (kind == 'Story') {
                        let data = {
                            body: string,
                            story_id: record_id,
                            user_id: window.localStorage.getItem('user_id')
                        };
                        let res = await axios.post("http://localhost:3000/commentStory", data, {
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Methods": "GET, POST, PUT",
                                "Access-Control-Allow-Headers": "Content-Type",

                            }
                        });
                        axios.post('http://localhost:3000/notifications', {
                                    sender_id: res.data.sender.id,
                                    reciever_id: res.data.writer_id,
                                    kind: "story-comment",
                                    instance_id: record_id,
                                    body: `${res.data.sender.name} just commented on your story.`,
                                    summary: `${res.data.comment.body.slice(0, 70)}...`
                                })
                                    .then(res => {
                                        console.log(res);
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                        console.log(res.data);
                        this.setState({ comments: res.data.comments });
                        this.setState({ string: "" });
                        this.props.setNoComments(this.state.comments.length);
                    }
                    else {
                        let data = {
                            body: string,
                            chapter_id: record_id,
                            user_id: window.localStorage.getItem('user_id')
                        };
                        let res = await axios.post("http://localhost:3000/commentChapter", data, {
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Methods": "GET, POST, PUT",
                                "Access-Control-Allow-Headers": "Content-Type",

                            }
                        });
                        console.log(res.data);
                        this.setState({ comments: res.data.comments });
                        this.setState({ string: "" });
                        this.props.setNoComments(this.state.comments.length);
                    }
                }
                else {
                    document.getElementById("loginfirst").innerText = "Type your comment first";

                }
            }
            else {
                document.getElementById("loginfirst").innerText = "please log in first";


            }

        }

        return (
            <React.Fragment>
                <div style={scrollableContainer}>
                    {this.state.comments && this.state.comments.map(comment =>

                        <div className="d-flex m-2">
                            <img className="  m-1 py-2  rounded-circle" src={comment.user_img} />
                            <div className="d-flex flex-column mt-2 p-1">
                                <strong style={{ color: '#535964', fontSize: '1.3rem' }} className="mb-1">{comment.user_name}</strong>
                                <h6 style={{ border: '0.1rem solid #e4e0e0', borderRadius: '3px 3px', padding: '0.5rem', width: '13rem', backgroundColor: '#F8F8F8' }}>{comment.comment_content}</h6>
                            </div>
                        </div>

                    )}
                </div>
                <div className="d-flex m-2">
                    <div className="form-outline col-9" >
                        <input type="search" id="commentContent" placeholder="Write your comment" className="form-control" style={{ backgroundColor: '#F8F8F8', paddingLeft: '0.5rem', height: '3rem' }} value={this.state.string} onChange={(e) => this.setState({ string: e.currentTarget.value })} />
                    </div>
                    <button type="button" onClick={() => { addComment(this.props.post.id, this.props.kind) }} className=" btn ml-1" style={{ backgroundColor: '#F8F8F8' }}>
                        <i class="fa fa-paper-plane" aria-hidden="true" style={{ color: '#F8A488' }}></i>
                    </button>
                </div>
                <p id="loginfirst" style={{ color: '#F8A488' }} className="pl-2"></p>
            </React.Fragment>

        );
    }
}

export default LikeCommentStory;