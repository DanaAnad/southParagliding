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
    
    // validateFileType = (file) => { 
    //     if(!file) {throw new Error ("File must exist")}
    //     const acceptedFiles = ["image/jpeg", "image/png", "image/jpg", "video/mp4"];
    //     if(!acceptedFiles.includes(file.type)){
    //         throw new Error("Invalid file. Please upload a file type jpg/jpeg/png or mp4");
    //     }
    // }

    getFiles = async (e) => {    
        try {
            const file = e.target.files[0];
            console.log("fileee::", file);
            // this.validateFileType(file);
                if(file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg"){
                    const options = {
                        maxSizeMb:1.5,
                        useWebWorker: true
                    }  
                    Compress(file, options)
                    .then(compressedBlob => {
                                console.log(compressedBlob)
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
                        this.props.cbf && this.props.cbf(file);
                        this.setState({
                            convertedFile: base64,
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
            console.log("errorFile::",err);
            throw (err);
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
            Accepted file types: "jpeg", "jpg", "png" or "mp4". <br/><br/>
            <input type="file"  name="file" onChange={this.getFiles}/><br/>
                { this.state.inputFile.type === "image/jpeg" || 
                     this.state.inputFile.type === "image/png" ? 
                <img src = {this.state.convertedFile} 
                style = {fileStyle} alt = "foto" /> : 
                this.state.inputFile.type === "video/mp4" ? 
                <video width="400" controls>
                        <source src={this.state.convertedFile} /> 
                    </video> : "Adauga un fisier" }
        </div>
    )
}
}