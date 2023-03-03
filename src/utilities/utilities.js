// Example call: createTemplate(tempDescription, tempHTML)
//                 .catch((error) => {
//                   console.log(error)
//                 })
export async function createTemplate(tempDescription, tempHTML) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      description: tempDescription,
      html: tempHTML
    }),
    headers: {
      'x-api-key': process.env.REACT_APP_POSTGRID_API_KEY,
      'Content-Type': 'application/json'
    }
  }

  return new Promise((resolve, reject) => {
    fetch('https://api.postgrid.com/print-mail/v1/templates', requestOptions)
      .then((res) => {
        res.json()
          .then((jres) => {
            console.log(`Fetch response: ${JSON.stringify(jres)}`)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export async function createContact(contactInfo) {
  const { firstName, lastName, description, address } = contactInfo
  const requestOptions = {
    method: 'POST',
    headers: {
      'x-api-key': process.env.REACT_APP_POSTGRID_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      description: description,
      addressLine1: address
    })
  }

  return new Promise((resolve, reject) => {
    fetch('https://api.postgrid.com/print-mail/v1/contacts', requestOptions)
      .then((res) => {
        res.json()
          .then((jres) => {
            console.log(`Fetch response: ${JSON.stringify(jres)}`)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export async function createPostcard(bodyInfo) {
  const { to, from, frontTempId, backTempId } = bodyInfo
  const requestOptions = {
    method: 'POST',
    headers: {
      'x-api-key': process.env.REACT_APP_POSTGRID_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: to,
      from: from,
      frontTemplate: frontTempId,
      backTemplate: backTempId,
      size: '6x4'
    })
  }

  return new Promise((resolve, reject) => {
    fetch('https://api.postgrid.com/print-mail/v1/postcards', requestOptions)
      .then((res) => {
        res.json()
          .then((jres) => {
            console.log(`Fetch response: ${JSON.stringify(jres)}`)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function createFrontTemp(url) {
  return (
    `<html>
      <head>
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            width: 600px;
            height: 408px;
          }
          .page {
            position: relative;
            width: 600px;
            height: 408px;
            overflow: hidden; 
          }
        </style>
      </head>
      <body>   
        <div class="page" style="background-color: white">       
          <div style="
              position: absolute;
              margin: 0;
              padding: 0;
              left: 600.000084102592px;
              top: -21.00003153847359px;
              width: 450.00006307694395px;
              height: 600.0000841025919px;
              clip: rect(0px, 450.00006307694395, 600.0000841025919, 0px);
              overflow: visible;
              transform: rotate(89.9999999999997deg) scaleX(1) scaleY(1);
              transform-origin: top left;
          ">
            <img src=${url}   
                style="
                    width: 450.00006307694395px;
                    height: 600.0000841025919px;
                    position: absolute;
                    margin: 0;
                    padding: 0;
                    left: 0;
                    top: 0;
                    margin-top: 0px;
                    margin-left: 0px;
                    opacity: 1;
                    filter:
                    blur(0px)
                    brightness(1);
            "/>
          </div>
        </div>
      </body>
    </html>`
  )
}

export function createBackTemp(backInfo) {
  return (
    `<html>
      <head>
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            width: 600px;
            height: 408px;
          }
          .page {
            position: relative;
            width: 600px;
            height: 408px;
            overflow: hidden;
          }
        </style>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Roboto" />
      </head>
      <body>
        <div class="page" style="background-color: white"       
          <div style="
            position: absolute;
            left: -75.85924713584288px;
            top: 24px;
            transform: rotate(0deg);
            transform-origin: top left;
            width: 300px;
            height: 26px;
            font-family: 'Roboto';
            font-size: 20.533333333333335px;
            font-style: normal;
            font-weight: normal;
            color: black;
            opacity: 1;
            text-align: center;
            line-height: 1.2;
            letter-spacing: 0;
            text-decoration: none;
            white-space: pre-wrap;
          ">${backInfo.header}</div>
          <div style="
            position: absolute;
            left: 24px;
            top: 57.85597381342078px;
            transform: rotate(0deg);
            transform-origin: top left;
            width: 320px;
            height: 181px;
            font-family: 'Roboto';
            font-size: 15px;
            font-style: normal;
            font-weight: normal;
            color: black;
            opacity: 1;
            text-align: center;
            line-height: 1.2;
            letter-spacing: 0;
            text-decoration: none;
            white-space: pre-wrap;
          ">${backInfo.body}</div>
          <div style="
            position: absolute;
            left: -75.85924713584288px;
            top: 253.68576104746325px;
            transform: rotate(0deg);
            transform-origin: top left;
            width: 300px;
            height: 26px;
            font-family: 'Roboto';
            font-size: 20.533333333333335px;
            font-style: normal;
            font-weight: normal;
            color: black;
            opacity: 1;
            text-align: center;
            line-height: 1.2;
            letter-spacing: 0;
            text-decoration: none;
            white-space: pre-wrap;
          ">${backInfo.closer}</div>
          <div style="
            position: absolute;
            left: 24px;
            top: 293.94762684124413px;
            transform: rotate(0deg);
            transform-origin: top left;
            width: 300px;
            height: 26px;
            font-family: 'Roboto';
            font-size: 20.533333333333335px;
            font-style: normal;
            font-weight: normal;
            color: black;
            opacity: 1;
            text-align: center;
            line-height: 1.2;
            letter-spacing: 0;
            text-decoration: none;
            white-space: pre-wrap;
          ">${backInfo.name}</div>
        </div>
      </body>
    </html>`
  )
}