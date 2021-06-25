import React, { Component } from 'react';
import Popup from "reactjs-popup";
import '../style/community.css';
import axios from 'axios';
import Comments from './Comments';

class AdminReports extends Component {
    state={
        reports:[]
    }
    componentDidMount(){
        axios.get("http://localhost:3000/reports")
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

        return (
        <div className="px-5 py-2">
            <h5 style={{color:'#F8A488',textDecoration:'underline',marginBottom:'1rem'}}>Summary of Reports </h5>
            <ul title="reports">
                {this.state.reports.map(report =>
                <div className="row communityCard ">
                    <li className="p-2 px-3 col-5">Anonymous have reported {report.user_name}'s {report.kind} { report.title!='no title'&&<span>({report.title})</span>}</li>
                    <div className="col-2"></div>
                    <Popup
                            trigger={<a href="#" className="adminLink"> report details </a>                                    }
                            modal
                            contentStyle={popupStyle}
                    >
                        <div style={{border:'0.1rem solid #e4e0e0',borderRadius:'3px 3px',padding:'0.5rem',backgroundColor: '#F8F8F8'}}>{report.reason}</div>

                    </Popup >
                    {report.kind=='story' && <a href={"/shortStory/"+report.related_record_id} className="adminLink">view {report.kind} </a>}
                    {report.kind!='story'&& 
                    <Popup
                            trigger={<a href="#" className="adminLink"> view {report.kind}  </a>                                    }
                            modal
                            contentStyle={popupChapterStyle}
                    >
                        {report.kind=='comment'&&
                            <Comments  comments={[]}></Comments>
                        ||report.kind=='chapter'&&<p>{report.content}</p>
                        }
                    </Popup >}
                    <a href="#" className="adminLink"> delete {report.kind} </a> 
                    <a href="#" className="adminLink"> delete report </a>
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