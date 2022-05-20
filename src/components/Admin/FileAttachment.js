import React, { Component } from 'react';
import Compress from "browser-image-compression";

export default class FileAttachment extends Component {
    constructor(props) {
        super(props);
        this.imgRef = React.createRef();
        this.state={
            convertedFile:"",
            inputFile:""
        };
        this.getFiles = this.getFiles.bind(this);
    }
    
    validateFile = (file) => { 
            try {
              if(!file) {
                    this.setState({
                        errors : [
                            ...this.props.data.errors,
                            {
                            error: "Ateaseaza un fisier.",
                            }
                        ]
                    })
                }
            }
            catch (err) {
                throw new Error("FileValidation not working...")
            };
    };
   
    getFiles = async (e,file) => {    
        file = e.target.files[0];
        if(file){
            try {
                this.validateFile(file);
                    if(file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg"){
                        const options = {
                            maxSizeMb:1.5,
                            useWebWorker: true
                        }  
                        Compress(file, options)
                        .then(compressedBlob => {
                                    const convertedBlobFile = new File([compressedBlob], file.name, { type: file.type, lastModified: Date.now()})
                                    const myImg = URL.createObjectURL(compressedBlob);
                                    this.props.cbf(convertedBlobFile);
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
                            this.props.cbf(file);
                            this.setState({
                                convertedFile: base64,
                                inputFile: file
                            })
                        }
                    } 
                    else if (!file) { 
                        this.setstate({
                            convertedFile:"",
                            inputFile:"",
                            errors : [
                                ...this.props.data.errors,
                                {
                                    error:"invalid file"
                                }
                            ]
                        })
                    }
            }   
                catch (err) {
                    throw (err);
                } 
        };
    };
    render() {
        const fileStyle = {
            width: "100px",
            height:"100px",
            borderRadius:"100%",
            objectFit:"cover",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        };

        return(
            <div>
                Tip de fisiere acceptate: "jpeg", "jpg", "png" sau "mp4". <br/>
               <b> Marimea fisierului nu trebuie sa depaseasca 30MB.</b><br/><br/>
                <input type="file" required accept="image/png, image/jpeg, video/mp4" ref = {this.imgRef} name="file" onChange = {this.getFiles} onSubmit={this.resetInput}/><br/>
                    
                    {this.state.inputFile  !== "" && (this.state.inputFile.type === "image/jpeg" || 
                        this.state.inputFile.type === "image/png") ? 
                    <img src = {this.state.convertedFile} 
                    style = {fileStyle} alt = "foto" /> : 
                    this.state.inputFile !== "" && this.state.inputFile.type === "video/mp4" ? 
                    <video width="400" controls>
                            <source src={this.state.convertedFile} /> 
                        </video> : null }
            </div>
        );
    };
}