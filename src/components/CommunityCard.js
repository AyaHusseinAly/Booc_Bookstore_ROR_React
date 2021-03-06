import React, { Component } from 'react';
import Popup from "reactjs-popup";
import '../style/community.css';
import Likes from './Likes';
import Comments from './Comments';
import ReportPopup from './ReportPopup'
import axios from 'axios';
import {PRODUCTION_BACKEND_URL,PRODUCTION_FRONTEND_URL} from '../constants/index.js'



// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/headerFooter.css';

class CommunityCard extends Component {
    state={
        readMoreIds:[]

    }

    render() { 
        const post=this.props.post;
        const popupStyle={
            borderRadius:'10px 10px',
            border:'4px solid #F8A488',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.7)',
            padding:'2rem',
            width:'25rem',
            maxHeight:'35rem',
            overflowY: 'scroll'
        }
        const commentPopup={
            borderRadius:'10px 10px',
            border:'4px solid #F8A488',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.7)',
            padding:'2rem',
            width:'25rem',

        } 
        const readMore = (postId) =>{ 
            var joined = this.state.readMoreIds;

            if(this.state.readMoreIds.includes(postId)){
                joined.splice(joined.indexOf(postId),1);
            }
            else{
                joined.push(postId);
            }
            this.setState({ readMoreIds: joined });
            console.log(this.state.readMoreIds);


        }
        const likeStory = (story_id,is_liked) =>{ 
            if(localStorage.getItem('user_id') !== null){
                let data={
                    story_id:story_id,
                    user_id:window.localStorage.getItem('user_id')
                };
                if(!is_liked){
                    axios.post(`${PRODUCTION_BACKEND_URL}/likeStory`, data, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PUT",
                        "Access-Control-Allow-Headers": "Content-Type",

                    }
                }).then(response => {
                    if(response){
                        console.log(response);
                        this.props.refresh_data();
                        this.forceUpdate();
                    }
                    
                });
                }
                else{
                    axios.post(`${PRODUCTION_BACKEND_URL}/unlikeStory`, data, {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "GET, POST, PUT",
                            "Access-Control-Allow-Headers": "Content-Type",

                        }
                    }).then(response => {
                        if(response){
                            console.log(response);
                            this.props.refresh_data();
                            this.forceUpdate();
                        }
                        
                    });

                }
            }
            else{
                window.location.href='login';
            }      
    }
        
        const likeChapter = (chapter_id,is_liked) =>{ 
            if(localStorage.getItem('user_id') !== null){
                let data={
                    chapter_id:chapter_id,
                    user_id:window.localStorage.getItem('user_id')
                };
                if(!is_liked){         
                axios.post(`${PRODUCTION_BACKEND_URL}/likeChapter`, data, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PUT",
                        "Access-Control-Allow-Headers": "Content-Type",

                    }
                }).then(response => {
                    if(response){
                        this.props.refresh_data();
                        this.forceUpdate();
                        console.log(response);
                    }
                    else{
                        console.log(response);
                    }
                });

                }
                else{
                    axios.post(`${PRODUCTION_BACKEND_URL}/unlikeChapter`, data, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PUT",
                        "Access-Control-Allow-Headers": "Content-Type",

                    }
                }).then(response => {
                    if(response){
                        this.props.refresh_data();
                        this.forceUpdate();
                        console.log(response);
                    }
                    
                });

                
                }
            }
            else{
                window.location.href='login';
            }  
        }
        return(       

                <div className="communityCard " >
                            <div className="pt-3 pl-3 d-flex justify-content-between">
                                <div className="d-flex">
                                    <img  className="  m-1 rounded-circle"  src={post.writer_avatar}  />
                                    <div className="d-flex flex-column mt-2">
                                        <a href={"/writerStories/"+post.writer_id} style={{color:'#535964',fontSize:'1.3rem' }} className="mb-1"><strong>{post.writer}</strong></a>
                                        <span>{post.story_title} <div className="chapterTag d-inline">{post.chapter_title}</div></span>
                                    </div>
                                </div>
                                
                                <Popup
                                        trigger={<a style={{color:'#CD3700', marginRight:'1.2rem'}}><strong >Report</strong></a>
                                    }
                                        modal
                                        contentStyle={popupStyle}
                                    >
                                    <ReportPopup post={post}></ReportPopup>
                                </Popup >

                            </div> 
                            
                            <p>{this.state.readMoreIds.includes(post.id)&&post.content}{!this.state.readMoreIds.includes(post.id)&&post.content?.slice(0,400)}
                                    <a class="readLinks" onClick={()=>readMore(post.id)} style={{color: '#263044'}}>
                                        <strong>{!this.state.readMoreIds.includes(post.id)&&post.content.length>400&&"... Read more"}</strong>
                                    </a>
                                    <a class="readLinks"onClick={()=>readMore(post.id)} style={{color: '#263044'}}>
                                        <strong>{this.state.readMoreIds.includes(post.id)&&"Read less"}</strong>
                                    </a>
                            </p>
                            <div className="communityCardFooter" >
                                <div className="row  pt-2">
                                    <div className="col-5 pl-5 ml-5" >
                                    {!post.is_liked&&<a className="mx-2 " onClick={()=>{post.kind=='story'&&likeStory(post.id,post.is_liked)||post.kind=='chapter'&&likeChapter(post.id,post.is_liked)}} style={{color:'#535964' }}><i className="far fa-thumbs-up"></i></a>
                                    }{post.is_liked&&<a className="mx-2 " onClick={()=>{post.kind=='story'&&likeStory(post.id,post.is_liked)||post.kind=='chapter'&&likeChapter(post.id,post.is_liked)}} style={{color:'#F8A488' }}><i className="fas fa-thumbs-up"></i></a>
                                    }
                                <Popup
                                        trigger={<a   className="countsLink">{post.liked_users.length} Likes</a>
                                    }
                                        modal
                                        contentStyle={popupStyle}
                                    >
                                    <Likes users={post.liked_users}></Likes>
                                </Popup >
                                </div>
                                    <div style={{height:'1.8rem',border:'0.8px solid gray'}}></div>
                                
                                <div className="col-5 pl-5 ml-5" >
                                <Popup
                                        trigger={ <a className="mx-2" style={{color:'#535964' }}><i className="far fa-comment-alt"></i></a>


                                    }
                                        modal
                                        contentStyle={commentPopup}
                                    >
                                    <Comments comments={post.comments} post={post} refresh={this.props.refresh_data}></Comments>
                                </Popup >
                                <Popup
                                        trigger={<a   className="countsLink">{post.comments.length} Comments</a>

                                    }
                                        modal
                                        contentStyle={commentPopup}
                                    >
                                    <Comments comments={post.comments} post={post} refresh={this.props.refresh_data}></Comments>
                                </Popup >
                                    </div>                                    
                                </div>

                            </div>
                        </div>

);
}
}


export default CommunityCard;


