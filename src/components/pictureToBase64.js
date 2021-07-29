import React, { Component } from 'react';
import Resizer from "react-image-file-resizer";



export default class Picture extends Component {
    constructor(props) {
        super(props);
        this.state={
            file:"",
            imgFile:'',
        }
        this.getFiles = this.getFiles.bind(this);
    }

    getFiles = async (e) => {
        const resizeFile = (file) =>
            new Promise((resolve) => {
                Resizer.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
                );
            });
        try {
            let file_size = e.target.files[0].size;
            console.log("fileSize::",file_size);
            let file = e.target.files[0];
            const image = await resizeFile(file);
            console.log("imageResized::",image);
            console.log("resizedImgSize::",image.size);
            this.setState({
                imgFile:image
            },
            console.log("imgSize::", this.imgFile.size),
            () => {this.props.cb && this.props.cb(image)})
        } catch (err) {
            console.log(err);
          }

        
        // console.log("filess::", file)
        // let reader = new FileReader();
        // const url= reader.readAsDataURL(file);
        // reader.onload = (e) => {
        //     console.log("event::", e)
        //     console.log("result::",e.target.result)
        //     console.log("readerRes::", reader.result);
        //     // this.props.cb(reader.result);
        //     this.setState({
        //       imgFile:reader.result,
        //       videoFile:reader.result
        //     },
        //     () =>{this.props.cb && this.props.cb(reader.result)})
        // };

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
                <input type="file" name="picture"  onChange={this.getFiles}/><br/>
                {this.state.imgFile && <img src={this.state.imgFile} style = {previewStyle} alt="poza"/>} 
            </div>
        )
    }
}



