import React, { Component } from 'react';
import '../style/admin.css';
import '../style/cards.css';
import BookRow from './BookRow';
import axios from 'axios';

class Home extends Component {
    state={
        fiction:[],
        thriller:[],
        horror:[]

    }

    componentDidMount(){
        axios.get("https://www.googleapis.com/books/v1/volumes?q=+subject:Fiction&startIndex=0&orderBy=newest&key=AIzaSyD9_t-TTlRiYRGH-UxXjRLz773OyTFy3_U")
        .then(response => {
            this.setState({fiction:response.data.items});
        });
        axios.get("https://www.googleapis.com/books/v1/volumes?q=+subject:thriller&startIndex=0&orderBy=newest&key=AIzaSyD9_t-TTlRiYRGH-UxXjRLz773OyTFy3_U")
        .then(response => {
            this.setState({thriller:response.data.items});
        });
        axios.get("https://www.googleapis.com/books/v1/volumes?q=+subject:horror&startIndex=0&orderBy=newest&key=AIzaSyD9_t-TTlRiYRGH-UxXjRLz773OyTFy3_U")
        .then(response => {
            this.setState({horror:response.data.items});
        });
       
    }

    render() {
        const background = {
            backgroundImage: 'url(img/home_backgrnd.png)',
            width:'100%'
          };

        return (
            <div>
                {/* <div style={{ backgroundImage: background }}></div> */}
                <img src="img/home_backgrnd.png" alt="LA" style={{ width:"100%" }}/>

                <div className="container books_container">
                    <div className="mycard row mx-2">
                            <div className="col-6"style={{marginTop:'4.5rem'}}>
                                <h3 style={{fontWeight:'bold',marginBottom:'1.2rem'}}>Find Libraries and Bookstores around you!</h3>
                                <button style={{width:'50%'}} onClick={() => this.props.history.push('/map') }>Go to Map</button>
                            </div>   
                            <img className="col-6 mapImg" src="img/mapFeature.png" />        
                    </div>

                    <h6><strong>Latest Fiction Books</strong></h6>
                    <BookRow items={this.state.fiction}></BookRow>
                    <h6><strong>Latest Thriller Books</strong></h6>
                    <BookRow items={this.state.thriller}></BookRow>
                    <h6><strong>Latest Horror Books</strong></h6>
                    <BookRow items={this.state.horror}></BookRow>
                

                    <div className="d-flex flex-row justify-content-center align-items-evenly">
                        <div className="mycard row mx-2">
                            <div className="col-6">
                                <h3 style={{fontWeight:'bold',marginBottom:'1.2rem'}}>Community</h3>
                                <p>Do you enjoy reading?<br/>Find stories and follow promising writers!</p>
                                <button  onClick={() => this.props.history.push('/community') }>Discover Comunity</button>
                            </div>   
                            <img className="col-5"  src="img/readFeature.png" />
                            
                        </div>
                        <div className="mycard row mx-2">
                            <div className="col-6">
                                <h3 style={{fontWeight:'bold',marginBottom:'1.2rem'}}>Writers</h3>
                                <p>Are you beginner in writting?<br/><strong>Booc </strong>opens the door for you to become a famous writer!</p>
                                <button  onClick={() => this.props.history.push('/writer') }>Write your first story</button>
                            </div>
                            <img className="col-6" src="img/writeFeature1.png"/>
                          
                        </div>
                    </div>
               
                </div>

            
            </div>
    );
    }
}


    export default Home;