import React, {Component,useState,useEffect } from 'react';

// import { useHistory ,useLocation } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import '../style/admin.css';
import '../style/BookDetails.css';
import { Link } from "react-router-dom";
import BookRowSlide from './BookRowSlide';
import Rating from './Rating';
import Popup from "reactjs-popup";
import axios from 'axios';
import Map from './Map';
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

  import { async } from 'q';
const commentPopup = {
    borderRadius: '10px 10px',
    border: '4px solid #F8A488',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.7)',
    padding: '2rem',
    width: '25rem',

}
const contentStyle = {
    // maxWidth: "600px",
    width: "60%"
};
const popupStyle = {
    borderRadius: '10px 10px',
    border: '4px solid #F8A488',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.7)',
    padding: '2rem',
    width: '25rem',
    maxHeight: '30rem',
    overflowY: 'scroll'

}


const BookDetails = (props) => {
    const [book, setBook] = useState([]);
    // const location = useLocation();
    // const history = useHistory();
    const [shelfs, setShelfs] = useState([]);
    const [downloads, setDownloads] = useState([]);
    const [reviews, setRev] = useState([]);
    const [isbn, setIsbn] = useState([]);
    const [review_flag,setFlag] = useState([]);
    const [user,setUser] = useState([]);
   
    useEffect(() =>{
        const isbn = props.match.params.isbn;
            axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
            ).then (result => {
                console.log(result)
                if(result.data.items)
                    {setBook([result.data.items[0]])
                    setIsbn(isbn)
                    setFlag(false)}
                else
                alert("No information about this book :(")

            })
            // setBook(res.data.items)
            // console.log(res.data.items)
        // console.log(isbn)
    }, [])
        
        console.log(book[0]) 
        // console.log(book[0].volumeInfo.categories[0])


      useEffect(() =>{
      const fetchRev = async() => {

       let data = {
            isbn: props.match.params.isbn,
            login: localStorage.getItem('user_id')

            
        }
        
            let response = await axios.post("http://localhost:3000/ListBookRateReview", data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type"

            }});
            setRev(response.data.reviews)
            setFlag(response.data.review_flag)
            
      }
      fetchRev();
         },[]);

         

    useEffect(() =>{
      const fetchUser = () => {

    let data ={
            user_id:localStorage.getItem('user_id')
        }
         axios.post("http://localhost:3000/myProfileData",data,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type"
                }
            })
            .then(response=>{
                console.log(response.data.user)
                setUser(response.data.user);
            })
            .catch(error=>{
                console.log(error)
            })
            
      }
      fetchUser();
         },[]);
      
       
    
    
        const addShelfBook = (book) =>{
                const getShelfs = JSON.parse(localStorage.getItem('book-shelf'))
               console.log(getShelfs)
                  if(!getShelfs.some(bk => bk.id === book.id)){
                  const newShelfeRow = [...shelfs, book];
                  setShelfs(newShelfeRow);
                  const newShelf = [...getShelfs,...newShelfeRow]
                localStorage.setItem('book-shelf', JSON.stringify(newShelf))
              }
                else{
                  alert("added before");
              }
            
              };

              const addDownloadBook = (book) =>{
            
                  const newDownloadRow = [...downloads, book];
                  setDownloads(newDownloadRow);
                   const getDownloads = JSON.parse(localStorage.getItem('book-download'))
                //   console.log(getDownloads)
                   const newDown = [...getDownloads,...newDownloadRow]
                localStorage.setItem('book-download', JSON.stringify(newDown))
             
               };
            
    
            // const accessMap = () =>{
            //     refs.child.searchApiBook(book.length > 0 && book[0].volumeInfo.title);
            // }

        
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
                                    {user.id&&<button><i className="fas fa-map-marker-alt" stle={{marginRight: "30px"}} ></i><a style={{color: "black",textDecoration: "null"}} href="/map">Find near me</a></button>}
                                    {book.length > 0 && book[0].accessInfo.pdf.isAvailable ? 
                                    <button style={{border: "1px solid #F8A488"}}><i className="fa fa-book" ></i> <a href={book.length > 0 && book[0].accessInfo.webReaderLink} style={{color: "black",TextDecoration: "none"}}>Read Online</a></button>:<span></span>}
                                    {book.length > 0 && user.id && book[0].saleInfo.isEbook && !book[0].accessInfo.pdf.isAvailable  ? 
                                    <button><i className="fa fa-money" ></i> <a href={book.length > 0 && book[0].saleInfo.buyLink}>Buy</a></button>:<span></span>}
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
                                {book.length > 0 && book[0].volumeInfo.categories ?
                                <h5>from {book.length > 0 && book[0].volumeInfo.categories} section</h5> : <span></span>}

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

                              {user.id? <button className="btn-shelf"> <i className="fa fa-plus" onClick={()=>addShelfBook(book[0])} ></i> Add To Shelf Book</button>:<span></span>} 
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
                                    <p>{book.length > 0 && book[0].volumeInfo.authors[0]}, sit amet consectetur adipisicing elit. Quia nemo atque porro,
                                        quod cum odio consectetur architecto veritatis vel incidunt dolore at corporis!
                                        Accusantium eum consequuntur incidunt, sed quisquam delectus.
                                        {book.length > 0 && book[0].volumeInfo.authors[0]}, sit amet consectetur adipisicing elit. Quia nemo atque porro,
                                        quod cum odio consectetur architecto veritatis vel incidunt dolore at corporis!
                                        Accusantium eum consequuntur incidunt, sed quisquam delectus.
                                        {book.length > 0 && book[0].volumeInfo.authors[0]}, sit amet consectetur adipisicing elit. Quia nemo atque porro,
                                        quod cum odio consectetur architecto veritatis vel incidunt dolore at corporis!
                                        Accusantium eum consequuntur incidunt, sed quisquam delectus.
                                        
                                        </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3">
                        {/* <div className="reviews">
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
                            
                        </div> */}
                        
                               <div className="replay">
                                    <h4>Reviews</h4>
                                    <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                                        {reviews.map(review => {
                                            return <div className="box-person">
                                                <div className="img">
                                                    {review.user_avatar == "" ? <i className="fa fa-user"></i> :
                                                        <img className="rounded-circle" style={{ width: '40px', height: '40px', borderRadius: '50%' }} src={review.user_avatar} />}
                                                </div>
                                                <div className="info-details">
                                                    <h5>{review.user_name}</h5>
                                                    <div className="evaluation ">
                                                        <Rating rate={review.rate} />

                                                    </div>
                                                    <p>{review.review}</p>
                                                     <ReviewReport review={review} />
                                                </div>

                                            </div>
                                        })}
                                    </div>

                                    <div className="box-person" style={{ margin: '0', padding: '3px', width: '100%', backgroundColor: '#F8F8F8' }}>
                                        
                                            {review_flag == false && < MakeRating isbn={isbn} changeRateFlag={() => window.location.reload()} />}
                                            
                                    </div>
                                </div>
                        
                       
                        
                    
                        {user.id&&<div className="mail">
                            <h4>Share with Friends</h4>
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
                           
                            
                        </div>}
                    </div>
                </div>
            </div>
        </div>

     {/* <div>  <BookRowSlide  category= {book.length > 0 && book[0].volumeInfo.categories[0]} /> </div> 
 
     {(book.length > 0 && book[0].volumeInfo.categories == "COMICS & GRAPHIC NOVELS"  ||  book.length > 0 && book[0].volumeInfo.categories == "Social Science" ||  book.length > 0 && book[0].volumeInfo.categories == "Juvenile Fiction") &&
                <>
                <div className="slid">
                <div className="container">
                <div className="info">
                <span>Similar Books</span> 
              
                </div>
               <div className="up">
                <div className="client active" >
                    <a href="#"><img src="http://books.google.com/books/content?id=zKkdEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" /></a>
                    <a href="#"><img src="http://books.google.com/books/content?id=qGMBEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" /></a>
                    <a href="#"><img src="http://books.google.com/books/content?id=Nl8IEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" /></a>
                    <a href="#"><img src="http://books.google.com/books/content?id=cPT4DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/></a>
                    <a href="#"><img src="http://books.google.com/books/content?id=Bqz8DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" /></a>
                </div>
                </div>
                </div>
                </div>
                </>}




     {book.length > 0 && book[0].volumeInfo.categories && book[0].volumeInfo.categories != "Social Science" && book[0].volumeInfo.categories != "COMICS & GRAPHIC NOVELS" && book[0].volumeInfo.categories != "Social Science" && book[0].volumeInfo.categories != "Juvenile Fiction" ?
     <div className="slid">
        <div className="container">
                 <div className="info">
                  <span>Similar Books</span> 
                 <span>(5 books)</span> 
                  </div>
                 <div className="up">
                 <div className="client active">
                 <BookRowSlide  category= {book.length > 0 && book[0].volumeInfo.categories[0]} />
                </div>
                </div>
             </div>
     </div>:(book.length > 0 && book[0].volumeInfo.categories === "Social Science" &&
     <div className="slid">
     <div className="container">
         </div> </div>)}  */}



       {/* {review_flag == true? <Map ref="child" name={book.length > 0 && book[0].volumeInfo.title}/>:<span></span>}  */}
      {/* {review_flag == true? <Map ref="child" />:<span></span>}  */}

         {book.length > 0 && book[0].volumeInfo.categories && book[0].volumeInfo.categories != "Social Science" && book[0].volumeInfo.categories != "COMICS & GRAPHIC NOVELS" && book[0].volumeInfo.categories != "Comics & Graphic Novels"?
     <div className="slid">
        <div className="container">
                 <div className="info">
                 {/* <span>Similar Books</span> */}
                 {/* <span>(5 books)</span> */}
                  </div>
                 <div className="up">
                 <div className="client active">
                 <BookRowSlide  category= {book.length > 0 && book[0].volumeInfo.categories[0]} />
                </div>
                </div>
             </div>
     </div>:(book.length > 0 && book[0].volumeInfo.categories === "Social Science" &&
     <div className="slid">
     <div className="container">
         </div> </div>)}


     
   
            </> 
        )   
}





