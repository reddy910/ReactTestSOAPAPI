/* eslint-disable */
import axios from 'axios';
import React from 'react';
import './SoapServiceTest.css';
import { parser, parseString } from 'xml2js';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';




class SoapServiceTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      AValue: '',
      BValue: '',
      soapResponse: 'Response Text'
    };

  }
  componentDidMount() {

  }
  readValueA(e) {
    console.log("avalue:::::::" + e.target.value);
    this.setState({ 'AValue': e.target.value });
    console.log(this.state.AValue);
  }
  readValueB(e) {
    console.log("avalue:::::::" + e.target.value);
    this.setState({ 'BValue': e.target.value });
    console.log(this.state.BValue);
  }
  soapServiceCall() {
    console.log("enter service call:::::")
    var aValue = this.state.AValue;
    var bValue = this.state.BValue;
    var url = 'http://www.dneonline.com/calculator.asmx';
    var params = '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
      'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<soap:Body>' +
      '<Add xmlns="http://tempuri.org/">' +
      '<intA>' + aValue + '</intA>' +
      '<intB>' + bValue + '</intB>' +
      '</Add>' +
      '</soap:Body>' +
      '</soap:Envelope>';
    console.log(params);
    axios(url, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'text/xml; charset=utf-8' },
      data: params
    }).then((response) => {
      console.log("first line" + response.data);
      var xmlResponse = response.data;
      var parseString = require('xml2js').parseString;
      parseString(xmlResponse, function (err, result) {

        var responseString = JSON.stringify(result);
        var responseJson = JSON.parse(responseString);
        console.log("responseJson" + responseJson);
        console.log("responseString" + responseString);
        alert("SuccessResponse:" + responseString);
      });
    }).catch(error => {
      alert("Failure:::::" + error.message);
      console.error(error.message);
    });
  }
  render() {
    return (
      <section className="col-sm-12">
        <h1>Adding two numbers using Soap API</h1>
        <h5>Enter any two numbers and click button</h5>
        <div>
          <TextField id="outlined-basic" label="A Value" variant="outlined" onInput={(e) => this.readValueA(e)} />
          <TextField id="outlined-basic" label="B Value" variant="outlined" onInput={(e) => this.readValueB(e)} />
        </div>
        <div className="button">
          <button
            onClick={() => this.soapServiceCall()}
            type={'primary'}
            size={'large'} >
            Add
          </button>
        </div>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Response"
            multiline
            rowsMax={6}
            value={this.state.soapResponse}
            //onChange={handleChange}
            variant="outlined"
          />
        </div>

      </section>
    );
  }
}
export default SoapServiceTest;