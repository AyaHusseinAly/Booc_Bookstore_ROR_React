import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import '../style/shortStory.css';
import { Link } from "react-router-dom";



const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
const arrowStyle = { color: '#000' }; // style for an svg element
const contentStyle = {
    maxWidth: "600px",
    width: "90%"
};

class ShortStory extends Component {
    render() {
        return (
            <div className="row m-2" style={{ height: '250px' }}>
                <img className="col-4 book" style={{ width: '100%', height: "90%", display: 'inline-block', borderRadius: '20px' }} src={this.props.shortstory.cover} />


                <div className="col col-7 mt-2" style={{ width: '45%', heigth: '100%', display: 'inline-block' }}>
                    <h5>{this.props.shortstory.title}</h5>
                    <p>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <a className="mx-2" style={{ color: '#ADB4C3' }}>(17 Reviews)</a>
                    </p>
                    {/* {this.props.chapters.map((chapter) => {
                        return <Chapters key={chapter.id} chapter={chapter} />

                    })} */}
                    <span>{this.props.shortstory.summary.slice(1,30)}</span>
                    <div className='mt-3'>
                        {this.props.shortstory.status == 'Not finished yet' && <CreateChapter shortStory={this.props.shortstory.id} />}
                        {/* <ViewShortStory /> */}
                        <Link className="btn rounded-corners" style={{ backgroundColor: 'white', color: '#F8A488', borderColor: '#F8A488', borderRadius: '5px', display: 'inline-block' }}
                            to={`/shortStory/${this.props.shortstory.id}`}>View</Link>
                    </div>
                </div>
            </div>)
    }
}

class Chapters extends Component {
    render() {
        return (<div>
            <u className="mr-4" style={{ display: "inline-block", cursor: "pointer" }}>{this.props.chapter.title}</u>
            <i className="far fa-thumbs-up mr-4">{this.props.chapter.no_likes}</i>
            <span>{this.props.chapter.created_at}</span>
        </div>)
    }
}
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
class CreateChapter extends Component {
    constructor(props) {

        super(props);
        this.state = {
            chapterTitle: "",
            chapterDescription: "",
            errors: []
        }

    }
    validate = () => {
        const errors = {};
        if (this.state.chapterTitle.trim() === "")
            errors.title = "Title is required"
        if (this.state.chapterDescription.trim() === "")
            errors.description = "Description is required"
        this.setState({ errors });
        return Object.keys(errors).length === 0 ? null : errors;
    }
    handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.target);
        const errors = this.validate();

        if (errors === null) {

            const obj = {
                chapterTitle: this.state.chapterTitle,
                chapterDescription: this.state.chapterDescription,

            }
            Object.keys(this.state).forEach((key, value) => {
                return data.append(key, this.state[key])
            })

            const res = await axios.post("http://localhost:3000/createChapter", data, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type",

                }
            });
            console.log(res);
            window.location.reload()
        }
        else {
            console.log('no submit');
            this.activeError = true;
        }

    }
    render() {
        return (<Popup
            trigger={<div className="btn rounded-corners mr-4" style={{ backgroundColor: '#F8A488', borderColor: '#F8A488', borderRadius: '5px', display: 'inline-block' }}>Add Chapter</div>}
            modal
            contentStyle={contentStyle}
        >

            <form onSubmit={this.handleSubmit}>
                <h3>Create New Chapter</h3>
                <label className="formLabel" style={{ display: 'inline-block', width: '20%' }} htmlFor='chaptertitle'>Title</label>
                <input type="text" className="formControl p-1" style={{ borderRadius: '4px', display: 'inline-block' }} placeholder=" your chapter's name.." id='chaptertitle' value={this.state.chapterTitle}
                    onChange={(e) => this.setState({ chapterTitle: e.currentTarget.value })} />
                {this.state.errors.title && (<div className="alert alert-danger" role="alert">{this.state.errors.title}</div>)}
                <br />
                <input type="hidden" name="shortStory" value={this.props.shortStory} />
                <div className='d-flex justify-content-between mt-2'>
                    <label className="formLabel" style={{ display: 'inline-block' }}
                        htmlFor='chapterdescription'>Description</label>
                    <textarea className="formControl" rows="4" style={{ borderRadius: '4px', width: "80%", display: 'inline-block' }} placeholder=" your chapter's summary.." id='chapterdescription' value={this.state.chapterDescription}
                        onChange={(e) => this.setState({ chapterDescription: e.currentTarget.value })} />
                    {this.state.errors.description && (<div className="alert alert-danger" role="alert">{this.state.errors.description}</div>)}
                </div>

                <div className="d-flex justify-content-end " style={{ width: '100%' }}>
                    {/* <button className="py-2 px-2 m-3 btn btn-lg" style={{ backgroundColor: 'white', borderColor: '#F8A488' }} onClick={() => window.location.reload()}>cancel</button> */}
                    <button className="py-2 px-2  my-3 ml-1 mr-4 btn btn-lg" style={{ backgroundColor: '#F8A488', borderColor: '#F8A488' }} type='submit'>publish</button>
                </div>
            </form>

        </Popup >
        )
    }
}

export default ShortStory;