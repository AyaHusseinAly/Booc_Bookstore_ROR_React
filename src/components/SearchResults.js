
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
          selectedYear: "",
          selectGener:"",
          selectOrderByVal:"",
          selectRatingVal:"",
        
        }
      }
      
      onHandleChange = (evt) => {
      
        this.setState({ selectedYear: evt.target.value });
      };
    

    
      setSelectGenerValue = (event) => {
        this.setState({
          selectGener: event.target.value
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
            backgroundColor: "#263044",
             color :"white"
            
          };
          const filterTextStyle = {
            color:"#263044"
          }
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
                             <h6 style={filterTextStyle} >Publication Year</h6>
                             <select value={this.selectedYear} onChange={this.onHandleChange} style={mystyle}> 
                             <option value="">__none__</option>
                             {options}
                             </select>
                        </div>
                        
                        
                        
                         <div className="col-2">
                             <h6 style={filterTextStyle} >Rating</h6>
                             <select value={this.state.selectRatingVal} onChange={this.setSelectRatingValue} style={mystyle}>
                             <option value="1">1</option>
                             <option value="2">2</option>
                             <option value="3">3</option>
                             <option value="4">4</option>
                             <option value="5">5</option>
                             </select>
                         </div>
            

                        <div className="col-2">
                            <h6 style={filterTextStyle} >OrderBy</h6>
                            <select value={this.state.selectOrderByVal} onChange={this.setSelectOrderByValue} style={mystyle}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            </select>
                        </div>
                        
                        <div className="col-2">
                            <h6 style={filterTextStyle}  >Genre</h6>
                            <select value={this.state.selectGener} onChange={this.setSelectGenerValue} style={mystyle}>
                            <option value="">__none__</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Fiction">Fiction</option>
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


            <div className="row " style={{padding: '150px'}}>

            {this.props.items.filter((book)=> {
              if (selectedYear === "" && this.state.selectGener === "" && this.state.selectOrderByVal === ""  && this.state.selectRatingVal === ""  ){
                 console.log(book)

                return book
              }
              else
             {

              
              if(selectedYear !== "" || this.state.selectGener !== "" )
               {
               

                  if(selectedYear !== "" && this.state.selectGener !== "")
                  {
                    if(book.volumeInfo.categories)
                    {
                      book =book.volumeInfo.categories.includes(this.state.selectGener.toString()) && book.volumeInfo.publishedDate.toString().includes(selectedYear) 
                    }
                    else
                    {
                      book = null
                    }
                  }

                  
                  else if(selectedYear !== "" )
                  {
                    book = book.volumeInfo.publishedDate.toString().includes(selectedYear) 
                  }

                  else if( this.state.selectGener !== "")
                  {
                    if(book.volumeInfo.categories)
                    {
                      book =book.volumeInfo.categories.includes(this.state.selectGener.toString())
                    }
                    else
                    {
                      book = null
                    }
                  
                  }


              }

             
              
               
               
              
              return book


             }
              
              
            }).map(book=> 
      
                <div className="col-4 col-md-2 book" >
                <figure>
                
                < div className="book_img">
                <img style={{width:'100%'}} src={book&&book.volumeInfo.imageLinks?.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
                   <div className="hoverable">
                     <Link to={`/BookDetails/${book.volumeInfo.industryIdentifiers&&book.volumeInfo.industryIdentifiers[0].identifier}`} style={{ textDecoration: 'none' }}>
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
                </div>
              
                
              
             
               )}

      
                </div>  

                

            
                
          
            </div>
    );
    
}
}

    export default SearchResults;