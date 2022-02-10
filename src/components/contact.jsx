import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useRef } from "react";
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
import MultiColorProgressBar from './multicolorbar'
import { readings } from './multicolorbar'

const initialState = {
  name: "",
  email: "",
  message: "",
};

const fb_initState = [
  { id: 0, value: false },
  { id: 1, value: false },
  { id: 2, value: false },
  { id: 3, value: false },
  { id: 4, value: false },
  { id: 5, value: false }
];

const fb_active = [
  false,
  false,
  false,
  false,
  false
]

const result_label = [
  "NỘI DUNG SẠCH !",
  "NỘI DUNG NHẠY CẢM !"
]

const suggestion_label = [
  "Tục tĩu",
  "Công kích trực tiếp",
  "Công kích ám chỉ",
  "Kiến nghị trái pháp luật",
  "Nội dung rác",
  "Sai chính tả",
  "Chính trị nhạy cảm",
  "Sex thô tục",
  "Nội dung dâm đãng",
  "Trang web cấm",
  "Có thể sai sự thật"
]

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
  const [fbText, SetfbText] = useState("Gửi phản hồi")
  const [fbButtonState, SetfbButtonState] = useState(fb_initState)
  const [scan_button_dp, SetScanDP] = useState("flex")
  const [active0, SetActive0] = useState(false)
  const [active1, SetActive1] = useState(false)
  const [active2, SetActive2] = useState(false)
  const [active3, SetActive3] = useState(false)
  const [active4, SetActive4] = useState(false)
  const [active5, SetActive5] = useState(false)
  const [textAreaDisable, SetTextArea] = useState(false)
  const [isChecked, SetChecked] = useState(false)
  const [cancelBtn, setCancel] = useState("none")
  const [resultText, SetResultText] = useState("Chưa nhập văn bản")
  const [detailBtn, SetDetailBtn] = useState("none")
  const [detailBtnText, SetDetailText] = useState("Xem chi tiết")

  const handleComment = (e) => {
    if (displayComment == "None") {
      setDisplayComment("flex")
      SetfbText("Gửi")
      setCancel("flex")
      SetScanDP("None")
      SetTextArea(true)
    } else if (displayComment == "flex") {
      setDisplayComment("None")
      SetfbText("Gửi phản hồi")
      SetScanDP("flex")
      SetTextArea(false)
      SetChecked(false)
      setCancel('none')
    }
  };

  const handleTPL = (e) => {
    SetActive0(!active0)
    SetActive5(false)
  }

  const handleTT = (e) => {
    SetActive1(!active1)
    SetActive5(false)
  }

  const handleSex = (e) => {
    SetActive2(!active2)
    SetActive5(false)
  }

  const hanleCK = (e) => {
    SetActive3(!active3)
    SetActive5(false)
  }

  const hanldeCT = (e) => {
    SetActive4(!active4)
    SetActive5(false)
  }

  const hanldeClean = (e) => {
    SetActive0(false)
    SetActive1(false)
    SetActive2(false)
    SetActive3(false)
    SetActive4(false)
    SetActive5(!active5)
  }
  
  const hanldeDetail = (e) => {
    if (detailBtnText == "Xem chi tiết")
    {
      setDisplay("flex")
      SetDetailText("Gom gọn")
    } else if (detailBtnText == "Gom gọn")
    {
      SetDetailText("Xem chi tiết")
      setDisplay("none")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const word_array = value.split(' ');
    if (word_array.length > 1500) {
      console.log("vuot qua do day cho phep")
    }
    if (value == "") {
      setDisplay("None")
      SetResultText("Chưa nhập văn bản")
      SetDetailBtn("None")
    }
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(message);
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
        // setDisplay("flex")
        setVPPL(VPPL)
        setTT(TT)
        setSEX(SEX)
        setCK(CK)
        setCT(CT)
        setScore(value)
        setFBDisplay("flex")
        SetChecked(true)
        SetDetailBtn("flex")
        if (value > 50) 
        {
          SetResultText(result_label[1])
        } else{
          SetResultText(result_label[0])
        }
      }).catch(error => {
        setDisplay("None")
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
    <div  style={{paddingLeft:"1em", paddingRight:"1em"}}>
      <div id="contact" className="container" >
        <div className="row" style={{ width: "100%", height: "100%", paddingTop: "5%" }}>
          <h1 style={{ color: "red", textAlign:"center", width:"100%", fontWeight:"bold"}}>OLLI JSC</h1>
          <h5 style={{ width: "100%", textAlign:"center" }}>
            Quét nội dung nhạy cảm
          </h5>
        </div>
        <div className='row'>
          <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)} style={{ width: "100%" }}>
            <TabList>
              <Tab style={{margin:"0em", marginRight:"1em", fontSize:"14px", fontWeight:"bold"}}>Văn Bản</Tab>
              <Tab style={{margin:"0em", fontSize:"14px", fontWeight:"bold"}}>Tài liệu</Tab>
            </TabList>
            <TabPanel>
              <form ref={el => this.myFormRef = el} name="sentMessage" validate onSubmit={handleSubmit} style={{ width: "100%" }}>
                <div className="form-group">
                  <TextareaAutosize
                    disabled={textAreaDisable}
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
                <div className='row' style={{ marginLeft: "0em" , height:"40px", alignItems:"center"}}>
                  <button style={{justifyContent:"center", alignContent:"center", width:"100px", textAlign:"center", fontWeight:"bold", marginRight:"20px", height:"40px", display: scan_button_dp, backgroundColor:"white", border:"1px solid #0070c9", color:"#0070c9", fontSize:"12px", alignItems:"center", borderRadius:"6%"}} id='submit_btn' type="submit">
                    Quét 
                  </button>
                  <a href='#' onClick={handleComment} style={{fontSize:"1rem", color: "GrayText" , backgroundColor: "white", display: fb_display, fontSize:"8", justifyContent:"center", textAlign:"center", alignItems:"center"}}>
                    {fbText}
                  </a>
                  <button onClick={handleComment} style={{ color: "blue", backgroundColor: "white", display: cancelBtn, margin: "0em", border:"none" }}>
                    Hủy
                  </button>
                  </div>
              </form>
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
        </div>
        <div className='row' style={{ width: "100%", display: displayComment }}>
          <button onClick={handleTPL} className={!active0 ? 'fb-button' : 'fb-button-enable'} >Trái Pháp Luật ?</button>{' '}
          <button onClick={handleTT} className={!active1 ? 'fb-button' : 'fb-button-enable'}>Thô Tục ?</button>{' '}
          <button onClick={handleSex} className={!active2 ? 'fb-button' : 'fb-button-enable'} >Liên quan Sex ?</button>{' '}
          <button onClick={hanleCK} className={!active3 ? 'fb-button' : 'fb-button-enable'} >Công kích đối tượng ?</button>{' '}
          <button onClick={hanldeCT} className={!active4 ? 'fb-button' : 'fb-button-enable'} >Nhạy cảm chính trị ?</button>{' '}
          <button onClick={hanldeClean} className={!active5 ? 'fb-button' : 'fb-button-enable'} >Câu sạch ?</button>{' '}</div>
        {/* <div className='row' style={{ width: "fit-content", backgroundColor: "lightgrey" }}>{bad_content}</div> */}
        <div className='row' style={{textAlign:"center", backgroundColor:"#f5f5f7", justifyContent: "center", marginTop:"0.5em"}}>
          <h3 style={{width:"100%", alignItems:"center", textAlign:"center", marginTop:"0.5em", color:"#351c75"}}>{resultText}</h3>
          <a href="#" onClick={hanldeDetail} style={{width:"fit-content", alignItems:"center", textAlign:"center", border:"none", display: detailBtn}}>{detailBtnText}</a>
        </div>
        <div id="display_result" className='row' style={{ display: display_result }}>
          <div className='row' style={{ width: "100%", marginTop: "1rem", justifyContent:"center", paddingLeft:"1rem" }}>
            <div style={{ width: "100%" }}>
              <ProgressBar completed={score} maxCompleted={100} /></div>
            {/* <div style={{ width: "100%" }}>
              <MultiColorProgressBar completed={score} readings={readings}/></div> */}
            <p style={{ width: "100%", marginTop: "1rem",  paddingLeft:"0.1rem"  }}>Mức độ nhạy cảm</p>
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
              <p className='row' style={{ color: 'black', alignItems: 'center', textAlign: "center", justifyContent:"center" }}>Pháp Luật</p>
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
              <p style={{ color: 'black', alignItems: 'center', textAlign: "center", justifyContent:"center" }}>SEX</p>
            </div>
          </div>
          <div className='row' style={{ width: "100%", marginTop: "1%", justifyContent:"center" }}>
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
              <p style={{ color: 'black', alignItems: 'center', textAlign: "center", justifyContent:"center" }}>Công Kích</p>
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
              <p style={{ color: 'black', alignItems: 'center', textAlign: "center", justifyContent:"center" }}>Chính trị</p>
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
