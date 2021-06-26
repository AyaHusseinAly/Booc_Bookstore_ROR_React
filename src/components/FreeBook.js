import React, {useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/sli.css';
import Slider from "react-slick";



const FreeBook = (props) => {
    const [freeBooks, setfreeBooks] = useState([]);
    // const location = useLocation();
    // const history = useHistory();
    const [shelfs, setShelfs] = useState([]);
    const [downloads, setDownloads] = useState([]);
    const [favorites, setFavorites] = useState([]);
   

    useEffect(() =>{
        
            axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=hundred&download=epub&filter=free-ebooks&startIndex=0&maxResults=40&orderBy=newest&&key=AIzaSyCgsK9dxkG33dNVndYmSGJ6cU27W-Tn1G8`
            ).then (result => {
                console.log(result)
                if(result.data.items)
                    setfreeBooks(result.data.items)
                

            })
         
    }, [])
        
        
        
      
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

              const addDownloadBook = (book) =>{
            
                  const newDownloadRow = [...downloads, book];
                  setDownloads(newDownloadRow);
                   const getDownloads = JSON.parse(localStorage.getItem('book-download'))
                //   console.log(getDownloads)
                   const newDown = [...getDownloads,...newDownloadRow]
                localStorage.setItem('book-download', JSON.stringify(newDown))
             
               };


    //   const renderSlides = () =>
    //    freeBooks.map(book => (
    //   <div >
    //     <div>{<img src={book&&book.volumeInfo.imageLinks.thumbnail} style={{width: "100px",margin: "auto"}} />}</div>
    //     <figcaption style={{textAlign: "center",fontSize: "15px",color:"var(--secondaryColor)"}}>{book&&book.volumeInfo.title.slice(0,12)}</figcaption>
    //      <button><i className="fa fa-download" ></i><a  href={book&&book.accessInfo.pdf.isAvailable&&book.accessInfo.pdf.downloadLink}  style={{textAlign: "center",fontSize: "15px",color:"var(--secondaryColor)"}}>Download</a></button>
    //   </div>
    // ));
            
//       return (
//     <div className="Applo">
//       <Slider dots={true} infinite= {true} slidesToShow={6}  slidesToScroll={1}>
     
//       {renderSlides()}
//       </Slider>
//     </div>
//   );
/////////////////////////////////////////////////////////
//  return (
               

//                 <>
//                  <h2 style={{textAlign: "center",marginBottom: "20px"}}><span style={{color: "var(--secondaryColor)"}}>M</span>y Free B<span style={{color: "var(--secondaryColor)"}}>oo</span>k</h2>
//                  <div className="row ">
//                  {freeBooks.map(book=> 
                 
//                    <div className="col-7 col-md-2 main" >
                      
//                     <figure  className="fir" style={{width: "150px",height: "100px",marginBottom: "200px"}} >
//                     < div className="book_img">
//                     <img style={{width:'100%'}} src={book&&book.volumeInfo.imageLinks.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
//                        <div className="hovx">
//                          <Link to={`/BookDetails/${book.volumeInfo.industryIdentifiers[0].identifier}`} style={{ textDecoration: 'none' }}>
//                              <span className="details">details</span>
//                           </Link>
//                            <span className="icon-ht" onClick={()=>addFavouriteBook(book)} 
//                           >
//                            <i className="fa fa-heart"><span class="tooltiptextfav">add to fav</span></i>
//                           </span>
//                           <span  onClick={()=>addShelfBook(book)} 
                           
//                           >
//                            <i className="fa fa-plus" style={{fontSize: "20px",color: "var(--primaryColor)",marginTop: "120px",marginRight: "10px",textAlign: "center",position: "relative",
//                            display: "inline-block"}}>
//                            <span class="tooltiptextshel">add to shelf</span>
//                            </i>
//                           </span>
                        
//                         </div>
//                      </div>  
//                     <figcaption className="book_title" style={{alignItems:'center'}}>{book&&book.volumeInfo.title.slice(0,15)}</figcaption>
//                     <button><i className="fa fa-download" ></i><a  href={book&&book.accessInfo.pdf.isAvailable&&book.accessInfo.pdf.downloadLink} onClick={()=>addDownloadBook(book)} style={{textAlign: "center",fontSize: "15px",color:"var(--secondaryColor)"}}>Download</a></button>
//                     </figure>
//                     </div>)}

            
//                 </div> 
//                 </>
//     );

      const renderSlides = () =>
       freeBooks.map(book => (
           
      <div >   
                    <figure  className="fir" style={{width: "200px",height: "100px",marginBottom: "200px"}} >
                    < div className="book_img">
                    <img style={{width: "110px",margin: "auto",height: "150px"}} src={book&&book.volumeInfo.imageLinks.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
                       <div className="hovx">
                         {/* <Link to={`/BookDetails/${book.volumeInfo.industryIdentifiers[0].identifier}`} style={{ textDecoration: 'none' }}>
                             <span className="details">details</span>
                          </Link> */}
                           <span className="icon-ht" style ={{marginLeft: "30px",fontSize:"18px",marginTop: "-40px"}}  onClick={()=>addFavouriteBook(book)} 
                          >
                           <i className="fa fa-heart"><span class="tooltiptextfav">add to fav</span></i>
                          </span>
                          {/* <span  onClick={()=>addShelfBook(book)} 
                           
                          >
                           <i className="fa fa-plus" style={{fontSize: "20px",color: "var(--primaryColor)",marginTop: "120px",marginRight: "10px",textAlign: "center",position: "relative",
                           display: "inline-block"}}>
                           <span class="tooltiptextshel">add to shelf</span>
                           </i>
                          </span> */}
                        
                        </div>
                     </div>  
                    <figcaption className="book_title" style={{textAlign: "center",fontSize: "15px",color:"black",fontFamily: "arial"}}>{book&&book.volumeInfo.title.slice(0,15)}</figcaption>  
                    {book&&book.accessInfo.pdf.isAvailable ?<button><i className="fa fa-download" style={{marginRight: "10px",color: "var(--primaryColor)"}}></i><a  href={book&&book.accessInfo.pdf.isAvailable&&book.accessInfo.pdf.downloadLink} onClick={()=>addDownloadBook(book)} style={{textAlign: "center",fontSize: "15px",color:"var(--secondaryColor)"}}>Download</a></button>:<button><i className="fa fa-download" style={{marginRight: "10px",color: "var(--primaryColor)"}}></i><a  href={book&&book.accessInfo.webReaderLink}  style={{textAlign: "center",fontSize: "15px",color:"var(--secondaryColor)"}}>Read Online</a></button>}
                    </figure>
                    

     
     
      </div>
    ));


      return (
    <div className="Applo">
      <Slider dots={true} infinite= {true} slidesToShow={6}  slidesToScroll={2}>
     
      {renderSlides()}
      </Slider>
    </div>
  );



}
       

        



export default FreeBook;
