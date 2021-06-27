import React, { Component } from 'react';
import axios from 'axios';
import {PRODUCTION_BACKEND_URL,PRODUCTION_FRONTEND_URL} from '../constants/index.js'



class ReportPopup extends Component {

    render() {
        const sendReport = (post) =>{ 
            if(document.getElementById("reportReason").value!=""){
            
                let data={
                    kind:post.kind,
                    reason:document.getElementById("reportReason").value,
                    related_record_id:post.id,
                    user_id: window.localStorage.getItem('user_id')
                };
                axios.post(`${PRODUCTION_BACKEND_URL}/report`, data, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PUT",
                        "Access-Control-Allow-Headers": "Content-Type",

                    }
                }).then(response => {
                    if(response){
                        console.log(response);
                        document.getElementById("thanksMsg").innerText=response.data.message}
                    else{
                        console.log(response);
                    }
                });
            }
            else{
                document.getElementById("thanksMsg").innerText="Please Enter the reason";

            }

        }        


        return (
            <React.Fragment>
                
                    <div className="form-outline" >
                            <textarea rows="3" id="reportReason" placeholder="Please mention reasons for reporting this post" className="form-control" style={{backgroundColor:'#F8F8F8',paddingLeft:'0.5rem'}}></textarea>
                    </div>
                    <div className="row m-2">
                        <div className="col-9 "id="thanksMsg"style={{color:'#F8A488'}}></div>
                        <button type="button" onClick={()=>{sendReport(this.props.post)}} className=" btn ml-1 col-2" style={{backgroundColor:'#F8F8F8',border:"1px solid #F8A488"}}>
                            <i class="fa fa-paper-plane" aria-hidden="true" style={{color:'#F8A488'}}></i>
                        </button>
                    </div>
            </React.Fragment>

        );
    }
}


export default ReportPopup;


