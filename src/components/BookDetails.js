import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/BookDetails.css';
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons";

class BookDetails extends Component {

    render() {

        return (
            <>
            <div className="product">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3">
                        <div className="parent-box">
                            <div className="box-img text-center">
                                <img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" />
                                <div className="button">
                                    {/* <button><i className="fas fa-download fa-fw"></i> Download</button> */}
                                    <button><FeatherIcon icon="download" size="20" /> Download</button>
                                    <button><FeatherIcon icon="map" size="20" /> Find near me</button>
                                    {/* <button><i className="fas fa-microphone-alt fa-fw"></i> Find near me</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-7 col-lg-6">
                        <div className="box-info">
                            <span>Free</span>
                            <div className="heading">
                                <h3>The Great Gatsby</h3>
                                <div className="evaluation">
                                <FeatherIcon icon="star" size="25" fill="orange"/>
                                <FeatherIcon icon="star" size="25" fill="orange"/>
                                <FeatherIcon icon="star" size="25" fill="orange"/>
                                <FeatherIcon icon="star" size="25" />
                                <FeatherIcon icon="star" size="25"  />
                                    <span>(375 Ratings)</span>
                                </div>
                                <button><FeatherIcon icon="plus" size="15" /> Add To Shelf Book</button>
                            </div>
                            <ul className="list-unstyled details">
                                <li><span>Author</span>: <a>#Suzan</a></li>
                                <li><span>Number Of Pages</span>: 137 pages</li>
                                <li><span>Publication Year</span>: 1925</li>
                            </ul>
                            <div className="about-product">
                                <div className="about-info">
                                    <h4>About Book</h4>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia nemo atque porro,
                                        quod cum odio consectetur architecto veritatis vel incidunt dolore at corporis!
                                        Accusantium eum consequuntur incidunt, sed quisquam delectus.</p>
                                </div>
                                <div className="about-info">
                                    <h4>About Author</h4>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia nemo atque porro,
                                        quod cum odio consectetur architecto veritatis vel incidunt dolore at corporis!
                                        Accusantium eum consequuntur incidunt, sed quisquam delectus.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3">
                        <div className="reviews">
                            <h4>Popular Reviews (5)</h4>
                            <div className="box-person">
                                <div className="img">
                                <FeatherIcon icon="user" size="40" />
                                </div>
                                <div className="info-details">
                                    <h5>Adel Ali</h5>
                                    <div className="evaluation">
                                    <FeatherIcon icon="star" size="20" fill="orange"/>
                                    <FeatherIcon icon="star" size="20" fill="orange"/>
                                    <FeatherIcon icon="star" size="20" />
                                    <FeatherIcon icon="star" size="20" />
                                    <FeatherIcon icon="star" size="20"  />
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                </div>
                            </div>
                            <div className="box-person">
                                <div className="img">
                                <FeatherIcon icon="user" size="40" />
                                </div>
                                <div className="info-details">
                                    <h5>Esraa Mohamed</h5>
                                    <div className="evaluation">
                                    <FeatherIcon icon="star" size="20" fill="orange"/>
                                    <FeatherIcon icon="star" size="20" />
                                    <FeatherIcon icon="star" size="20" />
                                    <FeatherIcon icon="star" size="20" />
                                    <FeatherIcon icon="star" size="20"  />
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                </div>
                            </div>
                            <a href="#" className="more">See More..</a>
                        </div>
                        <div className="replay">
                            <h4>Reviews (7)</h4>
                            <div className="box-person">
                                <div className="img">
                                <FeatherIcon icon="user" size="25" fill="var(--secondaryColor)"/>
                                </div>
                                <div className="info-details">
                                    <h5>Ola Gamal</h5>
                                    <div className="evaluation">
                                    <FeatherIcon icon="star" size="15" fill="orange"/>
                                    <FeatherIcon icon="star" size="15" />
                                    <FeatherIcon icon="star" size="15" />
                                    <FeatherIcon icon="star" size="15" />
                                    <FeatherIcon icon="star" size="15"  />
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    <a href="#" className="report">Report</a>
                                </div>
                            </div>
                            <div className="box-person">
                                <div className="img">
                                <FeatherIcon icon="user" size="25" fill="var(--secondaryColor)"/>
                                </div>
                                <div className="info-details">
                                    <h5>Ahmed Emara</h5>
                                    <div className="evaluation ">
                                    <FeatherIcon icon="star" size="15" fill="orange"/>
                                    <FeatherIcon icon="star" size="15" />
                                    <FeatherIcon icon="star" size="15" />
                                    <FeatherIcon icon="star" size="15" />
                                    <FeatherIcon icon="star" size="15"  />
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    <a href="#" className="report">Report</a>
                                </div>
                            </div>
                            <a href="#" className="more">See More..</a>
                        </div>
                        <div className="mail">
                            <h4>Invite Friends</h4>
                            <p>I Strong Recommend This Book For You!</p>
                            <form action="">
                                <input type="email" name="mail" placeholder="Your Friends" />
                                <input type="submit" value="Go" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     
    <div class="slider">
        <div class="container">
            <div class="info">
                <span>Similar Books</span><span>(5 Books)</span>
            </div>
            <div class="up">
                <div class="client active">
                    <a href="#"><img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" /></a>
                    <a href="#"><img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" /></a>
                    <a href="#"><img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" /></a>
                    <a href="#"><img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" /></a>
                    <a href="#"><img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" /></a>
                </div>
              
            </div>
        </div>
    </div>

    </>

    );
    }
}


    export default BookDetails;
