import React, { Component } from 'react';


class Rating extends Component {
    constructor(props) {
        super();

    }
    render() {
        return (<div>

            {
                this.props.rate ? this.props.rate === .5 &&
                    <div className="evaluation">
                        <i className="fa fa-star-half-o" style={{ color: 'orange', marginLeft: '10px' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>
                    </div> ||
                    this.props.rate === 1 &&
                    <div className="evaluation">
                        <i className="fa fa-star" style={{ color: 'orange', marginLeft: '10px' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>

                    </div> ||
                    this.props.rate === 1.5 &&
                    <div className="evaluation">
                        <i className="fa fa-star" style={{ color: 'orange', marginLeft: '10px' }}></i>
                        <i class="fa fa-star-half-o " style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>

                    </div> ||
                    this.props.rate === 2 &&
                    <div className="evaluation">
                        <i className="fa fa-star" style={{ color: 'orange', marginLeft: '10px' }}></i>
                        <i className="fa fa-star" style={{ color: 'orange' }} ></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>

                    </div> ||
                    this.props.rate === 2.5 &&
                    <div className="evaluation">
                        <i className="fa fa-star" style={{ color: 'orange', marginLeft: '10px' }}></i>
                        <i className="fa fa-star" style={{ color: 'orange' }} ></i>
                        <i className="fa fa-star-half-o " style={{ color: 'orange' }} ></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>

                    </div> ||
                    this.props.rate === 3 &&
                    <div className="evaluation">
                        <i className="fa fa-star" style={{ color: 'orange', marginLeft: '10px' }}></i>
                        <i className="fa fa-star" style={{ color: 'orange' }} ></i>
                        <i className="fa fa-star" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>

                    </div> ||
                    this.props.rate === 3.5 &&
                    <div className="evaluation">
                        <i className="fa fa-star" style={{ color: 'orange', marginLeft: '10px' }}></i>
                        <i className="fa fa-star" style={{ color: 'orange' }} ></i>
                        <i className="fa fa-star" style={{ color: 'orange' }} ></i>
                        <i className="fa fa-star-half-o " style={{ color: 'orange' }} ></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>

                    </div> ||
                    this.props.rate === 4 &&
                    <div className="evaluation">
                        <i className="fa fa-star" style={{ color: 'orange', marginLeft: '10px' }}></i>
                        <i className="fa fa-star" style={{ color: 'orange' }} ></i>
                        <i className="fa fa-star" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>

                    </div> ||
                    this.props.rate === 4.5 &&
                    <div className="evaluation">
                        <i className="fa fa-star" style={{ color: 'orange', marginLeft: '10px' }}></i>
                        <i className="fa fa-star" style={{ color: 'orange' }} ></i>
                        <i className="fa fa-star" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star" style={{ color: 'orange' }}></i>
                        <i class="fa fa-star-half-o " style={{ color: 'orange' }}></i>

                    </div> ||

                    this.props.rate === 5 &&
                    <div className="evaluation">
                        <i className="fa fa-star" style={{ color: 'orange', marginLeft: '10px' }}></i>
                        <i className="fa fa-star" style={{ color: 'orange' }} ></i>
                        <i className="fa fa-star" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star" style={{ color: 'orange' }}></i>

                    </div>
                    : <div className="evaluation">
                        <i className="fa fa-star-o" style={{ color: 'orange', marginLeft: '10px' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>
                        <i className="fa fa-star-o" style={{ color: 'orange' }}></i>

                    </div>
            }

        </div>)
    }
}
export default Rating;