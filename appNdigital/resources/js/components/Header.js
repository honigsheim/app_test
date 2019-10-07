import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../sass/style.css';
import logout from '../../images/log-out.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faSignInAlt, faSignOutAlt, faCartArrowDown, faSitemap,faTasks, faUserCircle , faStar, faUsers} from '@fortawesome/free-solid-svg-icons';

import {
    Nav,
    Navbar,
    NavItem,
    NavbarToggler,
    Form,
    FormGroup,
    Input,
    Button,
    NavLink,
    Collapse,
    UncontrolledDropdown,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    Row,
    Col,
} from 'reactstrap';
import * as actions from '../store/actions';

class Header extends Component {
    constructor(props)
    {

        super(props);
        
        this.userData = JSON.parse(localStorage.getItem('user'));

        if(this.props.isAuthenticated){
          var admin = localStorage.getItem('user');
          var a = JSON.parse(admin)
          this.state = {
            role: a['role'],
            isOpen: false,
            value: '',
            user: a['name'],
            dropdownOpen: false,
          };
        }
        else{
          this.toggle = this.toggle.bind(this);
          this.state = {
            role: 'customer',
            isOpen: false,
            value: '',
            user: '',
            dropdownOpen: false,
          };
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleUser = () => {
      this.setState({
          dropdownOpen: !this.state.dropdownOpen
      })
    }

    componentDidMount()
    {

    }

    handleLogout = (e) => {
        e.preventDefault();
        this.props.dispatch(actions.authLogout());
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
         
          <Container fluid className='mt-1 top_container'>
            <Row>
              <div style={{width: '100%', height: '100px'}} className="d-flex justify-content-around align-items-center">
                <Col sm='3' className='d-flex justify-content-center'>
                 <div style={{ display: 'inline-block'}}>
                  <div style={{marginTop: '-30px'}} className='text-center'>
                    <a href='/'><h1 className='asjay'>Critics</h1></a>
                    </div>
                    <div style={{marginTop: '-40px'}}>
                    <h5 className='asjay'>App'NDigital</h5>
                    </div>
                 </div>               
                </Col>
                <Col sm='6' className='d-flex justify-content-center'>
                
                <Form action='/search' method='get' inline>
                    <FormGroup>
                      <Input className='mr-3' type='text' placeholder='Search movie or user' name='search'/>
                      <Button type='submit'>Search</Button>
                    </FormGroup>
                  </Form>
                </Col>
                  <Col sm='3' className='d-flex justify-content-center'>
                      <ButtonDropdown style={{ height: '60px' }} className='mr-3 btnNav' isOpen={this.state.dropdownOpen} toggle={this.toggleUser}>
                          <DropdownToggle caret color="dark">
                              {/* <img style={{filter: 'invert(100%)'}} src={usr} alt="usr"/> */}
                              <FontAwesomeIcon icon={faUserAlt} style={{fontSize: '20px'}}/>
                          </DropdownToggle>

                          {this.props.isAuthenticated && this.state.role == 'admin' &&
                           <DropdownMenu>
                           <DropdownItem header>Hello {this.capitalize(this.state.user)}</DropdownItem>
                           
                           <DropdownItem divider />
                           <DropdownItem>
                             <FontAwesomeIcon icon={faTasks} style={{fontSize: '20px', marginRight: '5px'}}/>
                             <Link style={{color: 'black'}} to="/myactivity">My activity</Link>
                           </DropdownItem>
                           <DropdownItem divider />
                           <DropdownItem>
                             <FontAwesomeIcon icon={faUserCircle} style={{fontSize: '20px', marginRight: '5px'}}/>
                             <Link style={{color: 'black'}} to="/profile">Profile</Link>
                           </DropdownItem>
                           <DropdownItem divider />
                           <DropdownItem>
                             <FontAwesomeIcon icon={faStar} style={{fontSize: '20px', marginRight: '5px'}}/>
                             <Link style={{color: 'black'}} to="/top">Top rated movies</Link>
                           </DropdownItem>
                           <DropdownItem divider />
                           <DropdownItem>
                             <FontAwesomeIcon icon={faStar} style={{fontSize: '20px', marginRight: '5px'}}/>
                             <Link style={{color: 'black'}} to="/pop">Popular movies</Link>
                           </DropdownItem>
                           <DropdownItem divider />
                           <DropdownItem>
                             <FontAwesomeIcon icon={faUsers} style={{fontSize: '20px', marginRight: '5px'}}/>
                             <Link style={{color: 'black'}} to="/users">Users</Link>
                           </DropdownItem>
                           <DropdownItem divider />
                           <DropdownItem>
                             <FontAwesomeIcon icon={faUsers} style={{fontSize: '20px', marginRight: '5px'}}/>
                             <Link style={{color: 'black'}} to="/dashboard">Admin</Link>
                           </DropdownItem>
                          
                       </DropdownMenu>
                          
                          }
                          {(this.props.isAuthenticated ?
                              <DropdownMenu>
                                  <DropdownItem header>Hello {this.capitalize(this.state.user)}</DropdownItem>
                                  
                                  <DropdownItem divider />
                                  <DropdownItem>
                                    <FontAwesomeIcon icon={faTasks} style={{fontSize: '20px', marginRight: '5px'}}/>
                                    <Link style={{color: 'black'}} to="/myactivity">My activity</Link>
                                  </DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem>
                                    <FontAwesomeIcon icon={faUserCircle} style={{fontSize: '20px', marginRight: '5px'}}/>
                                    <Link style={{color: 'black'}} to="/profile">Profile</Link>
                                  </DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem>
                                    <FontAwesomeIcon icon={faStar} style={{fontSize: '20px', marginRight: '5px'}}/>
                                    <Link style={{color: 'black'}} to="/top">Top rated movies</Link>
                                  </DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem>
                                    <FontAwesomeIcon icon={faStar} style={{fontSize: '20px', marginRight: '5px'}}/>
                                    <Link style={{color: 'black'}} to="/pop">Popular movies</Link>
                                  </DropdownItem>
                                 
                              </DropdownMenu>
                              :
                              <DropdownMenu>
                                  <DropdownItem header>Hello Stranger</DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem>
                                    <FontAwesomeIcon icon={faSignInAlt} style={{fontSize: '20px', marginRight: '5px'}}/>
                                    <Link style={{color: 'black'}} to="/register">Register</Link>
                                  </DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem>
                                    <FontAwesomeIcon icon={faSignOutAlt} style={{fontSize: '20px', marginRight: '5px'}}/>
                                    <Link style={{color: 'black'}} to="/login">Log In</Link>
                                  </DropdownItem>
                              </DropdownMenu>)}
                      </ButtonDropdown>
                      {this.props.isAuthenticated &&
                      <button onClick={this.handleLogout} style={{ height: '60px' }} className='btn btn-secondary btnNav'><FontAwesomeIcon icon={faSignOutAlt} style={{fontSize: '25px'}}/></button>
                      }
                  </Col>
              </div>
            </Row>
          </Container>
          
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Header);
