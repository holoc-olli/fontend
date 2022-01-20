import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from "react";
// import emailjs from "emailjs-com";
import axios from "axios";
import ProgressBar from "@ramonak/react-progress-bar";
import { getMessage } from "../api/message";
import { HelloRequest, HelloReply } from "../grpc/helloworld_pb"
import { Message } from 'google-protobuf';
import Circle from 'react-circle';

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);
  const [message1, setMessage1] = useState("Hello world!");

  const [score, setScore] = useState(0);
  const [VPPL, setVPPL] = useState(0);
  const [TT, setTT] = useState(0);
  const [SEX, setSEX] = useState(0);
  const [CK, setCK] = useState(0);
  const [CT, setCT] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    setScore(100);
    axios.post(`http://127.0.0.1:5000/check_hate`, { text: message }, {
      headers: {
        'content-type': 'application/json',
        'charset': 'utf-8'
      }
    })
      .then(res => {
        const data = res.data
        const value = Math.floor(parseFloat(data.DIRTY * 100))
        const VPPL = Math.floor(parseFloat(data.VPPL * 100))
        const TT = Math.floor(parseFloat(data.TT * 100))
        const SEX = Math.floor(parseFloat(data.SEX * 100))
        const CK = Math.floor(parseFloat(data.CK * 100))
        const CT = Math.floor(parseFloat(data.CT * 100))
        setVPPL(VPPL)
        setTT(TT)
        setSEX(SEX)
        setCK(CK)
        setCT(CT)
        setScore(value)
      })
  };
  return (
    <div>
      <div id="contact" className="container" >
        <div className="row" style={{ width: "100%", height:"100%", paddingTop: "5%" }}>
            <h2 >OLLI VNHS TOOL</h2>
            <p style={{width:"100%"}}>
              Please fill the text which you want to check and let us
              evaluate the hate level
            </p>
          <form name="sentMessage" validate onSubmit={handleSubmit} style={{width:"100%"}}>
            <div className="form-group">
              <textarea
                name="message"
                id="message"
                className="form-control"
                rows="4"
                placeholder="Enter your text"
                required
                onChange={handleChange}
              ></textarea>
              <p className="help-block text-danger"></p>
            </div>
            <div id="success"></div>
            <button type="submit" className="btn btn-custom btn-lg">
              Evaluate
            </button>
          </form>
          <div style={{width:"100%", marginTop: "1%"}}>
          <ProgressBar completed={score} maxCompleted={100} /></div>
          <p>Hate Score</p>
        </div>
        <div className='row'>
          <div className='col'>
            <Circle
                className='row'
                animate={true} // Boolean: Animated/Static progress
                animationDuration="1s" //String: Length of animation
                responsive={true} // Boolean: Make SVG adapt to parent size
                // size={10} // Number: Defines the size of the circle.
                lineWidth={7} // Number: Defines the thickness of the circle's stroke.
                progress={VPPL} // Number: Update to change the progress and percentage.
                progressColor="cornflowerblue"  // String: Color of "progress" portion of circle.
                bgColor="whitesmoke" // String: Color of "empty" portion of circle.
                textColor="hotpink" // String: Color of percentage text color.
                textStyle={{
                  font: 'bold 5rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                }}
                percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                roundedStroke={true} // Boolean: Rounded/Flat line ends
                showPercentage={true} // Boolean: Show/hide percentage.
                showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                style={{width:"80%"}}
              />
            <p className='row' style={{ color: 'black', alignItems: 'center', textAlign:"center", paddingLeft:"30%" }}>Pháp Luật</p>
          </div>
          <div className='col'>
            <Circle
                animate={true} // Boolean: Animated/Static progress
                animationDuration="1s" //String: Length of animation
                responsive={true} // Boolean: Make SVG adapt to parent size
                size={5} // Number: Defines the size of the circle.
                lineWidth={7} // Number: Defines the thickness of the circle's stroke.
                progress={TT} // Number: Update to change the progress and percentage.
                progressColor="cornflowerblue"  // String: Color of "progress" portion of circle.
                bgColor="whitesmoke" // String: Color of "empty" portion of circle.
                textColor="hotpink" // String: Color of percentage text color.
                textStyle={{
                  font: 'bold 5rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                }}
                percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                roundedStroke={true} // Boolean: Rounded/Flat line ends
                showPercentage={true} // Boolean: Show/hide percentage.
                showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
              />
            <p style={{ color: 'black', alignItems: 'center', textAlign:"center" }}>Thô Tục</p>
          </div>
          <div className='col'>
            <Circle
                animate={true} // Boolean: Animated/Static progress
                animationDuration="1s" //String: Length of animation
                responsive={true} // Boolean: Make SVG adapt to parent size
                size={10} // Number: Defines the size of the circle.
                lineWidth={7} // Number: Defines the thickness of the circle's stroke.
                progress={SEX} // Number: Update to change the progress and percentage.
                progressColor="cornflowerblue"  // String: Color of "progress" portion of circle.
                bgColor="whitesmoke" // String: Color of "empty" portion of circle.
                textColor="hotpink" // String: Color of percentage text color.
                textStyle={{
                  font: 'bold 5rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                }}
                percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                roundedStroke={true} // Boolean: Rounded/Flat line ends
                showPercentage={true} // Boolean: Show/hide percentage.
                showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
              />
            <p style={{ color: 'black', alignItems: 'center', textAlign:"center" }}>SEX</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-4'>
            <Circle
                animate={true} // Boolean: Animated/Static progress
                animationDuration="1s" //String: Length of animation
                responsive={true} // Boolean: Make SVG adapt to parent size
                size={10} // Number: Defines the size of the circle.
                lineWidth={7} // Number: Defines the thickness of the circle's stroke.
                progress={CK} // Number: Update to change the progress and percentage.
                progressColor="cornflowerblue"  // String: Color of "progress" portion of circle.
                bgColor="whitesmoke" // String: Color of "empty" portion of circle.
                textColor="hotpink" // String: Color of percentage text color.
                textStyle={{
                  font: 'bold 5rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                }}
                percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                roundedStroke={true} // Boolean: Rounded/Flat line ends
                showPercentage={true} // Boolean: Show/hide percentage.
                showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
              />
            <p style={{ color: 'black', alignItems: 'center', textAlign:"center" }}>Công Kích</p>
          </div>
          <div className='col-sm-4'>
            <Circle
                animate={true} // Boolean: Animated/Static progress
                animationDuration="1s" //String: Length of animation
                responsive={true} // Boolean: Make SVG adapt to parent size
                size={20} // Number: Defines the size of the circle.
                lineWidth={7} // Number: Defines the thickness of the circle's stroke.
                progress={CT} // Number: Update to change the progress and percentage.
                progressColor="cornflowerblue"  // String: Color of "progress" portion of circle.
                bgColor="whitesmoke" // String: Color of "empty" portion of circle.
                textColor="hotpink" // String: Color of percentage text color.
                textStyle={{
                  font: 'bold 5rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                }}
                percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                roundedStroke={true} // Boolean: Rounded/Flat line ends
                showPercentage={true} // Boolean: Show/hide percentage.
                showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
              />
            <p style={{ color: 'black', alignItems: 'center', textAlign:"center"}}>Chính trị</p>
          </div>
        </div>
        <div className="row text-center" style={{marginTop:"10%"}}>
          <p style={{textAlign:"center", width:"100%"}}>&copy; 2021 Designed by Olli Technology JSC.</p>
        </div>
      </div>
      {/* <div id="footer">
        <div className="container text-center">
          <p>&copy; 2021 Designed by Olli Technology JSC.</p>
        </div>
      </div> */}
    </div >
  );
};
