import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../../carousel.css";
import Card from 'react-bootstrap/Card';
import {Helmet} from "react-helmet";

export default class PhotoCarousel extends Component {


  closeCustomModal = () => {
    console.log("closingCustomModal")
    this.setState({
      customModal:{
      show: false,
      data:[]
      }
    });
  };

  componentDidMount() { 
    this.props.items.forEach((item) => {
      const img = new Image();
      img.src = item.fileName;
      console.log("image::", img); 
    });
  }

  render(){
    console.log("allProps::", this.props);
    return(
      <div >
       <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>Foto - SouthParagliding</title>
          <meta name="description" content="Poze si filme de la zbor cu echipa South Paraglidig Craiova" />
             {this.props.items.map((item, index) =>
          <meta key ={index} name = "image" content={item.fileName}/>
              )} 
          <meta name="keywords"
            content="parapanta, locatii de zbor, parapantism, Craiova, Romania, south paragliding, paragliding, zbor cu parapanta"
            />
        </Helmet>
      {this.props.items.length === 1 ? 
        <Carousel controls={false} interval={null} className="FotoCarousel">
          {this.props.items.reverse().map((item, index) => {
              return (
                <Carousel.Item key={index} onClick = {this.makeImgFullScrn}>
                  <div>
                    {item.fileName && <img className ="pozaModal" src = {item.fileName} alt = {item.id} 
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
                    {item.fileName && <img className ="pozaModal" src = {item.fileName} alt = {item.id} 
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

