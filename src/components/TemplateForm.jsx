import React, { useState } from "react"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './../firebase'
import { v4 } from 'uuid'

function TemplateForm() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  const [header, setHeader] = useState(null)
  const [body, setBody] = useState(null)
  const [closer, setCloser] = useState(null)
  const [name, setName] = useState(null)

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
                <div className="pcheader">{header}</div>
                <div className="pcbody">{body}</div>
                <div className="pccloser">{closer}</div>
                <div className="pcname">{name}</div>
          </div>
        {/* </body>
      </html> */}
      {/* -----------Postcard Front-------------------- */}

      <form onSubmit={(event) => {
        event.preventDefault()
        setHeader(event.target.header.value)
        setBody(event.target.body.value)
        setCloser(event.target.closer.value)
        setName(event.target.name.value)
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
    <button onClick={uploadFile}>Send Postcard!</button>
    {imageUrl} 
    </div >
  )
}

export default TemplateForm