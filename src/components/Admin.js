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
            data : [],
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
   
    setContent = (e,type) => {
        this.handleChange(e);
        type = e.target.value;
        console.log("type::", type)
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
                break;
            }  
        }
    }
    onSubmit = async (e) => {
        e.preventDefault();
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
                break;
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

    }

    render () {

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

