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
import TextareaAutosize from 'react-textarea-autosize';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import ReactPaginate from 'react-paginate';
// 

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
  const [tabIndex, setTabIndex] = useState(0);
  const [bad_content, setBadContent] = useState("");
  const [display_result, setDisplay] = useState("None")
  const [fb_display, setFBDisplay] = useState("None")
  const [comment, setComment] = useState("")
  const [displayComment, setDisplayComment] = useState("None")

  const handleComment = (e) => {
    if (displayComment == "None") {
      setDisplayComment("flex")
    } else if (displayComment == "flex")
    {
      setDisplayComment("None")
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name)
    // console.log(value)
    const word_array = value.split(' ');
    if (word_array.length > 1500) {
      console.log("vuot qua do day cho phep")
    }
    if (value == "") {
      setDisplay("None")
    }
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  // const clearState = () => setState({ ...initialState });
  // const handlePageClick = (e) => {
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    // setScore(100);
    axios.post(`http://34.121.234.59/check_hate`, { text: message }, {
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
        console.log("data")
        setDisplay("flex")
        setVPPL(VPPL)
        setTT(TT)
        setSEX(SEX)
        setCK(CK)
        setCT(CT)
        setScore(value)
        setFBDisplay("flex")
      }).catch(error => {
        setDisplay("None")
        // your error handling goes here
        axios.post(`http://34.121.234.59/bad_words`, { text: message }, {
          headers: {
            'content-type': 'application/json',
            'charset': 'utf-8'
          }
        })
          .then(res => {
            setFBDisplay("flex")
            const data = res.data
            console.log(data)
            setBadContent(data.bad_words_extracted)
          })
      })

    axios.post(`http://34.121.234.59/bad_words`, { text: message }, {
      headers: {
        'content-type': 'application/json',
        'charset': 'utf-8'
      }
    })
      .then(res => {
        const data = res.data
        console.log(data)
        setBadContent(data.bad_words_extracted)
      })
  };
  return (
    <div>
      <div id="contact" className="container" >
        <div className="row" style={{ width: "100%", height: "100%", paddingTop: "5%" }}>
          <h1 style={{ color: "red" }}>OLLI JSC</h1>
          <h5 style={{ width: "100%" }}>
            Quét nội dung nhạy cảm
          </h5>
          {/* <div className='row'>
            <div className='col'><button>Văn bản</button></div>
            <div className='col'><button>Tài liệu</button></div>
          </div> */}
        </div>
        <div className='row'>
          <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)} style={{ width: "100%" }}>
            <TabList>
              <Tab>Văn Bản</Tab>
              <Tab>Tài liệu</Tab>
            </TabList>
            <TabPanel>
              <form ref={el => this.myFormRef = el} name="sentMessage" validate onSubmit={handleSubmit} style={{ width: "100%" }}>
                <div className="form-group">
                  <TextareaAutosize
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Mời nhập văn bản"
                    required
                    onChange={handleChange}
                    minRows="6"
                    autoFocus />
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button id='submit_btn' type="submit" className="btn btn-custom btn-lg">
                  Quét
                </button>
              </form>
              <button onClick={handleComment} className="btn btn-custom btn-lg" style={{ color: "blue", backgroundColor: "white", display: fb_display }}>
                Nhận xét
              </button>
            </TabPanel>
            <TabPanel>
              <div style={{ backgroundColor: "lightgrey", alignItems: "center", textAlign: "center", borderColor: "lightgrey", border: "1px", borderRadius: "5px", padding: "5%", margin: "1%" }}>
                <p style={{ color: "black" }}>Chọn tài liệu</p>
                <button type="submit" className="btn btn-custom btn-lg" style={{ color: "white", backgroundColor: "blue" }}>
                  Chọn tệp từ máy tính của bạn
                </button>
              </div>
            </TabPanel>
          </Tabs>
          {/* <p style={{display:display_result }}>{bad_content}</p> */}
          {/* <p>{bad_content}</p> */}
        </div>
        <div className='row' style={{ width: "100%", display: displayComment }}><button variant="outline-primary">Primary</button>{' '}
          <button variant="outline-secondary">Secondary</button>{' '}
          <button variant="outline-success">Success</button>{' '}
          <button variant="outline-warning">Warning</button>{' '}
          <button variant="outline-danger">Danger</button>{' '}</div>
        <div className='row' style={{ width: "fit-content", backgroundColor: "lightgrey" }}>{bad_content}</div>
        <div id="display_result" className='row' style={{ display: display_result }}>
          <div className='row' style={{ width: "100%", marginTop: "1%" }}>
            <div style={{ width: "100%" }}>
              <ProgressBar completed={score} maxCompleted={100} /></div>
            <p style={{ width: "100%", marginTop: "1%" }}>Mức độ nhạy cảm</p>
          </div>
          <div className='row' style={{ width: "100%", margin: "3%" }}>
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
                style={{ width: "80%" }}
              />
              <p className='row' style={{ color: 'black', alignItems: 'center', textAlign: "center", paddingLeft: "30%" }}>Pháp Luật</p>
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
              <p style={{ color: 'black', alignItems: 'center', textAlign: "center" }}>Thô Tục</p>
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
              <p style={{ color: 'black', alignItems: 'center', textAlign: "center" }}>SEX</p>
            </div>
          </div>
          <div className='row' style={{ width: "100%", marginTop: "1%" }}>
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
              <p style={{ color: 'black', alignItems: 'center', textAlign: "center" }}>Công Kích</p>
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
              <p style={{ color: 'black', alignItems: 'center', textAlign: "center" }}>Chính trị</p>
            </div>
          </div>
          <div className="row text-center" style={{ marginTop: "10%", alignItems: "center", width: "100%" }}>
            <p style={{ textAlign: "center", width: "100%" }}>&copy; 2021 Designed by Olli Technology JSC.</p>
          </div></div>
        {/* <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={5}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        /> */}
      </div>
      {/* <div id="footer">
        <div className="container text-center">
          <p>&copy; 2021 Designed by Olli Technology JSC.</p>
        </div>
      </div> */}
    </div >
  );
};
