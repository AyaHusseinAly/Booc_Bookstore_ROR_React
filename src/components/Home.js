import React, { Component } from 'react';
import '../style/admin.css';
import BookRow from './BookRow';

class Home extends Component {

    render() {

        return (
            <div>
                <img src="img/home_backgrnd.png" alt="LA" style={{ width:"100%" }}/>
                <div className="container books_container">
                    <BookRow></BookRow>
                    <BookRow></BookRow>
                    <BookRow></BookRow>
         
                </div>
            
            </div>
    );
    }
}


    export default Home;