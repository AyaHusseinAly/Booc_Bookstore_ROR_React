import React, {useState,useEffect } from 'react';
import '../style/admin.css';
import '../style/BookDetails.css';
import { Link } from "react-router-dom";
import BookRow from './BookRow';
import axios from 'axios';

const BookDetails = (props) => {
    const [book, setBook] = useState([]);

    useEffect(() =>{
        const isbn = props.match.params.isbn;
            axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=+isbn=${isbn}`
            ).then (result => {
                console.log(result)
                setBook([result.data.items[0]])
            })
            // setBook(res.data.items)
            // console.log(res.data.items)
        // console.log(isbn)
    }, [])
        
        console.log(book[0]) 
        return(
            
            <> 
              
              <div className="product">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3">
                        <div className="parent-box">
                            <div className="box-img text-center">
                                <img src={book.length > 0 && book[0].volumeInfo.imageLinks.thumbnail} style={{ width: '400px'}}/>
                                <div className="button">
                                   
                                     <button><i className="fa fa-download "></i> Download</button>
                                    <button><i className="fa fa-microphone"></i> Find near me</button>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-7 col-lg-6">
                        <div className="box-info">
                            <span>Free</span>
                            <div className="heading">
                                <h3>{book.length > 0 && book[0].volumeInfo.title}</h3>

                                {book.length > 0 && book[0].volumeInfo.averageRating ? 
                                <div className="evaluation">
                                <i className="fa fa-star" style={{color: 'orange'}}></i>
                                <i className="fa fa-star" style={{color: 'orange'}} ></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>

                                    <span>({book[0].volumeInfo.averageRating} Rating )</span> 
                                     
                                </div> :
                                <span> No rating yet </span>
                                }

                                <button> <i className="fa fa-plus"></i> Add To Shelf Book</button>
                            </div>
                         
                            <ul className="list-unstyled details">
                                <li><span>Author</span>: {book.length > 0 && book[0].volumeInfo.authors[0]}</li>
                                <li><span>Number Of Pages</span>: {book.length > 0 && book[0].volumeInfo.pageCount}</li>
                                <li><span>Publication Year</span>: {book.length > 0 && book[0].volumeInfo.publishedDate}</li>
                            </ul>
                            <div className="about-product">
                                <div className="about-info">
                                    <h4>About Book</h4>
                                    <p>{book.length > 0 && book[0].volumeInfo.description}.</p>
                                </div>
                                <div className="about-info">
                                    <h4>About Author</h4>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia nemo atque porro,
                                        quod cum odio consectetur architecto veritatis vel incidunt dolore at corporis!
                                        Accusantium eum consequuntur incidunt, sed quisquam delectus.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3">
                        <div className="reviews">
                            <h4>Popular Reviews (5)</h4>
                            <div className="box-person">
                                <div className="img">
                                <i className="fa fa-user"></i>
                                </div>
                                <div className="info-details">
                                    <h5>Adel Ali</h5>
                                    <div className="evaluation">
                                    <i className="fa fa-star" style={{color: 'orange'}}></i>
                                    <i className="fa fa-star" style={{color: 'orange'}} ></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                </div>
                            </div>
                            <div className="box-person">
                                <div className="img">
                                <i className="fa fa-user"></i>
                                </div>
                                <div className="info-details">
                                    <h5>Esraa Mohamed</h5>
                                    <div className="evaluation">
                                    <i className="fa fa-star" style={{color: 'orange'}}></i>
                                    <i className="fa fa-star" style={{color: 'orange'}} ></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                  
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                </div>
                            </div>
                            <a href="#" className="more">See More..</a>
                        </div>
                        <div className="replay">
                            <h4>Reviews (7)</h4>
                            <div className="box-person">
                                <div className="img">
                                
                                </div>
                                <div className="info-details">
                                    <h5>Ola Gamal</h5>
                                    <div className="evaluation">
                                    <i className="fa fa-star" style={{color: 'orange'}}></i>
                                    <i className="fa fa-star" style={{color: 'orange'}} ></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    <a href="#" className="report">Report</a>
                                </div>
                            </div>
                            <div className="box-person">
                                <div className="img">
                                
                                </div>
                                <div className="info-details">
                                    <h5>Ahmed Emara</h5>
                                    <div className="evaluation ">
                                    <i className="fa fa-star" style={{color: 'orange'}}></i>
                                    <i className="fa fa-star" style={{color: 'orange'}} ></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                   
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    <a href="#" className="report">Report</a>
                                </div>
                            </div>
                            <a href="#" className="more">See More..</a>
                        </div>
                        <div className="mail">
                            <h4>Invite Friends</h4>
                            <p>I Strong Recommend This Book For You!</p>
                            <form action="">
                                <input type="email" name="mail" placeholder="Your Friends" />
                                <input type="submit" value="Go" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     
    <div className="slider">
        <div className="container">
            <div className="info">
                <span>Similar Books</span><span>(5 Books)</span>
            </div>
            <div className="up">
                <div className="client active">
                    <a href="#"><img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" /></a>
                    <a href="#"><img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" /></a>
                    <a href="#"><img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" /></a>
                    <a href="#"><img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" /></a>
                    <a href="#"><img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" /></a>
                    {/* <BookRow /> */}
                </div>
              
         
            </div>
        </div>
    </div>
            </>
        )   
}


export default BookDetails;
