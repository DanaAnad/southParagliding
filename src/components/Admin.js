import React from 'react';
import Picture from "./pictureToBase64.js";
import Video from "./videoToBase64.js";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
            email:"",
            phone:"",
            type : "",
            file: false,
        }    
    }
    
    getFotos = (pic)=> {
        console.log("poza de bagat in db::", pic)
         this.setState({
            file:pic,
        })
    } 
     
    getVideos = (video)=> {
        console.log("video de bagat in db::", video)
        this.setState({
            file: video
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
            case"newsTitle" : {
                this.setState({showTitle: true, showDescription:false, showVideo:false, showPhone:false, showEmail:false, showFotos:false});
                break;
            }
            case "backgrounds" : {
                this.setState({showFotos: true, showDescription:false, showPhone:false, showEmail:false, showTitle:false, showVideos:false});
                break;
            }
            case "news" : {
                this.setState({showNewsTitle:true, showTitle:true, showDescription:true, showFotos:true, showVideo:false, showPhone:false, showEmail:false})
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
            default:
                type= false;
                break;
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.setContent(e);     
        console.log("submitState::", this.state);
        console.log("typeSelected::", this.state.type)
        let data = [];
        const formData = new FormData();
        switch(this.state.type){
            case "newsTitle" :{
                const {type, titlu} = this.state;
                formData.append("type", type);
                formData.append('titluStiri', titlu);
                formData.append('status', 1);
                data = formData;
                break
            }
            case 'news': {
                const {type, description, titlu, file} = this.state;
                formData.append('type', type);
                formData.append('description', description);
                formData.append('titlu', titlu);
                formData.append('attachedFile', file);
                formData.append('status', 1);
                data = formData;
                break;
            }
            case "backgrounds" :{
                const {type, file} = this.state;
                formData.append('type', type);
                formData.append('attachedFile', file);
                formData.append('status', 1);
                data = formData;
                break;
            }
            case "foto" : {
                const {type, file} = this.state;
                formData.append('type', type);
                formData.append('attachedFile', file);
                formData.append('status', 1);
                data = formData;
                break;
            }
            case 'video' :{
                const {type, file} = this.state;
                formData.append('attachedFile', file);
                formData.append('type', type);
                formData.append('status', 1);
                data = formData;
                break;
            }
            case "locatiidezbor" : {
                const {type, titlu, file} = this.state;
                formData.append('type', type);
                formData.append('attachedFile', file);
                formData.append('titlu', titlu);
                formData.append('status', 1);
                data = formData;
                break;
            }
            case "rezervaricontact" : {
                const {type, titlu, description, phone, email} = this.state;
                formData.append('type', type);
                formData.append('titlu', titlu);
                formData.append('description', description);
                formData.append('phone', phone);
                formData.append('email', email);
                formData.append('status', 1);
                data = formData;
                break;
            }
            default:
                data = {};
                break;
        }
         axios({
            method: "POST",
            headers: {
                'Accept': '*/*',
                // "Content-Type": "application/json"
                "Content-Type": "multipart/form-data"
            },
            data,
            url : 'http://ms.homens.tricu.ro/data'
          })
            .then(
                (response) => {
                console.log("Response::",response.data);
                console.log("Response:2:", response.config)
                response.status===201 && alert("success");
                
            })
            .catch((error) => {
              console.log("catchErrResp::",error);
            });


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
                    <Form.Group controlId="Admin Form" >
                        <br />
                        <Form.Control as="select" size="sm" name="type" onChange={(e)=>this.setContent(e)}> 
                            <option value="ChoseSection">Alege sectiunea...</option>
                            <option value='backgrounds'>Backgrounds</option>
                            <option value="newsTitle">News Title</option>
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
                        {this.state.showFotos && <Picture cbf = {this.getFotos}/>}
                        <br />
                        {this.state.showVideos && <Video cbf = {this.getVideos}/>}
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

