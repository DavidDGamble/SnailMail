import React, { useState, useEffect } from "react"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './../firebase'
import { v4 } from 'uuid'
import PropTypes from 'prop-types'
import * as u from './../utilities/utilities'

function TemplateForm(props) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [tempBackInfo, setTempBackInfo] = useState({})

  const { postcardInfo, setPostcardInfo } = props

  const uploadFile = () => {
    if (selectedImage == null) return
    const imageRef = ref(storage, `images/${selectedImage.name + v4()}`)
    uploadBytes(imageRef, selectedImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url)
      })
    })  
  }  

  useEffect(() => {
    if (imageUrl != null ) {
      const tempFrontHTML = u.createFrontTemp(imageUrl)
      const tempBackHTML = u.createBackTemp(tempBackInfo)
      setPostcardInfo(Object.assign(postcardInfo, {
        frontTemp: tempFrontHTML,
        backTemp: tempBackHTML
      }))
      props.handleAddressForm()
    }
  }, [imageUrl])

  let button = null
  if (selectedImage != null) {
    button = <button onClick={uploadFile}>Send Postcard!</button>
  }

  return (
    <div className="upload-test">
      <div className="image">
        <h1>Upload Postcard Image</h1>
        {selectedImage && (
          <div>
            {/* -----------Postcard Front-------------------- */}
                <div className="page" >
                  <div className='card'>
                    <img src={URL.createObjectURL(selectedImage)} alt="User upload." />
                  </div>
                </div>
            {/* -----------Postcard Front-------------------- */}
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
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
          <link
            rel="stylesheet"
            type="text/css"
            href="https://fonts.googleapis.com/css?family=Roboto" />
            <div className="page">       
              <div className="postcard-contents">
                <div className="pc-header">{tempBackInfo.header}</div><br/>
                <span className="pc-body">{tempBackInfo.body}</span><br/>
                <span className="pc-closer">{tempBackInfo.closer}</span><br/>
                <span className="pc-name">{tempBackInfo.name}</span>
              </div>
            </div><br/>
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
    {button}
    </div >
  )
}

TemplateForm.propTypes = {
  postcardInfo: PropTypes.object,
  setPostcardInfo: PropTypes.func,
  handleAddressForm: PropTypes.func
}

export default TemplateForm