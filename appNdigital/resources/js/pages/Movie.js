import
React, {Component}
from
'react';
import {connect} from 'react-redux';
import axios from "axios";
import '../../sass/style.css';
import OwlCarousel from 'react-owl-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Card, Button, CardImg, CardTitle, CardText, CardHeader,
  CardSubtitle, CardBody, Container, Row, Col, Form, FormGroup, Label, Input, Alert,
  Media } from 'reactstrap';
import $ from 'jquery';

class Movie extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            movie: {},  
            movies: [],
            user: '',
            user_id: '',
            comments: [],
            rSelected: '',
            session: '',
            likes: [],
            liked:'',
            display:''
        };

    this.eval = this.eval.bind(this);
    }

    componentDidMount()
    {
      if(localStorage.getItem('user')){

        var user = localStorage.getItem('user')

        var userParsed = JSON.parse(user);
        var user_id = userParsed['id'];
        this.setState({
          user_id: user_id
        })
        axios.post('http://localhost:8000/api/v1/getLikes',{user_id})
        .then(response => {
          this.setState({
            likes: response.data
          })
          console.log("RRRRRRRRRRRRRRRRRRRR",this.state.likes[0]['likes'])

          // if(response.data['likes'] == 1)
          
        })

      }


      axios.get('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=1cd5322c7f24948aacf6f9f1ae468052')
      .then(response => {
        this.setState({
          session: response.data.guest_session_id
        })
      })

      let uri = 'http://localhost:8000/api/v1/posts';
      let title = this.props.location.pathname.substr(7);
      const item = {
        title
      }
      axios.post(uri, item).then(response =>{

          this.setState({
              comments:response.data
          });
      }).catch(errors => {
          console.log(errors);
      });     

       this.setState({
        user: localStorage.getItem('user')
      })

      axios.get('https://api.themoviedb.org/3/movie/popular?api_key=1cd5322c7f24948aacf6f9f1ae468052&language=en-US&page=1').then(response =>{
        var tmpItems = response.data.results
      tmpItems.forEach(function(element, index) {
          axios.get('http://omdbapi.com/?t='+element.title+'&apikey=dff29b10')
          .then(function (data) {
  
            tmpItems[index].url = data.data.Poster;
            tmpItems[index].resume = data.data.Plot;
           
            this.setState({movies: tmpItems });
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
        }.bind(this));
    }).catch(errors => {
        console.log(errors);
    })
        let id = this.props.location.pathname.substr(7);

        axios.post('http://www.omdbapi.com/?apikey=dff29b10&t='+id).then(response =>{
            this.setState({
                movie:response.data
            });
            console.log("nooooote ----->",this.state.movie);

        }).catch(errors => {
            console.log(errors);
        });
    }
    like(comment_id){

      var user = localStorage.getItem('user')

      var userParsed = JSON.parse(user);
      var user_id = userParsed['id'];

        const items = {
          comment_id,
          user_id,
          like: this.state.like
        }

        let uri = 'http://localhost:8000/api/v1/post/like';

      axios.post(uri, items).then(response =>{
        this.setState({
          liked: 'liked'
        })
      }).catch(errors => {
          console.log(errors);
      });
    }
    comment(title){

      var body = $('#text').val()
      var user = localStorage.getItem('user')

      var userParsed = JSON.parse(user);
      var user_name = userParsed['name'];
      var user_id = userParsed['id'];
        const items = {
          body,
          title,
          user_name,
          user_id
        }
        let uri = 'http://localhost:8000/api/v1/post';

      axios.post(uri, items).then(response =>{
        this.setState({
          added: 'added'
        })
        window.location.reload()

      }).catch(errors => {
          console.log(errors);
      });
      $('#text').val('')
    }

    eval(e){
      var val = e.target.value

       fetch('https://api.themoviedb.org/3/movie/'+this.state.movie.imdbID+'/rating?api_key=1cd5322c7f24948aacf6f9f1ae468052&guest_session_id='+this.state.session, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({value: val})
        }).then(ok => {

            if(ok.ok == true){
              this.setState({
                display: 'none'
              })
              console.log("true")
          } else {
            console.log("false")
          }
        });
    }
    

    delete = (e) => {
      const { key } = e.target.dataset;
        axios.post('http://localhost:8000/api/v1/destroy/'+key).then(response =>{
           this.setState({
             deleted: 'deleted',
             message: response.data
           })
           window.location.reload()
        })
         .catch(errors => {
            console.log(errors);
        })
    }
    

    render()
    {

    var ok = this.state.movies;

        return (
          <div>
            <Container className='mt-5 mb-3'>
            <Row>
              
                <Card body outline color="dark" className='flex-row flex-wrap'>
                  <Col sm={5} className='d-flex align-middle'>
                    <CardHeader>
                    {this.state.movie.Poster === 'N/A' &&
                      <CardImg top src="https://image.noelshack.com/fichiers/2019/30/6/1564247417-untitled.png" alt="Poster not found" />
                      }
                      {this.state.movie.Poster !== 'N/A' &&
                      <CardImg top src={this.state.movie.Poster} alt="Poster" />
                      }
                     
                    </CardHeader>
                  </Col>
                  <Col sm={7}>
                    <CardBody>
                      <CardTitle className='d-flex justify-content-center'><h2 style={{color: 'black'}}>{this.state.movie.Title}</h2></CardTitle>
                      
                      <Label>Category</Label>

                      <small className="text-muted d-flex justify-content-start"> {this.state.movie.Genre}</small>

                      <hr className="my-2" />
                      <Label>Resume</Label>
                      <CardText>{this.state.movie.Plot}</CardText>
                      <hr />
                      <CardSubtitle className='d-flex justify-content-end'><span style={{backgroundColor: 'black', position: 'relative', left: '40px', color:'white', padding: '5px 20px', borderTopLeftRadius: '50px 50px'}}> Score {this.state.movie.imdbRating}</span></CardSubtitle>

                      <Label>Writer</Label>

                      <CardText className="d-flex justify-content-center"><b>{this.state.movie.Writer}</b></CardText>
                      <hr />
                      <Label>Release date</Label>
                      <small className="text-muted d-flex justify-content-start"> {this.state.movie.Released}</small>

                      <hr />

                      {this.state.user === null &&
                      <div style={{border: "solid 2px black", height: "100%", width: "100%", float: 'left'}}>
                              <p style={{fontSize: 18}}>In order to leave a comment you need to log-in </p>
                      </div>
                      }
                      {this.state.added === 'added' &&
                        <div>
                        <Alert color="dark">
                          Comment added successfully!
                        </Alert>
                        </div>
                      }
                      {this.state.display === 'none' &&
                          <div>
                          <Alert color="info">
                            Eval added successfully!
                          </Alert>
                          </div>
                      }
   
                      {this.state.user !== null &&
                          
                      <Form>
                        <FormGroup style={{display: this.state.display}}>
                          <Label for="eval">Score</Label>
                          <Input onClick={this.eval} type="select" name="value" id="eval">
                          <option value="0,5">Select Score</option>
                            <option value="0,5">0,5</option>
                            <option value="1">1</option>
                            <option value="1,5">1,5</option>
                            <option value="2">2</option>
                            <option value="2,5">2,5</option>
                            <option value="3">3</option>
                            <option value="3,5">3,5</option>
                            <option value="4">4</option>
                            <option value="4,5">4,5</option>
                            <option value="5">5</option>
                            <option value="5,5">5,5</option>
                            <option value="6">6</option>
                            <option value="6,5">6,5</option>
                            <option value="7">7</option>
                            <option value="7,5">7,5</option>
                            <option value="8">8</option>
                            <option value="8,5">8,5</option>
                            <option value="9">9</option>
                            <option value="9,5">9,5</option>
                            <option value="10">10</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="text">Any opinion</Label>

                            <Input type="textarea" name="text" id="text" />
                            <Button onClick={() => this.comment(this.state.movie.Title)} className='btn-dark mt-3' style={{width: '100%', height: '70px', fontSize: '20px'}}>Comment <FontAwesomeIcon icon={faStar} style={{color: 'white'}}/></Button>

                        </FormGroup>

                      </Form>
                      }
                    </CardBody>
                  </Col>
                </Card>
              
                
            </Row>
            
          </Container>
     <Container className='mt-5 mb-3'>
              <h2 style={{textAlign: 'center', color: 'grey'}}>Comments section</h2>
            
          {this.state.comments.map(comment => 
  
              <Row key={comment.id}>
            <Col key={comment.id}>

            <div key={comment.id} >
           <Media >

                <Media left href={"/user/"+ comment.user_id}>
                    <Media object style={{height: "30px"}}src="http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/256/User-icon.png" alt="Generic placeholder image" />
                </Media>
                <Media body>
                    <Media heading>
                      {comment.user_name}
                    </Media>
                      {comment.body}
                </Media>
              </Media>


              <small className="text-muted">Posted {comment.created_at}</small>
              {this.state.user_id === comment.user_id &&
              <div style={{display: 'flex', justifyContent: 'start'}}>
                    <Button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.delete}
                        data-key={comment.id}
                      >
                        Delete
                </Button>     
              </div>
                         
              }
              {this.state.user === null &&
              <div>

              </div>
              }
              
              {this.state.user !== null && 
                  <Form>
                    <FormGroup>
                        {this.state.likes.map(like =>
                            <div>
                             
                          {comment.id === like.comment_id  &&
                            <div>
                            {like.likes === 0 &&
                              <div>
                                <Button onClick={() => this.like(comment.id)} color='danger'>Like <FontAwesomeIcon icon={faStar} style={{color: 'white'}}/></Button>
                              </div>
                            }
                            {like.likes === 1 || like === null &&
                              <div>
                                <Button onClick={() => this.like(comment.id)} color='info'>Like <FontAwesomeIcon icon={faStar} style={{color: 'white'}}/></Button>
                              </div>
                            }
                            </div>
                          }
                          </div>
                        )}
                    </FormGroup>
                  </Form>
              }
          </div>
          <br></br>
         </Col>
          </Row>
          )}
          <br></br>
          <hr></hr>
     </Container>
        
          <Container className='mt-5 mb-3' fluid>
            <Row>
              <Col md='12'>
              <h2 style={{textAlign: 'center', color: 'grey'}}>Popular movies</h2>

                <OwlCarousel
                    className="owl-theme"
                    loop
                    items='4'
                    autoWidth= 'true'
                    margin={10}
                    nav
                    style={{paddingTop: '50px'}}
                  >
                    {ok.map(movie =>
                      <div key={movie.title} className="item card" style={{width: '25rem', height: '28rem'}}>
                        {movie.url === 'N/A' || movie.url == undefined &&
                            <img className="card-img-top" style={{height: '300px'}} src='https://image.noelshack.com/fichiers/2019/30/6/1564247417-untitled.png' alt="Poster not found"/>
                          }
                          {movie.url !== 'N/A' && movie.url !== undefined &&
                              <img className="card-img-top" style={{height: '300px'}} src={movie.url} alt="Poster"/>
                          }

                        <div className="card-body">
                        <a href={'/movie/' + movie.title}><h5 className="card-title text-center" style={{color: 'black'}}> {movie.title}</h5></a>

                          <div className="d-flex" style={{marginBottom: '-30px'}}>
                            <p> Rating {movie.vote_average} <FontAwesomeIcon icon={faStar} style={{color: 'black'}}/></p>
                          </div>

                        </div>
                      </div>
                     )}
                </OwlCarousel>
              </Col>
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
)(Movie);

