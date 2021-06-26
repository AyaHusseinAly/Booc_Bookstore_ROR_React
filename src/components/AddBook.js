import React, { Component } from 'react';
import axios from 'axios';
import ImageUploader from 'react-images-upload';


class AddBook extends Component {
    constructor(props) {

        super(props);
        this.state = {
            bookTitle: "",
            bookIsbn: "",
            bookPrice: "",
            bookstoreId: this.props.match.params.id,
            bookCover: [],
            bookCoverPreview: "",
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

        this.setState({ bookCover: e.target.files[0] });
        this.setState({ bookCoverPreview: file });
        console.log("file ===========");
        console.log(this.state.bookCoverPreview);
        console.log("send ++++++++++");
        console.log(this.state.bookCover);
    }
    
    handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.target);
        const errors = this.validate();

        if (errors === null) {
            console.log(this.state.bookCover);
            const obj = {
                bookTitle: this.state.bookTitle,
                bookIsbn: this.state.bookIsbn,
                bookPrice: this.state.bookPrice,
                bookstoreId: this.state.bookstoreId,
                bookCover: this.state.bookCover,

            }
            Object.keys(this.state).forEach((key, value) => {
                return data.append(key, this.state[key])
            })
           
            console.log("submit");
            console.log(obj.bookCover); //notdefine
            
             console.log("send ++++++++++");
            console.log(this.state.bookCover);
            const res = await axios.post("http://localhost:3000/addbook", data, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type",

                }
            });
            console.log(res);
            this.props.history.push('/bookstorebooks/'+this.props.match.params.id)
        }
        else {
            console.log('no submit');
            this.activeError = true;
        }

    }
    validate = () => {
        const errors = {};
        console.log("booktitle",this.state.bookTitle)
        console.log("bookIsbn",this.state.bookIsbn)
        console.log("bookstoreId",this.props.match.params.id)
        console.log("bookPrice",this.state.bookPrice)
        console.log("bookCover",this.state.bookCover)


        if (this.state.bookTitle.trim() === "")
            errors.bookTitle = "Title is required"
        if (this.state.bookPrice.trim() === "")
            errors.bookPrice = "Price is required"
        if (this.state.bookIsbn.trim() === "")
            errors.bookIsbn = "Isbn is required"
        if (this.state.isin)
        // if (this.state.bookstoreId === "")
        //     errors.bookstoreId = "bookstoreId is required"
        //  if (this.state.bookCover.length === 0)
        //     errors.cover = "Cover is required"
        
        this.setState({ errors });
        return Object.keys(errors).length === 0 ? null : errors;
    }
    

    fileUploadAction = () => this.inputReference.current.click();
    // fileUploadInputChange = (e) =>this.setState({fileUploadState:e.target.value});
    render() {

        return (

            <React.Fragment>
                <h1>Add Book</h1>
                <form className='my-2 mx-5 p-5 row' style={{ width: '100%' }} onSubmit={this.handleSubmit} enctype="multipart/form-data">
                    {this.state.bookCoverPreview && <img className='col col-3' style={{ width: '100%' }} src={this.state.bookCoverPreview} alt="The current file" />}
                    {!this.state.bookCoverPreview &&
                        <div className='col col-3' style={{ width: '100%', backgroundColor: '#ADB4C3' }}>
                            
                            <input type="file" hidden ref={this.inputReference}
                                onChange={this.handleImageStore} />
                            <div className="btn mx-5 align-self-center" style={{ textAlign: 'center', borderColor: '#F8A488', borderWidth: '3px', marginTop: '70%', backgroundColor: '#ADB4C3', display: 'block' }} onClick={this.fileUploadAction}>
                                <i className="fa fa-image" style={{ float: 'center' }}>  Upload Cover</i>
                            </div>
                        </div>}
                    <div className='col col-1'></div>
                    <div className='col col-7'>

                        <label className="formLabel" style={{ display: 'block' }} htmlFor='bookTitle'>Title</label>
                        <input type="text" className="formControl p-1" style={{ borderRadius: '4px' }} placeholder=" bookTitle .." id='bookTitle' value={this.state.bookTitle}
                            onChange={(e) => this.setState({ bookTitle: e.currentTarget.value })} />
                        {this.state.errors.bookTitle && (<div className="alert alert-danger" role="alert">{this.state.errors.bookTitle}</div>)}

                        <label className="formLabel mt-4" style={{ display: 'block' }}
                            htmlFor='bookPrice'>Book Price</label>
                        <input type="text" className="formControl p-1" style={{ borderRadius: '4px' }} placeholder=" Book Price .." id='bookPrice' value={this.state.bookPrice}
                            onChange={(e) => this.setState({ bookPrice: e.currentTarget.value })} />
                        {this.state.errors.bookPrice && (<div className="alert alert-danger" role="alert">{this.state.errors.bookPrice}</div>)}
                        
                        <label className="formLabel mt-4" style={{ display: 'block' }}
                            htmlFor='bookPrice'>Book Price</label>
                        <input type="text" className="formControl p-1" style={{ borderRadius: '4px' }} placeholder=" Book Isbn .." id='bookIsbn' value={this.state.bookIsbn}
                            onChange={(e) => this.setState({ bookIsbn: e.currentTarget.value })} />
                        {this.state.errors.bookIsbn && (<div className="alert alert-danger" role="alert">{this.state.errors.bookIsbn}</div>)}
                        {/* <div className='d-flex justify-content-between mt-4'>
                            <div>
                                <label className="formLabel" style={{ display: 'block' }}
                                    htmlFor='bookIsbn'>Book Isbn</label>
                                <input type="text"className="formControl py-1 px-3" style={{ borderRadius: '4px', display: 'inlineBlock' }} id='bookIsbn' value={this.state.bookIsbn}
                                    onChange={(e) => this.setState({ bookIsbn: e.currentTarget.value })}/>
                                    
                            </div>
                        </div> */}
                        {/* <label className="formLabel mt-4" style={{ display: 'block' }} htmlFor='bookstoreId'>Book store Id</label>
                        <input type="text" className="formControl " style={{ borderRadius: '4px', display: 'inlineBlock' }} id='bookstoreId' value={this.state.bookstoreId}
                            onChange={(e) => this.setState({ bookstoreId: e.currentTarget.value })} />
                            
                        {this.state.errors.bookstoreId && (<div className="alert alert-danger" role="alert">{this.state.errors.bookstoreId}</div>)} */}

                    </div>
                    <div className="d-flex justify-content-end" style={{ width: '90%' }}>
                        <button className="py-2 px-5 m-3 btn btn-lg" style={{ backgroundColor: 'white', borderColor: '#F8A488' }} onClick={() => this.props.history.push('/writer')}>cancel</button>
                        <button className="py-2 px-5  my-3 ml-3 btn btn-lg" style={{ backgroundColor: '#F8A488', borderColor: '#F8A488' }} type='submit'>ADD</button>
                    </div>

                </form>

            </React.Fragment>
        );
    }
}


export default AddBook;