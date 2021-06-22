import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/headerFooter.css';

class Likes extends Component {

    render() {

        return (
            <React.Fragment>
                {this.props.users && this.props.users.map(user =>
                    <div className="d-flex mt-2">
                        <img className="  m-1 rounded-circle" src={user.user_img} />
                        <strong style={{ color: '#535964', fontSize: '1.3rem', alignSelf: 'center' }} className="mb-1">{user.user_name}</strong>
                    </div>

                )}
            </React.Fragment>

        );
    }
}


export default Likes;


