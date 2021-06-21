import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/headerFooter.css';
import '../style/map.css';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    InfoWindow,
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
  }from "react-google-maps";
  import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyC653P3SNsyeeby7PcvMCfbwoMZZogQ2dA")
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookName: '',
            distict: '',
            address:'',
            city:'',
            area:'',
            state:'',
            zoom: 15,
            height: 400,
            mapPosition: {
                lat: 0,
                lng: 0,
            },
            markers: [ // Just an example this should probably be in your state or props. 
                {
                name: "marker1",
                position: { lat: 31.001,  lng: 29.9187, }
                },
                {
                name: "marker2",
                position: {lat: 31.1002,  lng: 29.9187, }
                },
                {
                name: "marker3",
                position: { lat: 31.0002,  lng: 29.9187, }
                }
            ],

            stores: [
                {
                    src: "img/alef.png",
                    title: "Alef BookStores"
                },
                {
                    src: "img/Alex.png",
                    title: "Alef BookStores"
                },
            ]

        }
    }

    onValueChange= (event) => {
        this.setState({
          selectedOption: event.target.value
        });
    } 

    handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.target);
       // const errors = this.validate();

        //if (errors === null) {

            const obj = {
                chapterTitle: this.state.chapterTitle,
                chapterDescription: this.state.chapterDescription,

            }
            Object.keys(this.state).forEach((key, value) => {
                 return data.append(key, this.state[key])
            })

            const res = await axios.post("http://localhost:3000/bookStoreSearchFromMap",data, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type",

                }
            });
            console.log(res);
         //   window.location.reload()
        //}
        // else {
        //     console.log('no submit');
        //     this.activeError = true;
        // }

    }

    onMarkerDragEnd =(event) => {
        let newLat = event.latLng.lat();
        let newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat,newLng)
            .then(response =>{
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity()
            console.log('response', response)
        })

        console.log('newlat', newLat);
    }

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

       

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 31.2001, lng: 29.9187, }}
            >
                {this.state.markers.map((marker, index) => (
                    <Marker
                    onClick={this.onMarkerClick}
                    // draggable={true}
                    // onDragEnd={this.onMarkerDragEnd}
                    position={marker.position}
                    
                    >
                        <InfoWindow>
                            <div>{marker.name}</div>
                        </InfoWindow>
                    </Marker>
                    ))}
            </GoogleMap>
        ));
            
        

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    {/*  Book's Name  */}
                    <br/> 
                    <div style={bookName}  className="col-lg-4 col-xs-4">
                        <div className="heading"><strong>Book's Name</strong></div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-book-open"></i></span>
                            </div>
                            <div  className="form-outline">
                            <input type="text" class="form-control" placeholder="Enter a book name" aria-label="Disabled input example" value={this.state.bookName}
                                onChange={(e) => this.setState({ bookName: e.currentTarget.value })} />
                            </div>
                        </div>
                    </div>

                    {/* distict search */}
                    <div  style={distictSearch} className="col-md-3 col-sm-3 col-xs-4 ">
                        <div  className="heading"><strong>Distict</strong></div>
                        <div class="input-group mb-3"> 
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-map-marker-alt"></i></span>
                            </div>
                            <div className="form-outline">
                                <select className="custom-select" id="inputGroupSelect03" value={this.state.distict}
                                    onChange={(e) => this.setState({ distict: e.currentTarget.value })}>
                                    <option selected>choose nearst spot</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select> 
                            </div>
                        </div>

                    </div>
                
                    <button  className="btn btn-default" style={{background : '#FEC7B5'}} type='submit'><i class="fas fa-search"></i>  Search</button>
                
                    {/* Radio buttons */}
                    <div style={distictSearch2} className="float-right">
                        <br/>
                        <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="switch1"/>
                            <label className="custom-control-label" for="switch1">Share my Location</label>
                        </div>            
                        
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input" id="customRadio" name="example" style={{background : '#FEC7B5'}} value="Bookstores" checked={this.state.selectedOption === "Bookstores"}
                                onChange={this.onValueChange}/>
                            <label className="custom-control-label" for="customRadio">Bookstores</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input" id="customRadio2" name="example" value="Libraries" checked={this.state.selectedOption === "Libraries"}
                                onChange={this.onValueChange}/>
                            <label className="custom-control-label" for="customRadio2">Libraries</label>
                        </div>
                    </div>
                </form>
                
                <br></br>
                <div className="heading" style={result} ><strong>Results</strong></div>

                {/* cards */}

                <br></br>
                <div className="row">
                    <div className="container mt-3 rounded-sm col-lg-7 col-md-7" style={distictSearch}>
                        <br/>
                        {/**/}
                        {this.state.stores.map((store, index) => (
                            <div  className="card col-md-12 mt-3 shadow" style={{border: "none"}}>
                            <div className="row">
                                <div className="col-md-4 align-middle">
                                    <img src={store.src} className="img-fluid  "/>
                                </div>
                                <div className="col-md-8">
                                    <h4 className="card-title">{store.title}</h4>
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
                            
                        ))}

                        {/**/}
                        <br/>

                    </div>

                    {/* Maps */}
                    {/* <div class="container"  style={distictSearch}>
                        <div class="options-box">
                    
                        </div>
                        <div id="map"></div>
                    </div>   */}
                    <div className="col-md-5" style={{}}>
                        <MapWithAMarker
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC653P3SNsyeeby7PcvMCfbwoMZZogQ2dA&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%`, width:`100%` }} />}
                            containerElement={<div style={{ height: `500px`, width:`400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                       
                    </div>
                </div>
                <br/>
        </div>
    );
    }
}


export default Map;