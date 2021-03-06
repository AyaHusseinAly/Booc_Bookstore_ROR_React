import React, {useState} from 'react';
import '../style/admin.css';
import '../style/ratingStars.css';
import { Link } from "react-router-dom";

const StoreBookRow = (props) =>{
    const [favorites, setFavorites] = useState([]);
    const [shelfs, setShelfs] = useState([]);
    // const [Color, setColor] = useState('#263044');
    // const [isBlack, setIsBlack] = useState(true);

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
                    <img style={{width:'100%'}} src={book.cover} alt="" className="  book_image rounded  img-fluid"/>
                       {/* <div className="hoverable">
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
                        </div> */}
                     </div>  
                    <figcaption className="book_title" style={{alignItems:'center'}}>Title : {book.book_title}</figcaption>
                    <figcaption className="book_title" style={{alignItems:'center'}}>Isbn : {book.book_isbn}</figcaption>

                    
                    </figure>
                    
                    </div>)}

            
                </div> 
    );
    
}


    export default StoreBookRow;