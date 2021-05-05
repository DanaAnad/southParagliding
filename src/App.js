import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyModal from "./components/myModal.js";
import Header from "./components/Header.js";
import Contact from "./components/Contact.js";
import ReusableCarousel from "./components/Carousel.js";
import VideoCarousel from "./components/VideoCarousel";
import LocationsCarousel from "./components/LocationsCarousel.js";
import './SP.css';
import pic1 from "./assets/Images/pic1.jpg";
import pic2 from "./assets/Images/pic2.jpg";
import pic3 from "./assets/Images/pic3.jpg";
import pic4 from "./assets/Images/pic4.jpg";
import pic5 from "./assets/Images/pic5.jpg";
import MyVideo from "./assets/video/MyVideo.MP4";
import ParaSea from "./assets/video/ParaSea.mp4";
import Paragliding from "./assets/video/Paragliding.mp4";
import VideoPlayer from "./VideoPlayer.js";

export default class App extends React.Component {
  constructor(props) {
      super(props);

      this.state ={
        modal:{
            show: false,
            data:[],
        },

        foto:[
          {id:1, src :pic1},
          {id:2, src :pic2},
          {id:3, src :pic3},
          {id:4, src :pic4},
          {id:5, src :pic5},
        ],

        locationImgs:[
          {id:1, src :pic1, title:"PARANG"},
          {id:2, src :pic2, title:"CLOPOTIVA"},
          {id:3, src :pic3, title:"BRASOV"},
          {id:4, src :pic4, title:"BAIA MARE"},
          {id:5, src :pic5, title:"CRAIOVA"},
        ],
        contact:[
          {phone: "+40 0740 00 01 09", 
          email:"south-paragliding@gmail.com"}
        ],

        videos:[
          {id:"1", src: MyVideo, title:"Paragliding"},
          {id:"2", src: ParaSea, title:"Paragliding"},
          {id:"3", src: Paragliding, title:"Paragliding"}
         ],
        
        videoTryout:[
          {src:ParaSea, id:"1"}
        ] 
        // contentToShow: false
      };
      this.setContent = this.setContent.bind(this);
      this.displayModal = this.displayModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
  }
  closeModal = () => {
    this.setState({
      modal:{
      show: false
      }
    });
  };

  displayModal = (event) => { 
    console.log('contentType:: ', event);
    let data = false;
    //value vine de pe button className = "buton" variant="light" onClick={this.showCarouselLocationsModal} value="locations" (daca il pui)
    switch(event.target.value) { 
      case 'foto': {
        data = <ReusableCarousel items ={this.state.foto}/>;
        break;
      }
      case 'locations': {
        data = <LocationsCarousel items ={this.state.locationImgs}/>;
        break;
      }
      case 'video': {
        data = <VideoCarousel items ={this.state.videos}/>;
        break;
      }
      case 'contact': {
        data = <Contact items = {this.state.contact}/>;
        break;
      }
      default: 
        data =false;
        break;
    }
    if (data) {
      this.setState({
        modal:{
          show:true,
          data
        }
      })
    }
  }

  setContent(someContent) {
    console.log('someContent:: ', someContent);
    let data = false;
    switch(someContent) { 
      case 'foto': {
        data = <ReusableCarousel items ={this.state.foto}/>;
        break;
      }
      case 'locations': {
        data = <LocationsCarousel items ={this.state.locationImgs}/>;
        break;
      }
      case 'video': {
        data = <VideoCarousel items ={this.state.videos}/>;
        break;
      }
      case 'contact': {
        data = <Contact items = {this.state.contact}/>;
        break;
      }
      default: 
        data =false;
        break;
    }
    if (data) {
      this.setState({
        modal:{
          show:true,
          data
        }
      })
    }    
  }

  render(){
    return (
      <div className="App">
        <div className="header">
            <Header showContent={this.setContent}/>
        </div>

        <div className="body">
          <MyModal 
          transparent = "true"
          fullWidth={true} 
          className="bodyModal"
          show={this.state.modal.show}
          data={this.state.modal.data}
          onHide={this.closeModal}
          />
        </div>


        <div className="footer">
            THIS IS THE FOOTER!
        </div>
      </div>
    );
  }
}
