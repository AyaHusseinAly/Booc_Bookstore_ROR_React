import React, {useState,useEffect} from 'react';
import '../style/admin.css';
import '../style/ratingStars.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import {PRODUCTION_BACKEND_URL,PRODUCTION_FRONTEND_URL} from '../constants/index.js'


const BookRow = (props) =>{
    const [favorites, setFavorites] = useState([]);
    const [shelfs, setShelfs] = useState([]);
    // const [Color, setColor] = useState('#263044');
    // const [isBlack, setIsBlack] = useState(true);
    const [user,setUser] = useState([]);

     useEffect(() =>{
      const fetchUser = () => {

    let data ={
            user_id:localStorage.getItem('user_id')
        }
         axios.post(`${PRODUCTION_BACKEND_URL}/myProfileData`,data,
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

    // const handleChnageTextColor = (e) => {
    //     setColor(Color === '#263044' ? 'red' : '#263044');
    //    };

    //    const handleChnageTextColor = (e) => {
    //     setIsBlack(!isBlack);
    //     setColor(isBlack ? 'red' : '#263044');
    //   }
     
 


    
        return (
                <div className="row">

                {props.items.map(book=> 
                   <div className="col-4 col-md-2 book " >
                    <figure className="figure">
                    
                    < div className="book_img">
                    <img style={{width:'100%'}} src={book&&book.volumeInfo.imageLinks.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
                       {user.id?
                       <div className="hoverable">
                         <Link to={`/BookDetails/${book.volumeInfo.industryIdentifiers[0].identifier}`} style={{ textDecoration: 'none' }}>
                             <span className="details">details</span>
                          </Link>
                          
                          <span className="icon-heart" onClick={()=>addFavouriteBook(book)} 
                          >
                           <i className="fa fa-heart"><span class="tooltiptextfav">add to fav</span></i>
                          </span>
                          <span  onClick={()=>addShelfBook(book)} >
                          
                           <i className="fa fa-plus" style={{fontSize: "20px",color: "var(--primaryColor)",marginTop: "120px",marginRight: "10px",textAlign: "center",position: "relative",
                           display: "inline-block"}}>
                           <span class="tooltiptextshel">add to shelf</span>
                           </i>
                          </span>
                          
                        </div>: 
                          <Link to={`/BookDetails/${book&&book.volumeInfo.industryIdentifiers[0].identifier}`} style={{ textDecoration: 'none' }}>
                             <span style={{textAlign:"center",marginLeft:"50px"}}>details</span>
                          </Link>}

                     </div>  
                    <figcaption className="book_title" style={{alignItems:'center'}}>{book&&book.volumeInfo.title.slice(0,15)}</figcaption>
                        {user.id&&<span className="active-star"></span>}
                        {user.id&&<span className="active-star"></span>}
                        {user.id&&<span className="active-star"></span>}
                        {user.id&&<span className="clip-star"></span>}
                        {user.id&&<span className="clip-star"></span>}
                    
                    </figure>
                    
                    </div>)}

            
                </div> 
    );
    
}


    export default BookRow;