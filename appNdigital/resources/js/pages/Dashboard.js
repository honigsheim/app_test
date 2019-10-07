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
        message: '',
      }
  }

  componentWillMount()
  {
      axios.post('http://localhost:8000/api/v1/posts').then(response =>{
          this.setState({
              data:response.data
          });
      }).catch(errors => {
          console.log(errors);
      })
      
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
    const comments = Array.from(this.state.data);

    if(this.props.isAuthenticated && this.state.role == 'admin'){
      return (
        <div className="container py-5">
          <h1 className="text-center mb-4" style={{color: 'black'}}>Admin Comments Dashboard</h1>

        

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
                <th className='text-center'>User name</th>
                <th className='text-center'>Movie title</th>
                <th className='text-center'>Content</th>
                <th className='text-center'>Date</th>
                <th className='text-center'>Actions</th>
              </tr>
              {comments.map(comment =>
                (
                  <tr key={comment.id}>
                    <td>{comment.user_name}</td>
                    <td className='text-center'>{comment.title}</td>
                    <td className='text-center'>
                    {comment.body}
                    </td>
                  
                    <td className='text-center'>
                        {comment.created_at}
                    </td>
                    <td className='text-center'>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.delete}
                        data-key={comment.id}
                      >
                        Delete
                      </button>
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
