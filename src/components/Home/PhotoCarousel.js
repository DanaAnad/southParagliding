import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../../carousel.css";
import Card from 'react-bootstrap/Card';
import {Helmet} from "react-helmet";

export default class PhotoCarousel extends Component {

  componentDidMount() {
    this.props.items.forEach((item) => {
      const img = new Image();
      img.src = item.fileName;
      console.log("image::", img); 
    });
}


  render(){
    console.log("propsFoto:i:", this.props.items);
    return(
      <div >
       <Helmet>
          <title>Foto - SouthParagliding</title>
          <meta name="description" content="Poze si filme de la zbor cu echipa South Paraglidig" />
             {this.props.items.map((item, index) =>
          <meta key ={index} name = "image" content={item.fileName} />
              )} 
          <meta name="keywords"
            content="parapanta, locatii de zbor, parapantism, Craiova, south paragliding, paragliding, zbor cu parapanta"
            />
        </Helmet>
      {this.props.items.length === 1 ? 
        <Carousel controls={false} interval={null} className="FotoCarousel">
          {this.props.items.reverse().map((item, index) => {
              return (
                <Carousel.Item key={index}>
                <div>
                  {item.fileName && <img className ="pozaModal"  src = {item.fileName} alt = {item.id} />}
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
                  {item.fileName && <img className ="pozaModal img-fluid" src = {item.fileName} alt = {item.id} />}
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

