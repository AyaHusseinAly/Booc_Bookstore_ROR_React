import React, { Component } from 'react';
import '../style/admin.css';
import BookRow from './BookRow';
import AdminReports from './AdminReports';
import AdminBookStores from './AdminBookStores';
import AdminAllStores from './AdminAllStores';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;


class Admin extends Component {
      state={
        fiction:[],
        thriller:[],
        horror:[]
    }
    componentDidMount(){
      
        // axios.get("https://www.googleapis.com/books/v1/volumes?q=+subject:Fiction&startIndex=0&orderBy=newest&key=AIzaSyD9_t-TTlRiYRGH-UxXjRLz773OyTFy3_U")
        // .then(response => {
        //     this.setState({fiction:response.data.items});
        // });
        // axios.get("https://www.googleapis.com/books/v1/volumes?q=+subject:thriller&startIndex=0&orderBy=newest&key=AIzaSyD9_t-TTlRiYRGH-UxXjRLz773OyTFy3_U")
        // .then(response => {
        //     this.setState({thriller:response.data.items});
        // });
        // axios.get("https://www.googleapis.com/books/v1/volumes?q=+subject:horror&startIndex=0&orderBy=newest&key=AIzaSyD9_t-TTlRiYRGH-UxXjRLz773OyTFy3_U")
        // .then(response => {
        //     this.setState({horror:response.data.items});
        // });
      
}
    render() {
      // if ( this.props.user.role != 'admin'){
      //   console.log(this.props.user)
      //   // this.props.history.push('/404')
      // }
        return (
                    
        <div className="p-5">
          <Tabs defaultActiveKey="1" type="card" size='large'>
                    <TabPane tab="Reports" key="1">
                          <AdminReports ></AdminReports>
                    </TabPane>  
                    <TabPane tab="All Stores" key="2">
                        <AdminAllStores></AdminAllStores>
                    </TabPane>
                  
                        
          </Tabs>
      
        <hr/>

        </div>
    );
    }
}


export default Admin;