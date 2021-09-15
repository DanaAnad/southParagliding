import React from 'react';
import ShowDataFromApi from "../components/Admin/ShowDataFromApi.js";
import FileAttachment from "../components/Admin/FileAttachment.js";
// import DataValidation from '../components/Admin/DataValidation.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allData:[],
            isUploaded:false,
            showTitle:false,
            showDescription:false,
            showFotos:false,
            showVideos:false,
            showEmail:false,
            showPhone:false,
            errors:[],
            titlu:"",
            description:"",
            email:"",
            phone:"",
            type : "",
            status:1,
            file: false,
        }    
    }

    componentDidMount = async () =>  {
      this.getAllData();
    }
    getAllData = async () => {
        const {data} = await axios.get(`http://ms.homens.tricu.ro/data`);
        this.setState({allData:data})
    }

    setFileUpload = (file) => {
        console.log("file::", file);
        console.log("fileType::", file.type);
        const acceptedFiles = ["image/jpeg", "image/png", "image/jpg", "video/mp4"];
        if(!acceptedFiles.includes(file.type)){
            this.setState({
                errors : [
                    ...this.state.errors,
                    {
                    error: "Te rog ataseaza un fisier avand una din extensiile mentionate mai sus...",
                    // field:e.name
                    }
                ]
            })
        } else if(!file) {
            this.setState({
                errors : [
                    ...this.state.errors,
                    {
                    error: "Trenuie sa atasezi un fisier",
                    // field:e.name
                    }
                ]
            })
        } else {
            this.setState({
                file :file
            })
        }
    }

    handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            });
            this.handleValidation(e.target.name, e.target.value); 
    } 

    resetInputs = () => {
        this.setState({titlu: "", description: "", status:0, email: "", phone: ""})
    }

    handleValidation = (eventName, eventValue) => {
        console.log("eventName::", eventName);
        console.log("eventValue::", eventValue);
        switch(eventName) {
            case("titlu") : {
                eventValue.length === 0 && this.setState({
                    errors : [
                        ...this.state.errors,
                        { 
                            error: "Title must not be empty",
                            field:eventName 
                        }
                    ]
                })
                break;
            }
            case("description") :{
                eventValue.length === 0 && this.setState({
                   errors :[
                        ...this.state.errors,
                        {
                            error:"Please add a description.",
                            field:eventName
                        }
                    ]
                })
                break;
            }
            case ("email") : {
                eventValue.length === 0 && this.setState({
                    errors :[
                         ...this.state.errors,
                         {
                             error:"Email must not be empty.",
                             field:eventName
                         }
                     ]
                 })
                 break;
            }
            case ("phone") :{
                eventValue.length === 0 && this.setState({
                    errors :[
                         ...this.state.errors,
                         {
                             error:"Please add a phone number.",
                             field:eventName
                         }
                     ]
                 })
                 break;
            }
            case ("foto") : {
                console.log("eventValue::", eventValue);
                eventValue.length === 0 && this.setState({
                    errors :[
                         ...this.state.errors,
                         {
                             error:"Please attach a file.",
                             field:eventName
                         }
                     ]
                 })
                 break;
            }
            default: 
                this.errors = [];
                break;
        }
    }   


    setContent = (e) => {
        this.handleChange(e);
        let type =e.target.value;
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
                type= "";
                break;
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();   
        let data = [];
        let lastInsertedData = {};
        const formData = new FormData();
        const type =this.state.type;
        switch(type){
            case "newsTitle" :{
                const {titlu} = this.state;
                formData.append("type", type);
                formData.append('titluStiri', titlu);
                formData.append('status', 1);
                data = formData;
                lastInsertedData = {
                    data: {titluStiri: titlu},
                    status: "1",
                    type
                }  
                break;
            }
            case 'news': {
                const {type, description, titlu, file} = this.state;
                formData.append('type', type);
                formData.append('description', description);
                formData.append('titlu', titlu);
                formData.append('attachedFile', file);
                formData.append('status', 1);
                // if(!file){throw new Error("No attached file.Please attach a file and fill all the fiels before submitting...")}
                data = formData;
                break;
            }
            case "backgrounds" :{
                const {type, file} = this.state;
                formData.append('type', type);
                formData.append('attachedFile', file);
                formData.append('status', 1);
                // if(!file){throw new Error("No attached file.Please attach a file and fill all the fiels before submitting...")}
                data = formData;
                break;
            }
            case "foto" : {
                const {type, file} = this.state;
                formData.append('type', type);
                formData.append('attachedFile', file);
                formData.append('status', 1);
                // if(!file){throw new Error("No attached file.Please attach a file and fill all the fiels before submitting...")}
                data = formData;
                break;
            }
            case 'video' :{
                const {type, file} = this.state;
                formData.append('attachedFile', file);
                formData.append('type', type);
                formData.append('status', 1);
                // if(!file){throw new Error("No attached file.Please attach a file and fill all the fiels before submitting...")}
                data = formData;
                break;
            }
            case "locatiidezbor" : {
                const {type, titlu, file} = this.state;
                formData.append('type', type);
                formData.append('attachedFile', file);
                formData.append('titlu', titlu);
                formData.append('status', 1);
                // if(!file){throw new Error("No attached file.Please attach a file and fill all the fiels before submitting...")}
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
        };
        const url = 'http://ms.homens.tricu.ro/data';
        const headers = {
                    'Accept': '*/*',
                    "Content-Type": "multipart/form-data"
                };
        try {
            const response = await axios.post(url, data, headers);
            console.log("response::", response);
            response.status === 201 && (lastInsertedData.id = response.data.id);
            console.log("lastInsertedData::", lastInsertedData);
            this.setState({
                allData:[
                    ...this.state.allData, 
                    lastInsertedData
                ]
            });
            console.log("thisallData::", this.state);
            this.resetInputs();
        } 
            catch (err) {console.log("error::", err.response);
                throw new Error("Ceva este in neregula. Verifica toate campurile...")
            };  
            
    };

    render () {
        let formStyle = {
            width: '50%' ,
            margin: 'auto',
            textAlign: 'center',
        }
        let errorStyle = {
            fontSize:"25px",
            color:"red",
            textDecoration: 'underline'
        }
        return (
            <div className="adminForm" style = {formStyle}>
            {/* <DataValidation errors = {this.state.errors} handleChangeEvent = {this.handleChange}/> */}
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
                        {this.state.showTitle && <Form.Control type="text"  value={this.state.titlu} name="titlu" placeholder="Titlu..."  onChange={this.handleChange}/>}
                        <br />
                        {this.state.showDescription && <Form.Control as="textarea"  value={this.state.description} rows ={2} name="description" placeholder="Informatii..." onChange={this.handleChange}/>}
                        <br />
                        {this.state.showFotos && <FileAttachment  name = "foto" value = {this.state.fotos} cbf = {this.setFileUpload}/>}
                        <br />
                        {this.state.showVideos && <FileAttachment name = "video" value = {this.state.video} cbf = {this.setFileUpload}/>}
                        <br />
                        {this.state.showEmail && <Form.Control type="email" value ={this.state.email} name="email" placeholder="Enter email" onChange={this.handleChange}/> }
                        <br />
                        {this.state.showPhone && <Form.Control type="phone"  value ={this.state.phone} name='phone' placeholder="Phone nr..." onChange={this.handleChange}/>}
                    </Form.Group>
                    <Button type="submit" onClick={this.onSubmit}>Submit form</Button>
                </Form>
                <br /><br />
                {this.state.errors.length ? this.state.errors.map((errorObject, index) => {
                     return <span style = {errorStyle} key = {index}>{errorObject.error}<br /></span>
                 }) : null} <br />
                {this.state.isUploaded && <p>Datele au fost trimise cu succes catre DB.</p> }
                 <ShowDataFromApi data = {this.state} />
            </div>
        )
    }
}

