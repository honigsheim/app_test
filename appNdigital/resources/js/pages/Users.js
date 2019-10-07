import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Table,Alert } from 'reactstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);
      var admin = localStorage.getItem('user');
      var a = JSON.parse(admin)
      this.state = {
        role: a['role'],
        data: {},
        deleted: '',
        blacklisted: '',
        message: '',
      }
    
  }

  componentWillMount()
  {
      axios.get('http://localhost:8000/api/v1/users').then(response =>{
          this.setState({
              data:response.data
          });
      }).catch(errors => {
          console.log(errors);
      })
  }

  deleteuser = (e) => {
    const { key } = e.target.dataset;
      axios.post('http://localhost:8000/api/v1/destroy/user/'+key).then(response =>{
        console.log(response)
         this.setState({
           deleted: 'deleted',
           message: response.data
         })
         window.location.reload()

      }).catch(errors => {
          console.log(errors);
      })
  }

  blacklistUser = (e) =>{
    const { key } = e.target.dataset;
    axios.post('http://localhost:8000/api/v1/blacklist/user/'+key).then(response =>{
      console.log(response)
       this.setState({
         blacklisted: 'blacklisted',
         message: response.data
       })
       window.location.reload()

    }).catch(errors => {
        console.log(errors);
    })
  }

  render() {
    const users = Array.from(this.state.data);

    if(this.props.isAuthenticated && this.state.role == 'admin'){
      return (
        <div className="container py-5">
          <h1 className="text-center mb-4" style={{color: 'black'}}>Admin users dashboard</h1>
          <Table striped bordered>
          {this.state.deleted === 'deleted' &&
                        <div>
                        <Alert color="dark">
                          {this.state.message}
                        </Alert>
                        </div>
                    }
            <tbody>
              <tr>
                <th className='text-center'>Sign up date</th>
                <th className='text-center'>User name</th>
                <th className='text-center'>Role</th>
                <th className='text-center'>Email</th>
                <th className='text-center'>Actions</th>
              </tr>
              {users.map(user =>
                (
                  <tr key={user.id}>
                    <td>{user.created_at}</td>
                    <td className='text-center'>{user.name}</td>
                    <td className='text-center'>
                    {user.role}
                    </td>
                  
                    <td className='text-center'>
                        {user.email}
                    </td>
                    <td className='text-center'>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.deleteuser}
                        data-key={user.id}
                      >
                        Delete
                      </button>
                      {user.blacklist == 1 && 
                      <button
                      type="button"
                      className="btn btn-light"
                      onClick={this.blacklistUser}
                      data-key={user.id}
                    >
                      Whitelist
                    </button>
                      }
                       {user.blacklist == 0  && 
                      <button
                      type="button"
                      className="btn btn-dark"
                      onClick={this.blacklistUser}
                      data-key={user.id}
                    >
                      Blacklist
                    </button>
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
          <hr/>
        </div>
      );
    }else{
      return (
        <div className="container py-5">
          <h1 className="text-center mb-4" style={{color: 'black'}}>Access forbidden</h1>

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

export default connect(mapStateToProps)(Dashboard);
