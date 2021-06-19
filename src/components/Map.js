import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/headerFooter.css';
import '../style/map.css';
import ReactDOM from 'react-dom';

class Map extends Component {

    render() {
        const bookName = {
            display : 'inline-block',
           // marginLeft: '0px',
            marginRight: '20px',
          };

        const distictSearch = {
            display : 'inline-block',
          };
        
        const distictSearch2 = {
            display : 'inline-block',
            //marginLeft: '200px',
           // marginRight: '5px',
        };

        const result = {
            display : 'inline-block',
            marginLeft: '20px',
          
        };

        const bordeer = {
            width: '1500px',
            height: '100px',
            border: '1px solid blue',
            boxSizing: 'border-box',
          };

        return (
            <div className="container">
                
                {/*  Book's Name  */}
                <br/> 
                <div style={bookName}  className="col-lg-4 col-xs-4">
                    <div className="heading"><strong>Book's Name</strong></div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-book-open"></i></span>
                        </div>
                        <div  className="form-outline">
                        <input type="text" class="form-control" placeholder="Enter a book name" aria-label="Disabled input example" />
                        </div>
                    </div>
                </div>

                {/* distict search */}
                <div  style={distictSearch} className="col-sm-3 col-xs-4 col-md-3 ">
                    <div  className="heading"><strong>Distict</strong></div>
                   <div class="input-group mb-3"> 
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-map-marker-alt"></i></span>
                        </div>
                        <div className="form-outline">
                            <select className="custom-select" id="inputGroupSelect03">
                                <option selected>choose nearst spot</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>

                </div>
               
                <button type="button" className="btn btn-default" style={{background : '#FEC7B5'}}><i class="fas fa-search"></i>  Search</button>
               
                {/* Radio buttons */}
                <div style={distictSearch2} className="float-right">
                    <br/>
                        <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="switch1"/>
                        <label className="custom-control-label" for="switch1">Share my Location</label>
                    </div>            
                    
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="customRadio" name="example" style={{background : '#FEC7B5'}} value="customEx"/>
                        <label className="custom-control-label" for="customRadio">Bookstores</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="customRadio2" name="example" value="customEx"/>
                        <label className="custom-control-label" for="customRadio2">Libraries</label>
                    </div>
                </div>
                
                <br></br>
                <div className="heading" style={result} ><strong>Results</strong></div>

                {/* cards */}

                <br></br>
                <div class="container mt-3 rounded-sm " style={distictSearch}>
                    <br/>
                    <div  className="card col-md-5 col-md-5 col-xs-4 col-xs-3 mt-1 shadow" style={{border: "none"}}>
                        <div className="row">
                            <div className="col-md-4 align-middle">
                                <img src="img/alef.png" className="img-fluid  "/>
                            </div>
                            <div class="col-md-8">
                                <h4 className="card-title">Alef Bookstores</h4>
                                <span  className="fa fa-star checked"></span>
                                <span  className="fa fa-star checked"></span>
                                <span  className="fa fa-star checked"></span>
                                <span  className="fa fa-star"></span>
                                <span  className="fa fa-star"></span><br/>
                                <span><i className="fas fa-map-marker-alt"></i> 1.2 km</span><br/>
                                <span><i className="fa fa-phone" aria-hidden="true"></i> +03 4875921</span>
                            </div>
                        </div>
                    </div>

                    <div  className="card col-md-5 mt-3 shadow" style={{border: "none"}}>
                        <div className="row">
                            <div className="col-md-4">
                                <img src="img/alef.png" className="card-img-top embed-responsive-item"/>
                            </div> 
                            <div class="col-md-8">
                                <h4 className="card-title">Alef Bookstores</h4>
                                <span  className="fa fa-star checked"></span>
                                <span  className="fa fa-star checked"></span>
                                <span  className="fa fa-star checked"></span>
                                <span  className="fa fa-star"></span>
                                <span  className="fa fa-star"></span><br/>
                                <span><i className="fas fa-map-marker-alt"></i> 1.2 km</span><br/>
                                <span><i className="fa fa-phone" aria-hidden="true"></i> +03 4875921</span>
                            </div>
                        </div>
                    </div>
                    <br/>

                </div>
                {/* Maps */}
                <div class="container"  style={distictSearch}>
                    <div class="options-box">
                
                    </div>
                    <div id="map"></div>
                </div>  
     
        </div>
    );
    }
}


    export default Map;