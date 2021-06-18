import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import '../style/shortStory.css';



const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
const arrowStyle = { color: '#000' }; // style for an svg element
const contentStyle = {
    maxWidth: "600px",
    width: "90%"
};
class Writer extends Component {
    state = {
        shortstoiesNotFinished: [],
        shortstoiesFinished: [],
        empty: true,
        chapters: [
            {
                title: "chapter 1",
                created_at: "15 April 2021",
                no_likes: 23

            },
            {
                title: "chapter 2",
                created_at: "15 April 2021",
                no_likes: 44

            },
            {
                title: "chapter 3",
                created_at: "15 April 2021",
                no_likes: 14

            },

        ]
    }

    componentDidMount() {
        axios.get("http://localhost:3000/shortStories",
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type"
                }
            })
            .then(response => {
                this.setState({ shortstoiesNotFinished: response.data.NotFinishedYet });
                this.setState({ shortstoiesFinished: response.data.Finished });
                console.log(response.data.NotFinishedYet);
                if (response.data.NotFinishedYet.length + response.data.Finished.length > 0) {
                    this.setState({ empty: false });
                }
            });

    }



    render() {

        return (
            <div >
                {this.state.shortstoiesNotFinished.length + this.state.shortstoiesFinished.length == 0 && <div className='mt-5 pt-5' style={{ width: '100%', height: '100%' }}>
                    <h3 className='d-flex justify-content-center'>You haven't add any stories </h3>
                    <div className='d-flex justify-content-center'> <button className="py-2 px-5  my-3 ml-3 btn btn-lg" style={{ backgroundColor: '#F8A488', borderColor: '#F8A488' }} ><i className="fa fa-plus-circle" style={{ color: 'black', border: 'none' }} onClick={() => this.props.history.push('/addstory')}>Add New Story</i></button></div>
                </div>}
                {this.state.shortstoiesNotFinished.length + this.state.shortstoiesFinished.length > 0 && <div>
                    <div className='d-flex justify-content-end mr-2'>
                        <button className="py-1 px-3  my-3 ml-3 btn btn-lg" style={{ backgroundColor: '#F8A488', borderColor: '#F8A488' }} ><i className="fa fa-plus-circle" style={{ color: 'black', border: 'none' }} onClick={() => this.props.history.push('/addstory')}>Add New Story</i></button>
                    </div>
                    <h3 className='ml-5'>Previous Work</h3>
                    <div className="container d-flex justify-content-between">
                        <div style={{ display: "inline-block" }}>
                            <h4 style={{ textAlign: 'center' }}>Not finished yet</h4>

                            {this.state.shortstoiesNotFinished.map(shortstory => {
                                return <ShortStoryNotFinished shortstory={shortstory} chapters={this.state.chapters} />

                            })}
                        </div>
                        <div style={{ display: "inline-block" }}>
                            <h4 style={{ textAlign: 'center' }}>Finished</h4>

                            {this.state.shortstoiesFinished.map(shortstory => {
                                return <ShortStoryFinished shortstory={shortstory} chapters={this.state.chapters} />

                            })}
                        </div>

                    </div>
                </div>}

            </div>

        );
    }
}

class ShortStoryNotFinished extends Component {
    render() {
        return (
            <div className="row m-2" style={{ height: '250px' }}>
                <img className="col col-4" style={{ width: '40%', height: "90%", display: 'inline-block', borderRadius: '20px' }} src={this.props.shortstory.cover} />
                <div className="col col-8 mt-2" style={{ width: '40%', heigth: '150px', display: 'inline-block' }}>
                    <h5>{this.props.shortstory.title}</h5>
                    <p>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <a className="mx-2" style={{ color: '#ADB4C3' }}>(17 Reviews)</a>
                    </p>
                    {this.props.chapters.map((chapter) => {
                        return <Chapters key={chapter.id} chapter={chapter} />

                    })}
                    {/* <p>{this.props.shortstory.summary}</p> */}
                    <div className='mt-3'>
                        <CreateChapter shortStory={this.props.shortstory.id} />
                        <ViewShortStory />
                    </div>
                </div>
            </div>)
    }
}
class ShortStoryFinished extends Component {
    render() {
        return (<div className="row m-2" style={{ height: '250px' }}>
            <img className="col col-4" style={{ width: '40%', height: "90%", display: 'inline-block', borderRadius: '20px' }} src={this.props.shortstory.cover} />
            <div className="col col-8 mt-2" style={{ width: '40%', heigth: '150px', display: 'inline-block' }}>
                <h5>{this.props.shortstory.title}</h5>
                <p>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <a className="mx-2" style={{ color: '#ADB4C3' }}>(17 Reviews)</a>
                </p>
                {this.props.chapters.map((chapter) => {
                    return <Chapters key={chapter.id} chapter={chapter} />

                })}
                {/* <p>{this.props.shortstory.summary}</p> */}
                <div className='mt-3'>
                    <ViewShortStory />
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
class ViewShortStory extends Component {

    render() {
        return (<Popup
            trigger={<div className="btn rounded-corners" style={{ backgroundColor: 'white', color: '#F8A488', borderColor: '#F8A488', borderRadius: '5px', display: 'inline-block' }}
            >View</div>}
            modal
            contentStyle={contentStyle}
        >
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolor
                nulla animi, natus velit assumenda deserunt molestias
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolor
                nulla animi, natus velit assumenda deserunt molestias
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolor
                nulla animi, natus velit assumenda deserunt molestias
            </div>
        </Popup>
        )
    }
}
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
                    <button className="py-2 px-2 m-3 btn btn-lg" style={{ backgroundColor: 'white', borderColor: '#F8A488' }} onClick={() => window.location.reload()}>cancel</button>
                    <button className="py-2 px-2  my-3 ml-1 mr-4 btn btn-lg" style={{ backgroundColor: '#F8A488', borderColor: '#F8A488' }} type='submit'>publish</button>
                </div>
            </form>

        </Popup >
        )
    }
}

export default Writer;