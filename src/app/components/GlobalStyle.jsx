import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html,body{
        margin:0;
    }

    *,*:before,*:after{
        box-sizing: border-box;
    }

    body{
        background: #7364f0;
        font-family: Arial;
        height: 100vh;
        display: flex;
        direction:ltr;
        max-width: 800px;
        margin: 0 auto;
        
        #root{
            flex: 1;
            display: flex;
            flex-direction: column;
        }
    }

    textarea {
        font-family: Arial;
    }
`;

export default GlobalStyle;
