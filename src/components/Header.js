import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/js/dist/dropdown.js';
import $ from 'jquery';
import Popper from 'popper.js';
import '../style/headerFooter.css';





class Header extends Component {
    constructor(props){
        super(props);

    }
    

    render() {
        var avatar;
        if (this.props.user.avatar){
            avatar=this.props.user.avatar;
        }
        else{
            avatar='avatar.jpeg';
        }
        var name;
        if (Object.keys(this.props.user).length > 0){
            name=this.props.user.name;
        }
        else{
            name="Guest"
        }

        return (
            <nav className="py-2">
            <div className="row" style={{marginRight: "-120px"}}>
                
                <div className="col-md-2  d-flex  align-items-center">
                    <img  className=" mx-5 my-1 navbar-brand "  src="img/logo.png" alt="Booc" />
                 
                </div>
        
                <div className="col-md-4 " id="nav-padding-div">
                
                </div>
           
                <div className="col-lg-5 col-sm-9 col-xs-8 d-flex align-items-center justify-content-around ">
                    <a className=" text-white my-2 " href="/">Home</a>
                    <a className=" text-white my-2 " href="/FavoritesPage">My Favourite</a>
                    <a className=" text-white my-2 " href="/BookShelf">My Shelf</a>
                    <a className=" text-white my-2 " href="/map">Map</a>
                    <a className=" text-white my-2 " href="/community">Community</a>
                    <div className="writer"><a className="btn text-white" href="/writer">Writer</a></div>
                   
                        <div className="dropdown show" >
                            <a  href="#" ><img  className="  my-3 mr-3 icon"  src="img/icons/iconBell.png" /></a>
                            <img  className="  m-1 rounded-circle"  src={avatar}  /> 
                        
                            <a className="dropdown-toggle ml-2"  role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:'white',fontSize:'2rem',backgroundColor:'#263044'}}>
                            </a>

                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink" >
                                <a className="dropdown-item" onClick={() => this.props.history.push('/genre/1')}>{name}</a>
                                <hr class="dropdown-divider"></hr>
                                <a className="dropdown-item" onClick={() => this.props.history.push('/genre/1')}>
                                    My Favourites
                                </a>
                                <a className="dropdown-item" onClick={() => this.props.history.push('/genre/1')}>
                                    My Bookshelf
                                </a>
                                <a className="dropdown-item" onClick={() => this.props.history.push('/genre/1')}>
                                    My Bookmarks
                                </a>
                                <a className="dropdown-item" onClick={() => this.props.history.push('/genre/1')}>
                                    My Stories
                                </a>
                                <hr class="dropdown-divider"></hr>
                                <a className="dropdown-item" onClick={() => this.props.history.push('/genre/1')}>
                                    Logout
                                </a>
                            </div>
                        
                    </div>
                </div>  
        
            </div>
        
        </nav>

        );
    }
}


    export default Header;