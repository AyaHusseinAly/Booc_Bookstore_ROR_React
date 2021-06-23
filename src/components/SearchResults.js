
import React, { Component } from 'react';
import '../style/search.css';
import '../style/ratingStars.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Input, Space } from 'antd';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/headerFooter.css';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'



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
          favorites: [],
          shelfs:[],
          

          

        
        }
       
      }

      state={
        
        genres:[]

    }

    async componentDidMount(){ //API Links will be edited to use from implemented Facade Class methods

        
        const res=await axios.get('http://localhost:3000/shortStoriesGenres',
        {headers: {"Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        "Access-Control-Allow-Headers": "Content-Type"}});
        
        this.setState({genres:res.data.short_stories});
        console.log(this.state.genres);
        
       
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

    


    

    addFavouriteBook = (book) =>{
      const getFav = JSON.parse(localStorage.getItem('book-favourite'))

      if(!getFav.some(bk => bk.id === book.id)){
      const newFavouriteRow = [...this.state.favorites, book];
      this.setState({
        favorites: newFavouriteRow
    });
      const newFav = [...getFav,...newFavouriteRow]
      localStorage.setItem('book-favourite', JSON.stringify(newFav))}
      else{
          alert("added before");
      }
      

  };



  addShelfBook = (book) =>{

    const getShelfs = JSON.parse(localStorage.getItem('book-shelf'))

    if(!getShelfs.some(bk => bk.id === book.id)){
      const newShelfeRow = [...this.state.shelfs, book];
      
         
      this.setState({
        shelfs: newShelfeRow
    });

    
      const newShelf = [...getShelfs,...newShelfeRow]
      
      localStorage.setItem('book-shelf', JSON.stringify(newShelf))
    }
    else{
      alert("added before");
  }

  };

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
                        

                        {/* <div className="col-2">
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
                            <option value="Horror">Horror</option>


                            </select>

                        </div> */}
                        <div className="col-2" >
                          <h6 style={filterTextStyle}  >Genre</h6>
                            <select value={this.state.selectGener} onChange={this.setSelectGenerValue} style={mystyle}>
                            <option value="">__none__</option>
                            {this.state.genres&&this.state.genres.map(genre=>
                                  <option value={genre.title}>{genre.title}</option>

                                
                              )}
                            </select>

                            {/* <a className="btn btn-secondary dropdown-toggle ml-2" style={{width:'9rem',height:'4.5rem',backgroundColor:'white',opacity:'0.65',color:'grey',fontSize: '1.5rem',borderRadius:'10px 10px' }} role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Genre 
                            </a>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                {this.state.genres&&this.state.genres.map(genre=>
                                <a className="dropdown-item" >
                                    {genre.title}
                                </a>)}
                            </div> */}
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
                         <span className="deta">details</span>
                      </Link>
                      
                         <span className="icon-heart" onClick={()=>this.addFavouriteBook(book)} 
                          >
                           <i className="fa fa-heart"><span class="tooltiptextfav">add to fav</span></i>
                          </span>
                          <span  onClick={()=>this.addShelfBook(book)} 
                           
                          >
                           <i className="fa fa-plus" style={{fontSize: "20px",color: "var(--primaryColor)",marginTop: "80px",position: "relative",right: "56px",bottom: "3px",
                           display: "inline-block"}}>
                           <span class="tooltiptextshel">add to shelf</span>
                           </i>
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
