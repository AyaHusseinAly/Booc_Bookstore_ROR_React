import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
                    <div >
                        <a  href="#" ><img  className="  my-3 mr-3 icon"  src="img/icons/iconBell.png" /></a>
                        <a  href="#" className="text-light"><img  className="  m-1 rounded-circle"  src={avatar}  /> {name}  </a>
                        <a  href="#" ><img  className=" m-1 icondrop"  src="img/icons/iconDropdownWhite.png"  /></a>
                    </div>
                </div>  
        
            </div>
        
        </nav>

        );
    }
}


    export default Header;