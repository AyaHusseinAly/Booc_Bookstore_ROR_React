import React, {useState,useEffect } from 'react';
import '../style/DownloadsPage.css';
import { Link } from "react-router-dom";





const DownloadsPage = (props) => {
    const [downloads, setDownloads] = useState([]);

    useEffect(() =>{
        const bookDownloads = JSON.parse(
           localStorage.getItem('book-download')
        );

        setDownloads(bookDownloads);

    },[]);

   
    
    const save = (items) => {
        localStorage.setItem('book-download', JSON.stringify(items))
    };
    const removeDownloadBook = (book) =>{
        const newDownloadRow = downloads.filter(
            (download) => download.id !== book.id
        );
       
        setDownloads(newDownloadRow);
        save(newDownloadRow);
    };
        
        
     
            return (
               

                <>
                 <h2 style={{textAlign: "center",marginBottom: "20px"}}><span style={{color: "var(--secondaryColor)"}}>M</span>y Downloads B<span style={{color: "var(--secondaryColor)"}}>oo</span>k</h2>
                 <div className="row ">
                 {downloads.map(book=> 
                 
                   <div className="col-7 col-md-2 main" >
                      
                    <figure  className="fig-do" style={{width: "150px",height: "100px",marginBottom: "200px"}} >
                    < div className="book_img">
                    <img style={{width:'100%'}} src={book&&book.volumeInfo.imageLinks.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
                       <div className="hovi">
                         {/* <Link to={`/BookDetails/${book.volumeInfo.industryIdentifiers[0].identifier}`} style={{ textDecoration: 'none' }}>
                             <span className="details">details</span>
                          </Link> */}
                          <span className="remove-do" onClick={()=>removeDownloadBook(book)}>
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


export default DownloadsPage;
