import React, { useState } from "react"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './../firebase'
import { v4 } from 'uuid'
import PropTypes from 'prop-types'
import * as u from './../utilities/utilities'

function TemplateForm(props) {
  const [selectedImage, setSelectedImage] = useState(null)

  const { imageUrl, setImageUrl, tempBackInfo, setTempBackInfo } = props

  const uploadFile = () => {
    if (selectedImage == null) return
    console.log(selectedImage)
    const imageRef = ref(storage, `images/${selectedImage.name + v4()}`)
    uploadBytes(imageRef, selectedImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(`Current URL: ${url}`)
        setImageUrl(url)
      })
    })  
    console.log(`imageUrl: ${imageUrl}`)  
  }  

// Retrieving the url and setImageUrl does not happen immediately and everything after uploadFile() runs before it is set
  const handleSendPostcard = () => { 
    uploadFile()
    const tempFrontHTML = u.createFrontTemp(imageUrl)
    const tempBackHTML = u.createBackTemp(tempBackInfo)
    // change description in future?
    u.createTemplate('test from Snail Mail', tempFrontHTML)
    console.log('Front temp api call ran')
    u.createTemplate('test from Snail Mail', tempBackHTML)
    console.log('Back temp api call ran')
  }

  return (
    <div className="upload-test">
      <div className="image">
        <h1>Upload Postcard Image</h1>

        {selectedImage && (
          <div>
            {/* -----------Postcard Front-------------------- */}
            {/* <html>
              <body> */}
                <div className="page" >
                  <div className='card'>
                    <img src={URL.createObjectURL(selectedImage)} />
                  </div>
                </div>
              {/* </body>
            </html> */}
            {/* -----------Postcard Front-------------------- */}
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}

        <br />
        <br />

        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            setSelectedImage(event.target.files[0])
          }}
        />
      </div>


      <div className="postcard-txt">
        <h1>Upload Postcard Text</h1>
        {/* -----------Postcard Front-------------------- */}
        {/* <html>
          <head> */}
            <link
              rel="stylesheet"
              type="text/css"
              href="https://fonts.googleapis.com/css?family=Roboto" />
          {/* </head>
          <body> */}
            <div className="page">       
                <div className="pcheader">{tempBackInfo.header}</div>
                <div className="pcbody">{tempBackInfo.body}</div>
                <div className="pccloser">{tempBackInfo.closer}</div>
                <div className="pcname">{tempBackInfo.name}</div>
          </div>
        {/* </body>
      </html> */}
      {/* -----------Postcard Front-------------------- */}

      <form onSubmit={(event) => {
        event.preventDefault()
        setTempBackInfo({
          header: event.target.header.value,
          body: event.target.body.value,
          closer: event.target.closer.value,
          name: event.target.name.value
        })
      }}>
        <input
          type="text"
          name='header'
          placeholder="Header" /><br />
        <textarea
          type="text"
          name='body'
          maxLength='440'
          placeholder="Body" /><br />
        <input
          type="text"
          name='closer'
          placeholder="Closer" /><br />
        <input
          type="text"
          name='name'
          placeholder="Name" /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
    <button onClick={handleSendPostcard}>Send Postcard!</button>
    {imageUrl} 
    </div >
  )
}

TemplateForm.propTypes = {
  imageUrl: PropTypes.string,
  setImageUrl: PropTypes.func,
  tempBackInfo: PropTypes.object,
  setTempBackInfo: PropTypes.func
}

export default TemplateForm