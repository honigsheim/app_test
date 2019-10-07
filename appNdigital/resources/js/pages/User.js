import
React, {Component}
from
'react';
import {connect} from 'react-redux';
import axios from "axios";
import '../../sass/style.css';
import OwlCarousel from 'react-owl-carousel';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faShippingFast, faStar } from '@fortawesome/free-solid-svg-icons';
import { Card, Button, CardImg, CardTitle, CardText, CardHeader,
  CardSubtitle, CardBody, Container, Row, Col, Form, FormGroup, Label, Input, Alert,
  Media } from 'reactstrap';
import $ from 'jquery';
import eye from '../../images/shopping-cart.svg';


class User extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            user: [],
            comments: []
        };

    }

    componentDidMount()
    {
      let uri = 'http://localhost:8000/api/v1/user/';
      let id = this.props.location.pathname.substr(6);
      axios.get(uri+id).then(response =>{
          this.setState({
              user:response.data
          });
      }).catch(errors => {
          console.log(errors);
      });     
    }
    capitalize = function(str1){
        if(str1 != null){
          return str1.charAt(0).toUpperCase() + str1.slice(1);
        } else{
          return '';
        }
      }

    render()
    {
        return (
          <div>
            <Container className='mt-5 mb-3'>
            <Row>
              
                <Card body outline color="dark" className='flex-row flex-wrap'>
                  <Col sm={5} className='d-flex align-middle'>
                    <CardHeader>
                      <CardImg top src="http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/256/User-icon.png" alt="Poster not found" />
                    </CardHeader>
                  </Col>
                  <Col sm={7}>
                    <CardBody>
                      <CardTitle className='d-flex justify-content-center'><h2 style={{color: 'black'}}>{this.capitalize(this.state.user.name)}</h2></CardTitle>
                      
                      <Label>Email</Label>

                      {/* <small className="text-muted d-flex justify-content-start"> {this.state.user.email}</small> */}
                      <CardText>{this.state.user.email}</CardText>

                      <hr className="my-2" />
                      <Label>Role</Label>
                      <CardText>{this.state.user.role}</CardText>
                      <hr />
                      <Label>Sign up date</Label>
                      <small className="text-muted d-flex justify-content-start"> {this.state.user.created_at}</small>
                      {/* <hr /> */}
                        {/* <Button color="success">Follow</Button> */}
                    </CardBody>
                  </Col>
                </Card>
              
                
            </Row>
          </Container>
          </div>
        );
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});


export default connect(
    mapStateToProps,
)(User);

