import
  React, {Component}
  from
    'react';
import {connect} from 'react-redux';
import axios from 'axios';
import '../../sass/style.css';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {Link} from "react-router-dom";
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, Container, Row, Jumbotron,
  Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, UncontrolledCarousel,
  TabContent, TabPane, Nav, NavItem, NavLink, Col, Alert , Breadcrumb, BreadcrumbItem , Pagination, PaginationItem, PaginationLink  } from 'reactstrap';
  import { PushSpinner, BallSpinner, CircleSpinner } from "react-spinners-kit";

  import classnames from 'classnames';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faStar, faShoppingBasket, faPhone, faUserCircle, faCartPlus } from '@fortawesome/free-solid-svg-icons';

  const items = [
    {
      src: 'https://www.virginmedia.com/content/dam/virginmedia/dotcom/images/entertainment/movies/articles/pride-prejudice-zombies-1920x500.jpg',

    },
    {
      src: "https://www.ticketnews.com/wp-content/uploads/1436395186-twilight-main-1920x500.jpg",

    },
    {
      src: "https://www.virginmedia.com/content/dam/virginmedia/dotcom/images/entertainment/movies/allegiant-review-1920x500.jpg",

    }
  ];
class Home extends Component {
    constructor(props)
    {
        super(props);

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);

        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);

      // Initial state.
        this.state = {
            popular: [],
            rated: [],
            page: 1,
            modal: false,
            activeIndex: 0,
            user_id: '',
            visible: 'true',
            loading: false,
            added:'added',
            countryName: '',
            countryCode: '',
            country:'',
            activeTab: '1'

        };
        this.onDismiss = this.onDismiss.bind(this);
        this.next1 = this.next1.bind(this);
        this.prev = this.prev.bind(this);
  
        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);

    }

    componentWillMount()
    {
      console.log("okok",this.page)
      this.setState({
        loading: true
    });
      this.getGeoInfo();

      axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=1cd5322c7f24948aacf6f9f1ae468052&language=en-US&page='+this.state.page).then(response =>{
        var tmpItems = response.data.results

      tmpItems.forEach(function(element, index) {
          axios.get('http://omdbapi.com/?t='+element.title+'&apikey=dff29b10')
          .then(function (data) {
  
            tmpItems[index].url = data.data.Poster;
            tmpItems[index].resume = data.data.Plot;
           
            this.setState({rated: tmpItems,
              loading: false,
            });

          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
        }.bind(this));
    }).catch(errors => {
        console.log(errors);
    })
        var user = localStorage.getItem('user');
    }

    onDismiss() {
      this.setState({ visible: false, added: 'not' });
    }

    getGeoInfo = () => {
      axios.get('https://ipapi.co/json/').then((response) => {
          let data = response.data;
          this.setState({
              countryName: response.data.country_name,
              countryCode: response.data.country_calling_code,
              country: response.data.country
          });
      }).catch((error) => {
          console.log(error);
      });
  };

next1(){

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

toggle() {
  this.setState(prevState => ({
    modal: !prevState.modal
  }));
}

toggle2(tab) {
  if (this.state.activeTab !== tab) {
    this.setState({
      activeTab: tab
    });
  }
}

    onExiting() {
      this.animating = true;
    }

    onExited() {
      this.animating = false;
    }

    next() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
    }

    previous() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({ activeIndex: newIndex });
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


      const { loading } = this.state;

      const { activeIndex } = this.state;
      const slides = items.map((item) => {
        return (
          <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={item.src}
          >

            <img src={item.src} alt={item.altText} />

            <CarouselCaption captionText={item.caption} captionHeader={item.caption} />

          </CarouselItem>
        );
      });
        return (
          <div>
            <Container fluid className='mt-4'>
              <Carousel
              className="ok"
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
              >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
              </Carousel>
          </Container>
          <Container>
          
            
            <div className="d-flex justify-content-center mt-4 mb-4">
              <h1 className='asjay' style={{color: 'black'}}>Top Rated</h1>
            </div>

            
        <Container>
      
        <Row>
        <div className={'loading'}>
                <CircleSpinner
                    size={70}
                    color="black"
                    loading={loading}
                />
            </div>
          <CardDeck>
            {this.state.rated.map(movie =>
              <Col md='4' className='mb-4'>
                <div key={movie.id}>
                <Card body outline color='dark' style={{borderRadius: '250px'}}className='card'>
                    {movie.url === 'N/A' || movie.url == undefined &&
                      <CardImg top style={{height: '250px', borderRadius: '250px'}} src="https://image.noelshack.com/fichiers/2019/30/6/1564247417-untitled.png" alt="Poster not found" />
                      }
                      {movie.url !== 'N/A' && movie.url != undefined &&
                      <Link to={'/movie/' + movie.title}><CardImg top style={{height: '250px', borderRadius: '250px'}} src={movie.url} alt="Poster" /></Link>
                      }       
                    <CardBody key={movie.id}>
                      <CardTitle className='d-flex justify-content-center text-center' style={{color: 'dark', height: '50px'}}><h4>{movie.title}</h4></CardTitle>
                      
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
          <PaginationLink next onClick={this.next1} />
        </PaginationItem>
        </Pagination>
      </Container> 

          </Container>
          <Container fluid>
              <Row>
                <Col sm={12}>
                  <div className="text-center mt-5 mb-3">
                    <h2>Latest rewarded critics</h2>
                    <hr width="50%" />
                  </div>
                  <div className="main-timeline">
                    <div className="timeline">
                        <a href="" className="timeline-content">
                            <div className="timeline-icon">
                                <FontAwesomeIcon icon={faUserCircle}/>
                            </div>
                            <div className="inner-content">
                                <h3 className="title"><i>Marie Christelle</i> - <b>Dark Phoenix</b></h3>
                                <p className="description">
                                  It didn't have to end this way...It didn't have to end with so little emotion, so little meaning - with a sad little speech about evolving, for Phoenix's sake.</p>
                            </div>
                        </a>
                    </div>
                    <div className="timeline">
                        <a href="" className="timeline-content">
                            <div className="timeline-icon">
                                <FontAwesomeIcon icon={faUserCircle}/>
                            </div>
                            <div className="inner-content">
                                <h3 className="title"><i>Sebastien Loque</i> - <b>Toy story 4</b></h3>
                                <p className="description">Toy Story 4 is so good it's criminal. The legislation it flouts is the law of diminishing returns which governs movies with numbers after their names.</p>
                            </div>
                        </a>
                    </div>
                    <div className="timeline">
                        <a href="" className="timeline-content">
                            <div className="timeline-icon">
                                <FontAwesomeIcon icon={faUserCircle}/>
                            </div>
                            <div className="inner-content">
                                <h3 className="title"><i>Stephanie Lambert</i> - <b>The Lion king</b></h3>
                                <p className="description">By this point, Disney's do-overs feel a lot like their cash-grabby, inspiration-free '90s direct-to-video sequels, only with vastly better production values.</p>
                            </div>
                        </a>
                    </div>
                  </div>
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
)(Home);
