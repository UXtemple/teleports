// Edit at https://tv.usepages.com/genres/~
// Learn how to use this Panel in your React app at https://howto.usepanels.com
import { Text, Teleport, Vertical } from 'panels/blocks';
import React, { Component, PropTypes } from 'react'

export default class Genres extends Component {
  render() {
    const { props } = this
    return (
      <Vertical
        data-block={"Genres-0"}
        data-block-name={props['data-block-name']}
      >
        {props.genres && props.genres.map((item, i) => (
          <Teleport
            data-block={"Genres-1"}
            key={i}
            style={{
              marginTop: 10
            }}
            href={item.path}
          >
            <Text
              data-block={"Genres-2"}
              text={item.title}
            />
          </Teleport>
        ))}
      </Vertical>
    )
  }
}
// TODO
Genres.propTypes = {
}
