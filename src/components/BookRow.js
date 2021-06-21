import React, {useState} from 'react';
import '../style/admin.css';
import '../style/ratingStars.css';
import { Link } from "react-router-dom";

const BookRow = (props) =>{
    const [favorites, setFavorites] = useState([]);
    const [shelfs, setShelfs] = useState([]);
    const [Color, setColor] = useState('#263044');
    const [isBlack, setIsBlack] = useState(true);

    const save = (items) => {
        localStorage.setItem('book-favourite', JSON.stringify(items))
    };

    const addFavouriteBook = (book) =>{
        const newFavouriteRow = [...favorites, book];
        setFavorites(newFavouriteRow);
        save(newFavouriteRow); 
        // const newColor ="red";
        // setColor(newColor);

    };

    
    const saveShel = (items) => {
        localStorage.setItem('book-shelf', JSON.stringify(items))
    };


    const addShelfBook = (book) =>{
        const newShelfeRow = [...shelfs, book];
        
        setShelfs(newShelfeRow);
        saveShel(newShelfeRow);
        

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
                       <div className="hoverable">
                         <Link to={`/BookDetails/${book.volumeInfo.industryIdentifiers[0].identifier}`} style={{ textDecoration: 'none' }}>
                             <span className="details">details</span>
                          </Link>
                          <span className="icon-heart" onClick={()=>addFavouriteBook(book)} 
                          >
                           <i className="fa fa-heart"><span class="tooltiptextfav">add to fav</span></i>
                          </span>
                          <span  onClick={()=>addShelfBook(book)} 
                           
                          >
                           <i className="fa fa-plus" style={{fontSize: "20px",color: "var(--primaryColor)",marginTop: "120px",marginRight: "10px",textAlign: "center",position: "relative",
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
                    
                    </div>)}

            
                </div> 
    );
    
}


    export default BookRow;
