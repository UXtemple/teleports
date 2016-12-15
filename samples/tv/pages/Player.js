// Edit at https://tv.usepages.com/player/~
// Learn how to use this Panel in your React app at https://howto.usepanels.com
import { Text, Vertical } from 'panels/blocks';
import React, { Component, PropTypes } from 'react'

export default class Player extends Component {
  render() {
    const { props } = this
    return (
      <Vertical
        data-block={props['data-block'] || 'Player-0'}
        data-block-name={props['data-block-name']}
        style={{
          backgroundColor: "#e01d1d",
          height: "100%",
          overflowY: "auto",
          width: 360
        }}
      >
        <Text
          data-block={"Player-1"}
          text={"PLAY"}
        />
        {props.children}
      </Vertical>
    )
  }
}
// TODO
Player.propTypes = {
}
Player.style = props => (
  {
    backgroundColor: "#e01d1d",
    height: "100%",
    overflowY: "auto",
    width: 360
  }
)