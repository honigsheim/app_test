import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import eye from '../../images/eye.svg';
import caddie from '../../images/shopping-cart.svg';
import '../../sass/style.css';
import {Link} from "react-router-dom";
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, Container, Row, Col, Breadcrumb, BreadcrumbItem, Pagination, PaginationItem, PaginationLink   } from 'reactstrap';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faCartPlus} from '@fortawesome/free-solid-svg-icons';
  import { PushSpinner, BallSpinner, CircleSpinner } from "react-spinners-kit";

class Pop extends Component {
  constructor(props)
  {
      super(props);

    // Initial state.
      this.state = {
          movies: [],
          loading: false,
          page: 1,
      };
      this.next = this.next.bind(this);
      this.prev = this.prev.bind(this);
  }

  componentWillMount()
  {
    this.setState({
      loading: true
  });
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=1cd5322c7f24948aacf6f9f1ae468052&language=en-US&page='+this.state.page).then(response =>{
        var tmpItems = response.data.results

      tmpItems.forEach(function(element, index) {
          axios.get('http://omdbapi.com/?t='+element.title+'&apikey=dff29b10')
          .then(function (data) {
  
            tmpItems[index].url = data.data.Poster;
            tmpItems[index].resume = data.data.Plot;
           
            this.setState({movies: tmpItems,     
               loading: false
            });
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
        }.bind(this));
    }).catch(errors => {
        console.log(errors);
    })
  }
  next(){
  this.setState({
    page: this.state.page +1
  })
  this.componentWillMount()

  }
  prev(){
    if(this.state.page >= 1){
      this.setState({
        page: this.state.page - 1
      })
      this.componentWillMount()

    }

  }

  render() {
    const { loading } = this.state;

    return (
      <Container>
        <div className='d-flex justify-content-center'>
          <Breadcrumb>
            <BreadcrumbItem><a href="/home">Home</a></BreadcrumbItem>
            <BreadcrumbItem active>Popular movies</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="d-flex justify-content-center mt-4 mb-4">
          <h1>Results for popular movies</h1>
        </div>
        <Row>
        <div className={'loading'}>
                <CircleSpinner
                    size={70}
                    color="black"
                    loading={loading}
                />
            </div>
          <CardDeck>
            {this.state.movies.map(movie =>
              <Col md='4' className='mb-4'>
                <div key={movie.id}>
                <Card body outline color='dark' className='card'>

                    {movie.url === 'N/A' || movie.url == undefined &&
                      <CardImg top style={{height: '250px'}} src="https://image.noelshack.com/fichiers/2019/30/6/1564247417-untitled.png" alt="Poster not found" />
                      }
                      {movie.url !== 'N/A' && movie.url != undefined &&
                      <CardImg top style={{height: '250px'}} src={movie.url} alt="Poster" />
                      }       

                    <CardBody key={movie.id}>
                      <CardTitle className='d-flex justify-content-center text-center' style={{color: 'dark', height: '50px'}}><h4>{movie.title}</h4></CardTitle>
                     
                      <hr className="my-2"/>
                      <CardText>{((movie.overview).length > 150) ? (((movie.overview).substring(0, 147)) + '...') : movie.overview}</CardText>
                      <hr className="my-2"/>
                      <div className='d-flex justify-content-center'>
                        
                        <div>
                              <Link to={'/movie/' + movie.title}><Button className='btn-dark mt-3'>DETAILS</Button></Link>
                                  </div>                        
                        
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            )}
          </CardDeck>
        </Row>
        <Pagination style={{display: 'flex', justifyContent: 'center'}} aria-label="Page navigation example">
      <PaginationItem >
        {this.state.page <= 1 &&
          <PaginationLink previous disabled onClick={this.prev} />
        }
        {this.state.page > 1 &&
            <PaginationLink previous onClick={this.prev} />
          }        
  </PaginationItem>
        <PaginationItem>
          <PaginationLink next onClick={this.next} />
        </PaginationItem>
        </Pagination>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(
  mapStateToProps,
)(Pop);
