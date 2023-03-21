import React, { useState, useEffect } from "react"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './../firebase'
import { v4 } from 'uuid'
import PropTypes from 'prop-types'
import * as u from './../utilities/utilities'
import Address from './../img/address.png'
import Label from './../img/label.png'
import './../styles/templateForm.css'

function TemplateForm(props) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [tempBackInfo, setTempBackInfo] = useState({})
  const [isVertical, setVertical] = useState(true)
  const [isLoading, setLoading] = useState(false)

  const { postcardInfo, setPostcardInfo } = props

  useEffect(() => {
    if (postcardInfo.selectedImage != null) {
       setSelectedImage(postcardInfo.selectedImage)
       setVertical(postcardInfo.isVertical)
       setTempBackInfo(postcardInfo.tempBackInfo) 
    }
  }, [])

  const verticalImg = {
    width: '450.00006307694395px',
    height: '600.0000841025919px',
    position: 'relative',
    margin: '0',
    padding: '0',
    left: '0',
    top: '0',
    marginTop: '0px',
    marginLeft: '0px',
    opacity: '1',
  }
  const verticalCard = {
    position: 'relative',
    margin: '0',
    padding: '0',
    left: '600.000084102592px',
    top: '-21.00003153847359px',
    width: '450.00006307694395px',
    height: '600.0000841025919px',
    clip: 'rect(0px, 450.00006307694395, 600.0000841025919, 0px)',
    overflow: 'visible',
    transform: 'rotate(89.9999999999997deg) scaleX(1) scaleY(1)',
    transformOrigin: 'top left'
  }
  const horizontalImg = {
    width: '613.1147540983611px',
    height: '408.00000000000034px',
    position: 'relative',
    margin: '0',
    padding: '0',
    left: '0',
    top: '0',
    marginTop: '0px',
    marginLeft: '0px',
    opacity: '1'
  }
  const horizontalCard = {
    position: 'relative',
    margin: '0',
    padding: '0',
    left: '1.3859308349106685e-13px',
    top: '-5.067434470073995e-13px',
    width: '600px',
    height: '408.0000000000003px',
    clip: 'rect(0px, 600, 408.0000000000003, 0px)',
    overflow: 'visible',
    transform: 'rotate(0deg) scaleX(1) scaleY(1)',
    transformOrigin: 'top left'
  }
  
  const handleSendPostcard = () => {
    let noMessage = null
    if ((tempBackInfo.header === undefined && tempBackInfo.body === undefined && tempBackInfo.closer === undefined && tempBackInfo.name === undefined) || (tempBackInfo.header === '' && tempBackInfo.body === '' && tempBackInfo.closer === '' && tempBackInfo.name === '')) {
      noMessage = window.confirm(`Your postcard doesn't contain a message.  Is this what you want?`)
      if (noMessage) {
        setTempBackInfo({
          header: '',
          body: '',
          closer: '',
          name: ''
        })
      } else {
        return
      }
    }
    uploadFile()
  }

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
      let imgInfo
      if (isVertical) {
        imgInfo = {
          imgOrientation: verticalImg,
          cardOrientation: verticalCard
        }
      } else {
        imgInfo = {
          imgOrientation: horizontalImg,
          cardOrientation: horizontalCard
        }
      }

      const tempFrontHTML = u.createFrontTemp(imageUrl, imgInfo)
      const tempBackHTML = u.createBackTempNew(tempBackInfo)
      
      setPostcardInfo(Object.assign(postcardInfo, {
        frontTemp: tempFrontHTML,
        backTemp: tempBackHTML,
        selectedImage: selectedImage,
        isVertical: isVertical,
        tempBackInfo: tempBackInfo,
      }))
      setLoading(false)
      props.handleAddressForm()
    }
  }, [imageUrl])

  let button = null
  if (selectedImage != null) {
    button = <button className="main-btn" 
      onClick={handleSendPostcard}
      disabled={isLoading} 
    >{isLoading ? "Loading..." : "Send Postcard!"}</button>
  }

  return (
    <div className="temp-form">
      <button className="main-btn" onClick={props.handleHome} type="submit" disabled={isLoading}>Return Home</button>
      <div className="image">
        <h1>Upload Postcard Image</h1>
        {selectedImage && (
          <div>
            {/* -----------Postcard Front-------------------- */}
            <div className="page">
              <div className='card' style={isVertical ? verticalCard : horizontalCard}>
                <img style={isVertical ? verticalImg : horizontalImg} src={URL.createObjectURL(selectedImage)} alt="User upload." />
              </div>
            </div>
            {/* -----------Postcard Front-------------------- */}
            <br />
            <button className="edit-btn" onClick={() => setVertical(!isVertical)} disabled={isLoading}>Rotate</button>
          </div>
        )}
        <br />
        <label className="img-upload">Upload Image
          <input
            type="file"
            name="myImage"
            disabled={isLoading}
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
            <img className="address" src={Address} alt="Address." />
            <div className="logo-bot">
              <img className="logo-img" src={Label} alt="Snail mail logo."/>
            </div>
            <div className="logo-mid">
              <img className="logo-img" src={Label} alt="Snail mail logo."/>
            </div>
            <div className="logo-top">
              <img className="logo-img" src={Label} alt="Snail mail logo."/>
            </div>
          <div className="postcard-contents">
            <span className="pc-header">{tempBackInfo.header}</span><br />
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
            maxLength='22'
            placeholder="Header" /><br />
          <textarea
            type="text"
            name='body'
            maxLength='390'
            placeholder="Body" /><br />
          <input className="pc-input"
            type="text"
            name='closer'
            maxLength='41'
            placeholder="Closer" /><br />
          <input className="pc-input"
            type="text"
            name='name'
            maxLength='38'
            placeholder="Name" /><br />
          <button className="main-btn" type="submit" disabled={isLoading}>Add Message</button>
        </form>
      </div>
      {button}
    </div >
  )
}

TemplateForm.propTypes = {
  postcardInfo: PropTypes.object,
  setPostcardInfo: PropTypes.func,
  handleAddressForm: PropTypes.func,
  handleHome: PropTypes.func
}

export default TemplateForm