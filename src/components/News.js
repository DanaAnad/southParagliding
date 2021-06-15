import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
// import Card from 'react-bootstrap/Card';
// import CardDeck from 'react-bootstrap/CardDeck'
// import Jumbotron from 'react-bootstrap/Jumbotron'
// import "../News.css";
import "../carousel.css";


export default class News extends Component {
    render(){
        return (
        <div className="ReusableCarousel">  
            <Carousel className="FotoCarousel" interval={null}>
            {this.props.items.map((item,index) => {
                return (
                    <Carousel.Item key={index} className="newsItem">
                        <img className="pozaModal"
                        // className="d-block w-100"
                        src={item.src}
                        alt="slide"
                        />
                        <Carousel.Caption className="newsText">
                        <h4><a href ="https://www.facebook.com/zborcuparapantaranca">{item.title}</a></h4>
                        <p><a href ="https://www.facebook.com/zborcuparapantaranca">{item.text}</a></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                )
            })}
        </Carousel>
            
                         {/* <Carousel fade interval={null} className="FotoCarousel">
            {this.props.items.map((item, index) => {
                return (
                    <Carousel.Item key={index}>
                    <div>
                        <img className ="pozaModal" src = {item.src} alt = {item.id} />
                    </div>
                    <Carousel.Caption>
                        <h3>{item.title}</h3>
                    </Carousel.Caption>
                    </Carousel.Item>
                );
            })} */}
            
            
            
            
            
            
            
            
            
            
            
            
            {/* <ol>
            {this.props.items.map(item => {
                return (
                <Jumbotron className="newsContainer">
                
                    <li>
                        <div>
                            <h3></h3>
                            <h4>{item.title}</h4>
                            <p>
                                {item.text}
                            </p>
                            <span>
                                <img src = {item.src} />
                                <br />
                                <a href = "https://www.facebook.com/zborcuparapantaranca">Afla mai multe</a>
                            </span>
                        </div>
                    </li>
               
                </Jumbotron>
                    );
            })}
            </ol> */}




            {/* <CardDeck>
                {this.props.items.map(item =>{
                    return (
                        <div>
                        <Card>
                            <Card.Img variant="top" src={item.src} />
                            <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                {item.text}
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        </div>
                    )
                })}
            </CardDeck> */}




            {/* <Card className="newsItem">
            {this.props.items.map(item => {
                return (
                    <div>
                        <Card.Img variant="top" src={item.src} />
                        <Card.Body>
                        <Card.Text>
                            {item.text}
                        </Card.Text>
                        </Card.Body>
                </div>
                );
            })}
            </Card> */}



                {/* <Carousel fade className="newsCarousel">
                    {this.props.items.map((item => {
                        return (                        
                            <Carousel.Item className="newsItem">
                            {item.src ? <img className="newsPic"
                            className="d-block w-100"
                            src={item.src}
                            alt="slide"
                            /> : <img className="newsPic" src = "" alt="slide" />}
                            <Carousel.Caption>
                            <h4>{item.title}</h4>
                            <p>{item.text}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        );
                    }))}
                </Carousel> */}
            </div>
        )
    }
}

