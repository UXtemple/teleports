import React from 'react'

const MYThing = props => (
  <button>{props.thing}</button>
)
const MyApp = props => (
  <div>
    This is my app!!!!!
    {props.text}

    <MYThing thing='eqw' />
  </div>
)

export default MyApp
