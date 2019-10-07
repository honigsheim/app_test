import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import fb from '../../images/facebook.svg';
import insta from '../../images/instagram.svg';
import linkedin from '../../images/linkedin.svg';
import twitter from '../../images/twitter.svg';
import pinterest from '../../images/pinterest.png';
import youtube from '../../images/youtube2.png';

class Footer extends Component {
  render() {

    return (
      <MDBFooter style={{ backgroundColor: 'black', color: 'white'}} className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center">
        <MDBRow>
          <MDBCol md="4">
            <h5 className="title">About Us</h5>
            <h6>
              Leave a critic 
            </h6>
          </MDBCol>
          <MDBCol md="4">
            <h5 className="title">Follow Us</h5>
            <a target="_blank" rel="noopener noreferrer" ><button className='btn rsx fb'><img style={{filter: 'invert(100%)'}} src={fb} alt="Facebook"/></button></a>
            <a target="_blank" rel="noopener noreferrer" ><button className='btn rsx insta'><img style={{filter: 'invert(100%)'}} src={insta} alt="Instagram"/></button></a>
            <a target="_blank" rel="noopener noreferrer" ><button className='btn rsx linkedin'><img style={{filter: 'invert(100%)'}} src={linkedin} alt="LinkedIn"/></button></a>
            <a target="_blank" rel="noopener noreferrer" ><button className='btn rsx insta'><img style={{filter: 'invert(100%)'}} src={pinterest} alt="Pinterest"/></button></a>
            <a target="_blank" rel="noopener noreferrer" > <button className='btn rsx twitter'><img style={{filter: 'invert(100%)'}} src={twitter} alt="Twiter"/></button></a>
            <a target="_blank" rel="noopener noreferrer" ><button className='btn rsx insta'><img style={{filter: 'invert(100%)'}} src={youtube} alt="Youtube"/></button></a>
          </MDBCol>
          <MDBCol md="4">
            <h5 className="title">Category</h5>
            <ul className='footerCat'>
              <li className="list-unstyled mt-3">
                <a href="/top">Top rated movies</a>
              </li>
              <li className="list-unstyled">
                <a href="/pop">Popular movies</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://appndigital.com/"><span style={{fontFamily: 'OCR A Std', fontWeight: 'bold', letterSpacing: '3px'}}>App'NDigital</span></a>
        </MDBContainer>
      </div>
    </MDBFooter>
    );
  }
}


function mapStateToProps(state) {
  return {

  };
}

export default connect(
  mapStateToProps,
)(Footer);
