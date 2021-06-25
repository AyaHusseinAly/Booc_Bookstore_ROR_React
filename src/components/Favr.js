import React, {useState,useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/slider.css';
import Slider from "react-slick";

export default function Favr(props) {

   


  const renderSlides = () =>
  props.items.map(book => (
      <div>
        <div>{<img src={book&&book.volumeInfo.imageLinks.thumbnail} style={{width: "100px",margin: "auto"}} />}</div>
        <figcaption style={{textAlign: "center",fontSize: "15px",color:"var(--secondaryColor)"}}>{book&&book.volumeInfo.title.slice(0,12)}</figcaption>

      </div>
    ));

  return (
    <div className="Appi">
      <Slider dots={true} infinite= {true} slidesToShow={1} slidesToScroll={1}>
     
      {renderSlides()}
      </Slider>
    </div>
  );
}
