import React, { Component } from 'react';
// import '../style/admin.css';
import '../style/ratingStars.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/headerFooter.css';

class SearchResults extends Component {

    render() {

        return (
            <div className="container d-flex flex-column ">

            {this.props.items.map(book=> <div className="col-4 col-md-4 book" >
                <figure className="d-flex">
                        <img style={{width:'100%'}} src={book&&book.volumeInfo.imageLinks&&book.volumeInfo.imageLinks.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
                        <div>
                            <figcaption className="" style={{alignItems:'center'}}>{book&&book.volumeInfo.title}</figcaption>
                            <span className="active-star"></span>
                            <span className="active-star"></span>
                            <span className="active-star"></span>
                            <span className="clip-star"></span>
                            <span className="clip-star"></span>
                        </div>
                </figure>
                </div>)}

        
            </div> 
    );
    }
}


    export default SearchResults;