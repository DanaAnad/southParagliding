import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../../CSS_files/carousel.css";
import Card from 'react-bootstrap/Card';
import {Helmet} from "react-helmet";

export default class PhotoCarousel extends Component {

  componentDidMount() { 
    this.props.items.forEach((item) => {
      const img = new Image();
      img.src = item.data.data.fileName;
    });
  }

  render(){
    console.log("fotoCarouselPrsps::", this.props);
    return(
      <div >
       <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>Foto - SouthParagliding</title>
          <meta name="description" content="Poze si filme de la zbor cu echipa South Paraglidig Craiova" />
             {this.props.items.map((item, index) =>
          <meta key ={index} name = "image" content={item.data.data.fileName}/>
              )} 
          <meta name="keywords"
            content="parapanta, locatii de zbor, parapantism, Craiova, Romania, south paragliding, paragliding, zbor cu parapanta"
            />
        </Helmet>
      {this.props.items.length === 1 ? 
        <Carousel controls={false} interval={null} className="FotoCarousel">
          {this.props.items.reverse().map((item, index) => {
              return (
                <Carousel.Item key={index} >
                  <div>
                    {item.data.data.fileName && <img className ="pozaModal" src = {item.data.data.fileName} alt = {item.id} 
                      onClick = {(e) => this.props.showPhotosFullScreen(e)} onTouchEnd = {(e) => this.props.showPhotosFullScreen(e)}
                    />}
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
                    {item.data.data.fileName && <img className ="pozaModal" src = {item.data.data.fileName} alt = {item.id} 
                      onClick = {(e) => this.props.showPhotosFullScreen(e)} onTouchEnd = {(e) => this.props.showPhotosFullScreen(e)}
                    />}
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
          <span> For the moment there is nothing here. <br />
              Our team will be soon uploading some data.</span>
          </Card.Text>
          </Card.Body>
        </Card>
      }
      </div>
    )
  }
}

