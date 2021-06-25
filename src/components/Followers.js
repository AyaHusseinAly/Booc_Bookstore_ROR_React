import React, { Component } from 'react';
import axios from 'axios';

class Followers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
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
        this.setState({ users: response.data.followers });



    }
    render() {
        return (
            <React.Fragment>

                {this.state.users.length > 0 && this.state.users.map((user) => {
                    return <div className="col-sm-4 col-md-4 col-lg-4" >
                        <div className="text-img" >
                            <img src={user.avatar} className="rounded-circle" />
                            <span >{user.name}</span>

                        </div>
                    </div>
                })
                }
            </React.Fragment>

        )
    }
}
export default Followers;






