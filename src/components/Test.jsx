import React, { useState } from "react";

const UploadAndDisplayImage = () => {

  const [selectedImage, setSelectedImage] = useState(null)
  const [header, setHeader] = useState(null)
  const [body, setBody] = useState(null)
  const [closer, setCloser] = useState(null)
  const [name, setName] = useState(null)

  return (
    <div className="upload-test">
      <div className="image">
        <h1>Upload and Display Image using React Hook's</h1>

        {selectedImage && (
          <div>
            {/* -----------Postcard Front-------------------- */}
            <html>
              <body>
                <div className="page" >
                  <div className='card'>
                    <img src={URL.createObjectURL(selectedImage)} />
                  </div>
                </div>
              </body>
            </html>
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
            console.log(event.target.files[0])
            setSelectedImage(event.target.files[0])
          }}
        />
      </div>
      <div className="postcard-txt">
        <h1>Upload Postcard Text</h1>
        {/* -----------Postcard Front-------------------- */}
        <html>
          <head>
            <link
              rel="stylesheet"
              type="text/css"
              href="https://fonts.googleapis.com/css?family=Roboto" />
          </head>

          <body>
            <div class="page">       
                <div className="header">{header}</div>

                <div className="body">{body}</div>

                <div className="closer">{closer}</div>

                <div className="name">{name}</div>

          </div>
        </body>
      </html>
      {/* -----------Postcard Front-------------------- */}
      <h3>{header}</h3>
      <p>{body}</p>
      <h4>{closer}</h4>
      <h5>{name}</h5>

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
    </div >
  )
}

export default UploadAndDisplayImage