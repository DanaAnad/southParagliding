import React, { Component } from 'react';


export default class Video extends Component {
    constructor(props) {
        super(props);
        this.state={
            file:"",
            videoFile:""
        }
        this.getFiles = this.getFiles.bind(this);
    }

    getFiles = (e) => {
        let file = e.target.files[0];
        console.log("filess::", file)
        let reader = new FileReader();
        const url= reader.readAsDataURL(file);
        reader.onload = (e) => {
            console.log("event::", e)
            console.log("result::",e.target.result)
            console.log("readerRes::", reader.result);
            // this.props.cb(reader.result);
            this.setState({
              videoFile:reader.result,
            },
            () =>{this.props.cb && this.props.cb(reader.result)})
        };

    }
   
    render() {
        const previewStyle = {
            width: "70px",
            height:"70px",
            borderRadius:"100%",
            objectFit:"cover",
            backgroundSize: 'cover',
            backgroundPosition: 'center',

        }
        return(
            <div>
                <input type="file" name="video"  onChange={this.getFiles}/><br/>
                {this.state.videoFile && <video width="400" controls>
                    <source src={this.state.videoFile} style = {previewStyle}/>
                </video>}
            </div>
        )
    }
}



