import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/community.css';

class Community extends Component {

    render() {
        const onSearch = () =>{ 
            let string=document.getElementById("form1").value;
            console.log(string);


        }

        return (
            <div className="pl-5 py-5">
                <div className="row mb-3 py-4 pl-2">
                        <button type="button" onClick={onSearch} className="col-1 btn ml-1" style={{backgroundColor:'#F8F8F8'}}>
                            <i className="fas fa-search" style={{color:'gray'}}></i>
                        </button>
                        <div className="form-outline col-9" >
                            <input type="search" id="form1" placeholder="Search for a Stroy or a Writer .." className="form-control" style={{backgroundColor:'#F8F8F8',paddingLeft:'1.5rem'}} />
                        </div>
                        <div className="dropdown show" >
                            <a className="btn btn-secondary dropdown-toggle ml-2" style={{backgroundColor:'white',opacity:'0.85',color:'#263044'}} role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                        <div className="communityCard">
                            <a className="d-block my-3 ml-5" href="#" style={{color:'#535964',fontWeight:'bold'}}> <i class="fas fa-caret-right"></i> Stories Feed</a>
                            <a className="d-block my-4 ml-5" href="#" style={{color:'#535964'}}> <i class="fas fa-caret-right "style={{color:'#F8F8F8'}}></i> Add a Story</a>
                            <a className="d-block my-3 ml-5" href="#" style={{color:'#535964'}}> <i class="fas fa-caret-right "style={{color:'#F8F8F8'}}></i> Bookmarks</a>
                            <a className="d-block my-4 ml-5" href="#" style={{color:'#535964'}}> <i class="fas fa-caret-right "style={{color:'#F8F8F8'}}></i> My Downloads</a>
                            <a className="d-block my-3 ml-5" href="#" style={{color:'#535964'}}> <i class="fas fa-caret-right "style={{color:'#F8F8F8'}}></i> My Profile</a>


                        </div>
                    </div>
                    <div className="col-8">
                        <div className="communityCard ">
                            <div className="pt-3 pl-3 d-flex justify-content-between">
                                <div className="d-flex">
                                    <img  className="  m-1 rounded-circle"  src="img/exPP.png"  />
                                    <div className="d-flex flex-column mt-2">
                                        <strong style={{color:'#535964',fontSize:'1.3rem' }}>Islam Kamel</strong>
                                        <span>Harry Potter <div className="chapterTag d-inline">Chapter 2</div></span>
                                    </div>
                                </div>
                                <a href="#" style={{color:'#CD3700', marginRight:'1.2rem'}}><strong >Report</strong></a>

                            </div>
                            
                            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.""  Read more</p>
                            <div className="communityCardFooter" >
                                <div className="row  pt-2">
                                    <a className="col-5 pl-5 ml-5" href="#" style={{color:'#535964' }}><i class="far fa-thumbs-up"></i> Like</a>
                                    <div style={{height:'1.8rem',border:'0.8px solid gray'}}></div>
                                    <a className="col-5 pl-5 ml-5" href="#" style={{color:'#535964'}}><i class="far fa-comment-alt"></i> Comment</a>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>

            // <h1>Community</h1>

    );
    }
}


    export default Community;