import React, { Component } from 'react';
import '../style/admin.css';
import BookRow from './BookRow';
import axios from 'axios';



class Admin extends Component {
      state={
        fiction:[],
        thriller:[],
        horror:[]

    }

    componentDidMount(){
        axios.get("https://www.googleapis.com/books/v1/volumes?q=+subject:Fiction&startIndex=0&orderBy=newest&key=AIzaSyAzt2S4sYkZLX6fAAWM6OMeUVH4h8l_bdg")
        .then(response => {
            this.setState({fiction:response.data.items});
        });
        axios.get("https://www.googleapis.com/books/v1/volumes?q=+subject:thriller&startIndex=0&orderBy=newest&key=AIzaSyAzt2S4sYkZLX6fAAWM6OMeUVH4h8l_bdg")
        .then(response => {
            this.setState({thriller:response.data.items});
        });
        axios.get("https://www.googleapis.com/books/v1/volumes?q=+subject:horror&startIndex=0&orderBy=newest&key=AIzaSyAzt2S4sYkZLX6fAAWM6OMeUVH4h8l_bdg")
        .then(response => {
            this.setState({horror:response.data.items});
        });
      
}
    render() {

        return (
            
<div>
<div className="container books_container">
                    <BookRow items={this.state.fiction.slice(0,6)}></BookRow>
                    <BookRow items={this.state.thriller.slice(0,6)}></BookRow>
                    <BookRow items={this.state.horror.slice(0,6)}></BookRow>

  <div className="row d-flex justify-content-center " style={{textAlign: "center"}} >

`		<a href="#collapse" style={{textAlign: "center"}} >  More... </a>

  </div>

  
</div>

<hr/>
<h5> Reports </h5>
<ul title="reports">
	<li>A user reports <a href="#collapse">Ahmed Kmael </a> Story</li>
	<li>A user reports <a href="#collapse">Shimaa Adel </a> Comment</li>
	<li>A user reports <a href="#collapse">Ahmed Kmael </a> Story</li>
	<li>A user reports <a href="#collapse">Shimaa Adel </a> Comment</li>
	<li>A user reports <a href="#collapse">Ahmed Kmael </a> Story</li>
	<li>A user reports <a href="#collapse">Shimaa Adel </a> Comment</li>
	<li>A user reports <a href="#collapse">Ahmed Kmael </a> Story</li>


</ul>
<div className="row d-flex justify-content-center " style={{textAlign: "center"}}>

	<a href="#collapse" style={{textAlign: "center"}} >  More... </a>

  </div>

</div>

  	
	

    );
    }
}


export default Admin;