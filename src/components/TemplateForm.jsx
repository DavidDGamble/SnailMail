import React, { useState, useEffect } from "react"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './../firebase'
import { v4 } from 'uuid'
import PropTypes from 'prop-types'
import * as u from './../utilities/utilities'

function TemplateForm(props) {
  const [selectedImage, setSelectedImage] = useState(null)

  const { imageUrl, setImageUrl, tempBackInfo, setTempBackInfo, setFrontTemplate, setBackTemplate } = props

  const uploadFile = () => {
    if (selectedImage == null) return
    const imageRef = ref(storage, `images/${selectedImage.name + v4()}`)
    uploadBytes(imageRef, selectedImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // console.log(`Current URL: ${url}`)
        setImageUrl(url)
      })
    })  
  }  

  useEffect(() => {
    // console.log(`imageUrl: ${imageUrl}`)
    let frontResponse = null 
    let backResponse = null 
    if (imageUrl != null ) {
      const tempFrontHTML = u.createFrontTemp(imageUrl)
      const tempBackHTML = u.createBackTemp(tempBackInfo)
      setFrontTemplate(tempFrontHTML)
      setBackTemplate(tempBackHTML)
      // vvvvv---creates a template in PostGrid---vvvvv
      // change description in future????
      // frontResponse = u.createTemplate('test from Snail Mail', tempFrontHTML)
      // backResponse = u.createTemplate('test from Snail Mail', tempBackHTML)
      props.handleTemplateForm()
      props.handleAddressForm()
    } else {
      //Handle error when user tries to send a postcard without an image
      console.log('error: no img uploaded')
    }
    // if (frontResponse != null && backResponse != null) {
      // props.handleTemplateForm()
      // props.handleAddressForm()
    // }
  }, [imageUrl])

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
                {/* <div className="pcheader">{tempBackInfo.header}</div>
                <div className="pcbody">{tempBackInfo.body}</div>
                <div className="pccloser">{tempBackInfo.closer}</div>
                <div className="pcname">{tempBackInfo.name}</div> */}
                <div className="postcard-contents">
                  <div className="pc-header">{tempBackInfo.header}</div><br/>
                  <span className="pc-body">{tempBackInfo.body}</span><br/>
                  <span className="pc-closer">{tempBackInfo.closer}</span><br/>
                  <span className="pc-name">{tempBackInfo.name}</span>
                </div>
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
          maxLength='250'
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
    <button onClick={uploadFile}>Send Postcard!</button>
    {imageUrl} 
    </div >
  )
}

TemplateForm.propTypes = {
  imageUrl: PropTypes.string,
  setImageUrl: PropTypes.func,
  tempBackInfo: PropTypes.object,
  setTempBackInfo: PropTypes.func,
  setFrontTemplate: PropTypes.func,
  setBackTemplate: PropTypes.func,
  handleTemplateForm: PropTypes.func,
  handleAddressForm: PropTypes.func
}

export default TemplateForm