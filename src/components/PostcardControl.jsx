import React, { useState } from "react";
import { db, auth } from './../firebase';
import Home from './Home'
import TemplateForm from './TemplateForm'

function PostcardControl() {
  const [imageUrl, setImageUrl] = useState(null)
  const [tempBackInfo, setTempBackInfo] = useState({})

  const [viewTemplateForm, setViewTemplateForm] = useState(false)

  const handleTemplateForm = () => { setViewTemplateForm(!viewTemplateForm) }

  let currVisibleState = null

  if (viewTemplateForm) {
    currVisibleState = <TemplateForm
      imageUrl={imageUrl}
      setImageUrl={setImageUrl}
      tempBackInfo={tempBackInfo}
      setTempBackInfo={setTempBackInfo} />
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