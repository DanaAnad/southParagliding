import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../../carousel.css";
import Card from 'react-bootstrap/Card'

export default class LocationsCarousel extends Component {
  render(){
    console.log("propsLocations::", this.props);
    return(
      <div>
      {this.props.items.length === 1 ? 
        <Carousel controls={false} interval={null} className="locationsCarousel">
        {this.props.items.reverse().map((item, index) => {
            return (
              <Carousel.Item className="locationsItem" key={index}>
              <div>
                <img className ="pozaModal" src = {item.fileName} alt = {item.id} />
              </div>
              <Carousel.Caption className="locationsCaption">
                <h5>{item.titlu}</h5>
              </Carousel.Caption>
              </Carousel.Item>
            )
          }) 
        }
        </Carousel> : 
        this.props.items.length > 1 ?
        <Carousel interval={null} className="locationsCarousel">
          {this.props.items.reverse().map((item, index) => {
              return (
                <Carousel.Item className="locationsItem" key={index}>
                <div>
                  <img className ="pozaModal" src = {item.fileName} alt = {item.id} />
                </div>
                <Carousel.Caption className="locationsCaption">
                  <h5>{item.titlu}</h5>
                </Carousel.Caption>
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

