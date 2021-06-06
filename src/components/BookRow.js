import React, { Component } from 'react';
import '../style/admin.css';

class BookRow extends Component {

    render() {
        return (

                <div className="row ">

                    {/* <ul>
                        {this.props.items.map(data=><li>{data.volumeInfo.title}</li>)}
                    </ul> */}

                 <div className="col-4 col-md-2 book" >
                    <figure>
                    <img style={{width:'100%'}} src={this.props.items[0]&&this.props.items[0].volumeInfo.imageLinks.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
                    <figcaption className="book_title">{this.props.items[0]&&this.props.items[0].volumeInfo.title.slice(0,15)}</figcaption>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                </figure>
                </div>
                <div className="col-4 col-md-2 book" >
                
                    <figure>
                    <img style={{width:'100%'}} src={this.props.items[1]&&this.props.items[1].volumeInfo.imageLinks.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
                    <figcaption className="book_title">{this.props.items[1]&&this.props.items[1].volumeInfo.title.slice(0,15)}</figcaption>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                </figure>
                </div>
                
                <div className="col-4 col-md-2 book" >
                    <figure>
                    <img style={{width:'100%'}} src={this.props.items[2]&&this.props.items[2].volumeInfo.imageLinks.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
                    <figcaption className="book_title">{this.props.items[2]&&this.props.items[2].volumeInfo.title.slice(0,15)}</figcaption>
                    <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                </figure>
                </div>
                
                <div className="col-4 col-md-2 book" >
                    <figure>
                    <img style={{width:'100%'}} src={this.props.items[3]&&this.props.items[3].volumeInfo.imageLinks.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
                    <figcaption className="book_title">{this.props.items[3]&&this.props.items[3].volumeInfo.title.slice(0,15)}</figcaption>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star "></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                </figure>
                </div>
                <div className="col-4 col-md-2 book"  >
                    <figure>
                    <img style={{width:'100%'}} src={this.props.items[4]&&this.props.items[4].volumeInfo.imageLinks.thumbnail} alt="" className="  book_image rounded  img-fluid"/>
                    <figcaption className="book_title">{this.props.items[4]&&this.props.items[4].volumeInfo.title.slice(0,15)}</figcaption>
                    <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                </figure>
                </div>
                
                <div className="col-4 col-md-2 book" >
                    <figure>
                    <img style={{width:'100%'}} src={this.props.items[5]&&this.props.items[5].volumeInfo.imageLinks.thumbnail} alt="" className="book_image rounded  "/>
                    <figcaption className="book_title">{this.props.items[5]&&this.props.items[5].volumeInfo.title.slice(0,15)}</figcaption>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                </figure>
                </div>
                
                </div> 
    );
    }
}


    export default BookRow;