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

    getFiles = async (e) => {
        try {
            let file_size = e.target.files[0].size;
            console.log("fileSize::",file_size);
            let file = e.target.files[0];
            console.log("filess::", file)
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                console.log("event::", e)
                console.log("result::",e.target.result)
                console.log("readerRes::", reader.result);
                // this.props.cb(reader.result);
                this.setState({
                videoFile:reader.result,
                },
                () =>{this.props.cbf && this.props.cbf(reader.result)})
            
            } 
        }   catch (err) {
                console.log(err);
            }
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



