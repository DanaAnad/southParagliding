import React from 'react';
import {Accordion, Card, Button} from 'react-bootstrap';
import axios from 'axios';

export default class ShowDataFromApi extends React.Component {

    deleteDataById = async (id) => {
        const dataId = { id };
        console.log("dataId::", dataId.id);
        const url = "http://ms.homens.tricu.ro/data/" + dataId.id;
        const headers= {"Access-Control-Allow-Origin" : "*"};
        const resp = await axios.delete(url, headers);
        console.log("response::", resp);  
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
                                        <Button className="btn-danger" onClick ={() => this.deleteDataById(rowData.id)}>Sterge</Button>
                                    </li> 
                                    :  
                                    <li key ={index}>
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                Sectiunea: {rowData.type}
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
                                        <Button className="btn-danger" onClick ={() => this.deleteDataById(rowData.id)}>Sterge</Button>
                                    </li> 
                                    }
                                </ul>
                            ) 
                        } else {return null};
                    }) : <span>Data is loading...</span>
                } 
            </div>
        )
    }
} 