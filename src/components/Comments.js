import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/headerFooter.css';

class Comments extends Component {

    render() {
        const scrollableContainer={
            maxHeight:'25rem',
            overflowY: 'scroll'
        }
        const addComment = () =>{ 
            let string=document.getElementById("form1").value;
            console.log(string);


        }        

        return (
            <React.Fragment>
                <div style={scrollableContainer}>
                {this.props.comments && this.props.comments.map(comment=> 
                
                   <div className="d-flex m-2">
                        <img  className="  m-1 py-2  rounded-circle"  src={comment.user_img}  />
                        <div className="d-flex flex-column mt-2 p-1">
                            <strong style={{color:'#535964',fontSize:'1.3rem'}} className="mb-1">{comment.user_name}</strong>
                            <h6 style={{border:'0.1rem solid #e4e0e0',borderRadius:'3px 3px',padding:'0.5rem',width:'13rem',backgroundColor: '#F8F8F8'}}>{comment.comment_content}</h6>
                        </div>                    
                    </div>
                    
                )}
                </div>
                <div className="d-flex m-2">
                    <div className="form-outline col-9" >
                            <input type="search" id="form1" placeholder="Write your comment" className="form-control" style={{backgroundColor:'#F8F8F8',paddingLeft:'0.5rem',height:'3rem'}} />
                    </div>
                    <button type="button" onClick={addComment} className=" btn ml-1" style={{backgroundColor:'#F8F8F8'}}>
                        <i class="fa fa-paper-plane" aria-hidden="true" style={{color:'#F8A488'}}></i>
                    </button>
                </div>
            </React.Fragment>

    );
    }
}


    export default Comments;


