import React, { useState } from "react";
import { db, auth } from './../firebase';
import Home from './Home'
import TemplateForm from './TemplateForm'
import AddressForm from './AddressForm'

function PostcardControl() {
  const [imageUrl, setImageUrl] = useState(null)
  const [tempBackInfo, setTempBackInfo] = useState({})

  const [senderInfo, setSenderInfo] = useState({})
  const [receiverInfo, setReceiverInfo] = useState({})
  const [frontTemplate, setFrontTemplate] = useState(null)
  const [backTemplate, setBackTemplate] = useState(null)

  const [viewTemplateForm, setViewTemplateForm] = useState(false)
  const [viewAddressForm, setViewAddressForm] = useState(false)

  const handleTemplateForm = () => { setViewTemplateForm(!viewTemplateForm) }
  const hanldeAddressForm = () => { setViewAddressForm(!viewAddressForm) }

  let currVisibleState = null

  if (viewTemplateForm) {
    currVisibleState = <TemplateForm
      imageUrl={imageUrl}
      setImageUrl={setImageUrl}
      tempBackInfo={tempBackInfo}
      setTempBackInfo={setTempBackInfo} 
      frontTemplate={frontTemplate}
      setFrontTemplate={setFrontTemplate}
      backTemplate={backTemplate}
      setBackTemplate={setBackTemplate}
      handleTemplateForm={handleTemplateForm}
      handleAddressForm={hanldeAddressForm} />
  } else if (viewAddressForm) {
    currVisibleState = <AddressForm 
      senderInfo={senderInfo}
      setSenderInfo={setSenderInfo}
      receiverInfo={receiverInfo}
      setReceiverInfo={setReceiverInfo}
      frontTemplate={frontTemplate}
      backTemplate={backTemplate} />
  } else {
    currVisibleState = <Home handleTemplateForm={handleTemplateForm} />
  }

  return (
    <React.Fragment>
      {currVisibleState}
    </React.Fragment>
  )
}

export default PostcardControl