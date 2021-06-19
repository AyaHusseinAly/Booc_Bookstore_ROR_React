import React, {useState,useEffect } from 'react';
// import { useHistory ,useLocation } from 'react-router-dom';

import '../style/admin.css';
import '../style/BookDetails.css';
import { Link } from "react-router-dom";
import BookRow from './BookRow';
import axios from 'axios';
import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,   
    TwitterIcon,
    WhatsappIcon,   
  } from "react-share";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    
  } from "react-share";


const BookDetails = (props) => {
    const [book, setBook] = useState([]);
    // const location = useLocation();
    // const history = useHistory();

    useEffect(() =>{
        const isbn = props.match.params.isbn;
            axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
            ).then (result => {
                console.log(result)
                if(result.data.items)
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
                                   
                                     <button><i className="fa fa-book " ></i> 
                                     <a href={book.length > 0 && book[0].volumeInfo.previewLink}  >Preview</a> </button>
                                    <button><i className="fa fa-microphone"></i> Find near me</button>
                                    {book.length > 0 && book[0].accessInfo.pdf.isAvailable ? 
                                    <button><i className="fa fa-download"></i> <a href={book.length > 0 && book[0].accessInfo.pdf.acsTokenLink}>Download as PDF</a></button>:<span>  </span>}
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-7 col-lg-6">
                        <div className="box-info">
                        {book.length > 0 && book[0].accessInfo.pdf.isAvailable ? 
                            <span>Free</span>:<span>Not Free</span>}
                            <div className="heading">
                                <h2>{book.length > 0 && book[0].volumeInfo.title}</h2>
                                <h5>from {book.length > 0 && book[0].volumeInfo.categories} section</h5>

                                 {book.length > 0 && book[0].volumeInfo.averageRating ?
                                
                                
                                    ((Math.round(book[0].volumeInfo.averageRating) === 1 &&
                                <div className="evaluation">
                                    Rating  : 
                                <i className="fa fa-star" style={{color: 'orange',marginLeft: '10px'}}></i>
                                <i className="fa fa-star" ></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                    <span>({Math.round(book[0].volumeInfo.averageRating)} /5)</span> 
                                     
                                </div>) || 
                                (Math.round(book[0].volumeInfo.averageRating) === 2 &&
                                    <div className="evaluation">
                                        Rating  : 
                                    <i className="fa fa-star" style={{color: 'orange',marginLeft: '10px'}}></i>
                                    <i className="fa fa-star" style={{color: 'orange'}} ></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                        <span>({Math.round(book[0].volumeInfo.averageRating)} /5)</span> 
                                         
                                </div>) || 
                                (Math.round(book[0].volumeInfo.averageRating) === 3 &&
                                    <div className="evaluation">
                                        Rating  : 
                                    <i className="fa fa-star" style={{color: 'orange',marginLeft: '10px'}}></i>
                                    <i className="fa fa-star" style={{color: 'orange'}} ></i>
                                    <i className="fa fa-star" style={{color: 'orange'}}></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                        <span>({Math.round(book[0].volumeInfo.averageRating)} /5)</span> 
                                         
                                 </div>) || 
                                 (Math.round(book[0].volumeInfo.averageRating) === 4 &&
                                    <div className="evaluation">
                                      Rating  : 
                                    <i className="fa fa-star" style={{color: 'orange',marginLeft: '10px'}}></i>
                                    <i className="fa fa-star" style={{color: 'orange'}} ></i>
                                    <i className="fa fa-star" style={{color: 'orange'}}></i>
                                    <i className="fa fa-star" style={{color: 'orange'}}></i>
                                    <i className="fa fa-star"></i>
                                        <span>({Math.round(book[0].volumeInfo.averageRating)} /5)</span> 
                                         
                                </div>) || 
                                (book[0].volumeInfo.averageRating === 4.5 &&
                                <div className="evaluation">
                                  Rating  : 
                                <i className="fa fa-star" style={{color: 'orange',marginLeft: '10px'}}></i>
                                <i className="fa fa-star" style={{color: 'orange'}} ></i>
                                <i className="fa fa-star" style={{color: 'orange'}}></i>
                                <i className="fa fa-star" style={{color: 'orange'}}></i>
                                <i class="fa fa-star-half-o " style={{color: 'orange'}}></i>
                                    <span>({book[0].volumeInfo.averageRating} /5)</span> 
                                     
                                </div>) || 

                                (Math.round(book[0].volumeInfo.averageRating) === 5 &&
                                    <div className="evaluation">
                                      Rating  :   
                                    <i className="fa fa-star" style={{color: 'orange',marginLeft: '10px'}}></i>
                                    <i className="fa fa-star" style={{color: 'orange'}} ></i>
                                    <i className="fa fa-star" style={{color: 'orange'}}></i>
                                    <i className="fa fa-star" style={{color: 'orange'}}></i>
                                    <i className="fa fa-star" style={{color: 'orange'}}></i>
                                        <span>({Math.round(book[0].volumeInfo.averageRating)} /5)</span> 
                                         
                                </div>))
                                
                                    
                                : <span> No rating yet </span>
                                }

                                <button className="btn-shelf" > <i className="fa fa-plus"></i> Add To Shelf Book</button>
                            </div>
                         
                            <ul className="list-unstyled details" style={{margin: '70px 0'}}>
                                {book.length > 0 && book[0].volumeInfo.authors[0] ? 
                                <li><span>Author</span>: {book.length > 0 && book[0].volumeInfo.authors[0]}</li> :
                                <li><span>Author</span>: no information </li> }
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
                            <h4>Popular Reviews </h4>
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
                            {/* <a href="#" className="more">See More..</a> */}
                        </div>
                        <div className="replay">
                            <h4>Reviews (7)</h4>
                            <div className="box-person">
                                <div className="img">
                                <i className="fa fa-user"></i>
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
                                <i className="fa fa-user"></i>
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
                            {/* <a href="#" className="more">See More..</a> */}
                            
                        </div>
                        <input type="text" name="mail" placeholder="Add review" style={{width: '254px',marginBottom: '5px'}}/>
                        
                        <div className="evaluation">
                        rate this book :
                                    <i className="fa fa-star" style={{fontSize: '20px',color: 'gray',marginLeft: '10px'}}></i>
                                    <i className="fa fa-star" style={{fontSize: '20px',color: 'gray'}}></i>
                                    <i className="fa fa-star" style={{fontSize: '20px',color: 'gray'}}></i>
                                    <i className="fa fa-star" style={{fontSize: '20px',color: 'gray'}}></i>
                                    <i className="fa fa-star" style={{fontSize: '20px',color: 'gray',marginRight: '10px'}}></i>
                                     0/5
                                    </div>
                        <div className="mail">
                            <h4>Share with Friends</h4>
                            {/* <p>I Strong Recommend This Book For You!</p> */}
                            {/* <form action="">
                                <input type="email" name="mail" placeholder="Your Friends" />
                                <input type="submit" value="Go" /><i className="fa fa-massenger"></i>
                            </form> */}
                            {/* <a href="#"><i class="fab fa-facebook-messenger" style={{fontSize: '27px',color: '#f5b17b'}}></i></a>

                            <a href="#"><i class="fa fa-google" aria-hidden="true" style={{fontSize: '30px',marginLeft: '10px',color: '#f5b17b'}}></i></a>
                            <a href="#"><i class="fa fa-twitter" aria-hidden="true" style={{fontSize: '30px',marginLeft: '10px',color: '#f5b17b'}}></i></a> */}
                            {/* <TwitterIcon size={30} round={true} style={{marginTop: '-10px',marginLeft: '10px'}} /> */}
                            <EmailShareButton 
                             url={book.length > 0 && book[0].volumeInfo.previewLink}
                             body="I Strong Recommend This Book For You!" 
                            >
                            <EmailIcon size={30} logoFillColor="#f5b17b" round={true} style={{marginTop: '10px',marginLeft: '10px'}} /> </EmailShareButton>
                            
                            <TwitterShareButton 
                             url={window.location.href}
                             quote="I Strong Recommend This Book For You!" 
                            >
                            <TwitterIcon size={30} logoFillColor="#f5b17b" round={true} style={{marginTop: '10px',marginLeft: '10px'}} /> </TwitterShareButton>
                            

                            <FacebookShareButton 
                             url={window.location.href}
                             quote={"I Strong Recommend This Book For You!"}
                             hashtag="#my favourite book"

                            >
                            <FacebookIcon size={30} logoFillColor="#f5b17b" round={true} style={{marginTop: '10px',marginLeft: '10px'}} /> </FacebookShareButton>
                            
                            
                            <LinkedinShareButton
                             url={window.location.href}
                            >
                            <LinkedinIcon size={30} logoFillColor="#f5b17b" round={true} style={{marginTop: '10px',marginLeft: '10px'}} /> </LinkedinShareButton>
                            
                            
                            <WhatsappShareButton
                            title="I Strong Recommend This Book For You!"
                            url={window.location.href}
                            >
                           <WhatsappIcon size={30} logoFillColor="#f5b17b" round={true} style={{marginTop: '10px',marginLeft: '10px'}}/></WhatsappShareButton>
                           
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
     
    {/* <div className="slider">
        <div className="container">
            <div className="info">
                <span>Similar Books</span>
                
            </div>
            <div className="up">
                <div className="client active">
                    <a href="#"><img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" /></a>
                    <a href="#"><img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" /></a>
                    <a href="#"><img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" /></a>
                    <a href="#"><img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" /></a>
                    <a href="#"><img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" /></a>
                    
                </div>
              
         
            </div>
        </div>
    </div> */}
            </>
        )   
}


export default BookDetails;