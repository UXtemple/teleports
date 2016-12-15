// Edit at https://tv.usepages.com/movies/~
// Learn how to use this Panel in your React app at https://howto.usepanels.com
import { Teleport, Text, Vertical } from 'panels/blocks';
import React, { Component, PropTypes } from 'react'

export default class Movies extends Component {
  render() {
    const { props } = this
    return (
      <Vertical
        data-block={"Movies-0"}
        data-block-name={props['data-block-name']}
      >
        {props.movies && props.movies.map((item, i) => (
          <Teleport
            data-block={"Movies-1"}
            key={i}
            style={{
              marginTop: 10
            }}
            href={item.path}
          >
            <Text
              data-block={"Movies-2"}
              text={item.title}
            />
          </Teleport>
        ))}
      </Vertical>
    )
  }
}
// TODO
Movies.propTypes = {
}
