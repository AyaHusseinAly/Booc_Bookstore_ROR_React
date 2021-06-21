import React, { Component } from 'react';
import Comments from './CommunityCard';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/community.css';
import axios from 'axios';
import CommunityCard from './CommunityCard';




class Community extends Component {
    state={
        posts:[],
    }
    async componentDidMount(){ //API Links will be edited to use from implemented Facade Class methods

        axios.get('http://localhost:3000/communityPosts',
        {headers: {"Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        "Access-Control-Allow-Headers": "Content-Type"}}).then(response => {
            this.setState({posts:response.data.posts});
            console.log(this.state.posts);        

        });
     
        
       
    }

    render() {

        const onSearch = () =>{ 
            let string=document.getElementById("form1").value;
            console.log(string);


        }
 
        return (
            <div className="pl-5 py-5">
                <div className="row mb-3 pl-2" style={{height:'3rem'}}>
                        <button type="button" onClick={onSearch} className="col-1 btn ml-1" style={{backgroundColor:'#F8F8F8'}}>
                            <i className="fas fa-search" style={{color:'gray'}}></i>
                        </button>
                        <div className="form-outline col-9" >
                            <input type="search" id="form1" placeholder="Search for a Stroy or a Writer .." className="form-control" style={{backgroundColor:'#F8F8F8',paddingLeft:'1.5rem',height:'3rem'}} />
                        </div>
                        <div className="dropdown show" >
                            <a className="btn btn-secondary dropdown-toggle ml-2" style={{backgroundColor:'white',opacity:'0.85',color:'#263044',height:'2.9rem'}} role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Order By
                            </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item" onClick={() => this.props.history.push('/community')}>By Latest</a>
                                <a className="dropdown-item" onClick={() => this.props.history.push('/community')}>Followed writers</a>
                        
                        </div>
                        </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <div className="communityCard sideCard">
                            <a className="d-block my-3 ml-5" href="#" style={{color:'#535964',fontWeight:'bold'}}> <i className="fas fa-caret-right"></i> Stories Feed</a>
                            <a className="d-block my-4 ml-5" href="#" style={{color:'#535964'}} onClick={() => this.props.history.push('/addstory') }> <i className="fas fa-caret-right "style={{color:'#F8F8F8'}}></i> Add a Story</a>
                            <a className="d-block my-3 ml-5" href="#" style={{color:'#535964'}}> <i className="fas fa-caret-right "style={{color:'#F8F8F8'}}></i> Bookmarks</a>
                            <a className="d-block my-4 ml-5" href="#" style={{color:'#535964'}}> <i className="fas fa-caret-right "style={{color:'#F8F8F8'}}></i> My Downloads</a>
                            <a className="d-block my-3 ml-5" href="#" style={{color:'#535964'}} onClick={() => this.props.history.push('/writer') }> <i className="fas fa-caret-right "style={{color:'#F8F8F8'}}></i> My Profile</a>


                        </div>
                    </div>
                    <div className="col-8">

                        {this.state.posts && this.state.posts.map(post=> 

                        <CommunityCard post={post}></CommunityCard>

                        )}


                    </div>

                </div>

            </div>

            // <h1>Community</h1>

    );
    }
}


    export default Community;