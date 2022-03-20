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
    // console.log("propsId::", this.props.id);
    this.props.items.forEach((item, id) => {
      console.log("itemPhotoCarouselID::", item);
      // console.log("idPhotoCarouselID::", id);
      const img = new Image();
      img.src = item.data.data.fileName;
      console.log("image::", img); 
    });
  }

  render(){
    console.log("allProps:Photo:", this.props);
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
            console.log("ITEMMMM::", item);
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

