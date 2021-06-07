import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/headerFooter.css';
import axios from 'axios';

class AddStory extends Component {
    constructor(props) {
        super(props);
        this.state={
            fileUploadState:"",
            shortStoryTitle:"",
            shortStoryDescription:"",
            shortStoryLanguage:"",
            shortStoryAudience:"",
            shortStoryGenre:"",
            shortStoryCover:"",
            errors:{}
        
        }
        this.inputReference = React.createRef();
        // this.shortStoryTitle=React.createRef();
    }
    handleSubmit=async e=>{
        e.preventDefault();
        // console.log(this.shortStoryTitle.current.value);
        // console.log(e.currentTarget);
        const errors=this.validate();
        console.log(errors);
        if(errors === null) {
            console.log('submit');
            const obj={
            fileUploadState:this.state.fileUploadState,
            shortStoryTitle:this.state.shortStoryTitle,
            shortStoryDescription:this.state.shortStoryDescription,
            shortStoryLanguage:this.state.shortStoryLanguage,
            shortStoryAudience:this.state.shortStoryAudience,
            shortStoryGenre:this.state.shortStoryGenre,
            shortStoryCover:this.state.shortStoryCover
            }
            await axios.post("http://localhost:3000/shortStory/",obj,{headers: {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            "Access-Control-Allow-Headers": "Content-Type"}});
            // try {
            //     await axios.post("http://localhost:3000/shortStory/",obj,{headers:{"Content-Type" : "application/json"}});
            //     // console.log(result.response);
            //   } catch (error) {
            //     console.error("error");     // NOTE - use "error.response.data` (not "error")
            //   }
            // await axios.request({
            //     method: 'Post',
            //     url: 'http://localhost:3001/shortStory/',
            //     data: obj
            //   })
        }
        else{
            console.log('no submit');
        }
        

        
    }
    validate=()=>{
        const errors={};
        console.log(this.state.shortStoryTitle,this.state.shortStoryGenre)
        if(this.state.shortStoryTitle.trim() === "")
          errors.title="Title is required"
        if(this.state.shortStoryGenre ==="")
          errors.genre="Genre is required"
        this.setState({errors});
        return Object.keys(errors).length === 0 ? null:errors;
    }
    async componentDidMount(){
        const res=await axios.get('http://localhost:3000/ShortStory',
        {headers: {"Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        "Access-Control-Allow-Headers": "Content-Type"}});
        console.log(res);
       
    }
    
    fileUploadAction = () =>this.inputReference.current.click();
    fileUploadInputChange = (e) =>this.setState({fileUploadState:e.target.value});
    render() {

        return (<form className='my-2 mx-5 p-5 row' style={{width:'100%'}} onSubmit={this.handleSubmit}>
            <div className='col col-3'style={{width:'100%',backgroundColor:'#ADB4C3'}}>
                 <input type="file" hidden ref={this.inputReference} value={this.state.shortStoryCover}
            onChange={(e)=>this.setState({shortStoryCover:e.currentTarget.value})}/>
                 <div className="btn mx-5 align-self-center" style={{textAlign:'center',borderColor:'#F8A488',borderWidth:'3px',marginTop:'70%',backgroundColor:'#ADB4C3',display:'block'}} onClick={this.fileUploadAction}>
                  <i className="fa fa-image" style={{float:'center'}}>  Upload Cover</i>
                </div>  
            </div>
            <div className='col col-1'></div>
            <div className='col col-7'>
           
            <label className="formLabel" style={{display:'block'}} htmlFor='shortstorytitle'>Title</label>
            <input type="text" className="formControl p-1" style={{ borderRadius: '4px'}} placeholder=" your story's name.." id='shortstorytitle' value={this.state.shortStoryTitle}
            onChange={(e)=>this.setState({shortStoryTitle:e.currentTarget.value})}/>
           
            <label className="formLabel mt-4" style={{display:'block'}}
            htmlFor='shortstorydescription'>Description</label>
            <textarea className="formControl" rows="4"  style={{ borderRadius: '4px',width:'100%'}} placeholder=" your story's summary.." id='shortstorydescription'value={this.state.shortStoryDescription}
            onChange={(e)=>this.setState({shortStoryDescription:e.currentTarget.value})}/>
            <div className='d-flex justify-content-between mt-4'>
                <div>
                    <label className="formLabel" style={{display:'block'}}
                    htmlFor='shortstorygenre'>Genre</label>
                    <select className="formControl p-1" style={{ borderRadius: '4px',display:'inlineBlock'}} id='shortstorygenre' value={this.state.shortStoryGenre}
            onChange={(e)=>this.setState({shortStoryGenre:e.currentTarget.value})}>
                    <option value="" disabled selected >Choose a literature kind ..</option>
                    <option>Action</option>
                    <option>Fiction</option>
                    </select>
                </div>
                <div>
                    <label className="formLabel" style={{display:'block'}}
                    htmlFor='shortstorylanguage'>Language</label>
                    <select className="formControl py-1 px-5" style={{ borderRadius: '4px',display:'inlineBlock'}} id='shortstorylanguage' value={this.state.shortStoryLanguage}
            onChange={(e)=>this.setState({shortStoryLanguage:e.currentTarget.value})}>
                    <option>English</option>
                    <option>Arabic</option>
                    </select>
                </div>
            </div>
            <label className="formLabel mt-4" style={{display:'block'}} htmlFor='shortstoryAudience'>Target Audience</label>
            <select className="formControl " style={{ borderRadius: '4px',display:'inlineBlock'}} id='shortstoryAudience' value={this.state.shortStoryAudience}
            onChange={(e)=>this.setState({shortStoryAudience:e.currentTarget.value})} name='genre'>
            <option value="" disabled selected >Your primary readers ..</option>
                <option value="less than 10" name='genre'>less than 10</option>
                <option value="10-18" name='genre'>10-18 </option>
            </select>
            
            </div>
          <div className="d-flex justify-content-end" style={{width:'90%'}}>
              <button className="py-2 px-5 m-3 btn btn-lg" style={{backgroundColor:'white',borderColor:'#F8A488'}} onClick={() => this.props.history.push('/writer') }>cancel</button>
              <button className="py-2 px-5  my-3 ml-3 btn btn-lg" style={{backgroundColor:'#F8A488',borderColor:'#F8A488'}} type='submit'>start</button>
          </div>

        </form>
            

    );
    }
}


    export default AddStory;