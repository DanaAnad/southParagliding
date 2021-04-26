import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyModalComponent from "./components/myModal.js";
// import { button } from 'react-bootstrap';
import Header from "./components/headerDesktop.js";
import Header1 from "./components/headerDesktop1.js";
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
        //contact trebuie sa fie el o componenta, e urat cum ai facut aici, sa ti markup pe state
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

        contentToShow: false
      };
      this.setContent = this.setContent.bind(this);
      this.displayModal = this.displayModal.bind(this); //bind la nici o functie in constructor,ma mir ca merge ( f urat)
      this.showCarouselVideoModal = this.showCarouselVideoModal.bind(this);
      this.showContactModal = this.showContactModal.bind(this);
      this.showPozeCarouselModal = this.showPozeCarouselModal.bind(this);
      this.showCarouselLocationsModal = this.showCarouselLocationsModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
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
//asa se face , nu fiecare buton cu o functie idnetica cu celalta. dai un pramatru , sau mai multi care sa schimbe ce ai nevoie, dar structura sa ramana similara.
  displayModal = (event) => { //functia asta primeste un event (ca dai click- auomat se creeaza eventul asta, de fiecare data, tot timpul)
    console.log('contentType:: ', event);
    let data = false;
    //value vine de pe button className = "buton" variant="light" onClick={this.showCarouselLocationsModal} value="locations" (daca il pui)
    switch(event.target.value) { 
      case 'locations': {
        data = <ReusableCarousel items ={this.state.locationImgs}/>;
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
      //value vine de pe button className = "buton" variant="light" onClick={this.showCarouselLocationsModal} value="locations" (daca il pui)
    switch(someContent) { 
      case 'locations': {
        data = <ReusableCarousel items ={this.state.locationImgs}/>;
        break;
      }
      case 'foto': {
        data = <ReusableCarousel items ={this.state.images}/>;
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
            <Header/>
            <Header1 showContent={this.setContent}/>
            
          <div className = "navBar"> {/* https://react-bootstrap.github.io/components/navs/  &  https://react-bootstrap.github.io/components/navbar/ aceeasi problema ca mai jos la ***  */}
          {/* //toate butoanele trebuie sa fie in header , nu? headerul nu se schimba.
            Componeta header trebuie sa admnisitreze stateul componentei App, si App dicteaza contentul modalului in functie de ce a setat componetat header pe state.
            Am creeat Header1 ca exemplu
            */}
          
            <div className="butoane">
            {/* ***daca folosesti chestii de boostrap folostele corect, ai Button din bootstrap(cu B mare :) - nu se amesteca taguri html cu stiluri de boostrap, ci folosesti direct componenta de boostrap ) https://react-bootstrap.github.io/components/buttons/ */}
              <button className = "buton light" variant="light" onClick={this.showModal} > {/* cinei showmdal ?? Home este prrety useless */}
              HOME
              </button>
              {/* de ce folosim care 3 functii separate pentru aceeasi chestie?  am creeat displayModal ca exemplu*/}
              <button className = "buton" variant="light" onClick={this.showPozeCarouselModal} >
              FOTO
              </button>
              <button className = "buton" variant="light" onClick={this.showCarouselVideoModal}>
              VIDEO
              </button>
              <button className = "buton" variant="light" onClick={this.showCarouselLocationsModal} value="locations">
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
          onClick={this.closeModal} //de ce ai asta de 2x? e folosit doar in hide
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
