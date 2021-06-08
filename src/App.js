import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyModalComponent from "./components/MyModal.js";
// import { button } from 'react-bootstrap';
import Header from "./components/headerDesktop.js";
import contactLogo from "./assets/icons/contactIcon.png";
import ReusableCarousel from "./components/carousel.js";
import VideoCarousel from "./components/VideoCarousel";
import './SP.css';
// import "./mainApp.css";
import pic1 from "./assets/Images/pic1.jpg";
import pic2 from "./assets/Images/pic2.jpg";
import pic3 from "./assets/Images/pic3.jpg";
import pic4 from "./assets/Images/pic4.jpg";
import pic5 from "./assets/Images/pic5.jpg";
import MyVideo from "./assets/video/MyVideo.MP4";
import ParaSea from "./assets/video/ParaSea.mp4";
import Paragliding from "./assets/video/Paragliding.mp4";


export default class App extends React.Component {
  constructor(props) {
      super(props);

      this.state ={
        modal:{
            show: false,
            data:[],
        },

        images:[
          {id:1, src :pic1},
          {id:2, src :pic2},
          {id:3, src :pic3},
          {id:4, src :pic4},
          {id:5, src :pic5},
        ],

        locationImgs:[
            {id:1, src :pic1, title:"Parang"},
            {id:2, src :pic2, title:"Clopotiva"},
            {id:3, src :pic3, title:"Brasov"},
            {id:4, src :pic4, title:"Baia Mare"},
            {id:5, src :pic5, title:"Craiova"},
        ],

        contact:[
          <div className= "contactIconContainer">
            <img alt="logo" className = "contactIcon" src = {contactLogo}/>
          </div>,
          <div className = "contactText">
            <span >PROGRAMARE <br /><br /> Echipa noastra este gata <br />sa iti preia apelul. <br /> <br />+40 0740 00 01 09 </span>
          </div>
        ],

        videos:[
          {id:"1", src: MyVideo, title:"Paragliding"},
          {id:"2", src: ParaSea, title:"Paragliding"},
          {id:"3", src: Paragliding, title:"Paragliding"}
         ],
      }
  }

  showCarouselVideoModal = () => {
    this.setState({
      modal:{
        show:true,
        data:<VideoCarousel items = {this.state.videos}/>
      }
    })
  };

  showContactModal = () => {
    this.setState({ 
      modal:{
        show:true,
        data:this.state.contact
      }
    })
  };

  showPozeCarouselModal = () =>{
      this.setState({
        modal:{
          show:true,
          data:<ReusableCarousel items ={this.state.images}/>
        }
      })   
    }

  showCarouselLocationsModal = () =>{
    this.setState({
      modal:{
        show:true,
        data:<ReusableCarousel items ={this.state.locationImgs}/>
      }
    })
  }

  closeModal = () => {
    this.setState({
      modal:{
      show: false
      }
    });
  };

  render(){
    return (
      <div className="App">
        <div className="header">
            <Header/>
          <div className = "navBar">
            <div className="butoane">
              <button className = "buton light" variant="light" onClick={this.showModal} >
              HOME
              </button>
              <button className = "buton" variant="light" onClick={this.showPozeCarouselModal} >
              FOTO
              </button>
              <button className = "buton" variant="light" onClick={this.showCarouselVideoModal}>
              VIDEO
              </button>
              <button className = "buton" variant="light" onClick={this.showCarouselLocationsModal}>
              LOCURI DE ZBOR
              </button>
              <button className = "buton" variant="light" onClick={this.showContactModal} >
              CONTACT
              </button> 
            </div>,
          </div>
        </div>

      
        <div className="body">
          <MyModalComponent 
          transparent = "true"
          fullWidth={true} 
          className="bodyModal"
          show={this.state.modal.show}
          data={this.state.modal.data}
          onClick={this.closeModal}
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
