import React, { Component } from 'react';


export default class Picture extends Component {
    constructor(props) {
        super(props);
        this.state={
            file:false
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
              file:reader.result,
            },
            () =>{this.props.cb && this.props.cb(reader.result)})
        };

    }
   
    render() {
        return(
            <div>
            <input type="file" name="picture" multiple onChange={this.getFiles}/><br/>
           {/* {this.state.file ? <img src={this.state.file} height="100"/> : <img src = {this.props.initialPic} height="100"/>}  */}
            </div>
        )
    }
}



