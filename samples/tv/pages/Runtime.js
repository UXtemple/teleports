// Edit at https://tv.usepages.com/runtime/~
// Learn how to use this Panel in your React app at https://howto.usepanels.com
import { Style, Horizontal, Vertical } from 'panels/blocks';
import React, { Component, PropTypes } from 'react'

export default class Runtime extends Component {
  render() {
    const { props } = this
    return (
      <Vertical
        data-block={props['data-block'] || 'Runtime-0'}
        data-block-name={props['data-block-name']}
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid pink",
          height: props.height,
          overflowY: "auto",
          width: props.width
        }}
      >
        <Style
          css={`* { 
          -webkit-overflow-scrolling: touch; 
          } 
          html, body, #root { 
          height: 100%; 
          margin: 0; 
          } 
          a,button,div,img,input,form,h1,h2,h3,h4,h5,h6,h7,nav,label,li,ol,p,span,svg,ul { 
          box-sizing: border-box; 
          position: relative; 
          display: -webkit-box; 
          display: -ms-flexbox; 
          display: flex; 
          -webkit-box-orient: vertical; 
          -webkit-box-direction: normal; 
          -ms-flex-direction: column; 
          flex-direction: column; 
          -webkit-box-align: stretch; 
          -ms-flex-align: stretch; 
          align-items: stretch; 
          -ms-flex-negative: 0; 
          flex-shrink: 0; 
          margin: 0; 
          padding: 0; 
          outline: 0; 
          } 
          button::-moz-focus-inner { 
          border: 0; 
          margin: 0; 
          padding: 0; }`}
          data-block={"Runtime-1"}
        />
        <Horizontal
          data-block={"Runtime-2"}
          style={{
            position: props.views.length > 2 ? 'absolute' : 'relative',
            zIndex: 1,
            transform: props.views.length > 2 ? 'scale(0.25)' : 'scale(1)',
            transformOrigin: "top left",
            transition: 'all 0.5s linear'
          }}
        >
          {props.views[0] ? (
            <Horizontal
              data-block={"Runtime-3"}
              style={{
                backgroundColor: "blue",
                height: props.height,
                width: 360
              }}
            >
              {props.views[0].component}
            </Horizontal>
          ) : null}
          {props.views[1] ? (
            <Horizontal
              data-block={"Runtime-4"}
              style={{
                backgroundColor: "red",
                height: props.height,
                width: 360
              }}
            >
              {props.views[1].component}
            </Horizontal>
          ) : null}
        </Horizontal>
        {props.views[2] ? (
          <Horizontal
            data-block={"Runtime-5"}
            style={{
              backgroundColor: "yellow",
              height: props.height,
              width: props.width
            }}
          >
            {props.views[2].component}
          </Horizontal>
        ) : null}
        {props.children}
      </Vertical>
    )
  }
}
// TODO
Runtime.propTypes = {
}
Runtime.style = props => (
  {
    backgroundColor: "#FFFFFF",
    border: "1px solid pink",
    height: props.height,
    overflowY: "auto",
    width: props.width
  }
)
