import React, {useState,useEffect } from 'react';
import '../style/UserPage.css';
import Favr from './Favr';



const UserPage = (props) => {
    const [downloads, setDownloads] = useState([]);
    const [shelfs, setShelfs] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() =>{
        const bookDownloads = JSON.parse(
           localStorage.getItem('book-download')
        );

        setDownloads(bookDownloads);

    },[]);



  
    useEffect(() =>{
        const bookShelfs = JSON.parse(
           localStorage.getItem('book-shelf')
        );

        setShelfs(bookShelfs);

    },[]);


   

    useEffect(() =>{
        const bookFavourites = JSON.parse(
           localStorage.getItem('book-favourite')
        );

        setFavorites(bookFavourites);

    },[]);
   
   

  
            
    
       

        
        return(
            
            <> 
             <div className="info-person">
        <div className="container">
            <div className="content-info">
                <div className="img">
                    <img src="img/info-pic.jpg" />
                </div>
                <div className="text-content">
                    <h3>Suzan Naeem</h3>
                    <span><strong>15</strong> Following</span>
                    <span><strong>0</strong> Followers</span>
                </div>
            </div>
            <div className="section-select text-center">
                <div className="active" data-className=".book">My Bookshelf</div>
                <div data-className=".story">My Stories</div>
            </div>
            <div className="select-div">
                <div className="book">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                            <div className="box-books">
                                <div className="add-book" style={{height: "270px"}}>
                                    <h3>Added to Bookshelf </h3>
                                    <div className="img">
                                        <div className="row" style={{width: "1300px",marginLeft:"-270px",marginTop:"-110px"}}>
                                            {/* <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                                                <a href="#"><img src="img/book.jpg" /></a>
                                            </div>
                                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                                                <a href="#"><img src="img/book.jpg" /></a>
                                            </div>
                                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                                                <a href="#"><img src="img/book.jpg" /></a>
                                            </div>
                                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                                                <a href="#"><img src="img/book.jpg" /></a>
                                            </div> */}
                                            <Favr key={shelfs.id} items={shelfs} style={{height: "250px"}}/>
                                           
                                        </div>
                                    </div>
                                    <a href="/BookShelf" className="See-More text-center" style={{marginTop:"130px",marginBottom:"-20px",color: "var(--primaryColor)"}}>More...</a>
                                </div>
                                

                                <div className="add-book" style={{height: "270px"}}>
                                    <h3>Favourites</h3>
                                    <div className="img">
                                        <div className="row" style={{width: "1300px",marginLeft:"-270px",marginTop:"-110px"}}>
                                            {/* <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                                                <a href="#"><img src="img/book.jpg" /></a>
                                            </div>
                                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                                                <a href="#"><img src="img/book.jpg" /></a>
                                            </div>
                                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                                                <a href="#"><img src="img/book.jpg" /></a>
                                            </div>
                                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                                                <a href="#"><img src="img/book.jpg" /></a>
                                            </div> */}
                                            <Favr key={favorites.id} items={favorites} style={{height: "250px"}}/>
                                         
                                        </div>
                                    </div>
                                    <a href="/FavoritesPage" className="See-More text-center" style={{marginTop:"130px",marginBottom:"-20px",color: "var(--primaryColor)"}}>More...</a>
                                </div>
                                <div className="add-book" style={{height: "270px"}}>
                                    <h3>Downloads</h3>
                                    <div className="img">
                                        <div className="row"  style={{width: "1300px",marginLeft:"-270px",marginTop:"-110px"}}>
                                            {/* <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                                                <a href="#"><img src="img/book.jpg" /></a>
                                            </div>
                                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                                                <a href="#"><img src="img/book.jpg" /></a>
                                            </div>
                                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                                                <a href="#"><img src="img/book.jpg" /></a>
                                            </div>
                                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                                                <a href="#"><img src="img/book.jpg" /></a>
                                            </div> */}
                                            <Favr key={downloads.id} items={downloads} style={{height: "250px"}}/>
                                       
                                        </div>
                                    </div>
                                    <a href="/DownloadsPage" className="See-More text-center" style={{marginTop:"130px",marginBottom:"-20px",color: "var(--primaryColor)"}}>More...</a>
                                </div>
                                

                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                            <div className="person-follow">
                                <h3>Writers You Follow (15)</h3>
                                <div className="row" style={{height:"800px"}}>
                                    <div className="col-sm-4 col-md-4 col-lg-4" >
                                        <div className="text-img" >
                                            <img src="img/man.jpg" className="rounded-circle"  />
                                            <h4 >Mohamed Naeem</h4>
                                            <span></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <div className="text-img">
                                            <img src="img/man.jpg" className="rounded-circle"  />
                                            <h4>Mostafa Naeem</h4>
                                            <span>New Stories</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <div className="text-img">
                                            <img src="img/man.jpg" className="rounded-circle"  />
                                            <h4>Ibrahim Naeem</h4>
                                            <span></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <div className="text-img">
                                            <img src="img/man.jpg" className="rounded-circle" />
                                            <h4>Mohamed Naeem</h4>
                                            <span>New Stories</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <div className="text-img">
                                            <img src="img/man.jpg" className="rounded-circle" />
                                            <h4>Ibrahim Naeem</h4>
                                            <span></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <div className="text-img">
                                            <img src="img/man.jpg" className="rounded-circle" />
                                            <h4>Mostafa Naeem</h4>
                                            <span></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <div className="text-img">
                                            <img src="img/man.jpg" className="rounded-circle" />
                                            <h4>Mohamed Naeem</h4>
                                            <span></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <div className="text-img">
                                            <img src="img/man.jpg" className="rounded-circle" />
                                            <h4>Ibrahim Naeem</h4>
                                            <span>New Stories</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <div className="text-img">
                                            <img src="img/man.jpg" className="rounded-circle" />
                                            <h4>Mostafa Naeem</h4>
                                            <span></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <div className="text-img">
                                            <img src="img/man.jpg" className="rounded-circle" />
                                            <h4>Mohamed Naeem</h4>
                                            <span></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <div className="text-img">
                                            <img src="img/man.jpg" className="rounded-circle" />
                                            <h4>Ibrahim Naeem</h4>
                                            <span></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <div className="text-img">
                                            <img src="img/man.jpg" className="rounded-circle" />
                                            <h4>Mostafa Naeem</h4>
                                            <span>New Stories</span>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" className="See-More text-center">More...</a>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="story">
                    // Write Your Code Here //
                    story
                </div>
            </div>
        </div>
    </div>
          

     
   
            </> 
        )   
}


export default UserPage;
