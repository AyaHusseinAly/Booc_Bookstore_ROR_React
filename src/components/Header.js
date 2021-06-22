import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/js/dist/dropdown.js';
import $ from 'jquery';
import axios from 'axios';
import Popper from 'popper.js';
import '../style/headerFooter.css';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'





class Header extends Component {
    constructor(props){
        super(props);
    }
    handleLogout(){
        axios.delete("http://localhost:3000/users/sign_out",
        {headers:{"Access-Control-Allow-Origin": "http://localhost:3001",
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        "Access-Control-Allow-Headers": "Content-Type"}})
       .then(response=>{
         if(response.data.message === 'signout success'){
        //  this.setState({
        //    loggedInStatus : "NOT_LOGGED_IN",
        //    user : {},
        //    avatar: ""
        //  })
         localStorage.removeItem("user_id");
         }
       })
       .catch(error=>{
         console.log(error);
       })
    //    this.setState({
    //      loggedInStatus : "NOT_LOGGED_IN",
    //      user : {},
    //      avatar: ""
    //    })
     }
    

    render() {
        var avatar;
        if (this.props.avatar){
            avatar=this.props.avatar;
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
        var account_btn;
        if(Object.keys(this.props.user).length >0){
            account_btn=<a 
            className="dropdown-item" 
            onClick={this.handleLogout}><i class="fas fa-sign-out-alt"></i> Logout</a>
        }
        else{
            account_btn=<a 
            className="dropdown-item" 
            href="/login"><i class="fas fa-sign-in-alt"></i> Login</a>
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
                    <a className=" text-white my-2 " href="/map">Map</a>
                    <a className=" text-white my-2 " href="/community">Community</a>
                    <div className="writer"><a className="btn text-white" href="/writer">Writer</a></div>

                    {/* <div >
                        <a  href="#" ><img  className="  my-3 mr-3 icon"  src="img/icons/iconBell.png" /></a>
                        <a  href="#" className="text-light"><img  className="  m-1 rounded-circle"  src={avatar}  /> {name}  </a>
                        <a  href="#" ><img  className=" m-1 icondrop"  src="img/icons/iconDropdownWhite.png"  /></a>
                    </div> */}
                   
                        <div className="dropdown show" >
                            <a  href="#" ><img  className="  my-3 mr-3 icon"  src="img/icons/iconBell.png" /></a>
                            <img  className="  m-1 rounded-circle"  src={avatar}  /> 
                        
                            <a className="dropdown-toggle ml-2"  role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:'white',fontSize:'2rem',backgroundColor:'#263044'}}>
                            </a>

                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink" >
                                <a className="dropdown-item" href='/writer'>{name}</a>
                                <hr class="dropdown-divider"></hr>
                                <a className="dropdown-item" href='/FavoritesPage'>
                                    My Favourites
                                </a>
                                <a className="dropdown-item" href='/BookShelf'>
                                    My Bookshelf
                                </a>
                                <a className="dropdown-item" href='/'>
                                    My Bookmarks
                                </a>
                                <a className="dropdown-item" href='/'>
                                    My Stories
                                </a>
                                <hr class="dropdown-divider"></hr>
                                    {account_btn}
                               
                            </div>
                        
                    </div>
                </div>  
        
            </div>
        
        </nav>

        );
    }
}


    export default Header;