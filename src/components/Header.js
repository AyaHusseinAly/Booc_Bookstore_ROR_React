import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/headerFooter.css';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'





class Header extends Component {
    constructor(props){
        super(props);

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
            onClick={this.props.handleLogout}><i class="fas fa-sign-out-alt"></i> Logout</a>
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
                            <a className="btn text-white dropdown-toggle ml-2"   role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img  className="  m-1 rounded-circle"  src={avatar}  /> {name} 
                            </a>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
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