import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../sass/style.css';
import axios from 'axios';
import { Container, Row, Col, Table, Form, FormGroup, Input, Button } from 'reactstrap';


class ProfilUser extends Component {
  constructor(props){
    super(props);
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.state = {
      userName: '',
      userId: '',
      userEmail: ''
    }
  }

  componentDidMount(){
    this.setState({
      userName : this.userData.name,
      userEmail: this.userData.email,
      userId: parseInt(this.userData.id, 10)
    });
  }

  handleSubmit(event)
  {
    event.preventDefault();

    var userid = event.target[0].id;
    var newname = event.target[0].value;
    let uri = 'http://localhost:8000/api/v1/username/update/'+userid;
    axios.put(uri, {newname}).then((response) => {
    });
    window.location.reload();
  }

  handleSubmit2(event)
  {
    event.preventDefault();

    var userid = event.target[0].id;
    var newemail = event.target[0].value;
    let uri = 'http://localhost:8000/api/v1/useremail/update/'+userid;
    axios.put(uri, {newemail}).then((response) => {
    });
    window.location.reload();
  }

  render() {
    return (
      <div>
        <Container>
        <h1>Your profile</h1>
          <Row>
            <Col>
              <Table bordered>
                <thead>
                  <th>Your Name</th>
                </thead>
                <tbody>
                  <td>{this.state.userName}</td>
                </tbody>
              </Table>
            </Col>
            <Col>
            <Table bordered>
                <thead>
                  <th>Your Email</th>
                </thead>
                <tbody>
                  <td>{this.state.userEmail}</td>
                </tbody>
              </Table>
            </Col>
          </Row>
          <h1>Edit Your profile</h1>
          <Row>
            <Col>
              <Table bordered>
                <thead>
                  <th>Edit Your Name</th>
                </thead>
                <tbody>
                  <td>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup>
                        <Input type='text' name='username' id={this.state.userId} placeholder={this.state.userName} required />
                      </FormGroup>
                      <FormGroup>
                        <Button color='dark' type='submit'>Edit</Button>
                      </FormGroup>
                    </Form>
                  </td>
                </tbody>
              </Table>
            </Col>
            <Col>
            <Table bordered>
                <thead>
                  <th>Edit Your Email</th>
                </thead>
                <tbody>
                  <td>
                    <Form onSubmit={this.handleSubmit2}>
                      <FormGroup>
                        <Input type='email' name='email' id={this.state.userId} placeholder={this.state.userEmail} required />
                      </FormGroup>
                      <FormGroup>
                        <Button color='dark' type='submit'>Edit</Button>
                      </FormGroup>
                    </Form>
                  </td>
                </tbody>
              </Table>
            </Col>
            <Col>
            <Table bordered>
                <thead>
                  <th>Edit Your Password</th>
                </thead>
                <tbody>
                  <td>
                    <Form>
                      <FormGroup>
                        <Input type='password' name='password' id={this.state.userId} required />
                      </FormGroup>
                      <FormGroup>
                        <Button color='dark' type='submit'>Edit</Button>
                      </FormGroup>
                    </Form>
                  </td>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(
  mapStateToProps,
)(ProfilUser);
