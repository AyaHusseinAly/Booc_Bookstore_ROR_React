import React, { Component } from 'react';
import '../style/admin.css';
import '../style/cards.css';
import '../style/home.css';
import BookRow from './BookRow';
import axios from 'axios';
import { Input, Space } from 'antd';
import SearchResults from './SearchResults';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import FreeBook from './FreeBook';


class Home extends Component {
    
    state={
        fiction:[],
        thriller:[],
        horror:[],
        search:false,
        searchData:[],
        genres:[]

    }

    async componentDidMount(){ //API Links will be edited to use from implemented Facade Class methods

        axios.get("https://www.googleapis.com/books/v1/volumes?q=+subject:Fiction&startIndex=0&maxResults=6&orderBy=newest&key=AIzaSyCKJGq_tX3aqorh0Bznm5RsIgLVW7bE-y0")
        .then(response => {
            this.setState({fiction:response.data.items});
        });
        axios.get("https://www.googleapis.com/books/v1/volumes?q=+subject:thriller&startIndex=0&maxResults=6&orderBy=newest&key=AIzaSyCKJGq_tX3aqorh0Bznm5RsIgLVW7bE-y0")
        .then(response => {
            this.setState({thriller:response.data.items});
        });
        axios.get("https://www.googleapis.com/books/v1/volumes?q=+subject:horror&startIndex=0&maxResults=6&orderBy=newest&key=AIzaSyCKJGq_tX3aqorh0Bznm5RsIgLVW7bE-y0")
        .then(response => {
            this.setState({horror:response.data.items});
        });
        const res=await axios.get('http://localhost:3000/shortStoriesGenres',
        {headers: {"Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        "Access-Control-Allow-Headers": "Content-Type"}});
        
        this.setState({genres:res.data.short_stories});
        console.log(this.state.genres);

        
         localStorage.setItem('book-favourite', JSON.stringify([]))
        localStorage.setItem('book-shelf', JSON.stringify([]))
        localStorage.setItem('book-download', JSON.stringify([]))
       
    }

    render() {

        const { Search } = Input;
        const onSearch = () =>{ 
            let string=document.getElementById("form1").value;
            axios.get("https://www.googleapis.com/books/v1/volumes?q="+ string +"+intitle:"+ string +"&startIndex=0&maxResults=40&orderBy=newest&key=AIzaSyCKJGq_tX3aqorh0Bznm5RsIgLVW7bE-y0")
            .then(response => {
                this.setState({searchData:response.data.items});
                this.setState({search:'true'})
            });

            console.log(string);
        }
        
        if(this.state.search=='true'){
            return(<SearchResults items={this.state.searchData} flag={0}/>);
        }
        else{
            return (
                <div>
                    <div className="bckgnd" >
                    <div className="input-group d-flex flex-column justify-content-center align-items-center text-center" style={{color:'rgba(255,255,255,0.95)',height:'650px'}}>
                        <h2 style={{color:'white'}}>Books Shopping online with <strong style={{fontWeight:'bold',color:'#263044',opacity:'1'}}>B<span style={{color: '#F8A488',fontWeight:'bold',fontSize: '3rem'}}>oo</span>C</strong></h2>
                        <h4 style={{color:'white'}}>support local Bookstores</h4>
                        <h4 style={{color:'white'}}>open a door to become a writer</h4> <br/>
                        <div className="d-flex ">
                        <div className="form-outline" >
                            <input type="search" id="form1" placeholder="Search for a Book .." className="form-control" style={{width:'40rem',height:'4.5rem',fontSize: '1.5rem',paddingLeft:'1.5rem'}} />
                        </div>
                        <button type="button" onClick={onSearch} className="btn ml-1" style={{backgroundColor:'#263044',width:'4.5rem'}}>
                            <i className="fas fa-search" style={{color:'white'}}></i>
                        </button>
                        <div className="dropdown show" >
                            <a className="btn btn-secondary dropdown-toggle ml-2" style={{width:'9rem',height:'4.5rem',backgroundColor:'white',opacity:'0.65',color:'grey',fontSize: '1.5rem',borderRadius:'10px 10px' }} role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Genre 
                            </a>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                {this.state.genres.map(genre=>
                                <a className="dropdown-item" onClick={() => this.props.history.push('/genre/'+genre.title)}>
                                    {genre.title}
                                </a>)}
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
                        <div style={{backgroundColor: "#E5E5E5",borderRadius: "10px",height:"350px",margin: "20px 0"}}>
                        <h3 className="mt-2"  style={{textAlign: "center",fontWeight:'bold',fontFamily: "arial"}} >Free Books</h3>
                        <FreeBook/>
                        </div>

                        <div className="d-flex flex-row justify-content-between align-items-evenly">
                            <div className="mycard row mx-2">
                                <div className="col-6">
                                    <h3 style={{fontWeight:'bold',marginBottom:'1.2rem'}}>Community</h3>
                                    <p>Do you enjoy reading?<br/>Find stories and follow promising writers!</p>
                                    <button  onClick={() => this.props.history.push('/community') }>Discover Comunity</button>
                                </div>   
                                <img className="col-5"  src="img/readFeature.png" />
                                
                            </div>
                            <div className="mycard row mx-2">
                                <div className="col-7">
                                    <h3 style={{fontWeight:'bold',marginBottom:'1.2rem'}}>Writers</h3>
                                    <p>Are you beginner in writting?<br/><strong>Booc </strong>opens the door for you to become a famous writer!</p>
                                    <button  onClick={() => this.props.history.push('/addstory') }>Write your first story</button>
                                </div>
                                <img className="col-5" src="img/writeFeature1.png"/>
                            
                            </div>
                        </div>
                
                    </div>

                
                </div>
            );
        }
    }
}


    export default Home;
