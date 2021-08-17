import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';


export default class Picture extends Component {
    constructor(props) {
        super(props);
        this.state={
            file:"",
        }
        this.getFiles = this.getFiles.bind(this);
    }
   
    getFiles = (e) => {
        e.preventDefault();
        // let pic_size = e.target.files[0].size;
        // console.log("PicSize::",pic_size);
        let file = e.target.files[0];
        this.props.cbf && this.props.cbf(file);
        this.setState({
            file:file
        })
  
    }
   
    render() {

        const previewStyle = {
            width: "100px",
            height:"100px",
            borderRadius:"100%",
            objectFit:"cover",
            backgroundSize: 'cover',
            backgroundPosition: 'center',

        }
        return(
            <div>
                <Form>
                    <Form.Group>
                        <Form.Control type="file" name="picture" id="upload" onChange={this.getFiles}/><br/>
                        {this.state.file && <img src={this.state.file} style = {previewStyle} alt="poza"/>} 
                    </Form.Group>
                </Form>
            </div>
        )
    }
}



