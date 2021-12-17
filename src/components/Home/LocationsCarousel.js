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
      <div className="Locations">
        <Helmet>
        <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>Locatii de zbor - SouthParagliding </title>
          <meta name="description" content="Locatii de zbor cu echipa de la South Paragliding Craiova" />
             {this.props.items.map((item, index) => 
             <meta key={index} name="title" content={item.titlu} />
            )} 
            {this.props.items.map((item, index) => 
              <meta key={index} name = "image" content={item.fileName} /> 
            )} 
          <meta name="keywords"
            content="parapanta, locatii de zbor, parapantism, Craiova, Romania, south paragliding, paragliding, zbor cu parapanta, parasutism"
            />
        </Helmet>
      {this.props.items.length === 1 ? 
        <Carousel controls={false} interval={null} className="locationsCarousel">
        {this.props.items.reverse().map((item, index) => {
            return (
              <Carousel.Item className="locationsItem" key={index}>
              <div className = "locationsPozaContainer">
                <img className ="pozaModalLocations" src = {item.fileName} alt = {item.id} onClick = {(e) => this.fullScrn} />
              </div>
              <Carousel.Caption className="locationsCaption">
                <h5>{item.titlu}</h5>
                <p>{item.description}</p>
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
                <div className = "locationsPozaContainer">
                  <img className ="pozaModalLocations" src = {item.fileName} alt = {item.id} />
                </div>
                <Carousel.Caption className="locationsCaption">
                  <span>{item.titlu}</span>
                  <p>{item.description}</p>
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
              <span> Nothing here. <br />
              Out team will soon upload some data for the users.</span>
          </Card.Text>
          </Card.Body>
    </Card>
      }
     </div>
    )
  }
}

