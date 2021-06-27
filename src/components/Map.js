import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/headerFooter.css';
import '../style/map.css';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import BookDetails from './BookDetails';

import {
    InfoWindow,
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyC653P3SNsyeeby7PcvMCfbwoMZZogQ2dA")
const cities = ["Cairo", "Alexandria", "Giza", "Port Said", "Suez", "Luxor", "al-Mansura", "Damanhur", "6th of October City", "Kafr el-Dawwar"]

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookName: '',
            distict: '',
            address: '',
            city: '',
            area: '',
            state: '',
            zoom: 15,
            height: 400,
            stores: [],
            latitudeOfMyPosition: '',
            longitudeOfMyPosition: '',

            showingInfoWindow: false,
            activeMarker: true,
            selectedPlace: {},
            isOpen: false,
            isOpen1: false,
            markerInfoWindow: [0],

            //for InfoWindow
            selected: null,
            setSelected: null,
            Myposition: {},
            // myLocation:[],
            flagOfMyLocation: false,

            showInfoIndex: ''
        }
    }

    handleToggle = () => {
        this.setState({
            //isOpen1: !false,
            showInfoIndex: -1
        });
    }

    handleToggleForMyLocation = () => {
        this.setState({
            isOpen: !false,
            //showInfoIndex: ''
        });
    }

    showInfo(a) {
        this.setState({ showInfoIndex: a })
    }

    onMarkerClick = (props, marker) => {
        this.setState({
            selectedPlace: props,
            showingInfoWindow: marker,
            activeMarker: true

        });
    }


    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    /******************** Share my Loction *****************************/
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    getCoordinates = (position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        this.setState({
            latitudeOfMyPosition: position.coords.latitude,
            longitudeOfMyPosition: position.coords.longitude,
            Myposition: { lat: position.coords.latitude, lng: position.coords.longitude },


        })
        if (this.state.flagOfMyLocation) {
            this.state.flagOfMyLocation = false
        }
        else { this.state.flagOfMyLocation = true }

        this.reverseGeocodeCoordinates();
    }

    handleLocationError = (error) => {
        this.state.flagOfMyLocation = false
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Share my.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
            default:
                alert("An unknown error occurred.");
        }
    }

    reverseGeocodeCoordinates = () => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=false&key=AIzaSyC653P3SNsyeeby7PcvMCfbwoMZZogQ2dA`)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => alert(error))
    }


    /******************** End  Share my Loction *****************************/

    /******************** Submit The Form *****************************/
    onValueChange = (event) => {
        this.setState({
            selectedOption: event.target.value
        });
    }
    handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.target);
        const obj = {
            bookName: this.state.bookName,
            selectedOption: this.state.selectedValue,
            distict: this.state.distict,
        }
        Object.keys(this.state).forEach((key, value) => {
            return data.append(key, this.state[key])
        })

        const res = await axios.post("http://localhost:3000/bookStoreSearchFromMap", data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type",
            }
        });
        this.setState({ stores: res.data.stores });
        console.log(this.state.stores);
        // for (let i =0;i<res.data.stores.length;i++){

        // }
        this.setState({ markerInfoWindow: Array(res.data.stores.length).fill(0) })
        console.log(this.state.markerInfoWindow)
        console.log(res);
        console.log(this.state.selectedOption);
        this.setState({
            distict: '',
            bookName: '',
            zoom: 10,
            //selectedOption: undefined,
            //this: this.reset
        });
    }
    /******************** End Submit The Form *****************************/

    /******************** make marker Dragable *****************************/
    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat();
        let newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng)
            .then(response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity()
                console.log('response', response)
            })
        console.log('newlat', newLat);
    }
    /******************** End make marker Dragable *****************************/

    /*************make book api**************** **/

    searchApiBook = (value)=>{
        axios.get("http://localhost:3000/apiSearchBooks",{ params: {q: value}})
        .then(response => {
        console.log(response)
        this.setState({stores:response.data.stores});
        }); 
    }




    /************************************************8 */

    render() {
        /******************** Styling ***********************************/
        const bookName = {
            display: 'inline-block',
            // marginLeft: '0px',
            marginRight: '20px',
        };

        const distictSearch = {
            display: 'inline-block',
        };

        const distictSearch2 = {
            display: 'inline-block',
            //marginLeft: '200px',
            // marginRight: '5px',
        };

        const result = {
            display: 'inline-block',
            marginLeft: '20px',

        };

        const border = {
            // borderRadius: '10px 10px',
            border: '4px solid #F8A488',
            //boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.7)',
        };

        /******************** End of Styling ***********************************/

        /******************** Markers ***********************************/
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={this.state.zoom}
                defaultCenter={{ lat: 31.2001, lng: 29.9187, }}
                onClick={this.onMapClicked}
            >
                {this.state.stores.map((marker, index) => (
                    <Marker
                        // onClick = {() => this.onMarkerClick(props, marker)}
                        onClick={() => { this.showInfo(index) }}
                        key={index}
                        // draggable={true}
                        // onDragEnd={this.onMarkerDragEnd}
                        position={marker.position}
                    >  {(this.state.showInfoIndex === index) &&
                        <InfoWindow
                            onCloseClick={this.handleToggle}
                        >
                            <div><h6>{marker.name}</h6></div>
                        </InfoWindow>}
                    </Marker>

                ))}
                {this.state.flagOfMyLocation &&
                    <Marker
                        onClick={this.handleToggleForMyLocation}
                        position={this.state.Myposition}
                    >
                        {this.state.isOpen &&
                            <InfoWindow>
                                <div><h6>Your Position</h6></div>
                            </InfoWindow>}
                    </Marker>
                }
            </GoogleMap>
        ));
        /******************** End of  Markers ***********************************/

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    {/*  Book's Name  */}
                    <br />
                    <div style={bookName} className="col-lg-4 col-xs-4">
                        <div className="heading"><strong>Book's Name</strong></div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-book-open"></i></span>
                            </div>
                            <div className="form-outline">
                                <input type="text" class="form-control" placeholder="Enter a book name" aria-label="Disabled input example" value={this.state.bookName}
                                    onChange={(e) => this.setState({ bookName: e.currentTarget.value })} />
                            </div>
                        </div>
                    </div>

                    {/* distict search */}
                    <div style={distictSearch} className="col-md-3 col-sm-3 col-xs-4 ">
                        <div className="heading"><strong>Distict</strong></div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-map-marker-alt"></i></span>
                            </div>
                            <div className="form-outline">
                                <select className="custom-select" id="inputGroupSelect03" value={this.state.distict}
                                    onChange={(e) => this.setState({ distict: e.currentTarget.value })}>
                                    <option selected>choose nearst spot</option>
                                    {cities.map(str => { return (<option value={str}>{str}</option>) })}
                                </select>
                            </div>
                        </div>

                    </div>

                    <button className="btn btn-default" style={{ background: '#FEC7B5' }} type='submit' disabled={!this.state.selectedOption && !this.state.bookName && !this.state.distict} ><i class="fas fa-search"></i>  Search</button>

                    {/* Radio buttons */}
                    <div style={distictSearch2} className="float-right">
                        <br />
                        <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="switch1" name="sharemyLocation" value="sharemyLocation" onClick={this.getLocation} />
                            <label className="custom-control-label" for="switch1">Share my Location</label>
                        </div>

                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input" id="customRadio" name="example" style={{ background: '#FEC7B5' }} value="Bookstores" checked={this.state.selectedOption === "Bookstores"}
                                onChange={this.onValueChange} />
                            <label className="custom-control-label" for="customRadio">Bookstores</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input" id="customRadio2" name="example" value="Libraries" checked={this.state.selectedOption === "Libraries"}
                                onChange={this.onValueChange} />
                            <label className="custom-control-label" for="customRadio2">Libraries</label>
                        </div>

                    </div>
                </form>

                <br></br>
                {this.state.stores.length > 0 ?
                    <div>
                        <div className="heading" style={result} ><strong>Results</strong></div>

                        {/* cards */}
                        <br></br>
                        <div className="row">
                            <div className="container mt-3 rounded-sm col-lg-7 col-md-7" style={distictSearch}>
                                <br />
                                {/**/}
                                {/* {this.state.stores.length > 0} */}
                                {this.state.stores.length > 0 ? this.state.stores.map((store, index) => {
                                    return <div className="card col-md-12 mt-3 shadow" style={{ border: "none" }}>
                                        <div className="row">
                                            <div className="col-md-4 align-middle">
                                                <img src={store.img} className="img-fluid  " />
                                            </div>
                                            <div className="col-md-8">
                                                <h4 className="card-title">{store.name}</h4>
                                                {/* <span  className="fa fa-star checked"></span>
                                            <span  className="fa fa-star checked"></span>
                                            <span  className="fa fa-star checked"></span>
                                            <span  className="fa fa-star"></span>
                                            <span  className="fa fa-star"></span><br/> */}
                                                {/* <span><i className="fas fa-map-marker-alt"></i> 1.2 km</span><br /> */}
                                                <span><i className="fa fa-phone" aria-hidden="true"></i> {store.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                }) : <div></div>}

                                {/**/}
                                <br />
                            </div>


                            {/* Maps */}
                            {/* <div class="container"  style={distictSearch}>
                                <div class="options-box">
                            
                                </div>
                                <div id="map"></div>
                            </div>   */}
                            <div className="col-md-5 d-flex justify-content-center" style={{}}>
                                <MapWithAMarker
                                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC653P3SNsyeeby7PcvMCfbwoMZZogQ2dA&v=3.exp&libraries=geometry,drawing,places"
                                    loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
                                    containerElement={<div style={{ height: `500px`, width: `800px` }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                />
                            </div>
                        </div>
                    </div> :
                    // if no result or search yet
                    <div>
                        <br />
                        <div className='d-flex justify-content-center ' style={{ border: '2px solid #F8A488', borderRadius: '5px!important' }}>
                            <MapWithAMarker
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC653P3SNsyeeby7PcvMCfbwoMZZogQ2dA&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
                                containerElement={<div style={{ height: `500px`, width: `1150px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                        </div>
                    </div>

                }
                <br />
            </div>
        );

    }
}


export default Map;