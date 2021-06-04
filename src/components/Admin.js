import React, { Component } from 'react';
import '../style/admin.css';
import BookRow from './BookRow';


class Admin extends Component {

    render() {

        return (
            
<div>
<div className="container books_container">
<BookRow></BookRow>
<BookRow></BookRow>
<BookRow></BookRow>

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