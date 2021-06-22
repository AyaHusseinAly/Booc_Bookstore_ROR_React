import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import '../style/shortStory.css';
import { Link } from "react-router-dom";
import AddChapter from './addChapter';



// const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
// const arrowStyle = { color: '#000' }; // style for an svg element
// const contentStyle = {
//     maxWidth: "600px",
//     width: "90%"
// };

class ShortStory extends Component {
    render() {
        return (
            <div className="row pt-1 m-1" style={{ height: '220px', paddingBottom: 'none' }}>
                <img className="col-4 img-fluid embed-responsive-item my-2" style={{ width: '100%', height: "90%", display: 'inline-block', borderRadius: '20px', margin: 'none', paddingBottom: 'none' }} src={this.props.shortstory.cover} />


                <div className="col col-7 mt-2" style={{ width: '100%', heigth: '100%', display: 'inline-block' }}>
                    <h5>{this.props.shortstory.title}</h5>
                    <p>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <a className="mx-2" style={{ color: '#ADB4C3' }}>(17 Reviews)</a>
                    </p>
                    <div style={{ flexDirection: 'row', overflowWrap: 'break-word' }}>
                        <span>{this.props.shortstory.summary.length > 85 ? this.props.shortstory.summary.slice(0, 80) + '....' : this.props.shortstory.summary}</span>
                    </div>

                    <div className='mt-3'>
                        {this.props.shortstory.status == 'Not finished yet' && <AddChapter shortStory={this.props.shortstory.id} />}
                        {/* <ViewShortStory /> */}
                        <Link className="btn rounded-corners" style={{ backgroundColor: 'white', color: '#F8A488', borderColor: '#F8A488', borderRadius: '5px', display: 'inline-block' }}
                            to={`/shortStory/${this.props.shortstory.id}`}>View</Link>
                    </div>
                </div>
            </div>)
    }
}

// class Chapters extends Component {
//     render() {
//         return (<div>
//             <u className="mr-4" style={{ display: "inline-block", cursor: "pointer" }}>{this.props.chapter.title}</u>
//             <i className="far fa-thumbs-up mr-4">{this.props.chapter.no_likes}</i>
//             <span>{this.props.chapter.created_at}</span>
//         </div>)
//     }
// }
// class ViewShortStory extends Component {

//     render() {
//         return (<Popup
//             trigger={<div className="btn rounded-corners" style={{ backgroundColor: 'white', color: '#F8A488', borderColor: '#F8A488', borderRadius: '5px', display: 'inline-block' }}
//             >View</div>}
//             modal
//             contentStyle={contentStyle}
//         >
//             <div>
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolor
//                 nulla animi, natus velit assumenda deserunt molestias
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolor
//                 nulla animi, natus velit assumenda deserunt molestias
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolor
//                 nulla animi, natus velit assumenda deserunt molestias
//             </div>
//         </Popup>
//         )
//     }
// }
// }

export default ShortStory;