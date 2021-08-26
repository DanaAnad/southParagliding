import React, { Component } from 'react';
import Compress from "browser-image-compression";

export default class FileAttachment extends Component {
    constructor(props) {
        super(props);
        this.state={
            convertedFile:"",
            inputFile:""
        }
        this.getFiles = this.getFiles.bind(this);
    }
        
    getFiles = async (e) => {    
        try {
            const file = e.target.files[0];
            console.log("fileee::", file);
            const size = file.size;
            console.log("size::", size);
            if(file.type === "image/jpeg"){
                const options = {
                    maxSizeMb:1.5,
                    useWebWorker: true
                }  
            Compress(file, options)
            .then(compressedBlob => {
                        console.log(compressedBlob)
                        compressedBlob.lastModifiedDate = new Date();
                        const convertedBlobFile = new File([compressedBlob], file.name, { type: file.type, lastModified: Date.now()})
                        console.log("convertedBlobFile::", convertedBlobFile);
                        const myImg = URL.createObjectURL(compressedBlob);
                        console.log("myImg::", myImg);

                        this.props.cbf && this.props.cbf(convertedBlobFile);
                        this.setState({
                            convertedFile: myImg,
                            inputFile:convertedBlobFile,
                        })
                }) 
            } 
            else if (file.type === "video/mp4") {  
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend =  () =>  {
                let base64 = reader.result;
                console.log("base64:", base64);
                let base64result = reader.result.split(',')[1];
                console.log("base64Result::", base64result);
                    this.props.cbf && this.props.cbf(file);
                    this.setState({
                        convertedFile: base64result,
                        inputFile: file
                    })
                }
            } 
            else { 
                this.state= {
                convertedFile:"",
                inputFile:""
            }}
        }   catch (err) {
            console.log(err);
        }  
    }
render() {

    const fileStyle = {
        width: "100px",
        height:"100px",
        borderRadius:"100%",
        objectFit:"cover",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    return(
        <div>
            <input type="file" name="file" onChange={this.getFiles}/><br/>
            { this.state.inputFile.type === "image/jpeg" || this.state.inputFile.type === "image/png" ? <img src = {this.state.convertedFile} style = {fileStyle} alt = "foto" /> : 
            this.state.inputFile.type === "video/mp4" ? <video width="400" controls>
                    <source src={`data:video/mp4;base64,${this.state.convertedFile}`} /> 
                </video> : "No selected file" }
        </div>
    )
}
}