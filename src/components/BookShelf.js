import React, {useState,useEffect } from 'react';
import '../style/BookShelf.css';
import { Link } from "react-router-dom";





const BookShelf = (props) => {
    const [shelfs, setShelfs] = useState([]);

    useEffect(() =>{
        const bookShelfs = JSON.parse(
           localStorage.getItem('book-shelf')
        );

        setShelfs(bookShelfs);

    },[]);

   
    
    const saveToShelf = (items) => {
        localStorage.setItem('book-shelf', JSON.stringify(items))
    };
    const removeShelfBook = (bk) =>{
        const newShelf = shelfs.filter(
            (shelf) => shelf.id !== bk.id
        );
       
        setShelfs(newShelf);
        saveToShelf(newShelf);
    };
        
        
    console.log(shelfs[0]);
            return (
               

                <>
                 <h2 style={{textAlign: "center",marginBottom: "20px"}}><span style={{color: "var(--secondaryColor)"}}>M</span>y Shelf B<span style={{color: "var(--secondaryColor)"}}>oo</span>k</h2>
                 <div className="row ">
                 {shelfs.map(bk=> 
                   <div className="col-7 col-md-2 main" >
                    <figure  className="fig" style={{width: "150px",height: "100px",marginBottom: "200px"}}>
                    < div className="book_img"  >
                    <img style={{width:'100%'}} src={bk&&bk.volumeInfo.imageLinks.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
                       <div className="hovert">
                         <Link to={`/BookDetails/${bk.volumeInfo.industryIdentifiers[0].identifier}`} style={{ textDecoration: 'none' }}>
                             <span className="details">details</span>
                          </Link>
                          <span className="remove-fav" onClick={()=>removeShelfBook(bk)}>
                           <i className="fa fa-window-close" style={{padding: "18px",lineHeight: "50px"}}>remove</i>
                           
                          </span>
                        
                        </div>
                     </div>  
                    <figcaption className="book_title" style={{alignItems:'center'}}>{bk&&bk.volumeInfo.title.slice(0,15)}</figcaption>
                    </figure>
                    </div>)}

            
                </div> 
                </>
    );
           
}


export default BookShelf;
