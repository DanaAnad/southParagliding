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
import MyCustomModal from "../components/Home/MyCustomModal";
import '../CSS_files/SP.css';
import FbLogo from '../assets/SocialMedia/FbLogo.png';
import axios from 'axios';
import Loader from "react-loader-spinner";
import UrlApi from "../apiUrlConfig.js";


export default class Home extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        isLoading: true,
        modal:{
            show: false,
            data:[],
        },
        customModal:{
          show: false,
          data:[]
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

  closeCustomModal =() => {
    this.setState({
      customModal:{
        show: false,
        data:[]
      }
    })
  };

  componentDidMount= async () => {
    await this.getData();
    this.state.alldata.forEach((item) => {
      if(item.data.fileName) {
        const img = new Image();
        img.src = item.data.fileName;
      }
    });
      let background = this.state.alldata.filter(item => item.type === "backgrounds")
        const img = new Image();
        img.src = background[background.length-1].data.fileName;
        this.setState({
          backgroundImg: img.src,
        });
        const imgLogo = new Image();
        imgLogo.src = FbLogo;

        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap" as="style"/>;
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"/>
  };
 
  setContentByType = (type) =>  {
    let items = this.state.alldata.filter(row => row.type === type);
    const itemsData =  items.map(row => {return{data:row}});
    switch(type) {
      case 'news' : {
        return  <NewsCarousel title = {this.state.newsTitle} items = {itemsData} />
      }
      case 'foto': {
        return <PhotoCarousel items = {itemsData}  showPhotosFullScreen = {this.setContentForFullScreenCustomModal} />
      }
      case 'locatiidezbor': {
        return <LocationsCarousel items = {itemsData} />
      }
      case 'video': {
        return <VideoCarousel items = {itemsData} />
      }
      case 'rezervaricontact': {
        return <Contact items = {itemsData} />
      }
      default: 
        break;
    }
  };

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
  };
  
  getData = async () => {
    try {
      const {data} = await axios.get(UrlApi.data);
      let titluStiri = data && data.length ? data.filter(row => row.type === "newsTitle") : null;
        this.setState({
          alldata: [ ...data ],
          newsTitle: titluStiri[titluStiri.length-1].data.titluStiri,
          isLoading: false
        });
    }
    catch (e) {
      throw new Error("Error when fetching data from the server.");
    }
  };

  setContentForFullScreenCustomModal = (e) => {
    const imgSource = [e.target.src];
    imgSource.map((src, index) =>{
      return (
        this.setState({
          customModal : {
            show: true, 
            data:[
              <img src = {src} onClick={this.toggleFullScreenPhoto} onTouchEnd = {this.toggleFullScreenPhoto}
               className = "fullScreenPic"  alt = "fullScreen-foto" key={index}  />
            ]
          },
        })
      )
    });
  };

  render(e){
      const background = {
        backgroundImage:`url(${this.state.backgroundImg})`
      }
      const loaderStyle = {
        position: "fixed",
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)",
        fontSize:"3px"
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
        <div>
         {e ? 
          <p>{e.message}</p> : 
        <div>
          <link rel="preload" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap" as="style"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"/>
        <div className="Home" style= {background}>
          {this.state.customModal.show ?
            <MyCustomModal
              data={this.state.customModal.data}
              onHide={this.closeCustomModal}
            />  : null }
          <div className="header">
            <Header showContent={this.setContent}/>
          </div>
          <div className="body">
            <MyModal 
              centered
              transparent = "true"
              fullWidth={true} 
              show={this.state.modal.show}
              data={this.state.modal.data}
              onHide={this.closeModal}
            />
          </div>     
          <div className="footer">
            <div className="socialMedia">
              <a href = "https://www.facebook.com/zborcuparapantaranca"><img className ="socialMedia" src = {FbLogo} alt = "fbLogo"/></a>
            </div>
          </div>
        </div>
        </div>
      }
        </div>
      );
    }
  }
}
