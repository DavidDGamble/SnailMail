import React, { useState } from "react";
import { db, auth } from './../firebase';
import Home from './Home'
import TemplateForm from './TemplateForm'

function PostcardControl() {
  const [viewTemplateForm, setViewTemplateForm] = useState(true)

  if (auth.currentUser == null) {
    return (
      <div className="no-user">
        <h5>Please sign in or sign up to send a postcard.</h5>
        <h1>Welcome to Snail Mail!</h1>
        <h2>How Snail Mail Works</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, laboriosam vitae eligendi nemo, modi consequuntur recusandae totam, eaque laborum beatae ad vero aut molestiae impedit repudiandae reiciendis voluptatem distinctio dolorem!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, exercitationem delectus quod inventore porro eum! Vero facere error vel tempore enim accusantium commodi laborum quidem consectetur, odio culpa ratione cupiditate.</p>
      </div>
    )
  } else {
    let currVisibleState = null

    if (viewTemplateForm) {
      currVisibleState = <TemplateForm />
    } else {
      currVisibleState = <Home />
    }

    return (
      <React.Fragment>
        {currVisibleState}
      </React.Fragment>
    )
  }
}

export default PostcardControl