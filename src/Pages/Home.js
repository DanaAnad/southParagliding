import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import MyModal from "../components/Home/MyModal.js";
import Header from "../components/Home/Header.js";
import Contact from "../components/Home/Contact.js";
import NewsCarousel from "../components/Home/News.js";
import PhotoCarousel from "../components/Home/PhotoCarousel.js";
import VideoCarousel from "../components/Home/VideoCarousel";
import LocationsCarousel from "../components/Home/LocationsCarousel.js";
import '../SP.css';
import FbLogo from '../assets/SocialMedia/FbLogo.png';
import axios from 'axios';
import Loader from "react-loader-spinner";


export default class Home extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        isLoading: true,
        modal:{
            show: false,
            data:[],
        },
        types:[
          'backgrounds','news','foto','video','locatiidezbor','rezervaricontact'
        ],
        alldata : [],
        backgroundImg:false,
      };
      this.setContent = this.setContent.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.getData= this.getData.bind(this);
  }
  
  closeModal = () => {
    this.setState({
      modal:{
      show: false,
      data:[]
      }
    });
  };

  componentDidMount= async () => {
    await this.getData();
    this.state.alldata.forEach((picture) => {
      const img = new Image();
      img.src = picture.data.fileName;
      console.log("image:Home:", img); 
  });
  }
 

  setContentByType = (type) =>  {
    let items = this.state.alldata.filter(row => row.type === type);
    items =  items.map(row => row.data);
    switch(type) {
      case 'news' : {
        return  <NewsCarousel title = {this.state.newsTitle} items = {items} />
      }
      case 'foto': {
        return <PhotoCarousel items = {items}/>
      }
      case 'locatiidezbor': {
        return <LocationsCarousel items = {items} />
      }
      case 'video': {
        return <VideoCarousel items = {items} />
      }
      case 'rezervaricontact': {
        return <Contact items = {items} />
      }
      default: 
        break;
    }
  }

  setContent = (type) => {
    let data = false;
    switch(type) { 
      case 'news' : {
        data = this.setContentByType(type);
        break;
      }
      case 'foto': {
        data = this.setContentByType(type);
        break;
      }
      case 'locatiidezbor': {
        data = this.setContentByType(type);
        break;
      }
      case 'video': {
        data = this.setContentByType(type);
        break;
      }
      case 'rezervaricontact': {
        data = this.setContentByType(type);
        break;
      }
      default: 
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


  getData = async () => {
    const {data} = await axios.get(`http://ms.homens.tricu.ro/data`);
    console.log("allData", data);
    let backgrounds = data.filter(row => row.type === "backgrounds");
    console.log("backgroundssGetData:::", backgrounds);
    let titluStiri = data.filter(row => row.type === "newsTitle");
      this.setState({
        alldata: [ ...data ],
        backgroundImg: backgrounds[backgrounds.length-1].data.fileName,
        newsTitle: titluStiri[titluStiri.length-1].data.titluStiri,
        isLoading: false
      });
  }

  
  render(){
    console.log("alldata::", this.state.alldata);
    const background = {
      backgroundImage:`url(${this.state.backgroundImg})`
    }
    const loaderStyle = {
       position: "fixed",
       top: "50%", 
       left: "50%", 
       transform: "translate(-50%, -50%)"
    }
   if(this.state.isLoading===true){
    return (
      <Loader style = {loaderStyle}
        type="TailSpin"
        color="Black"
        height={85}
        width={85}
        timeout={10000}
        radius={10}
      />
    )
   } else {
    return (
      <div className="Home" style= {background}>
        <div className="header">
          <Header showContent={this.setContent}/>
        </div>

        <div className="body">
          <MyModal 
          transparent = "true"
          fullWidth={true} 
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
}