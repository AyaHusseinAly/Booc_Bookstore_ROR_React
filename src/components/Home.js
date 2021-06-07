import React, { Component } from 'react';
import '../style/admin.css';
import '../style/cards.css';
import '../style/home.css';
import BookRow from './BookRow';
import axios from 'axios';
import { Input, Space } from 'antd';
import SearchResults from './SearchResults';


class Home extends Component {
    state={
        fiction:[],
        thriller:[],
        horror:[],
        search:false,
        searchData:[]

    }

    componentDidMount(){ //API Links will be edited to use from implemented Facade Class methods
        axios.get("https://www.googleapis.com/books/v1/volumes?q=+subject:Fiction&startIndex=0&maxResults=6&orderBy=newest&key=AIzaSyD9_t-TTlRiYRGH-UxXjRLz773OyTFy3_U")
        .then(response => {
            this.setState({fiction:response.data.items});
        });
        axios.get("https://www.googleapis.com/books/v1/volumes?q=+subject:thriller&startIndex=0&maxResults=6&orderBy=newest&key=AIzaSyD9_t-TTlRiYRGH-UxXjRLz773OyTFy3_U")
        .then(response => {
            this.setState({thriller:response.data.items});
        });
        axios.get("https://www.googleapis.com/books/v1/volumes?q=+subject:horror&startIndex=0&maxResults=6&orderBy=newest&key=AIzaSyD9_t-TTlRiYRGH-UxXjRLz773OyTFy3_U")
        .then(response => {
            this.setState({horror:response.data.items});
        });
       
    }

    render() {

        const { Search } = Input;
        const onSearch = () =>{ 
            let string=document.getElementById("form1").value;
            axios.get("https://www.googleapis.com/books/v1/volumes?q="+ string +"+intitle:"+ string +"&startIndex=0&maxResults=8&orderBy=newest&key=AIzaSyD9_t-TTlRiYRGH-UxXjRLz773OyTFy3_U")
            .then(response => {
                this.setState({searchData:response.data.items});
                this.setState({search:'true'})
            });

            console.log(string);
        }
        
        if(this.state.search=='true'){
            return(<SearchResults items={this.state.searchData}/>);
        }
        else{
            return (
                <div>
                    <div className="bckgnd pt-5" >
                    <div class="input-group d-flex flex-column justify-content-center align-items-center text-center mt-5" style={{color:'rgba(255,255,255,0.95)',paddingTop:'1.9rem'}}>
                        <h2 >Books Shopping online with <strong style={{fontWeight:'bold',color:'#263044',opacity:'1'}}>B<span style={{color: '#F8A488',fontWeight:'bold'}}>oo</span>c</strong></h2>
                        <h4>support local Bookstores</h4>
                        <h4>open a door to become a writer</h4> <br/>
                        <div className="d-flex ">
                        <div class="form-outline" >
                            <input type="search" id="form1" placeholder="Search for a Book" class="form-control" style={{width:'25rem',height:'2.9rem'}} />
                        </div>
                        <button type="button" onClick={onSearch} class="btn btn-primary" style={{backgroundColor:'#263044',width:'2.9rem'}}>
                            <i class="fas fa-search"></i>
                        </button>
                        <div class="dropdown ml-3" >
                            <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  style={{width:'7rem',height:'2.9rem'}}>
                                Genre
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                            </div>
                        </div>
                        </div>            
                    </div>

                    <div className="container books_container">
                        <div className="mycard row mx-2">
                                <div className="col-6"style={{marginTop:'4.5rem'}}>
                                    <h3 style={{fontWeight:'bold',marginBottom:'1.2rem'}}>Find Libraries and Bookstores around you!</h3>
                                    <button style={{width:'50%'}} onClick={() => this.props.history.push('/map') }>Go to Map</button>
                                </div>   
                                <img className="col-6 mapImg" src="img/mapFeature.png" />        
                        </div>

                        <h6 className="mt-5"><strong>Latest Fiction Books</strong></h6>
                        <BookRow key={this.state.fiction.id} items={this.state.fiction}></BookRow>
                        <h6 className="mt-2"><strong>Latest Thriller Books</strong></h6>
                        <BookRow key={this.state.thriller.id} items={this.state.thriller}></BookRow>
                        <h6 className="mt-2"><strong>Latest Horror Books</strong></h6>
                        <BookRow key={this.state.horror.id} items={this.state.horror}></BookRow>
                    

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
}


    export default Home;