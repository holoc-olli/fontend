import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from "react";

export const Header = (props) => {
  const [text, SetText] = useState({})
  const handleSubmit = () => {
    console.log(text)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    SetText(value)

  }
  // const clearState = () => setState({ ...initialState })

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(name, email, message)
  //   emailjs
  //     .sendForm(
  //       'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID'
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text)
  //         clearState()
  //       },
  //       (error) => {
  //         console.log(error.text)
  //       }
  //     )
  // }

  return (
    <header id="header">
      <form onSubmit={handleSubmit}>
        <label>
          Essay:
          <textarea  type='text' onChange={handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </header>
  );
};
