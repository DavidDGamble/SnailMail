import React, { useState } from "react";
import Home from './Home'
import TemplateForm from './TemplateForm'
import AddressForm from './AddressForm'

function PostcardControl() {
  const [postcardInfo, setPostcardInfo] = useState({
    frontTemp: null,
    backTemp: null,
    to: null,
    from: null 
  })
  const [viewTemplateForm, setViewTemplateForm] = useState(false)
  const [viewAddressForm, setViewAddressForm] = useState(false)

  const handleHome = () => {
    setViewTemplateForm(false)
    setViewAddressForm(false)
  }
  const handleTemplateForm = () => { 
    setViewTemplateForm(true)
    setViewAddressForm(false)
  }
  const hanldeAddressForm = () => { 
    setViewAddressForm(true)
    setViewTemplateForm(false) 
  }

  let currVisibleState = null

  if (viewTemplateForm) {
    currVisibleState = <TemplateForm
      postcardInfo={postcardInfo}
      setPostcardInfo={setPostcardInfo}
      handleAddressForm={hanldeAddressForm} 
      handleHome={handleHome} />
  } else if (viewAddressForm) {
    currVisibleState = <AddressForm 
      postcardInfo={postcardInfo}
      setPostcardInfo={setPostcardInfo}
      handleTemplateForm={handleTemplateForm}
      handleHome={handleHome} />
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