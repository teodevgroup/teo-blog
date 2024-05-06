import { css } from '@linaria/core'
import { flexColumn, flexRow } from './theme'

export const globals = css`
  :global() {

    @font-face {
      font-family: Mont Trial;
      src: url(/fonts/Mont-Trial-Heavy.ttf);
      font-weight: bold;
    }
    @font-face {
      font-family: Mont Trial;
      src: url(/fonts/Mont-Trial-Regular.ttf);
      font-weight: normal;
    }
    * {
      box-sizing: border-box;
    }
    a {
      color: inherit;
      text-decoration: inherit;
    }
    metadata{
      width: 100%;
      padding: 8px 0;
      ${flexColumn('flex-start')}
      div{
        ${flexRow('center')}
        color: #a9a9aa;
        font-weight: 400;
        font-size: 14px;
        #author {
          ${flexRow('center')}
          width: 140px;
          div {
            margin-left: 8px;
          }
        }
        #date {
          ${flexRow('center')}
          width: 300px;
          div {
            margin-left: 8px;
          }
        }
      }
    }
  }
`