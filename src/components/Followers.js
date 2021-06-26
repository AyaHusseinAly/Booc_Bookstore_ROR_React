import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class Followers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            writers: [],
            readers: []
        }
    }
    async componentDidMount() {
        let data = {
            reader_id: localStorage.getItem('user_id')
        };
        let response = await axios.post("http://localhost:3000/followeWriters", data,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type"
                }
            });
        console.log(response);
        this.setState({ writers: response.data.followers });
        this.setState({ readers: response.data.readers });



    }
    render() {
        return (
            <React.Fragment>
                <div className="person-follow">
                    <h3>Writers You Follow ({this.state.writers.length})</h3>
                    <div className="row" style={{ maxHeight: '400px' }}>
                        {this.state.writers && this.state.writers.length > 0 && this.state.writers.map((user) => {
                            return <Link className="col-sm-4 col-md-4 col-lg-4" style={{ height: '160px' }} to={`/writerStories/${user.id}`} >
                                <div className="text-img" >
                                    <img src={user.avatar} className="rounded-circle" style={{ width: '120px', height: '120px', borderRadius: '50%', display: 'block' }} />
                                    <span >{user.name}</span>

                                </div>
                            </Link>
                        })
                        }
                    </div>
                    <hr />
                    <h3>Readers Who Follow You({this.state.readers.length})</h3>
                    <div className="row" style={{ maxHeight: '400px' }}>
                        {this.state.readers && this.state.readers.length > 0 && this.state.readers.map((user) => {
                            return <Link className="col-sm-4 col-md-4 col-lg-4" style={{ height: '160px' }} to={`/writerStories/${user.id}`}>
                                <div className="text-img" >
                                    <img src={user.avatar} className="rounded-circle" style={{ width: '120px', height: '120px', borderRadius: '50%', display: 'block' }} />
                                    <span >{user.name}</span>

                                </div>
                            </Link>
                        })
                        }
                    </div>
                </div>


            </React.Fragment >

        )
    }
}
export default Followers;






