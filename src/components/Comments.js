import React, { Component } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/headerFooter.css';

class Comments extends Component {

    render() {
        const scrollableContainer = {
            maxHeight: '25rem',
            overflowY: 'scroll'
        }
        const addComment = (record_id, kind) => {
            if (window.localStorage.getItem('user_id')) {
                let string = document.getElementById("commentContent").value;

                if (string != "") {

                    if (kind == 'story') {
                        let data = {
                            body: string,
                            story_id: record_id,
                            user_id: window.localStorage.getItem('user_id')
                        };
                        axios.post("http://localhost:3000/commentStory", data, {
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Methods": "GET, POST, PUT",
                                "Access-Control-Allow-Headers": "Content-Type",

                            }
                        }).then(response => {
                            if (response) {
                                console.log(response);
                                this.props.refresh();
                                this.forceUpdate();
                                document.getElementById("commentContent").value = "";
                                document.getElementById("loginfirst").innerText = "";
                            }

                        });
                    }
                    else {
                        let data = {
                            body: string,
                            chapter_id: record_id,
                            user_id: window.localStorage.getItem('user_id')
                        };
                        axios.post("http://localhost:3000/commentChapter", data, {
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Methods": "GET, POST, PUT",
                                "Access-Control-Allow-Headers": "Content-Type",

                            }
                        }).then(response => {
                            if (response) {
                                console.log(response);
                                this.props.refresh();
                                this.forceUpdate();
                                document.getElementById("commentContent").value = "";
                                document.getElementById("loginfirst").innerText = "";
                            }

                        });

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
        // <<<<<<< HEAD

        //         return (
        //             <React.Fragment>
        //                 <div style={scrollableContainer}>
        //                     {this.props.comments && this.props.comments.map(comment =>

        //                         <div className="d-flex m-2">
        //                             <img className="  m-1 py-2  rounded-circle" src={comment.user_img} />
        //                             <div className="d-flex flex-column mt-2 p-1">
        //                                 <strong style={{ color: '#535964', fontSize: '1.3rem' }} className="mb-1">{comment.user_name}</strong>
        //                                 <h6 style={{ border: '0.1rem solid #e4e0e0', borderRadius: '3px 3px', padding: '0.5rem', width: '13rem', backgroundColor: '#F8F8F8' }}>{comment.comment_content}</h6>
        //                             </div>
        //                         </div>

        //                     )}
        // =======
        // ////////////////////////////////// Report  ////////////////////////////////////////////////////
        const sendReport = (id) => {
            let kind = "";
            if (this.props.post.kind == 'story') {
                kind = "commentStory";
            } else {
                kind = "commentChapter";
            }
            let data = {
                kind: kind,
                reason: "not appropriate",
                related_record_id: id,
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
                    document.getElementById("loginfirst").innerText = response.data.message
                }
                else {
                    console.log(response);
                }
            });

        }
        return (
            <React.Fragment>
                <div style={scrollableContainer}>
                    {this.props.comments && this.props.comments.map(comment =>

                        <div className="d-flex m-2">
                            <img className="  m-1 py-2  rounded-circle" src={comment.user_img} />
                            <div className="d-flex flex-column mt-2 p-1">
                                <strong style={{ color: '#535964', fontSize: '1.3rem' }} className="mb-1">{comment.user_name}</strong>
                                <h6 style={{ border: '0.1rem solid #e4e0e0', borderRadius: '3px 3px', padding: '0.5rem', width: '13rem', backgroundColor: '#F8F8F8' }}>{comment.comment_content} <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => { sendReport(comment.id) }}>report</span></h6>
                            </div>
                        </div>

                    )}
                </div>
                <div className="d-flex m-2">
                    <div className="form-outline col-9" >
                        <input type="search" id="commentContent" placeholder="Write your comment" className="form-control" style={{ backgroundColor: '#F8F8F8', paddingLeft: '0.5rem', height: '3rem' }} />
                    </div>
                    <button type="button" onClick={() => { addComment(this.props.post.id, this.props.post.kind) }} className=" btn ml-1" style={{ backgroundColor: '#F8F8F8' }}>
                        <i class="fa fa-paper-plane" aria-hidden="true" style={{ color: '#F8A488' }}></i>
                    </button>
                </div>
                <p id="loginfirst" style={{ color: '#F8A488' }} className="pl-2"></p>
            </React.Fragment>

        );
    }
}


export default Comments;


