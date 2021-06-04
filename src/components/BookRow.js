import React, { Component } from 'react';
import '../style/admin.css';

class BookRow extends Component {

    render() {

        return (

                <div className="row ">
                <div className="col-4 col-md-2 book" >
                    <figure>
                    <img src="img/books/book1.png" alt="" className="  book_image rounded  img-fluid"/>
                    <figcaption className="book_title">book1</figcaption>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                </figure>
                </div>
                <div className="col-4 col-md-2 book" >
                
                    <figure>
                    <img src="img/books/book2.png" alt="" className="  book_image rounded  img-fluid"/>
                    <figcaption className="book_title">book2</figcaption>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                </figure>
                </div>
                
                <div className="col-4 col-md-2 book" >
                    <figure>
                    <img src="img/books/book3.png" alt="" className="  book_image rounded  img-fluid"/>
                    <figcaption className="book_title">book3</figcaption>
                    <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                </figure>
                </div>
                
                <div className="col-4 col-md-2 book" >
                    <figure>
                    <img src="img/books/book4.png" alt="" className="  book_image rounded  img-fluid"/>
                    <figcaption className="book_title">book4</figcaption>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star "></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                </figure>
                </div>
                <div className="col-4 col-md-2 book"  >
                    <figure>
                    <img src="img/books/book5.png" alt="" className="  book_image rounded  img-fluid"/>
                    <figcaption className="book_title">book5</figcaption>
                    <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                </figure>
                </div>
                
                <div className="col-4 col-md-2 book" >
                    <figure>
                    <img src="img/books/book20.png" alt="" className="book_image rounded  "/>
                    <figcaption className="book_title">book20</figcaption>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                </figure>
                </div>
                
                </div> 
    );
    }
}


    export default BookRow;