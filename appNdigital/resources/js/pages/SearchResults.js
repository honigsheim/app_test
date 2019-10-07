import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Link} from "react-router-dom";
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, Container, Row, Col,Label } from 'reactstrap';


class SearchResults extends Component {
  constructor(props){
      super(props);

    // Initial state.
      this.state = {
          results: [],
          users: [],
          search: '',
      };
  }

  componentWillMount(){
    var odd = this.props.location.search.substr(8);
      axios.get('http://omdbapi.com/?s='+odd+'&apikey=dff29b10').then(response =>{

          this.setState({
              results:response.data.Search
          });
      }).catch(errors => {
          console.log(errors);
      })

      const item = {
        odd
      }
      axios.post('http://localhost:8000/api/v1/search/users', item).then(response =>{
          this.setState({
              users:response.data
          });
      }).catch(errors => {
          console.log(errors);
      })
  }
  capitalize = function(str1){
    if(str1 != null){
      return str1.charAt(0).toUpperCase() + str1.slice(1);
    } else{
      return '';
    }
  }


  render() {
  if(!this.state.results ){
    return (
        <div style={{textAlign: 'center'}}>
          <h1>Results</h1>
          <br></br>
          <p>No movies or users were found with this, try again.</p>

        </div>

      );
    }

  else{
    return (
      <Container>
        <div className="d-flex justify-content-center mt-4 mb-4">
          <h1>Movies</h1>
          
        </div>
        {this.state.results == '' || !this.state.results &&
              <h5 style={{textAlign: 'center'}}>Nothing was found, try again.</h5>
        }
        <Row>
          <CardDeck>
            {this.state.results.map(result =>
              <Col key={result.imdbID} lg='4' className='mb-4'>
                <div key={result.imdbID}>
                  <Card body outline color="dark">
                      {result.Poster === "N/A" &&
                        <CardImg top width="100%" src="https://image.noelshack.com/fichiers/2019/30/6/1564247417-untitled.png" alt="Poster not found"/>
                      }

                      {result.Poster !== "N/A" &&
                        <CardImg top width="100%" src={result.Poster} alt="Poster"/>
                      }
                     
                    <CardBody key={result.imdbID}>
                      <CardTitle className='d-flex justify-content-center'><h4>{result.Title}</h4></CardTitle>
                      <CardSubtitle className='d-flex justify-content-end'>{this.capitalize(result.Type)}</CardSubtitle>
                      <hr className="my-2"/>
                      <Label>Title</Label>
                      <CardText>{((result.Title).length > 150) ? (((result.Title).substring(0, 147)) + '...') : result.Title}</CardText>
                      <hr></hr>
                      <Label>Year of apparition</Label>
                      <small className="text-muted d-flex justify-content-start"> {result.Year}</small>
                    </CardBody>
                    <Link style={{textAlign: 'center'}} to={'/movie/' + result.Title}><Button className='btn-dark mt-3'>DETAILS</Button></Link>

                  </Card>
                </div>
              </Col>
            )}
          </CardDeck>
        </Row>
        <hr></hr>
      <h1 style={{textAlign: 'center'}}>Users </h1>
        <Row>
        {this.state.users.map(user => 
        <Col key={user.id} md='4' className='mb-4'>
          <Card body outline color="dark">
          <CardTitle style={{textAlign: "center", fontWeight: 'bold'}}>{this.capitalize(user.name)}</CardTitle>
          <CardImg top src="http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/256/User-icon.png" alt="Poster not found"/>
          <hr></hr>
          <Label>Role</Label>
          <CardText>{this.capitalize(user.role)}</CardText>
          <Link to={'/user/' + user.id}><Button color="secondary">Profile</Button></Link>
            </Card>
          </Col>
          )}
        </Row>
      </Container>
    );
   }
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
)(SearchResults);
