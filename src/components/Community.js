import React, { Component } from 'react';
import Comments from './CommunityCard';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/community.css';
import axios from 'axios';
import CommunityCard from './CommunityCard';
import { Pagination } from 'antd';
import {PRODUCTION_BACKEND_URL,PRODUCTION_FRONTEND_URL} from '../constants/index.js'


class Community extends Component {
    state={
        posts:[],
        current_page:0,
        pages:0,
        array_of_pages:[]
    }
    
    async componentDidMount(){ 
        let data={user_id:window.localStorage.getItem('user_id'),page:1};
        axios.post(`${PRODUCTION_BACKEND_URL}/communityPosts`,data,
        {headers: {"Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        "Access-Control-Allow-Headers": "Content-Type"}}).then(response => {
            this.setState({posts:response.data.posts, pages:response.data.pages, current_page:response.data.page});
            let arr=[]
            for(var i=1;i<=this.state.pages;i++){
                arr.push(i)
            }
            this.setState({array_of_pages:arr});
            console.log(this.state.current_page)
        });
       
    }

    render() {
        const changePage = (page) =>{
            if(page=="prev"){page=this.state.current_page-1}
            if(page=="nxt"){page=this.state.current_page+1}

            let data={user_id:window.localStorage.getItem('user_id'),page:page};
            axios.post(`${PRODUCTION_BACKEND_URL}/communityPosts`,data,
            {headers: {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            "Access-Control-Allow-Headers": "Content-Type"}}).then(response => {
            this.setState({posts:response.data.posts, pages:response.data.pages, current_page:response.data.page});
            console.log(this.state.posts);        

        });
        }


        const onSearch = () =>{ 
            let string=document.getElementById("searchform").value;
            console.log(string);
            let data = {q:string}
            axios.post(`${PRODUCTION_BACKEND_URL}/searchStoryChapter`,data,
            {headers: {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            "Access-Control-Allow-Headers": "Content-Type"}}).then(response => {
                this.setState({posts:response.data.posts, pages:response.data.pages, current_page:response.data.page});
                console.log(this.state.posts);        

            });


        }
        const refresh= () =>{ 
            let data={user_id:window.localStorage.getItem('user_id')};
            axios.post(`${PRODUCTION_BACKEND_URL}/communityPosts`,data,
            {headers: {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            "Access-Control-Allow-Headers": "Content-Type"}}).then(response => {
                this.setState({posts:response.data.posts});
                console.log(this.state.posts);        
    
            });
        }
        const followedWriters= () =>{
            let data={user_id:window.localStorage.getItem('user_id')};
            axios.post(`${PRODUCTION_BACKEND_URL}/followerPosts`,data,
            {headers: {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            "Access-Control-Allow-Headers": "Content-Type"}}).then(response => {
                this.setState({posts:response.data.posts});
                console.log(this.state.posts);        
    
            }); 

        }
 
        return (
            <div className="pl-5 py-5">
                <div className="row mb-3 pl-2" style={{height:'3rem'}}>
                        <button type="button" onClick={onSearch} className="col-1 btn ml-1" style={{backgroundColor:'#F8F8F8'}}>
                            <i className="fas fa-search" style={{color:'gray'}}></i>
                        </button>
                        <div className="form-outline col-9" >
                            <input type="search" id="searchform" placeholder="Search for a Stroy or a Writer .." className="form-control" style={{backgroundColor:'#F8F8F8',paddingLeft:'1.5rem',height:'3rem'}} />
                        </div>
                        <div className="dropdown show" >
                            <a className="btn btn-secondary dropdown-toggle ml-2" style={{backgroundColor:'white',opacity:'0.85',color:'#263044',height:'2.9rem'}} role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Order By
                            </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item" onClick={refresh}>By Latest</a>
                                <a className="dropdown-item" onClick={followedWriters}>Followed writers</a>
                        
                        </div>
                        </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <div className="communityCard sideCard">
                            <a className="d-block my-3 ml-5" href="#" style={{color:'#535964',fontWeight:'bold'}}> <i className="fas fa-caret-right"></i> Stories Feed</a>
                            <a className="d-block my-4 ml-5" href="/addstory" style={{color:'#535964'}} > <i className="fas fa-caret-right "style={{color:'#F8F8F8'}}></i> Add a Story</a>
                            <a className="d-block my-3 ml-5" href="/writer" style={{color:'#535964'}}> <i className="fas fa-caret-right "style={{color:'#F8F8F8'}}></i> Bookmarks</a>
                            <a className="d-block my-4 ml-5" href="/AllStories" style={{color:'#535964'}}> <i className="fas fa-caret-right "style={{color:'#F8F8F8'}}></i> Navigate stories</a>
                            <a className="d-block my-3 ml-5" href="#/UserPage" style={{color:'#535964'}} onClick={() => this.props.history.push('/writer') }> <i className="fas fa-caret-right "style={{color:'#F8F8F8'}}></i> My Profile</a>


                        </div>
                    </div>
                    <div className="col-8">

                        {this.state.posts && this.state.posts.map(post=> 

                        <CommunityCard post={post} refresh={() => this.forceUpdate()} refresh_data={refresh}></CommunityCard>

                        )}


                    </div>
                            

                </div>
                <div className=" d-flex justify-content-center">
                    {/* <div className="col-5"></div>
                            <Pagination  onPageChange={()=>{console.log("change")}} size='mini' siblingRange="2"
                            defaulActivePage="1"
                            totalPages="5"
                            /> */}
                         
                            <ul class="pagination ">
                                <li class="page-item"><a class="page-link" onClick={()=>{changePage("prev")}}>Previous</a></li>
                                
                                {
                                    this.state.array_of_pages.map(i=>
                                        <div>
                                            {this.state.current_page!=i&&<li class="page-item" id={"page"+i}><a class="page-link " onClick={()=>{changePage(i)}}>{i}</a></li>}
                                            {this.state.current_page==i&&<li class="page-item active"><a class="page-link " onClick={()=>{changePage(i)}}>{i}</a></li>}
                                        </div>
                                )
                                }  


                                <li class="page-item"><a class="page-link" onClick={()=>{changePage("nxt")}}>Next</a></li>
                            </ul>
                       
                </div>
                
                

            </div>

            // <h1>Community</h1>

    );
    }
}


    export default Community;