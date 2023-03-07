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
            // console.log(`Fetch response: ${JSON.stringify(jres, null, 2)}`)
            resolve(jres)
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
// vvvvv---createTemplateResponse---vvvvv
// {
//   "id": "template_tBnVEzz878mXLbHQaz86j8",
//   "object": "template",
//   "live": false,
//   "deleted": false,
//   "description": "Test",
//   "html": "<b>Hello</b> {{to.firstName}}!",
//   "createdAt": "2020-11-12T23:23:47.974Z",
//   "updatedAt": "2020-11-12T23:23:47.974Z"
// }

export async function createContact(contactInfo) {
  const { addressLine1, city, provinceOrState, postalOrZip, firstName, lastName } = contactInfo
  const requestOptions = {
    method: 'POST',
    headers: {
      'x-api-key': process.env.REACT_APP_POSTGRID_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      addressLine1: addressLine1,
      city: city,
      provinceOrState: provinceOrState,
      postalOrZip: postalOrZip,
      firstName: firstName,
      lastName: lastName
    })
  }

  return new Promise((resolve, reject) => {
    fetch('https://api.postgrid.com/print-mail/v1/contacts', requestOptions)
      .then((res) => {
        res.json()
          .then((jres) => {
            // console.log(`Fetch response: ${JSON.stringify(jres, null, 2)}`)
            resolve(jres)
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
// vvvvv---createContact Response---vvvvv
// {
//   "id": "contact_pxd7wnnD1xY6H6etKNvjb4",
//   "object": "contact",
//   "live": false,
//   "addressLine1": "20-20 BAY ST",
//   "addressLine2": "FLOOR 11",
//   "addressStatus": "verified",
//   "city": "TORONTO",
//   "companyName": "PostGrid",
//   "country": "CANADA",
//   "countryCode": "CA",
//   "description": "Kevin Smith's contact information ",
//   "email": "kevinsmith@postgrid.com",
//   "firstName": "Kevin",
//   "jobTitle": "Manager",
//   "lastName": "Smith",
//   "metadata": {
//     "friend": "no"
//   },
//   "phoneNumber": "9059059059",
//   "postalOrZip": "M5J 2N8",
//   "provinceOrState": "ON",
//   "createdAt": "2022-02-16T15:08:41.052Z",
//   "updatedAt": "2022-02-17T16:58:10.063Z"
// }

export async function createPostcard(bodyInfo) {
  const { to, from, frontTemp, backTemp } = bodyInfo
  const requestOptions = {
    method: 'POST',
    headers: {
      'x-api-key': process.env.REACT_APP_POSTGRID_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: to,
      from: from,
      //vvvvv---using HTML instead of id for non users---vvvvv
      frontHTML: frontTemp,
      backHTML: backTemp,
      // frontTemplate: frontTempId,
      // backTemplate: backTempId,
      size: '6x4'
    })
  }

  return new Promise((resolve, reject) => {
    fetch('https://api.postgrid.com/print-mail/v1/postcards', requestOptions)
      .then((res) => {
        res.json()
          .then((jres) => {
            // console.log(`Fetch response: ${JSON.stringify(jres, null, 2)}`)
            resolve(jres)
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
// vvvvv---createPostcard Response---vvvvv
// {
//   "id": "postcard_xnSK1RPcqbYY7y6z8qoy7j",
//   "object": "postcard",
//   "live": true,
//   "backTemplate": "template_gGF4jRzHBNogJrju2JHC2T",
//   "frontTemplate": "template_gGF4jRzHBNogJrju2JHC2T",
//   "sendDate": "2020-12-23T07:08:17.172Z",
//   "size": "6x4",
//   "status": "ready",
//   "to": {
//     "id": "contact_6fMMFdvk7YSSKVgaKyJaQS",
//     "object": "contact",
//     "addressLine1": "20-20 BAY ST",
//     "addressLine2": "",
//     "addressStatus": "corrected",
//     "city": "TORONTO",
//     "country": "CANADA",
//     "countryCode": "CA",
//     "firstName": "Kevin",
//     "postalOrZip": "M5J 2N8",
//     "provinceOrState": "ON"
//   },
//   "createdAt": "2020-12-23T07:08:17.178Z",
//   "updatedAt": "2020-12-23T07:08:17.178Z"
// }

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
    
    <div class="page" style="background-color: white">
        
                <div style="
                    position: absolute;

                    left: 31.946251768034532px;
                    top: 160.0000000000004px;

                    transform: rotate(0deg);
                    transform-origin: top left;

                    width: 320px;
                    height: 163px;

                    font-family: 'Roboto';
                    font-size: 15px;
                    font-style: normal;
                    font-weight: normal;

                    color: black;
                    opacity: 1;

                    text-align: justify;

                    line-height: 1.2;
                    letter-spacing: 0;
                    text-decoration: none;
                    white-space: pre-wrap;
                ">
                    <span style="font-weight: bold; font-size: 1.5rem;">${backInfo.header}</span>
                    <span style="float: left">${backInfo.body}</span>
                    <span style="font-weight: bold; float: left; margin-left: 1rem;">${backInfo.closer}</span>
                    <span style="float: left; margin-left: 2rem;">${backInfo.name}</span>
                </div>
    </div>

</body>
</html>`
  )
}