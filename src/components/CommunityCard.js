import React, { Component } from 'react';
import Popup from "reactjs-popup";
import '../style/community.css';
import Likes from './Likes';
import Comments from './Comments';
import ReportPopup from './ReportPopup'

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
        return(       

                <div className="communityCard " >
                            <div className="pt-3 pl-3 d-flex justify-content-between">
                                <div className="d-flex">
                                    <img  className="  m-1 rounded-circle"  src="img/exPP.png"  />
                                    <div className="d-flex flex-column mt-2">
                                        <strong style={{color:'#535964',fontSize:'1.3rem' }} className="mb-1">{post.writer}</strong>
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
                                    <a className="mx-2 "  style={{color:'#535964' }}><i className="far fa-thumbs-up"></i></a>
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
                                    <a className="mx-2" style={{color:'#535964' }}><i className="far fa-comment-alt"></i></a>
                                <Popup
                                        trigger={<a   className="countsLink">{post.comments.length} Comments</a>

                                    }
                                        modal
                                        contentStyle={commentPopup}
                                    >
                                    <Comments comments={post.comments}></Comments>
                                </Popup >
                                    </div>                                    
                                </div>

                            </div>
                        </div>

);
}
}


export default CommunityCard;


