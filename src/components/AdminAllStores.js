import React, { Component } from 'react';
import Popup from "reactjs-popup";
import '../style/AllStores.css';
import axios from 'axios';

class AdminAllStores extends Component {
    constructor(props) {
        super(props);
        this.state={
        stores:[],
        index: 0,
    }}

    
    componentDidMount(){
        axios.get("http://localhost:3000/stores")
        .then(response => {
            console.log(response)
            this.setState({stores:response.data.stores});
        });  
    }
    render() {
    
        const deleteReport=(id)=>{
            let data={id:id}
            axios.post("http://localhost:3000/deleteReport",data,
            {headers: {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            "Access-Control-Allow-Headers": "Content-Type"}})
            .then(response => {
                console.log(response)
                axios.get("http://localhost:3000/reports")
                .then(response => {
                    console.log(response)

                    this.setState({reports:response.data.reports});
                });
                 
            });  
        }
        const deleteRecord=(id)=>{
            let data={id:id}
            axios.post("http://localhost:3000/deleteRecord",data,
            {headers: {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            "Access-Control-Allow-Headers": "Content-Type"}})
            .then(response => {
                console.log(response)
                axios.get("http://localhost:3000/reports")
                .then(response => {
                    console.log(response)

                    this.setState({reports:response.data.reports});
                });
                 
            });  
        }

        return (
            <div>
                <button className="py-1 px-3  my-4 mr-4 btn btn-lg float-right" style={{ backgroundColor: '#F8A488', borderColor: '#F8A488' }} ><i className="fa fa-plus-circle" style={{ color: 'black', border: 'none' }}><a href="/admin" style={{ color: 'black',textDecoration: 'none' }}>Add New Store</a></i></button>
                <br/>
        <div className="px-5 py-2">
            <h5 style={{color:'#F8A488',textDecoration:'underline',marginBottom:'1rem'}}>All Stores</h5>
            <table  className="table">
                <thead>
                    <tr>
                    <th scope="col">Store Name</th>
                    <th scope="col">Located</th>
                    <th scope="col">Store Type</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {this.state.stores.map(store =>
                    <tr>

                    <td><a href={"/addbook/"+store.id} style={{ color: 'black',textDecoration: 'none' }}>{store.name}</a></td>
                    <td>{store.distict} </td>
                    <td>{store.kind}</td>
                    <td><a href="#" onClick={()=>{deleteReport(store.id)}} className="adminLink"> Delete Store </a></td>
                    </tr>
                    )}
                </tbody>
            </table>
            <div className="row d-flex justify-content-center " style={{textAlign: "center"}}>


            </div>
        </div>
        </div>
    );
    }
}


export default AdminAllStores;