
import React, { Component } from 'react';
import '../style/search.css';
import '../style/ratingStars.css';
import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/headerFooter.css';



class SearchResults extends Component {

    constructor() {
        super();
        
        const thisYear = (new Date()).getFullYear();
        
        this.state = {
          thisYear: thisYear,
          selectedYear: " "
        }
      }
      
      onHandleChange = (evt) => {
        // Handle Change Here
        // alert(evt.target.value);
        this.setState({ selectedYear: evt.target.value });
      };
    
    state = {
        selectGenerVal:" ",
        selectRatingVal:" ",
        selectOrderByVal:" ",
        selectYearVal:" ",



      }
    
      setSelectGenerValue = (event) => {
        this.setState({
            selectGenerVal: event.target.value
        });
      }
      setSelectRatingValue = (event) => {
        this.setState({
            selectRatingVal: event.target.value
        });
      }

      setSelectOrderByValue = (event) => {
        this.setState({
            selectOrderByVal: event.target.value
        });
      }

      setSelectYearValue = (event) => {
        this.setState({
            selectYearsByVal: event.target.value
        });
      }

    render() {
        const mystyle = {
            backgroundColor: "whitesmoke",
            
          };
        const minOffset = 0;
        const maxOffset = 60; 
        const { thisYear, selectedYear } = this.state;
        const options = [];
        
        for (let i = minOffset; i <= maxOffset; i++) {
        const year = thisYear - i;
        options.push(<option value={year}>{year}</option>);
        }

        return (
                <div className="container  justify-content-center  p-2 " style={{marginTop:'30px' , marginLeft:'40px'  }} >
                     
                     
                
                     <div className=" row">
                        
                          <div  className="col-2">
                             <h6>Publication Year</h6>
                             <select value={this.selectedYear} onChange={this.onHandleChange} style={mystyle}> 
                             {options}
                             </select>
                        </div>
                        
                        
                        
                         <div className="col-2">
                             <h6>Rating</h6>
                             <select value={this.state.selectRatingVal} onChange={this.setSelectRatingValue} style={mystyle}>
                             <option value="1">1</option>
                             <option value="2">2</option>
                             <option value="3">3</option>
                             <option value="4">4</option>
                             <option value="5">5</option>
                             </select>
                         </div>
            

                        <div className="col-2">
                            <h6 >OrderBy</h6>
                            <select value={this.state.selectOrderByVal} onChange={this.setSelectOrderByValue} style={mystyle}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            </select>
                        </div>

                        <div className="col-2">
                            <h6 >Genre</h6>
                            <select value={this.state.selectGenerVal} onChange={this.setSelectGenerValue} style={mystyle}>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Romance">Romance</option>
                            <option value="Westerns">Westerns</option>
                            <option value="Dystopian">Dystopian</option>
                            <option value="Contemporary">Contemporary</option>
                            </select>

                        </div>

                        
                        
                    </div>


            {/* <div className="row " style={{padding: '150px'}}>

            {this.props.items.map(book=> 
               <div className="col-4 col-md-2 book" >
                <figure>
                
                < div className="book_img">
                <img style={{width:'100%'}} src={book&&book.volumeInfo.imageLinks.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
                   <div className="hoverable">
                     <Link to={`/BookDetails/${book&&book.volumeInfo.industryIdentifiers[0].identifier}`} style={{ textDecoration: 'none' }}>
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
                </div>)} */}

                <div className="container row justify-content-between  p-2 " style={{marginTop:'30px' , marginLeft:'40px'  }}>
                {this.props.items.map(book=> <div className="col-5 p-2  " >
                    <figure className="row">
                            <img  className="col" style={{width:'150px' , height:'200px'}} src={book&&book.volumeInfo.imageLinks&&book.volumeInfo.imageLinks.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
                              <div className="hoverable">
                              <Link to={`/BookDetails/${book&&book.volumeInfo.industryIdentifiers[0].identifier}`} style={{ textDecoration: 'none' }}>
                                  <span className="details">details</span>
                                </Link>
                              <span className="icon-heart">
                                <i className="fa fa-heart "></i>
                              </span>
                              </div>
                              
                            <div className="col">
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

                <p>"Gener : "{this.state.selectGenerVal}</p>
                <p>"Rating : "{this.state.selectRatingVal}</p>
                <p>"OrderBy : "{this.state.selectOrderByVal}</p>
                <p>"Publication Year : "{selectedYear}</p>

            
                
          
            </div>
    );
    
}
}

    export default SearchResults;
