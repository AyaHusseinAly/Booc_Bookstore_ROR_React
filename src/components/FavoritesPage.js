import React, {useState,useEffect } from 'react';
import '../style/FavoritesPage.css';
import { Link } from "react-router-dom";





const FavoritesPage = (props) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() =>{
        const bookFavourites = JSON.parse(
           localStorage.getItem('book-favourite')
        );

        setFavorites(bookFavourites);

    },[]);

   
    
    const save = (items) => {
        localStorage.setItem('book-favourite', JSON.stringify(items))
    };
    const removeFavouriteBook = (book) =>{
        const newFavouriteRow = favorites.filter(
            (favorite) => favorite.id !== book.id
        );
       
        setFavorites(newFavouriteRow);
        save(newFavouriteRow);
    };
        
        
    // console.log(favorites[0])  
            return (
               

                <>
                 <h2 style={{textAlign: "center",marginBottom: "20px"}}><span style={{color: "var(--secondaryColor)"}}>M</span>y Favourites B<span style={{color: "var(--secondaryColor)"}}>oo</span>k</h2>
                 <div className="row ">
                 {favorites.map(book=> 
                  
                   <div className="col-7 col-md-2 main" >
                      
                    <figure  className="fig" style={{width: "150px",height: "100px",marginBottom: "200px"}} >
                    < div className="book_img">
                    <img style={{width:'100%'}} src={book&&book.volumeInfo.imageLinks.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
                       <div className="hov">
                         <Link to={`/BookDetails/${book.volumeInfo.industryIdentifiers[0].identifier}`} style={{ textDecoration: 'none' }}>
                             <span className="details">details</span>
                          </Link>
                          <span className="remove-fav" onClick={()=>removeFavouriteBook(book)}>
                           <i className="fa fa-window-close" style={{padding: "18px",lineHeight: "50px"}}>remove</i>
                           
                          </span>
                        
                        </div>
                     </div>  
                    <figcaption className="book_title" style={{alignItems:'center'}}>{book&&book.volumeInfo.title.slice(0,15)}</figcaption>
                    </figure>
                    </div>)}

            
                </div> 
                </>
    );
           
}


export default FavoritesPage;