class MakeRating extends Component {
    constructor(props) {
        super();
        this.state = {
            rating: 0,
            review: "",
            errors: []
        }
    }
    ratingChanged = (newRating) => {
        console.log(newRating);
        this.setState({ rating: newRating });
    }
    handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.target);
        const errors = this.validate();

        if (errors === null) {
            const obj = {
                rating: this.state.rating,
                review: this.state.review,
                user_id: localStorage.getItem('user_id'),
                isbn: this.props.isbn


            }
            Object.keys(obj).forEach((key, value) => {
                return data.append(key, obj[key])
            })

            const res = await axios.post("http://localhost:3000/addRateReviewBook", data, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type",

                }
            });
            console.log(res.data);
            this.setState({ rating: 0 });
            this.setState({ review: "" });
            this.props.changeRateFlag();

        }
        else {
            console.log('no submit');
            this.activeError = true;
        }

    }
    validate = () => {
        const errors = {};
        if (this.state.rating == 0)
            errors.rate = "Rate is required"
        this.setState({ errors });
        return Object.keys(errors).length === 0 ? null : errors;
    }

    render() {
        return (
            <div className="m-0" style={{ backgroundColor: '#F8F8F8' }}>
                <form onSubmit={this.handleSubmit}>
                    <h4 className="pb-2 pl-1" style={{ color: '#2630044' }}>Add Rating & Review :
                        <button type='submit' className=" btn ml-4" style={{ backgroundColor: '#F8F8F8' }}>
                            <i class="fa fa-paper-plane" aria-hidden="true" style={{ color: '#F8A488' }}></i>
                        </button>
                    </h4>
                    <div classNmae='ml-5'>
                        {this.state.errors.rate && (<div className="alert alert-danger" role="alert">{this.state.errors.rate}</div>)}
                        <input className="px-1 ml-4" type="text" name="review" placeholder="Add review..." style={{ display: 'inline-block', width: '80%' }} value={this.state.review} onChange={(e) => this.setState({ review: e.currentTarget.value })} />
                        {/* <input type='hidden' name='rating' value={this.state.rating} /> */}
                        {/* <input type='hidden' name='user_id' value={localStorage.getItem('user_id')} />
                        <input type='hidden' name='story_id' value={this.props.story_id} /> */}

                        <div className="row ml-2" >
                            <div style={{ display: 'inline-block', textAlign: 'end' }} className='col col-8 pr-0 mr-0'>
                                <ReactStars
                                    count={5}
                                    onChange={(e) => this.setState({ rating: e })}
                                    value={this.state.rating}
                                    size={25}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={< i className="fa fa-star-half-alt" ></i >}
                                    fullIcon={< i className="fa fa-star" ></i >}
                                    activeColor="#ffd700"

                                />
                            </div>

                            <span className='col col-1 pl-0 ml-0 mt-2'>{this.state.rating}/5</span>

                        </div>

                    </div>
                </form>
            </div>
        )
    }

}

