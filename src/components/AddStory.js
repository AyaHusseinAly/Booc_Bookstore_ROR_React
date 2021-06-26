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
            shortStoryCoverPreview: "",
            errors: {},
            genres: []

        }
        this.inputReference = React.createRef();
        let activeError = false;
    }
    handleImage = (e) => {
        const file = e.target.files[0];
        console.log(e.currentTarget.value);
    }
    handleImageStore = (e) => {

        const file = URL.createObjectURL(e.target.files[0]);

        this.setState({ shortStoryCover: e.target.files[0] });
        // this.setState({ shortStoryCover: file });
        this.setState({ shortStoryCoverPreview: file });
        // console.log("file ===========");
        // console.log(this.state.shortStoryCoverPreview);
        // console.log("send ++++++++++");
        // console.log(this.state.shortStoryCover);
    }
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
            // data.append("shortStoryCover", this.state.shortStoryCover);
            // const submitdata = { obj, data }
            console.log("submit");
            console.log(obj.shortStoryCover);
            //  console.log("file ===========");
            // console.log(this.state.shortStoryCoverPreview);
            // console.log("send ++++++++++");
            console.log(this.state.shortStoryCover);
            const res = await axios.post("http://localhost:3000/shortStories", data, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type",
                }
            });
            if(res.data.message === " short story created succefully"){ 
                // get all followers of the user to send notification
                axios.post('http://localhost:3000//followeWriters',{
                    reader_id: localStorage.getItem("user_id")
                })
                .then(response =>{
                    if(response.data.readers.length > 0){
                        console.log("hi",response.data)
                        for (const reader of response.data.readers){
                            axios.post('http://localhost:3000/notifications',{
                                sender_id: localStorage.getItem("user_id"),
                                reciever_id: reader.id,
                                kind: "story",
                                instance_id: res.data.story.id,
                                body: `${this.props.user.name} just added a new story called '${res.data.story.title}'.`,
                                image: res.data.story.cover,
                                summary: `${res.data.story.summary.slice(0,70)}...`
                            })
                            .then(response => {
                                console.log(response);
                                console.log(res);
                                this.props.history.push('/writer')
                            })
                            .catch(error =>{
                                console.log(error);
                            })
                        }
                    }

                })
                .catch(error =>{
                    console.log(error);
                });
            }
            
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
        // console.log("herrrrrrrrrrrrrrrrr");
        console.log(this.state.genres);
        console.log(localStorage.getItem('user_id'))

    }

    fileUploadAction = () => this.inputReference.current.click();
    // fileUploadInputChange = (e) =>this.setState({fileUploadState:e.target.value});
    render() {

        return (

            <React.Fragment>
                {/* {this.state.errors &&(<div className="alert alert-danger" role="alert">{Object.keys(this.state.errors ).map(function(key) {
               return <option value={key}>{this.state.errors[key]}</option>})}</div>)} */}
                <form className='my-2 mx-5 p-5 row' style={{ width: '100%' }} onSubmit={this.handleSubmit} enctype="multipart/form-data">
                    {this.state.shortStoryCoverPreview && <img className='col col-3' style={{ width: '100%' }} src={this.state.shortStoryCoverPreview} alt="The current file" />}
                    {!this.state.shortStoryCoverPreview &&
                        <div className='col col-3' style={{ width: '100%', backgroundColor: '#ADB4C3' }}>
                            {/* <input type="file" hidden ref={this.inputReference} value={this.state.shortStoryCover}
            onChange={(e)=>this.setState({shortStoryCover:e.currentTarget.value})}/> */}
                            {/* <input type="file" hidden ref={this.inputReference} value={this.state.shortStoryCover}
            onChange={this.handleImage}/>  */}
                            <input type="file" hidden ref={this.inputReference}
                                onChange={this.handleImageStore} />
                            <div className="btn mx-5 align-self-center" style={{ textAlign: 'center', borderColor: '#F8A488', borderWidth: '3px', marginTop: '70%', backgroundColor: '#ADB4C3', display: 'block' }} onClick={this.fileUploadAction}>
                                <i className="fa fa-image" style={{ float: 'center' }}>  Upload Cover</i>
                            </div>
                        </div>}
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
                                {/* <select className="formControl p-1" style={{ borderRadius: '4px',display:'inlineBlock'}} id='shortstorygenre' value={this.state.shortStoryGenre}
            onChange={(e)=>this.setState({shortStoryGenre:e.currentTarget.value})} multiple size="3"> */}
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