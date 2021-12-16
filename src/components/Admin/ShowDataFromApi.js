import React from 'react';
import {Accordion, Card, Button} from 'react-bootstrap';
import axios from 'axios';
import Loader from "react-loader-spinner";
import "../../Accordion.css"

export default class ShowDataFromApi extends React.Component {

    deleteDataById = async (id) => {
        const dataId = { id };
        console.log("dataId::", dataId.id);
        const url = "http://api.southparagliding.ro/index.php/data/" + dataId.id;
        const headers= {"Access-Control-Allow-Origin" : "*"};
        const resp = await axios.delete(url, headers);
        console.log("response::", resp);
        const index = this.props.data.allData.findIndex(x => x.id === dataId.id);
        console.log("indexxx::", index); 
        resp.status === 200 && this.setState( () => {
            this.props.data.allData.splice(index, 1);
                return {allData: this.props.data.allData}
        });
    }

    render() {
        const reversedAllData = this.props.data.allData.slice().reverse();
        return(
            <div className="showDataContainer">
                {this.props.data.allData.length ? 
                    reversedAllData.map((rowData, index) => {
                        if(rowData.type === this.props.data.type) {
                            return (
                                <ul key = {index}>
                                    {rowData.type === "video" ?  
                                    <li key ={index}>
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                <Button className="btn-danger" onClick ={() => this.deleteDataById(rowData.id)}>Sterge</Button>
                                                    Sectiunea: {rowData.type} 
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                    Id: {rowData.id}<br />
                                                    {rowData.data.fileName && <video width="400" controls>
                                                        <source src={rowData.data.fileName} /> 
                                                    </video>  }
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </li> 
                                    :  
                                    <li key ={index}>
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                Sectiunea: {rowData.type}
                                                <Button className="btn-danger" onClick ={() => this.deleteDataById(rowData.id)}>Sterge</Button>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                    Id: {rowData.id}<br />
                                                    {rowData.data.titluStiri}<br />
                                                    {rowData.data.titlu}<br />
                                                    {rowData.data.description}<br />
                                                    {rowData.data.email}<br />
                                                    {rowData.data.phone}
                                                    {rowData.data.fileName && <Card.Img variant="bottom" src={rowData.data.fileName}/> }</Card.Body>
                                                </Accordion.Collapse> 
                                            </Card>
                                        </Accordion>
                                    </li> 
                                    }
                                </ul>
                            ) 
                        } else {return null};
                    }) : <span> 
                        <Loader
                            type="TailSpin"
                            color="Black"
                            height={65}
                            width={65}
                            timeout={10000}
                            radius={2}
                        />
                        </span>
                } 
            </div>
        )
    }
} 