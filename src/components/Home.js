import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyModal from "../components/MyModal.js";
import Header from "../components/Header.js";
import Contact from "../components/Contact.js";
import NewsCarousel from "../components/News.js";
import PhotoCarousel from "../components/PhotoCarousel.js";
import VideoCarousel from "../components/VideoCarousel";
import LocationsCarousel from "../components/LocationsCarousel.js";
import '../SP.css';
import FbLogo from '../assets/SocialMedia/FbLogo.png';
import desktopBackground from "../assets/Background/desktopBackground.png";
import pic1 from "../assets/Images/pic1.jpg";
import pic2 from "../assets/Images/pic2.jpg";
import pic3 from "../assets/Images/pic3.jpg";
import pic4 from "../assets/Images/pic4.jpg";
import pic5 from "../assets/Images/pic5.jpg";
import MyVideo from "../assets/video/MyVideo.MP4";
import ParaSea from "../assets/video/ParaSea.mp4";
import Paragliding from "../assets/video/Paragliding.mp4";


export default class Home extends React.Component {

  constructor(props) {
      super(props);

      this.state ={
        windowWidth: window.innerWidth,

        modal:{
            show: false,
            data:[],
        },
        backgroundImg:{src:desktopBackground},

        // backgroundImgMob:{src:poza3},

        newsTitle: "Program si anunturi ",

        news:[
          {src:pic1, title:"Vara 2021", text:"Vremea este numai buna de zbor, asa ca in weekendul acesta va asteptam la distractie!"},
          {src:pic2, title:"Sezon 2021", text:"Vremea buna a venit, asa ca in weekendul asta se zboara. Va asteptam!"},
          {src:pic3, title:"Scoala de parapantism", text:"Vrei sa inveti sa zbori cu parapanta? Intra in contact cu noi pt a face o programare."}
        ],

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
          {id:5, src :pic5, title:"RANCA"},
        ],

        rezervari:[
          {
            title:"PROGRAMARI",
            text:<span>Echipa noastra este gata <br /> sa intre in contact cu tine.</span>,
            phone: "+40 757 985 068", 
            email:"parapantatandem@gmail.com"
          }
        ],

        videos:[
          {id:"1", src: MyVideo, title:"Paragliding"},
          {id:"2", src: ParaSea, title:"Paragliding"},
          {id:"3", src: Paragliding, title:"Paragliding"}
         ]
      };
      this.setContent = this.setContent.bind(this);
      this.closeModal = this.closeModal.bind(this);
  }
  closeModal = () => {
    this.setState({
      modal:{
      show: false
      }
    });
  };



   handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
   };
  
   componentDidMount= () => {
    window.addEventListener("resize", this.handleResize);
   }
  
   componentWillUnMount= () => {
    window.addEventListener("resize", this.handleResize);
   } 


  setContent = (someContent) => {
    let data = false;
    switch(someContent) { 
      case 'news' : {
        data = <NewsCarousel title = {this.state.newsTitle} items = {this.state.news} />;
        break;
      }
      case 'foto': {
        data = <PhotoCarousel items ={this.state.foto}/>;
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
      case 'rezervari': {
        data = <Contact items = {this.state.rezervari}/>;
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
    }; 
  }

  

  render(){
    const background = {
      backgroundImage:`url(${this.state.backgroundImg.src})`,
    }

    // const mobileImgStyle = {
    //   backgroundImage: `url(${this.state.backgroundImgMob.src})`,
    // }

  const { windowWidth } = this.state; 

    return (
      // <div className="Home" style= {windowWidth >= 480 ? desktopImgStyle : mobileImgStyle}>
      <div className="Home" style= {background}>
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
          <div className="socialMedia">
            <a href = "https://www.facebook.com/zborcuparapantaranca"><img className ="socialMedia" src = {FbLogo} alt = "followUs"/></a>
          </div>
        </div>
      </div>
    );
  }
}
