import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/community.css';
import axios from 'axios';


class Community extends Component {
    state={
        stories:[]
    }
    async componentDidMount(){ //API Links will be edited to use from implemented Facade Class methods

        const res=await axios.get('http://localhost:3000/api/shortStories',
        {headers: {"Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        "Access-Control-Allow-Headers": "Content-Type"}});
        
        this.setState({stories:res.data.stories});
        console.log(this.state.stories);
       
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
                                <a className="dropdown-item" onClick={() => this.props.history.push('/')}>By Latest</a>
                                <a className="dropdown-item" onClick={() => this.props.history.push('/')}>Followed writers</a>
                        
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
                            <a className="d-block my-3 ml-5" href="#" style={{color:'#535964'}}> <i className="fas fa-caret-right "style={{color:'#F8F8F8'}}></i> My Profile</a>


                        </div>
                    </div>
                    <div className="col-8">

                        {this.state.stories.map(story=> 

                        <div className="communityCard ">
                            <div className="pt-3 pl-3 d-flex justify-content-between">
                                <div className="d-flex">
                                    <img  className="  m-1 rounded-circle"  src="img/exPP.png"  />
                                    <div className="d-flex flex-column mt-2">
                                        <strong style={{color:'#535964',fontSize:'1.3rem' }} className="mb-1">Islam Kamel</strong>
                                        <span>{story.title} <div className="chapterTag d-inline">Chapter 1</div></span>
                                    </div>
                                </div>
                                <a href="#" style={{color:'#CD3700', marginRight:'1.2rem'}}><strong >Report</strong></a>

                            </div>
                            
                            <p>{story.summary.slice(0,400)+' ... '}<a href="#" style={{color: '#263044'}}><strong>Read more</strong></a></p>
                            <div className="communityCardFooter" >
                                <div className="row  pt-2">
                                    <a className="col-5 pl-5 ml-5" href="#" style={{color:'#535964' }}><i className="far fa-thumbs-up"></i> Like</a>
                                    <div style={{height:'1.8rem',border:'0.8px solid gray'}}></div>
                                    <a className="col-5 pl-5 ml-5" href="#" style={{color:'#535964'}}><i className="far fa-comment-alt"></i> Comment</a>
                                </div>

                            </div>
                        </div>

                        )}



                    </div>

                </div>

            </div>

            // <h1>Community</h1>

    );
    }
}


    export default Community;