import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../../carousel.css";
import Card from 'react-bootstrap/Card'

export default class PhotoCarousel extends Component {
  render(){
    console.log("propsFoto::", this.props);
    return(
      <div >
      {this.props.items.length === 1 ? 
        <Carousel controls={false} interval={null} className="FotoCarousel">
          {this.props.items.reverse().map((item, index) => {
              return (
                <Carousel.Item key={index}>
                <div>
                  {item.fileName && <img className ="pozaModal" src = {item.fileName} alt = {item.id} />}
                </div>
                </Carousel.Item>    
              )
            })
          } 
          </Carousel> : 
          this.props.items.length > 1 ? 
          <Carousel interval={null} className="FotoCarousel">
          {this.props.items.reverse().map((item, index) => {
              return (
                <Carousel.Item key={index}>
                <div>
                  {item.fileName && <img className ="pozaModal" src = {item.fileName} alt = {item.id} />}
                </div>
                </Carousel.Item>    
              )
            })
          } 
          </Carousel> :
          <Card
            bg={"#fff"}
            text={ 'dark'}
            className="mb-2 bodyCard"
          >
          <Card.Body>
          <Card.Text>
              <span> No news here. <br />
              Admin please upload some data for the users.</span>
          </Card.Text>
          </Card.Body>
        </Card>
      }
      </div>
    )
  }
}

