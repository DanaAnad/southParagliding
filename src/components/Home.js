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
import axios from 'axios';


export default class Home extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        modal:{
            show: false,
            data:[],
        },
        types:[
          'backgrounds','news','foto','video','locatiidezbor','rezervaricontact'
        ],
        alldata : [],
        backgroundImg:false,
        newsTitle: "",
        news:[],
        foto:[],
        locatiiDeZbor:[],
        rezervari:[],
        videos:[]
      };
      this.setContent = this.setContent.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.getData= this.getData.bind(this);
  }
  
  closeModal = () => {
    this.setState({
      modal:{
      show: false
      }
    });
  };

   componentDidMount= () => {
    this.getData();
   }
 
  setNewsContent = (type) => {
    let items = this.state.alldata.filter(row => row.type === type);
    items =  items.map(row => row.data);
    console.log("newsItems::", items);
     return  <NewsCarousel title = {this.state.newsTitle} items = {items} />
  } 
 
  setFotoContent = (type) =>{
    let items = this.state.alldata.filter(row => row.type === type);
    items = items.map( row => { return row.data});
    console.log("fotoItems::", items)
    return <PhotoCarousel items = {items}/>
  }

  setLocationsContent = (type) => {
    let items = this.state.alldata.filter(row => row.type === type);
    items = items.map(row => row.data);
    console.log("locationItems::", items)
    return <LocationsCarousel items = {items} />
  }

  setVideoContent = (type) => {
    let items = this.state.alldata.filter(row => row.type === type);
    items = items.map(row => row.data);
    console.log("videoItems::", items);
    return <VideoCarousel items = {items} />
  }

  setContactContent = (type) => {
    let items = this.state.alldata.filter(row => row.type === type);
    items = items.map(row => row.data);
    console.log("contactItems::", items);
    return <Contact items = {items} />
  }

  setContent = (type) => {
    let data = false;
    switch(type) { 
      case 'news' : {
        data = this.setNewsContent(type);
        break;
      }
      case 'foto': {
        data = this.setFotoContent(type);
        break;
      }
      case 'locatiidezbor': {
        data = this.setLocationsContent(type);
        break;
      }
      case 'video': {
        data = this.setVideoContent(type);
        break;
      }
      case 'rezervaricontact': {
        data = this.setContactContent(type);
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
    }; 
  }


  getData = async () => {
    const {data} = await axios.get(`http://ms.homens.tricu.ro/data`);
    console.log("allData", data);
      this.setState( { alldata: [ ...data ] } ); 
    let backgrounds = data.filter(row => row.type === "backgrounds");
    console.log("backgroundssGetData:::", backgrounds);
      this.setState({backgroundImg:backgrounds[backgrounds.length-1].data.fileName});
    let titluStiri = data.filter(row => row.type === "newsTitle");
    console.log("titluStiri::", titluStiri);
      this.setState({ newsTitle:titluStiri[titluStiri.length-1].data.titluStiri});
  }

  render(){
    const background = {
      backgroundImage:`url(${this.state.backgroundImg})`
    }

    return (
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
