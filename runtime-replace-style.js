import canUseDOM from './can-use-dom.js'
import React from 'react'

export default canUseDOM ? (
  <style>{`
    * {
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
    button {
      background-color: transparent;
      border: 0;
    }
    button::-moz-focus-inner {
      border: 0;
      margin: 0;
      padding: 0;
    }
  `}</style>
) : null
