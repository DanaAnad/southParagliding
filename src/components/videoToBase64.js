import React, { Component } from 'react';


export default class Video extends Component {
    constructor(props) {
        super(props);
        this.state={
            file:""
        }
        this.getFiles = this.getFiles.bind(this);
    }

    getFiles = async (e) => {
        try {
            let file_size = e.target.files[0].size;
            console.log("fileSize::",file_size);
            let file = e.target.files[0];
            console.log("filess::", file)
            this.props.cbf && this.props.cbf(file)
            this.setState({file})
        }   catch (err) {
                console.log(err);
            }
    }
   
    render() {

        console.log("file:Video:", this.state.file);

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



