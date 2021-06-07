import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/headerFooter.css';
// import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';

class Writer extends Component {

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