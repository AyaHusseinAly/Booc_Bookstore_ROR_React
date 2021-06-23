import React, { Component } from 'react';
import axios from 'axios';
import ImageUploader from 'react-images-upload';


class AddStory extends Component {
    constructor(props) {

        super(props);
        this.state = {
            shortStoryTitle: "",
            shortStoryDescription: "",
            shortStoryLanguage: "",
            shortStoryAudience: "",
            shortStoryGenre: [],
            shortStoryCover: [],
            //shortStoryCoverPreview: "",
            errors: {},
            genres: [],

            //Fatma
            BookStoreCover: "",

        }
        this.inputReference = React.createRef();
        let activeError = false;
    }
    
    /******************* add cover for Store ********************/
    handleStoreCover = (e) => {
        const file = URL.createObjectURL(e.target.files[0]);
        this.setState({ BookStoreCover: file });
    }
    // Action of cover uploaded 
    fileUploadAction = () => this.inputReference.current.click();
    /******************* End add cover for Store ********************/
    // handleImage = (e) => {
    //     const file = e.target.files[0];
    //     console.log(e.currentTarget.value);
    // }
    
    handleChange = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        this.setState({ shortStoryGenre: value });
    }
    handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.target);
        const errors = this.validate();

        if (errors === null) {
            console.log(this.state.shortStoryCover);
            const obj = {
                shortStoryTitle: this.state.shortStoryTitle,
                shortStoryDescription: this.state.shortStoryDescription,
                shortStoryLanguage: this.state.shortStoryLanguage,
                shortStoryAudience: this.state.shortStoryAudience,
                shortStoryGenre: this.state.shortStoryGenre,
                writer: localStorage.getItem('user_id'),
                shortStoryCover: this.state.shortStoryCover,

            }
            Object.keys(obj).forEach((key, value) => {
                return data.append(key, obj[key])
            })
            
            console.log("submit");
            console.log(obj.shortStoryCover);
            console.log(this.state.shortStoryCover);
            const res = await axios.post("http://localhost:3000/shortStories", data, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type",
                }
            });
            console.log(res);
            this.props.history.push('/writer')
        }
        else {
            console.log('no submit');
            this.activeError = true;
        }

    }
    validate = () => {
        const errors = {};
        console.log(this.state.shortStoryTitle, this.state.shortStoryGenre)
        if (this.state.shortStoryTitle.trim() === "")
            errors.title = "Title is required"
        if (this.state.shortStoryDescription.trim() === "")
            errors.description = "Description is required"
        if (this.state.shortStoryAudience === "")
            errors.audience = "Audience is required"
        if (this.state.shortStoryCover.length === 0)
            errors.cover = "Cover is required"
        if (this.state.shortStoryGenre.length === 0)
            errors.genre = "Genre is required"
        this.setState({ errors });
        return Object.keys(errors).length === 0 ? null : errors;
    }
    async componentDidMount() {
        const res = await axios.get('http://localhost:3000/shortStoriesGenres',
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type"
                }
            });

        this.setState({ genres: res.data.short_stories });
        console.log(this.state.genres);
        console.log(localStorage.getItem('user_id'))
    }

    
    
    render() {

        return (

            <React.Fragment>
                <form className='my-2 mx-5 p-5 row' style={{ width: '100%' }} onSubmit={this.handleSubmit} enctype="multipart/form-data">
                    {/************************* Cover of Store****************************** */}
                    {this.state.BookStoreCover && <img className='col-lg-4 col-sm-6 col-xs-12' style={{ width: '100%' }} src={this.state.BookStoreCover} alt="image of store" />}
                    {/* if there is no cover for store */}
                    {!this.state.BookStoreCover &&
                        <div className='col-lg-3 col-md-4 col-xs-12 ' style={{ width: '100%', backgroundColor: '#ADB4C3'}}>
                                {/* save uploaded Cover to our state */}
                            <input className='col-lg-1 col-md-2  col-sm-4 align-self-center' type="file" hidden ref={this.inputReference}
                                onChange={this.handleStoreCover} />
                                {/* Cover Upload Action */}
                            <div className="btn mx-5 center" style={{ textAlign: 'center', borderColor: '#F8A488', borderWidth: '3px', marginTop: '70%', backgroundColor: '#ADB4C3', display: 'block', position: 'relative' }} onClick={this.fileUploadAction}>
                                <i className="fa fa-image" style={{ float: 'center' }}> Upload Cover</i>
                            </div>
                        </div>
                    }
                    {/************************* End of Cover of Store****************************** */}

                    <div className='col col-1'></div>
                    <div className='col col-7'>
                        <label className="formLabel" style={{ display: 'block' }} htmlFor='shortstorytitle'>Title</label>
                        <input type="text" className="formControl p-1" style={{ borderRadius: '4px' }} placeholder=" your story's name.." id='shortstorytitle' value={this.state.shortStoryTitle}
                            onChange={(e) => this.setState({ shortStoryTitle: e.currentTarget.value })} />
                        {this.state.errors.title && (<div className="alert alert-danger" role="alert">{this.state.errors.title}</div>)}

                        <label className="formLabel mt-4" style={{ display: 'block' }}
                            htmlFor='shortstorydescription'>Description</label>
                        <textarea className="formControl" rows="4" style={{ borderRadius: '4px', width: '100%' }} placeholder=" your story's summary.." id='shortstorydescription' value={this.state.shortStoryDescription}
                            onChange={(e) => this.setState({ shortStoryDescription: e.currentTarget.value })} />
                        {this.state.errors.description && (<div className="alert alert-danger" role="alert">{this.state.errors.description}</div>)}
                        <div className='d-flex justify-content-between mt-4'>
                            <div>
                                <label className="formLabel" style={{ display: 'block' }}
                                    htmlFor='shortstorygenre'>Genre</label>
                                <select className="formControl p-1" style={{ borderRadius: '4px', display: 'inlineBlock' }} id='shortstorygenre' value={this.state.shortStoryGenre} onChange={this.handleChange} multiple size="3">
                                    <option value="" disabled defaultValue >Choose a literature kind ..</option>
                                    {this.state.genres.map(option => {
                                        return <option value={option.id}>{option.title}</option>
                                    })}
                                </select>
                                {this.state.errors.genre && (<div className="alert alert-danger" role="alert">{this.state.errors.genre}</div>)}
                            </div>
                            <div>
                                <label className="formLabel" style={{ display: 'block' }}
                                    htmlFor='shortstorylanguage'>Language</label>
                                <select className="formControl py-1 px-5" style={{ borderRadius: '4px', display: 'inlineBlock' }} id='shortstorylanguage' value={this.state.shortStoryLanguage}
                                    onChange={(e) => this.setState({ shortStoryLanguage: e.currentTarget.value })}>
                                    <option>English</option>
                                    <option>Arabic</option>
                                </select>
                            </div>
                        </div>
                        <label className="formLabel mt-4" style={{ display: 'block' }} htmlFor='shortstoryAudience'>Target Audience</label>
                        <select className="formControl " style={{ borderRadius: '4px', display: 'inlineBlock' }} id='shortstoryAudience' value={this.state.shortStoryAudience}
                            onChange={(e) => this.setState({ shortStoryAudience: e.currentTarget.value })}  >
                            <option value="" disabled defaultValue>Your primary readers ..</option>
                            <option value="less than 10" >less than 10</option>
                            <option value="10-18" >10-18 </option>
                            <option value="all" >All </option>
                        </select>
                        {this.state.errors.audience && (<div className="alert alert-danger" role="alert">{this.state.errors.audience}</div>)}

                    </div>
                    <div className="d-flex justify-content-end" style={{ width: '90%' }}>
                        <button className="py-2 px-5 m-3 btn btn-lg" style={{ backgroundColor: 'white', borderColor: '#F8A488' }} onClick={() => this.props.history.push('/writer')}>cancel</button>
                        <button className="py-2 px-5  my-3 ml-3 btn btn-lg" style={{ backgroundColor: '#F8A488', borderColor: '#F8A488' }} type='submit'>start</button>
                    </div>

                </form>

            </React.Fragment>
        );
    }
}


export default AddStory;