import React, {useState,useEffect } from 'react';

import '../style/BookRowSlide.css';
import { Link } from "react-router-dom";

import axios from 'axios';
// import '../style/BookDetails.css';



const BookRowSlide = (props) => {
    const [books, setBooks] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [shelfs, setShelfs] = useState([]);
    const [user,setUser] = useState([]);
   
    console.log(props)
    // console.log(props.match.params)
    useEffect(() =>{
        const category = props.category
        
            axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=+subject:${category}&startIndex=1&maxResults=5&orderBy=newest&key=AIzaSyAzt2S4sYkZLX6fAAWM6OMeUVH4h8l_bdg`
            ).then (result => {
                console.log(result)
                if(result.data.items)
                    setBooks(result.data.items)
                    console.log(result.data.items)

                

            })
            // setBook(res.data.items)
            // console.log(res.data.items)
        console.log(category)

    }, [])



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

      

        const addFavouriteBook = (book) =>{
            const getFav = JSON.parse(localStorage.getItem('book-favourite'))

            if(!getFav.some(bk => bk.id === book.id)){
            const newFavouriteRow = [...favorites, book];
            setFavorites(newFavouriteRow);
            const newFav = [...getFav,...newFavouriteRow]
            localStorage.setItem('book-favourite', JSON.stringify(newFav))}
            else{
                alert("added before");
            }
            
    
        };

        
        
            
            return (
                <div className="row" style={{display: "flex",justifyContent : "space-around"}}>
                  
                {books.map(book=> 
                
                   <div className="col-4 col-md-2 book " >
                     
                    <figure className="one" style={{width: "200px"}}>
                    
                    < div className="bk_img">
                    <img style={{width:'100%'}} src={books.length > 0&&book.volumeInfo.imageLinks.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
                       {user.id?
                       <div className="hovable">
                         <Link to={`/BookDetails/${books.length > 0&&book.volumeInfo.industryIdentifiers[0].identifier}`} style={{ textDecoration: 'none' }}>
                             <span className="det">details</span>
                          </Link>
                          <span className="icon-ht" onClick={()=>addFavouriteBook(book)} 
                          //className={this.state.span ? "spanTrue": "spanFalse"} onClick={this.handleClick}
                          >
                           <i className="fa fa-heart"><span class="tooltiptextfav">add to fav</span></i>
                          </span>
                          <span  onClick={()=>addShelfBook(book)} 
                           
                          >
                           <i className="fa fa-plus" style={{fontSize: "20px",color: "var(--primaryColor)",marginTop: "120px",marginRight: "7px",textAlign: "center",position: "relative",
                           display: "inline-block"}}>
                           <span class="tooltiptextshel">add to shelf</span>
                           </i>
                          </span>
                        </div>:
                          <Link to={`/BookDetails/${book&&book.volumeInfo.industryIdentifiers[0].identifier}`} style={{ textDecoration: 'none' }}>
                             <span style={{textAlign:"center",marginLeft:"90px"}}>details</span>
                          </Link>}
                     </div>  
                    <figcaption className="book_title" style={{alignItems:'center',marginLeft:"20px"}}>{books.length > 0&&book.volumeInfo.title.slice(0,20)}</figcaption>
                     
                    
                    </figure>
                    
                    </div>)}

            
                </div> 
    );
         
}


export default BookRowSlide;
