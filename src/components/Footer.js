import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/headerFooter.css';

class Footer extends Component {

    render() {

        return (
            <footer>
            <div className="row px-lg-5 px-xs-1">

            <div className="col-md-2 col-xs-12 d-flex  align-items-center">
                <img  className=" "  src="img/logo.png" alt="Booc" />
            </div>
            <div className="col-md-5  col-xs-12 d-flex align-items-center justify-content-around">
                <div className=" footer d-flex flex-column justify-content-around ">
                    <a href="#" className="footer m-1">About B<span>oo</span>c</a>
                    <a href="#" className="m-1">FAQ</a>
                    <a href="#" className="m-1">Contact Us</a>
                </div>
                <div className="footer d-flex flex-column justify-content-around">
                    <a href="#" className="m-1">Terms of Use</a>
                    <a href="#" className="m-1">Privacy Policy</a>
                    <a href="#" className="footer m-1"><span>Logout</span></a>
                </div>
            </div>
            <div className="col-md-5 col-xs-12 pr-md-3 " >

                <form className="form-inline mr-lg-5  " id="searchBar" >
                    <input className="form-control my-5 " type="search" placeholder="Search for a book" />
                    <button className="btn bg-light " type="submit" >
                        <img  className=" icon"  src="img/icons/iconSearch.png" />
                    </button>
                </form>

            </div>

        </div>
        </footer>


    );
    }
}


    export default Footer;