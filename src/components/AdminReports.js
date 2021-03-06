import React, { Component } from 'react';
import Popup from "reactjs-popup";
import '../style/community.css';
import axios from 'axios';
import {PRODUCTION_BACKEND_URL,PRODUCTION_FRONTEND_URL} from '../constants/index.js'


class AdminReports extends Component {
    state={
        reports:[]
    }
    componentDidMount(){
        axios.get(`${PRODUCTION_BACKEND_URL}/reports`)
        .then(response => {
            console.log(response)

            this.setState({reports:response.data.reports});
        });  
    }
    render() {
        const popupStyle={
            borderRadius:'10px 10px',
            border:'4px solid #F8A488',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.7)',
            padding:'2rem',
            width:'25rem',
            overflowY: 'scroll',
            maxHeight:'45rem'
        }
        const popupChapterStyle={
            borderRadius:'10px 10px',
            border:'4px solid #F8A488',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.7)',
            padding:'2rem',
            width:'25rem',
            overflowY: 'scroll',
            maxHeight:'45rem',
            width:'40rem'
        }
        const deleteReport=(id)=>{
            let data={id:id}
            axios.post(`${PRODUCTION_BACKEND_URL}/deleteReport`,data,
            {headers: {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            "Access-Control-Allow-Headers": "Content-Type"}})
            .then(response => {
                console.log(response)
                axios.get(`${PRODUCTION_BACKEND_URL}/reports`)
                .then(response => {
                    console.log(response)

                    this.setState({reports:response.data.reports});
                });
                 
            });  
        }
        const deleteRecord=(id)=>{
            let data={id:id}
            axios.post(`${PRODUCTION_BACKEND_URL}/deleteRecord`,data,
            {headers: {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            "Access-Control-Allow-Headers": "Content-Type"}})
            .then(response => {
                console.log(response)
                axios.get(`${PRODUCTION_BACKEND_URL}/reports`)
                .then(response => {
                    console.log(response)

                    this.setState({reports:response.data.reports});
                });
                 
            });  
        }

        return (
        <div className="px-5 py-2">
            <h5 style={{color:'#F8A488',textDecoration:'underline',marginBottom:'1rem'}}>Summary of Reports </h5>
            <ul title="reports">
                {this.state.reports.map(report =>
                <div className="row communityCard ">
                    {report.kind=='story'&& <li className="p-2 px-3 col-6">Anonymous have reported {report.user_name}'s story <span>({report.title})</span></li>
                    }
                    {report.kind=='chapter'&&<li className="p-2 px-3 col-6">Anonymous have reported {report.user_name}'s chapter <span>({report.title} - story: {report.story_title})</span></li>
                    }
                    {(report.kind=='commentStory'||report.kind=='commentChapter')&&<li className="p-2 px-3 col-6">Anonymous have reported {report.user_name}'s comment</li>
                    }
                    {report.kind=='review'&&<li className="p-2 px-3 col-6">Anonymous have reported {report.user_name}'s review <span>(on story: {report.story_title})</span></li>
                    }
                   


                    <div className="col-1"></div>
                    <Popup
                            trigger={<a href="#" className="adminLink"> report reason </a>                                    }
                            modal
                            contentStyle={popupStyle}
                    >
                        <div style={{border:'0.1rem solid #e4e0e0',borderRadius:'3px 3px',padding:'0.5rem',backgroundColor: '#F8F8F8'}}>{report.reason}</div>

                    </Popup >
                    {report.kind=='story' && <a href={"/shortStory/"+report.related_record_id} className="adminLink">view reported record </a>}
                    {report.kind!='story'&& 
                    <Popup
                            trigger={<a href="#" className="adminLink"> view reported record </a>                                    }
                            modal
                            contentStyle={popupChapterStyle}
                    >
                        {report.kind!='story'&&<p>{report.content}</p>
                        }
                    </Popup >}
                    <a href="#" onClick={()=>{deleteRecord(report.id)}} className="adminLink"> delete record </a> 
                    <a href="#" onClick={()=>{deleteReport(report.id)}} className="adminLink"> delete report </a>
                </div>

                )}

            </ul>
            <div className="row d-flex justify-content-center " style={{textAlign: "center"}}>


            </div>
        </div>
    );
    }
}


    export default AdminReports;