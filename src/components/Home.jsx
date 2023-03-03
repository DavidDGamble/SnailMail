import React, { useState } from "react";
import PropTypes from 'prop-types'

function Home(props) {
  return(
    <div className="home">
        <h5>Create an account and sign in to save all the postcards you create and contacts!</h5>
        <h1>Welcome to Snail Mail!</h1>
        <h2>How Snail Mail Works</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, laboriosam vitae eligendi nemo, modi consequuntur recusandae totam, eaque laborum beatae ad vero aut molestiae impedit repudiandae reiciendis voluptatem distinctio dolorem!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, exercitationem delectus quod inventore porro eum! Vero facere error vel tempore enim accusantium commodi laborum quidem consectetur, odio culpa ratione cupiditate.</p>
        <button onClick={props.handleTemplateForm}>Send A Postcard!</button>
      </div>
  )
}

Home.propTypes = {
  handleTemplateForm: PropTypes.func
}

export default Home