require('dotenv').config();
// process.env.SANDBOX_API_KEY  // sandbox api key
//  process.env.API_KEY //live api key

// to run api tests in terminal---vvvvv
// node -i -e "$(< apiTest.js)"

const fetch = require('node-fetch');

const POSTGRID_URL = 'https://api.postgrid.com/print-mail/v1';


// Function for running test calls to API---vvvvv
// run logAwait(createTemplate(templateDescription, templateSide)); to create templates
/**
 * @param {Promise<any>} x
 */
async function logAwait(x) {
  try {
    console.log(await x);
  } catch (e) {
    console.error(e);
  }
}

// Function for creating a new template with API---vvvvv
/**
 * @param {string} templateDescription
 * @param {string} templateHTML
 */
async function createTemplate(templateDescription, templateHTML) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      description: templateDescription,
      html: templateHTML,
    }),
    headers: {
      'x-api-key': process.env.SANDBOX_API_KEY,
      'Content-Type': 'application/json',
    },
  };

  const resp = await fetch(POSTGRID_URL + '/templates', requestOptions);

  return await resp.json();
}

//vvvvv---below are samples for the html used to make templates for the front and back of postcards---vvvvv
// Change img width to 410?
// Remove top from card syle?
const templateFront = `
<html>
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
<div
style="
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
"
>
<img

    src="https://firebasestorage.googleapis.com/v0/b/snail-mail-95f4c.appspot.com/o/images%2Fpostcard-test.png0e7c7fbd-8a36-4846-aa51-4edb0c3d229a?alt=media&token=e0dc69ad-223a-49c0-a457-17380e1aa3bb"
    
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
    "
/>
</div>
    </div>
</body>
</html>
`
const templateBack = `
<html>
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

                ">Hey Dude!</div>

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

                ">This is a test for creating a post card.  I really hope this works so my project can kick ass!</div>

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

                ">Hell Yeah,</div>

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

                ">Future David</div>

    </div>
</body>
</html>
`;
const newTempBackTest = `<html>
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
                    <span style="font-weight: bold; font-size: 1.5rem;">Hey dude!</span>
                    <span style="float: left">This is test content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptatibus, quasi natus maxime ullam nemo quidem voluptatem cum eligendi! Eius dicta quasi saepe distinctio porro alias dolorem autem culpa accusamus. </span>
                    <span style="font-weight: bold; float: left; margin-left: 1rem;">Sincerely,</span>
                    <span style="float: left; margin-left: 2rem;">David Gamble</span>
                </div>
    </div>

</body>
</html>`

const templateDescription = 'Test template w/ firebase img' // Insert your description here


// Function for creating a new contact with API---vvvvv
/**
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} description
 * @param {string} address
 */
async function createContact(bodyObject) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'x-api-key': process.env.SANDBOX_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: bodyObject.firstName,
      lastName: bodyObject.lastName,
      addressLine1: bodyObject.addressLine1,
      city: bodyObject.city,
      provinceOrState: bodyObject.provinceOrState,
      postalOrZip: bodyObject.postalOrZip
    }),
  };

  const resp = await fetch(POSTGRID_URL + '/contacts', requestOptions);

  return await resp.json();
}

const body = {
  firstName: "David",
  lastName: "Gamble",
  addressLine1: "680 NE Webster St",
  city: "Portland",
  provinceOrState: "OR",
  postalOrZip: "97211"
}

const firstName = "David";
const lastName = "Gamble";
const description = "This is a test contact";
const address = "680 NE Webster St, Portland, OR 97211";

// Function for sending a postcard with api---vvvvv 
/**
 * @typedef {{
*  addressLine1:string,
*  addressLine2:string?,
*  city:string?,
*  provinceOrState:string?,
*  postalOrZip:string?,
*  country:string?,
*  firstName:string?,
*  lastName:string?,
*  email:string?,
*  phoneNumber:string?
*  companyName:string?,
*  jobTitle:string?
*  metadata: any
* }} Contact
*
* @param {Contact} to
* @param {string} fromContactId
* @param {string} frontTemplateId
* @param {string} backTemplateId
* @param {string} postcardSize
*/
async function createPostcardFromScratch(to, fromContactId, frontTemplateId, backTemplateId, postcardSize) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'x-api-key': process.env.SANDBOX_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: to,
      from: fromContactId,
      frontTemplate: frontTemplateId,
      backTemplate: backTemplateId,
      //frontHTML for sending HTML instead of a template
      //backHTML for sending HTML instead of a template
      size: postcardSize
    }),
  };

  const resp = await fetch(POSTGRID_URL + '/postcards', requestOptions);

  return await resp.json();
}

const to = {
  addressLine1: '47 Dietz Ave S',
  city: 'Las Vegas',
  provinceOrState: 'NV',
  postalOrZip: '12345',
  firstName: 'John',
  lastName: 'Adams',
};
const fromContactId = 'contact_bdogQL22QaAyUpJLJjfwrg';
const frontTemplateId = 'template_25nfz3ZFoLKEFLTigc1y1D';
const backTemplateId = 'template_rLZ3cJxHGdwfZHv7sngR9v';
const postcardSize = '6x4';

//vvvvv---Test max body content---vvvvv
//This is a test. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate dignissimos aperiam, veritatis blanditiis aliquid animi possimus similique praesentium quasi. Vitae, architecto ipsam fugit repudiandae neque quisquam modi porro at veniam.  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate dignissimos aperiam, veritatis blanditiis aliquid animi possimus similique praesentium quasi. Vitae, architezxc.