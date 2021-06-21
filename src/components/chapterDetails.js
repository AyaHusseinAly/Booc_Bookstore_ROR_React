import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import '../style/admin.css';
import '../style/BookDetails.css';
import Avatar from 'antd/lib/avatar/avatar';


const contentStyle = {
    borderRadius: '10px 10px',
    border: '4px solid #F8A488',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.7)',
    padding: '0rem',
    // minWidth: "700px",
    width: "80%"
};

class ChapterDetails extends Component {
    state = {
        readMoreIds: [],
        liked_users: [
            { user_name: 'Fatma Tarek', user_img: "img/avatar.jpeg", user_id: '1' },
            { user_name: 'Mona Youssef', user_img: "img/avatar.jpeg", user_id: '2' },
            { user_name: 'Eman Hussein', user_img: "img/avatar.jpeg", user_id: '3' },
            { user_name: 'Amal Tamam', user_img: "img/avatar.jpeg", user_id: '4' },
            { user_name: 'Fatma Tarek', user_img: "img/avatar.jpeg", user_id: '1' },
            { user_name: 'Mona Youssef', user_img: "img/avatar.jpeg", user_id: '2' },
            { user_name: 'Eman Hussein', user_img: "img/avatar.jpeg", user_id: '3' },
            { user_name: 'Amal Tamam', user_img: "img/avatar.jpeg", user_id: '4' }
        ],
        // liked_users: [],
        comments: [
            { user_id: 1, user_name: 'Fatma Tarek', user_img: "img/avatar.jpeg", comment_content: "nice work!" },
            { user_id: 2, user_name: 'Fatma Tarek', user_img: "img/avatar.jpeg", comment_content: "Great story" }
        ]

    }
    render() {
        const scrollableSummary = {
            maxHeight: '220px',
            overflowY: 'scroll',
            margin: '0',
            lineHeight: '1.6',
            color: '#6d6d6d',
            backgroundColor: '#fbfbfb',
            borderRadius: '5px',
            padding: '10px',
            border: '1px solid #eee',
            boxShadow: ' rgba(0, 0, 0, 0.12) 0px 1px 3px',

            marginTop: '25px'
        }
        const scrollableLikes = {
            maxHeight: '350px',
            overflowY: 'scroll'
        }
        const scrollableContainer = {
            maxHeight: '80px',
            overflowY: 'scroll'
        }
        const commentsStyle = {

            margin: '0',
            lineHeight: '1.6',
            color: '#6d6d6d',
            backgroundColor: '#fbfbfb',
            borderRadius: '5px',
            padding: '10px',
            border: '1px solid #eee',
            boxShadow: ' rgba(0, 0, 0, 0.12) 0px 1px 3px',
            marginTop: '25px'

        }
        const readMore = (postId) => {
            var joined = this.state.readMoreIds;

            if (this.state.readMoreIds.includes(postId)) {
                joined.splice(joined.indexOf(postId), 1);
            }
            else {
                joined.push(postId);
            }
            this.setState({ readMoreIds: joined });
            console.log(this.state.readMoreIds);


        }
        return (<Popup
            trigger={<u className="mr-4" style={{ display: "inline-block", cursor: "pointer", width: '100%' }}>{this.props.chapter.title}</u>}
            modal
            contentStyle={contentStyle}
        >
            <div className="container pt-3 pl-3">
                <div className="d-flex">
                    <div className="d-flex flex-column mt-2">
                        <strong style={{ color: '#535964', fontSize: '1.5rem' }} className="mb-1">{this.props.chapter.title}</strong>
                        {/* <span>{post.story_title} <div className="chapterTag d-inline">{post.chapter_title}</div></span> */}
                    </div>
                </div>
                <div className="row">
                    <div className='col col-8  mx-2'>
                        <p style={scrollableSummary}>{this.state.readMoreIds.includes(this.props.chapter.id) && this.props.chapter.summary}{!this.state.readMoreIds.includes(this.props.chapter.id) && this.props.chapter.summary.slice(0, 600) + ' ... '}
                            <a onClick={() => readMore(this.props.chapter.id)} style={{ color: '#263044' }}>
                                <strong>{!this.state.readMoreIds.includes(this.props.chapter.id) && "Read more"}</strong>
                            </a>
                            <a onClick={() => readMore(this.props.chapter.id)} style={{ color: '#263044' }}>
                                <strong>{this.state.readMoreIds.includes(this.props.chapter.id) && "Read less"}</strong>
                            </a>
                        </p>
                        <div className="replay mb-3">
                            <h4 style={{ marginBottom: 'none' }}>Comments</h4>
                            {/* <div className="reviews"> */}
                            <div style={scrollableContainer}>
                                {this.state.comments.map((comment) => {

                                    return <div className=" d-flex ml-4 pl-4">
                                        <img className="  m-1 py-2  rounded-circle" src='avatar.jpeg' />
                                        <div className="d-flex flex-column mt-2 p-1">
                                            <strong style={{ color: '#ADB4C3', fontSize: '1.1rem' }} className="mb-1">{comment.user_name}</strong>
                                            <h6 style={{ border: '0.1rem solid #e4e0e0', borderRadius: '3px 3px', padding: '0.5rem', width: '13rem', backgroundColor: '#F8F8F8' }}>{comment.comment_content}</h6>
                                        </div>
                                    </div>
                                })}
                            </div>

                            {/* </div> */}
                        </div>
                    </div>

                    <div className='col col-3 ml-5 replay' style={scrollableLikes}>
                        <h4>Likes</h4>
                        {this.state.liked_users.length > 0 ? this.state.liked_users.map(user => {
                            return <div className="box-person" key={user.user_id}>
                                <div className="img" style={{ display: 'inline-block' }}>
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="info-details pl-2" style={{ display: 'inline-block' }}>
                                    <strong style={{ color: '#ADB4C3' }}>{user.user_name}</strong>
                                </div>
                            </div>
                        }) : <div style={{ color: '#ADB4C3', textAlign: 'center', size: 'bold' }}>No Likes Yet</div>}


                    </div>

                </div>


            </div>

        </Popup >
        )
    }
}


export default ChapterDetails;