class ReviewReport extends Component {

    render() {
        const sendReport = (post) => {
            if (document.getElementById("reportReason").value != "") {

                let data = {
                    kind: "bookreview",
                    reason: document.getElementById("reportReason").value,
                    related_record_id: post.id,
                    user_id: window.localStorage.getItem('user_id')
                };
                axios.post("http://localhost:3000/report", data, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PUT",
                        "Access-Control-Allow-Headers": "Content-Type",

                    }
                }).then(response => {
                    if (response) {
                        console.log(response);
                        document.getElementById("thanksMsg").innerText = response.data.message
                    }
                    else {
                        console.log(response);
                    }
                });
            }
            else {
                document.getElementById("thanksMsg").innerText = "Please Enter the reason";

            }

        }


        return (
            <Popup
                trigger={<a style={{ color: '#CD3700', marginRight: '1.2rem' }}><strong >Report</strong></a>
                }
                modal
                contentStyle={popupStyle}
            >
                <React.Fragment>

                    <div className="form-outline" >
                        <textarea rows="3" id="reportReason" placeholder="Please mention reasons for reporting this review" className="form-control" style={{ backgroundColor: '#F8F8F8', paddingLeft: '0.5rem' }}></textarea>
                    </div>
                    <div className="row m-2">
                        <div className="col-9 " id="thanksMsg" style={{ color: '#F8A488' }}></div>
                        <button type="button" onClick={() => { sendReport(this.props.review) }} className=" btn ml-1 col-2" style={{ backgroundColor: '#F8F8F8', border: "1px solid #F8A488" }}>
                            <i class="fa fa-paper-plane" aria-hidden="true" style={{ color: '#F8A488' }}></i>
                        </button>
                    </div>
                </React.Fragment>
            </Popup >


        );
    }
}




export default BookDetails;

