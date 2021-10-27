import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../../carousel.css";
import Card from 'react-bootstrap/Card';
import {Helmet} from "react-helmet";

export default class LocationsCarousel extends Component {

  componentDidMount() {
    this.props.items.forEach((item) => {
      const img = new Image();
      img.src = item.fileName;
      console.log("image::", img); 
    });
  }


  render(){
    console.log("propsLocations::", this.props);
    return(
      <div>
        <Helmet>
          <title>Flying Locations - SouthParagliding </title>
          <meta name="description" content="Locatii de zbor cu echipa de la South Paragliding" />
             {this.props.items.map((item, index) => 
             <meta key={index} name="title" content={item.titlu} />
            )} 
            {this.props.items.map((item, index) => 
              <meta key={index} name = "image" content={item.fileName} /> 
            )} 
          <meta name="keywords"
            content="parapanta, locatii de zbor, parapantism, Craiova, south paragliding, paragliding, zbor cu parapanta, parasutism"
            />
        </Helmet>
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

