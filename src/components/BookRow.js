import React, { Component } from 'react';
import '../style/admin.css';
import '../style/ratingStars.css';
import { Link } from "react-router-dom";

class BookRow extends Component {

    render() {
        return (

                <div className="row ">

                {this.props.items.map(book=> 
                   <div className="col-4 col-md-2 book" >
                    <figure>
                    
                    < div className="book_img">
                    <img style={{width:'100%'}} src={book&&book.volumeInfo.imageLinks.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
                       <div className="hoverable">
                         <Link to={`/BookDetails/${book.volumeInfo.industryIdentifiers[0].identifier}`} style={{ textDecoration: 'none' }}>
                             <span className="details">details</span>
                          </Link>
                         <span className="icon-heart">
                           <i className="fa fa-heart "></i>
                         </span>
                        </div>
                     </div>  
                    <figcaption className="book_title" style={{alignItems:'center'}}>{book&&book.volumeInfo.title.slice(0,15)}</figcaption>
                        <span className="active-star"></span>
                        <span className="active-star"></span>
                        <span className="active-star"></span>
                        <span className="clip-star"></span>
                        <span className="clip-star"></span>
                    </figure>
                    </div>)}

            
                </div> 
    );
    }
}


    export default BookRow;