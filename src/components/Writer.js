import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/headerFooter.css';
import axios from 'axios';



class Writer extends Component {
    state={
        shortstoies:[]
    }

componentDidMount(){
    axios.get("http://localhost:3000/api/shortStories",
    {headers: {"Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type"}
})
    .then(response => {
        this.setState({shortstoies:response.data.api});

        console.log(this.state.shortstoies);
    });
  
}



    render() {

        return (

            <div >
            <div className='mt-5 pt-5' style={{width:'100%',height:'100%'}}>     
              <h3 className='d-flex justify-content-center'>You haven't add any stories </h3> 
              <div className='d-flex justify-content-center'> <button className="py-2 px-5  my-3 ml-3 btn btn-lg" style={{backgroundColor:'#F8A488',borderColor:'#F8A488'}} ><i className="fa fa-plus-circle" style={{color:'black',border:'none'}} onClick={() => this.props.history.push('/addstory') }>Add New Story</i></button></div>
            </div>
            </div>

    );
    }
}


    export default Writer;