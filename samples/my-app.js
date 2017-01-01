import React from 'react'

const MyThing = props => (
  <button>{props.thing}</button>
)
const MyApp = props => (
  <div>
    This is my app!!!!!
    {props.text}

    <MyThing thing='eqw' />
  </div>
)

export default MyApp
