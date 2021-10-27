import React from 'react';
import ShowDataFromApi from "../components/Admin/ShowDataFromApi.js";
import FileAttachment from "../components/Admin/FileAttachment.js";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allData:[],
            isButtonDisabled:true,
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
        file ?
            this.setState({
                file :file,
                isButtonDisabled:false,
            }) : this.setState({
                errors :[
                    ...this.state.errors,
                    {
                        error:"No file selected..."
                    }
                ], isButtonDisabled:true
            })
        
    }

    handleChange = (e) => {
        const value = e.target.value;
            this.setState({
                [e.target.name]: value
            });
            this.handleSubmitButton(e);
    } 

    resetInputs = () => {
        this.setState({titlu: "", description: "", status:0, email: "", phone: "", file:false});
    }

    handleFormValidation = (eventName, eventValue) => {
        console.log("eventName::", eventName);
        console.log("eventValue::", eventValue);
        switch(eventName) {
            case("titlu") : {
                eventValue.length !== 0 ? this.setState({isButtonDisabled:false}) :
                this.setState({
                    errors : [
                        ...this.state.errors,
                        { 
                            error: "Titlul este gol.",
                            field:eventName 
                        }
                    ], 
                    isButtonDisabled:true
                })  
                break;
            }
            case("description") :{
                eventValue.length !== 0 ? this.setState({isButtonDisabled:false}) : 
                this.setState({
                   errors :[
                        ...this.state.errors,
                        {
                            error:"Adauga o descriere.",
                            field:eventName
                        }
                    ],
                    isButtonDisabled:true
                })
                break;
            }
            case ("email") : {
                eventValue.length !== 0 ? this.setState({isButtonDisabled:false}) :
                this.setState({
                    errors :[
                         ...this.state.errors,
                         {
                             error:"Email-ul nu trebuie sa fie gol.",
                             field:eventName
                         }
                     ],
                     isButtonDisabled:true
                 })
                 break;
            }
            case ("phone") :{
                eventValue.length !== 0 ? this.setState({isButtonDisabled:false}) :
                this.setState({
                    errors :[
                         ...this.state.errors,
                         {
                             error:"Adauga un nr. de telefon.",
                             field:eventName
                         }
                     ],
                     isButtonDisabled:true
                 })
                 break;
            }
            case ("file") : {
                this.props.file.value ? this.setState({isButtonDisabled:false}) :
                this.setState({
                    errors :[
                         ...this.state.errors,
                         {
                             error:"Please attach a file.",
                             field:eventName
                         }
                     ],
                     isButtonDisabled:true
                 })
                 break;
            }
            default: 
                break;
        }
        console.log("stateErrors::", this.state.errors);
        const errToDelete = this.state.errors.findIndex(err => err.field === eventName);
            this.state.errors.map(err => 
                (err.field === eventName && eventValue.length !== 0) ? this.setState(state => {
                    this.state.errors.splice(errToDelete,1); 
                    return { errors : this.state.errors}
                }) : this.state.errors
            )
    }


   handleSubmitButton = (e) =>{
        let type = e.target.value;
        const {titlu, description, phone, email, file} = this.state;
        switch(type){
            case "newsTitle" : {
                if(titlu !==""){
                    this.setState({isButtonDisabled:false})
                }
                break;
            }
            case "backgrounds" : {
                if(file ){
                    this.setState({
                        isButtonDisabled:false
                    })
                }
                break;
            }
            case "news" : {
                if(titlu !== "" && description !== "" && file){
                    this.setState({
                        isButtonDisabled:false
                    })
                }
                break;
            }
            case "foto" : {
                if( file ){
                    this.setState({
                        isButtonDisabled:false
                    })
                }
                break;
            }
            case "video" : {
                if( file ){
                    this.setState({
                        isButtonDisabled:false
                    })
                }
                break;
            }
            case "locatiidezbor" : {
                if(titlu !== ""  && file ){
                    this.setState({
                        isButtonDisabled:false
                    })
                }
                break;
            }
            case "rezervaricontact" : {
                if(titlu !== "" && description !== "" && email !== "" && phone !== ""){
                    this.setState({
                        isButtonDisabled:false
                    })
                } 
                break;
            }
            default : 
                break;
        }
        this.handleFormValidation(e.target.name, e.target.value);
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
                this.state.titlu !== "" && this.setState({isButtonDisabled:false});
                break;
            }
            case 'news': {
                const {type, description, titlu, file} = this.state;
                formData.append('type', type);
                formData.append('description', description);
                formData.append('titlu', titlu);
                formData.append('attachedFile', file);
                formData.append('status', 1);
                data = formData;
                lastInsertedData = {
                    data: {
                        titlu: titlu,
                        description: description,
                        attachedFile: file,
                    },
                    status: "1",
                    type
                } 
                break;
            }
            case "backgrounds" :{
                const {type, file} = this.state;
                formData.append('type', type);
                formData.append('attachedFile', file);
                formData.append('status', 1);
                data = formData;
                lastInsertedData = {
                    data: {attachedFile: file},
                    status: "1",
                    type
                }  
                break;
            }
            case "foto" : {
                const {type, file} = this.state;
                formData.append('type', type);
                formData.append('attachedFile', file);
                formData.append('status', 1);
                data = formData;
                lastInsertedData = {
                    data: {attachedFile: file},
                    status: "1",
                    type
                } 
                break;
            }
            case 'video' :{
                const {type, file} = this.state;
                formData.append('attachedFile', file);
                formData.append('type', type);
                formData.append('status', 1);
                data = formData;
                lastInsertedData = {
                    data: {attachedFile: file},
                    status: "1",
                    type
                } 
                break;
            }
            case "locatiidezbor" : {
                const {type, titlu, file} = this.state;
                formData.append('type', type);
                formData.append('attachedFile', file);
                formData.append('titlu', titlu);
                formData.append('status', 1);
                data = formData;
                lastInsertedData = {
                    data: {
                        attachedFile: file,
                        titlu,
                    },
                    status: "1",
                    type
                } 
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
                lastInsertedData = {
                    data: {
                        titlu,
                        description,
                        phone,
                        email
                },
                    status: "1",
                    type
                } 
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
                    ],
                });
                console.log("thisallData::", this.state);
                this.resetInputs();
            } 
            catch (err) {console.log("error::", err.response);
                throw new Error("Ceva este in neregula. Verifica toate campurile...")
            }; 
    };

    render () {
        console.log("stateAll::", this.state);
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
            <Helmet>
                <title>South-Paragliding Admin</title>
            </Helmet>
                <Form onSubmit={this.onSubmit}>
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
                        {this.state.showTitle && <Form.Control required minLength={5} 
                            pattern = "[A-Za-z0-9\s]+" type="text" value={this.state.titlu} name="titlu" 
                            placeholder="Titlu..."  onChange={this.handleChange}/>
                        }
                        <br />
                        {this.state.showDescription && <Form.Control required minLength={25} type="textarea" 
                            value={this.state.description} name="description" pattern="[!-~\s]+"
                             placeholder="Informatii..." onChange={this.handleChange}/>}
                        <br />
                        {this.state.showFotos && <FileAttachment data = {this.state} name = "file" value = {this.state.file} cbf = {this.setFileUpload} />}
                        <br />
                        {this.state.showVideos && <FileAttachment data = {this.state} name = "file" value = {this.state.file} cbf = {this.setFileUpload} />}
                        <br />
                        {this.state.showEmail && <Form.Control required pattern="[A-Za-z0-9@._-]+" 
                            type="email" minLength={5} value ={this.state.email} name="email" 
                            placeholder="Enter email" onChange={this.handleChange}/> 
                        }
                        <br />
                        {this.state.showPhone && <Form.Control required type="tel" 
                            minLength={10} value ={this.state.phone} 
                            name='phone' placeholder="Phone nr..."  pattern="[(-:]+"  
                            onChange={this.handleChange}/>
                        }
                    </Form.Group>
                    <Button type="submit" disabled={this.state.isButtonDisabled}>Submit form</Button>
                </Form>
                <br /><br />
                {this.state.errors.length ? this.state.errors.map((errorObject, index) => {
                     return <span style = {errorStyle} key = {index}>{errorObject.error}<br /></span>
                 }) : null} <br />
                 <ShowDataFromApi data = {this.state} />
            </div>
        )
    }
}
