import React, { Component } from 'react';
// import Resizer from "react-image-file-resizer";
// const Compress = require("compress.js");



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
        // const resizeFile = (file) =>
        //     new Promise((resolve) => {
        //         Resizer.imageFileResizer(
        //         file,
        //         300,
        //         300,
        //         "JPEG",
        //         100,
        //         0,
        //         (uri) => {
        //             resolve(uri);
        //         },
        //         // "base64"
        //         );
        //     });
        try {
            let pic_size = e.target.files[0].size;
            console.log("PicSize::",pic_size);
            let file = e.target.files[0];
            console.log("filess::", file)
        //     let file_size = e.target.files[0].size;
        //     console.log("fileSize::",file_size);
        //     let file = e.target.files[0];
            // const image = await resizeFile(file);
            // console.log("imageResized::",image);
        //     this.setState({
        //         imgFile:image
            // },
            // () => {})
            this.props.cbf && this.props.cbf(file)
        } catch (err) {
            console.log(err);
          }

    }

    // const compress = new Compress();
    // compress
    // .attach("#upload", {
    //     size: 4,
    //     quality: 0.75
    // })
    // .then((data) => {
    //     console.log(data);
    // });
   
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
                <input type="file" name="picture" id="upload" onChange={this.getFiles}/><br/>
                {this.state.imgFile && <img src={this.state.imgFile} style = {previewStyle} alt="poza"/>} 
            </div>
        )
    }
}



