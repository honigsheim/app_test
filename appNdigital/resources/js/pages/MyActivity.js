import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Http from '../Http';
import axios from 'axios';
import { Table } from 'reactstrap';
import moment from 'moment/moment.js'

class MyOrder extends Component {
  constructor(props) {
    super(props);

      this.state = {
        loading: true,
        data: {},
        user_id: '',
      };
    }

  componentWillMount()
  {
    if(this.props.isAuthenticated){

            var user = localStorage.getItem('user');
            var userParsed = JSON.parse(user);
            var user_id = userParsed['id'];

            const item = {
              user_id
            }
          axios.post('http://localhost:8000/api/v1/myposts', item).then(response =>{


            this.setState({
                data:response.data
            });

        }).catch(errors => {
            console.log(errors);
        })
      }
  }
  delete = (e) => {
    const { key } = e.target.dataset;
      axios.post('http://localhost:8000/api/v1/destroy/'+key).then(response =>{
         this.setState({
           deleted: 'deleted',
           message: response.data
         })
         window.location.reload()

      }).catch(errors => {
          console.log(errors);
      })
  }

  render() {
    const activity = Array.from(this.state.data);
  if(this.props.isAuthenticated){
    if(activity != '') {
      return (
        <div className="container py-5">
          <h1 className="text-center mb-4" style={{color: 'black'}}>My activity</h1>
    
        
    
          <Table striped bordered>
            <tbody>
              <tr>
                <th className='text-center'>Date</th>
                <th className='text-center'>Title</th>
    
                <th className='text-center'>Content</th>
    
                <th className='text-center'>Action</th>
    
    
              </tr>
              {activity.map(act =>
                (
                  <tr key={act.id}>
                      
                     <td className='text-center'>{act.created_at}</td>
                     <td className='text-center'>{act.title} </td>
    
                    <td className='text-center'>{act.body}</td>
                    <td className='text-center'>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.delete}
                            data-key={act.id}
                          >
                            Delete
                          </button>
    
                        </td>
                    
                  </tr>
                ))
              }
            </tbody>
    
          </Table>
        </div>
      );
    } else{
      return (
        <div className="container py-5">
          <h1 className="text-center mb-4" style={{color: 'black'}}>No activity yet</h1>
  
          <a href='/home'><button className='btn btn-success mb-3'>Return to home page</button></a>
        </div>
      );
    }
}
  else{
    return (
      <div className="container py-5">
        <h1 className="text-center mb-4" style={{color: 'black'}}>Access forbidden please log in</h1>

        <a href='/home'><button className='btn btn-success mb-3'>Return to home page</button></a>
      </div>
    );
  }
}
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(MyOrder);
