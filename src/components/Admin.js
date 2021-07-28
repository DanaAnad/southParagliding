import React from 'react';
import Picture from "./pictureToBase64.js";
import Video from "./videoToBase64.js";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import mysql from 'mysql';
import axios from 'axios';



export default class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
<<<<<<< HEAD
            // htmlTags: {
            //     showTitle:false,
            //     showDescription:false,
            //     showFotos:false,
            //     showVideos:false,
            //     showEmail:false,
            //     showPhone:false,                
            // },
            data : [],
=======
            htmlTags: {
                showTitle:false,
                showDescription:false,
                showFotos:false,
                showVideos:false,
                showEmail:false,
                showPhone:false,                
            },
            data2Upload : [],
>>>>>>> 6ba7d5a2e6f44603906f590ae76b0ef272edbbf4
            status : false,
            showTitle:false,
            showDescription:false,
            showFotos:false,
            showVideos:false,
            showEmail:false,
            showPhone:false,
            titlu:"",
            description:"",
            fotos :"",
            videos : "",
            email:"",
            phone:"",
            type : "",
        }    
    }
    
    getFotos = (pic)=> {
        console.log("poza de bagat in db::", pic)
         this.setState({
            fotos:pic
        })
    } 
     
    getVideos = (video)=> {
        console.log("video de bagat in db::", video)
        this.setState({
            videos:video
        })
    } 

    handleChange = (e) =>{
            this.setState({
                [e.target.name]: e.target.value
            })      
    } 
<<<<<<< HEAD
  
=======
     
    // handleDataType = (e) =>{
    //         this.handleChange(e);
    //         // this.setContent();
    //         // console.log('type::', e.target.value);
    //         e.target.value === 'backgrounds' && this.setState({showFotos: true});
    //         e.target.value === "news" && this.setState({showTitle:true, showDescription:true, showFotos:true});
    //         e.target.value === "foto" && this.setState({showFotos:true});
    //         e.target.value === 'video' && this.setState({showVideos:true});
    //         e.target.value === 'locatiidezbor' && this.setState({showTitle: true, showFotos:true});
    //         e.target.value === 'rezervaricontact' && this.setState({ showTitle: true, showDescription:true, showPhone:true, showEmail:true});
    // } 
