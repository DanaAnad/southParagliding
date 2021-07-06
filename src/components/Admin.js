import React from 'react';
import Picture from "./picture.js";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import mysql from 'mysql';
import axios from 'axios';



export default class Admin extends React.Component {
    constructor(props) {
        super(props);

        // const connection = mysql.createConnection({
        //     host: 'localhost',
        //     user: 'root',
        //     password: 'my-secret-pw',
        //     database: 'southParagliding',
        //   });
          
        //   // Connect to database.
        //   connection.connect(function(err) {
        //       if (err) 
        //       throw err;
        //       console.log("Connected!");
        //     });

        this.state = {
            show:true,
            type : "",
            titlu:"",
            description:"",
            fotos :"",
            videos : "",
            email:"",
            phone:"",
            status : false,
        }
        // this.postData = this.postData.bind(this);
    }

    handleChange = (e) =>{
        // console.log("value::", e.target.value)
                this.setState({
                  [e.target.name]: e.target.value});
            } 
            
    handleDataType = (e) =>{
            this.handleChange(e);
            console.log('type::', e.target.value);
            e.target.value === 'locatiidezbor' && this.setState({show:false})
            } 

    getFotos = (pic)=> {
        console.log("poza de bagat in db::", this.state.fotos)
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




    //  postData = () => {
    //      const {titlu, description, fotos, videos, email, phone, type } = this.state;
    //      const url = 'http://mockbin.org/bin/62827609-de08-448f-b966-57c698725ae2?foo=bar&foo=baz';
    //      let options = { method:'POST', 
    //                 headers:{
    //                     'Content-Type':'application/json',
    //                     'Accept': '*/*'
    //                 },
    //                 body: JSON.stringify({titlu, description, fotos, videos, email, phone})
    //             };
    //     let response = await fetch (url, options);
    //     console.log("responseeee;;", response);
    // }

    //  postData() {
    //     const {titlu, description, fotos, videos, email, phone, type } = this.state;
    //     fetch("http://mockbin.org/bin/62827609-de08-448f-b966-57c698725ae2?foo=bar&foo=baz", {
    //     "method": "POST",
    //     "headers": {
    //         'Content-Type':'application/json',
    //         'Accept': '*/*'
    //     },
    //     body: JSON.stringify({titlu, description, fotos, videos, email, phone})
    //     })
    //     .then(response => {
    //         console.log(response);
    //     })
    //     .catch(err => {
    //         console.log("error::",err);
    //     });
    // }


    // async fetch("http://mockbin.org/bin/62827609-de08-448f-b966-57c698725ae2?foo=bar&foo=baz", {
    //     "method": "POST",
    //     "headers": {
    //       "cookie": "foo=bar; bar=baz"
    //     },
    //     "body": {
    //       "foo": "bar",
    //       "bar": "baz"
    //     }
    //   })
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });




    //  postData = async () => {
    //     const {titlu, description, fotos, videos, email, phone, type} = this.state;
    //     console.log("this.state.all::", this.state)
    //     console.log("photos:str:", this.state.fotos);
    //     const url = 'http://mockbin.org/bin/9b3e1a5d-b204-4ec5-a06d-d8c6fadc12ed?foo=bar&foo=baz';
    //     let options = { method: 'POST',
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             'Content-Type': 'application/json',
    //             'Accept': '*/*'
    //         },
    //         body:  JSON.stringify({titlu, description, fotos, videos, email, phone}) 
    //     };
    //     let response = await fetch(url, options);
    //     console.log("response::", response)
    //     if (response.status === 200){
    //         response = await response.json();
    //         console.log("responseFetch:addCats:", response.result);
    //         // const data = response.result;
    //         // this.setState({
    //         //     addedCat: true,
    //         //     pisica:data
    //         // })
    //     }
    //     console.log("pisica:post:",this.state.pisica);
    // }
    

    onSubmit = (e) => {
        e.preventDefault();
        console.log("submitState::", this.state);
        const data = this.state;
        console.log("data::", data);
        const options = {
            method: 'GET',
            // headers: {'Access-Control-Allow-Origin':'*'},
            // data: qs.stringify(data),
            url:'http://mockbin.org/bin/9b3e1a5d-b204-4ec5-a06d-d8c6fadc12ed',
          };
          axios(options);
        // axios.get(`http://www.google.com`)
        // .then(res => {
        //   console.log('response::',res);
        //   console.log('resData',res.data);
        // }).catch(err => {console.log(err);
        // });
    // }
        // this.postData();
        // this.getFotos();
        // this.getVideos();
        // let dataToUpload = this.state;
        // // On submit of the form, send a POST request with the data to the server.
        // fetch('/admin', { 
        //     method: 'POST',
        //     data: dataToUpload,
        //   })
        //   .then(function(response) {
        //       console.log("response::", response);
        //     // return response.json()
        //   })
        // //   .then(function(body) {
        // //     console.log(body);
        // //   });
      }


    render () {
        console.log("renderState::", this.state)
        return (
            <div className="adminForm">
            {/* <input type="phone" name="phone" placeholder="nr.." /> */}
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Data Type</Form.Label>
                        <Form.Control as="select" size="sm" name="type" onChange={this.handleDataType}> 
                            <option value= 'backgrounds'>Backgrounds</option>
                            <option>News</option>
                            <option>Foto</option>
                            <option>Video</option>
                            <option value="locatiidezbor">Locatii zbor</option>
                            <option value="rezervaricontact">Rezervari/Contact</option>
                        </Form.Control>
                        Titlu:
                        <Form.Control type="text" name="titlu" placeholder="Titlu..."  onChange={this.handleChange}/>
                        Descriere / Informatii :
                        <Form.Control as="textarea" rows ={2} name="description" placeholder="Informatii..." onChange={this.handleChange}/>
                        FOTO:
                        <Picture cb = {this.getFotos}/>
                        VIDEOS:
                        <Picture cb = {this.getVideos}/>
                        Contact Email:
                       {this.state.show && <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleChange}/>} 
                        Contact Number:
                        <Form.Control type="phone" placeholder="Phone nr..." onChange={this.handleChange}/>
                    </Form.Group>
                    <Button type="submit" onClick={this.onSubmit}>Submit form</Button>
                </Form>
            </div>
        )
    }
}





// titlu description fotos videos type status
// Program si anunturi de zbor  desription basePic baseVideo news true =1 
// Program si anunturi de zbor  desription basePic baseVideo news
// Program si anunturi de zbor  desription basePic           fotos
// Program si anunturi de zbor  desription            videos
