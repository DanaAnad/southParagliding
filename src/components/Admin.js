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
            showTitle:false,
            showDescription:false,
            showFotos:false,
            showVideos:false,
            showEmail:false,
            showPhone:false,
            data : {},
            titlu:"",
            description:"",
            fotos :"",
            videos : "",
            email:"",
            phone:"",
            type : "",
            status : false,
        }      
    }
    

    handleChange = (e) =>{
                this.setState({
                  [e.target.name]: e.target.value})      
    } 
            
    handleDataType = (e) =>{
            this.handleChange(e);
            this.setContent(e.target.value);
            // console.log('type::', e.target.value);
            e.target.value === 'backgrounds' && this.setState({showFotos: true});
            e.target.value === "news" && this.setState({showTitle:true, showDescription:true, showFotos:true});
            e.target.value === "foto" && this.setState({showFotos:true});
            e.target.value === 'video' && this.setState({showVideos:true});
            e.target.value === 'locatiidezbor' && this.setState({showTitle: true, showFotos:true});
            e.target.value === 'rezervaricontact' && this.setState({ showTitle: true, showDescription:true, showPhone:true, showEmail:true});
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
   
    setContent = (type) => {
        let data = false;
        switch(type) {
            case "backgrounds" : {
                data = this.state.fotos;
                break;
            }
            case "news" : {
                data = {...this.state.titlu,...this.state.description, ...this.state.fotos};
                break;
            }
            case "foto" :{
                data =  {...this.state.fotos};
                break;
            }
            case "video" :{
                data =  {...this.state.videos};
                break;
            } 
            case "locatiidezbor" :{
                data =  {...this.state.fotos, ...this.state.titlu};
                break;
            } 
            case "rezervaricontact" :{
                data =  {...this.state.titlu,...this.state.description, ...this.state.email, ...this.state.phone};
                break;
            }
            default: 
                data =false;
                break;    
        }
        if (data) {
            // console.log("dataContent::", data)
            this.setState({
              data: {...data}
            })
          }; 
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.setContent();
        
        // this.data={...this.titlu, ...this.description, ...this.fotos, ...this.phone, ...this.email}; 
        console.log("submitState::", this.state);
        console.log("dataSumbState::", this.state.data);
        // await axios({
        //     method: "post",
        //     url :'http://ms.homens.tricu.ro/data',
        //     body:this.state.data,
        //     headers: { "Content-Type": "application/x-www-form-urlencoded",
        //                 'Accept': '*/*' },
        //   })
        //     .then(function (response) {
        //       console.log("RespResolved::",response.config.params);
        //     })
        //     .catch(function (response) {
        //       console.log("catchErrResp::",response);
        //     });
    }

    render () {
        console.log("renderState::", this.state)

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
                        <Form.Control as="select" size="sm" name="type" onChange={this.handleDataType}> 
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





// titlu description fotos videos type status
// Program si anunturi de zbor  desription basePic baseVideo news false =1 
// Program si anunturi de zbor  desription basePic baseVideo news
// Program si anunturi de zbor  desription basePic           fotos
// Program si anunturi de zbor  desription            videos