>>>>>>> 6ba7d5a2e6f44603906f590ae76b0ef272edbbf4
 
    //seState based on type selected
    // functii de populat db si de laut din db
    //auth admin
    //master branch remote vs local
 
   
    setContent = (e,type) => {
        this.handleChange(e);
        type = e.target.value;
        console.log("type::", type)
<<<<<<< HEAD
        switch(type) {
            case "backgrounds" : {
                this.setState({showFotos: true, showDescription:false, showPhone:false, showEmail:false, showTitle:false, showVideos:false});
                break;
            }
            case "news" : {
                this.setState({showTitle:true, showDescription:true, showFotos:true, showVideo:false, showPhone:false, showEmail:false})
                break;
            }
            case "foto" : {
                this.setState({showFotos:true, showVideos:false, showDescription:false, showPhone:false, showEmail:false, showTitle:false})
                break;
            }
            case "video" : {
                this.setState({showVideos:true, showFotos:false, showTitle:false, showEmail:false, showPhone:false, showDescription:false})
                break;
            } 
            case "locatiidezbor" : {
                this.setState({showTitle: true, showFotos:true, showDescription:false, showPhone:false, showEmail:false, showVideos:false})
                break;
            } 
            case "rezervaricontact" : {
                this.setState({ showTitle: true, showDescription:true, showPhone:true, showEmail:true, showFotos:false, showVideos:false});
=======

        switch(type) {
            case "backgrounds" : {
                this.setState({showFotos: true})
                break;
            }
            case "news" : {
                this.setState({showTitle:true, showDescription:true, showFotos:true})
                break;
            }
            case "foto" : {
                this.setState({showFotos:true})
                console.log("data:foto:", data);
                break;
            }
            case "video" : {
                this.setState({showVideos:true})
                console.log("data:video:", data);
                break;
            } 
            case "locatiidezbor" : {
                this.setState({showTitle: true, showFotos:true})
                console.log("data:locatii:", data);
                break;
            } 
            case "rezervaricontact" : {
                this.setState({ showTitle: true, showDescription:true, showPhone:true, showEmail:true});
                console.log("data:rezervari:", data);
>>>>>>> 6ba7d5a2e6f44603906f590ae76b0ef272edbbf4
                break;
            }  
        }
<<<<<<< HEAD
=======
        if (data.length !==0) {
            this.setState({
              data2Upload: data
            }, function () {console.log("data2Upload::", this.data2Upload)}) 
          }
>>>>>>> 6ba7d5a2e6f44603906f590ae76b0ef272edbbf4
    }

    onSubmit = async (e) => {
        e.preventDefault();
<<<<<<< HEAD
        this.setContent(e);       
        console.log("submitState::", this.state);
        console.log("typeSelected::", this.state.type)
        let data = this.state.data;
        switch(this.state.type){
            case 'news': {
                const {type, description, titlu, fotos} = this.state;
                const newsData = {
                    type: type,
                    data:{
                        description, titlu, fotos
                    },
                    status:true
                }
                data = {...newsData};
                break;
            }
            case "backgrounds" :{
                const {type, fotos} = this.state;
                const backgroundData = {
                    type:type,
                    data:{
                        type, 
                        data :{
                            fotos
                        }
                    },
                    status:true
                }
                data = {...backgroundData};
                break;
            }
            case "foto" : {
                const {type, fotos} = this.state;
                const fotoData = {
                    type: type,
                    data:{
                        type,
                        data: {
                            fotos
                        }
                    },
                    status:true
                }
                data = {...fotoData};
                break;
            }
            case 'video' :{
                const {type, videos} = this.state;
                const videoData = {
                    type: type,
                    data: {
                        type,
                        data :{ 
                            videos
                        }
                    },
                    status:true
                }
                data = {...videoData};
                break;
            }
            case "locatiidezbor" : {
                const {type, titlu, fotos} = this.state;
                const locationsData = {
                    type: type,
                    data:{
                        data :{
                            titlu, fotos
                        }
                    },
                    status:true
                }
                data = {...locationsData};
                break;
            }
            case "rezervaricontact" : {
                const {type, titlu, description, phone, email} = this.state;
                const contactData = {
                    type: type,
                    data :{
                        titlu, description, phone, email
                    },
                    status:1
                }
                data = {...contactData};
            }
        }
        await axios({
            method: "POST",
            headers: {
                'Accept': '*/*',
                "Content-Type": "application/json"
            },
            body:data,
            url : 'http://ms.homens.tricu.ro/data'
          })
            .then(
                console.log("dataToUpload:axios:", data),
                (response) => {
                console.log("Response::",response);
            })
            .catch((error) => {
              console.log("catchErrResp::",error);
            });

        // await axios.post(url,{data}, {headers:headers})
        // .then(
        //     console.log("dataToUpload:axios:", data),
        //     (response) => {
        //    console.log("ResponseYes::", response)
        //   })
        //   .catch((error) => {
        //     console.log("error::", error)
=======
        this.setContent(e);
        
        console.log("submitState::", this.state);
        console.log("dataSubmit::", this.state.data2Upload);
        let data = {};
        switch(this.state.type){
            case 'news': {
                const {type, description, titlu, fotos } = this.state.type;
                const newsData = {
                    type: this.state.type,
                    data: {
                        type, 
                        data: {
                            description, titlu, fotos
                        }
                    }
                }
                data = {...newsData};
                break;
            }
        }

        // await axios.post(url, data, {headers: {}});
        // await axios({
        //     method: "post",
        //     url :'http://ms.homens.tricu.ro/data',
        //     body:this.state.data,
        //     headers: { "Content-Type": "application/x-www-form-urlencoded",
        //                 'Accept': '*/*' },
>>>>>>> 6ba7d5a2e6f44603906f590ae76b0ef272edbbf4
        //   })
    }

    render () {
        console.log("renderState::", this.state)
<<<<<<< HEAD
        // console.log("thisfotos::", this.state.fotos)
=======
        console.log("thisfotos::", this.state.fotos)
>>>>>>> 6ba7d5a2e6f44603906f590ae76b0ef272edbbf4

        let formStyle = {
            width: '50%' ,
            margin: 'auto',
            textAlign: 'center',
        }

        return (
            <div className="adminForm" style = {formStyle}>
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom" >
                        <br />
                        <Form.Control as="select" size="sm" name="type" onChange={(e)=>this.setContent(e)}> 
                            <option value="ChoseSection">Alege sectiunea...</option>
                            <option value='backgrounds'>Backgrounds</option>
                            <option value="news">News</option>
                            <option value='foto'>Foto</option>
                            <option value="video">Video</option>
                            <option value="locatiidezbor">Locatii zbor</option>
                            <option value="rezervaricontact">Rezervari/Contact</option>
                        </Form.Control>
                         <br /><br />
                        {this.state.showTitle && <Form.Control type="text" name="titlu" placeholder="Titlu..."  onChange={this.handleChange}/>}
                        <br />
                        {this.state.showDescription && <Form.Control as="textarea" rows ={2} name="description" placeholder="Informatii..." onChange={this.handleChange}/>}
                        <br />
                        {this.state.showFotos && <Picture cb = {this.getFotos}/>}
                        <br />
                        {this.state.showVideos && <Video cb = {this.getVideos}/>}
                        <br />
                        {this.state.showEmail && <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleChange}/> }
                        <br />
                        {this.state.showPhone && <Form.Control type="phone" name='phone' placeholder="Phone nr..." onChange={this.handleChange}/>}
                    </Form.Group>
                    <Button type="submit" onClick={this.onSubmit}>Submit form</Button>
                </Form>
            </div>
        )
    }
}

