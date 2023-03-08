import React, { useState, useEffect } from "react"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './../firebase'
import { v4 } from 'uuid'
import PropTypes from 'prop-types'
import * as u from './../utilities/utilities'
import './../styles/templateForm.css'

function TemplateForm(props) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [tempBackInfo, setTempBackInfo] = useState({})
  const [isLoading, setLoading] = useState(false)

  const { postcardInfo, setPostcardInfo } = props

  const uploadFile = () => {
    if (selectedImage == null) return
    setLoading(true)
    const imageRef = ref(storage, `images/${selectedImage.name + v4()}`)
    uploadBytes(imageRef, selectedImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url)
      })
    })
  }

  useEffect(() => {
    if (imageUrl != null) {
      const tempFrontHTML = u.createFrontTemp(imageUrl)
      const tempBackHTML = u.createBackTemp(tempBackInfo)
      setPostcardInfo(Object.assign(postcardInfo, {
        frontTemp: tempFrontHTML,
        backTemp: tempBackHTML
      }))
      setLoading(false)
      props.handleAddressForm()
    }
  }, [imageUrl])

  let button = null
  if (selectedImage != null) {
    button = <button className="main-btn" 
      onClick={uploadFile}
      disabled={isLoading} 
    >{isLoading ? "Loading..." : "Send Postcard!"}</button>
  }

  return (
    <div className="temp-form">
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
          </div>
        )}
        <br />
        <label className="img-upload">Upload An Image
          <input
            type="file"
            name="myImage"
            onChange={(event) => {
              setSelectedImage(event.target.files[0])
            }}
          />
        </label>
      </div>
      <div className="postcard-txt">
        <h1>Upload Postcard Text</h1>
        {/* -----------Postcard Back-------------------- */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Roboto" />
        <div className="page">
          <div className="postcard-contents">
            <div className="pc-header">{tempBackInfo.header}</div><br />
            <span className="pc-body">{tempBackInfo.body}</span><br />
            <span className="pc-closer">{tempBackInfo.closer}</span><br />
            <span className="pc-name">{tempBackInfo.name}</span>
          </div>
        </div><br />
        {/* -----------Postcard Back-------------------- */}
        <form onSubmit={(event) => {
          event.preventDefault()
          setTempBackInfo({
            header: event.target.header.value,
            body: event.target.body.value,
            closer: event.target.closer.value,
            name: event.target.name.value
          })
        }}>
          <input className="pc-input"
            type="text"
            name='header'
            placeholder="Header" /><br />
          <textarea
            type="text"
            name='body'
            maxLength='250'
            placeholder="Body" /><br />
          <input className="pc-input"
            type="text"
            name='closer'
            placeholder="Closer" /><br />
          <input className="pc-input"
            type="text"
            name='name'
            placeholder="Name" /><br />
          <button className="main-btn" type="submit" disabled={isLoading}>Submit</button>
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