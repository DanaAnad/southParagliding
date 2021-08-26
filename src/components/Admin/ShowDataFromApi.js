import React from 'react';
import axios from 'axios';
import {Accordion, Card, Button} from 'react-bootstrap';

export default class ShowDataFromApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allData : [],
            currentData : []
        }
    }

    componentDidMount = async () =>  {
        this.getDataFromApi();
    }

    getDataFromApi = async () => {
      const {data} = await axios.get(`http://ms.homens.tricu.ro/data`);
      this.setState({allData: data});
    }


    
    render() {
        console.log("dataState:file:", this.state.allData);
        return(
            <div className="showDataContainer">
                {this.state.allData.map((rowData, index) => {
                    return (
                        <ul key = {index}>
                            {rowData.type === "video" ?  
                            <li key ={index}>
                                <Accordion>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                            Id:{rowData.id} /
                                            Data-{rowData.type} 
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                            {rowData.data.fileName && <video width="400" controls>
                                                <source src={rowData.data.fileName} /> 
                                            </video>  }
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                                <Button className="btn-danger">-</Button>
                            </li> :   <li key ={index}>
                                <Accordion>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                            Id:{rowData.id} / 
                                            Data-{rowData.type}
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                            {rowData.data.titluStiri}<br />
                                            {rowData.data.titlu}<br />
                                            {rowData.data.description}<br />
                                            {rowData.data.email}<br />
                                            {rowData.data.phone}
                                            {rowData.data.fileName && <Card.Img variant="bottom" src={rowData.data.fileName}/> }</Card.Body>
                                        </Accordion.Collapse> 
                                    </Card>
                                </Accordion>
                                <Button className="btn-danger">-</Button>
                            </li> 
                            }
                        </ul>
                    )
                })}
            </div>
        )
    }
} 