import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import mysql from "mysql";

import Home from "./components/Home.js";
import Admin from "./components/Admin.js";


export default class App extends React.Component {
 componentDidMount() {
   console.log("componentDidMount::")
    // var connection = mysql.createConnection({
    //   host: 'localhost',
    //   user: 'root',
    //   password: 'my-secret-pw',
    //   database: 'southParagliding',
    // });
    
    // // Connect to database.
    // connection.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    //   });
 }

  render() {
    return (
      <Router>
      <div className = "body" >
          <nav className="routes">
            <ul>
            <li key = 'SP-homepage' >
                <Link to='/'>South-Paragliding</Link>
              </li>
              <li key = 'admin' >
                <Link to='/admin'>Admin</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/admin" component={Admin}/>
            <Route path="/" component={Home}/>
          </Switch>
        </div>
      </Router>
    );
  }
}














































// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import MyModal from "./components/MyModal.js";
// import Header from "./components/Header.js";
// import Contact from "./components/Contact.js";
// import PhotoCarousel from "./components/PhotoCarousel.js";
// import VideoCarousel from "./components/VideoCarousel";
// import LocationsCarousel from "./components/LocationsCarousel.js";
// import './SP.css';
// import pic1 from "./assets/Images/pic1.jpg";
// import pic2 from "./assets/Images/pic2.jpg";
// import pic3 from "./assets/Images/pic3.jpg";
// import pic4 from "./assets/Images/pic4.jpg";
// import pic5 from "./assets/Images/pic5.jpg";
// import MyVideo from "./assets/video/MyVideo.MP4";
// import ParaSea from "./assets/video/ParaSea.mp4";
// import Paragliding from "./assets/video/Paragliding.mp4";


// export default class App extends React.Component {
//   constructor(props) {
//       super(props);

//       this.state ={
//         // isMenuOpen: false,

//         modal:{
//             show: false,
//             data:[],
//         },

//         foto:[
//           {id:1, src :pic1},
//           {id:2, src :pic2},
//           {id:3, src :pic3},
//           {id:4, src :pic4},
//           {id:5, src :pic5},
//         ],

//         locationImgs:[
//           {id:1, src :pic1, title:"PARANG"},
//           {id:2, src :pic2, title:"CLOPOTIVA"},
//           {id:3, src :pic3, title:"BRASOV"},
//           {id:4, src :pic4, title:"BAIA MARE"},
//           {id:5, src :pic5, title:"RANCA"},
//         ],

//         rezervari:[
//           {phone: "+40 757 985 068", 
//           email:"parapantatandem@gmail.com"}
//         ],

//         videos:[
//           {id:"1", src: MyVideo, title:"Paragliding"},
//           {id:"2", src: ParaSea, title:"Paragliding"},
//           {id:"3", src: Paragliding, title:"Paragliding"}
//          ]
//       };
//       this.setContent = this.setContent.bind(this);
//       this.closeModal = this.closeModal.bind(this);
//   }
//   closeModal = () => {
//     this.setState({
//       modal:{
//       show: false
//       }
//     });
//   };

//   setContent = (someContent) => {
//     let data = false;
//     switch(someContent) { 
//       case 'foto': {
//         data = <PhotoCarousel items ={this.state.foto}/>;
//         break;
//       }
//       case 'locations': {
//         data = <LocationsCarousel items ={this.state.locationImgs}/>;
//         break;
//       }
//       case 'video': {
//         data = <VideoCarousel items ={this.state.videos}/>;
//         break;
//       }
//       case 'rezervari': {
//         data = <Contact items = {this.state.rezervari}/>;
//         break;
//       }
//       default: 
//         data =false;
//         break;
//     }
//     if (data) {
//       this.setState({
//         modal:{
//           show:true,
//           data
//         }
//       })
//     }; 
//   }

//   render(){
//     return (
//       <div className="App">
//         <div className="header">
//           <Header showContent={this.setContent}/>
//         </div>

//         <div className="body">
//           <MyModal 
//           transparent = "true"
//           fullWidth={true} 
//           className="bodyModal"
//           show={this.state.modal.show}
//           data={this.state.modal.data}
//           onHide={this.closeModal}
//           />
//         </div>


//         <div className="footer">
//           <div className="socialMedia">
//             <a href = "https://www.facebook.com/zborcuparapantaranca">Follow Us</a>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
