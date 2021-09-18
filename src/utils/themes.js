import { createGlobalStyle } from "styled-components";
export const lightTheme = {
  body: "hsl(0, 0%, 98%)",
  elements:"hsl(0, 0%, 100%)",
  text:"hsl(200, 15%, 8%)",
};
export const darkTheme = {
  body: "hsl(207, 26%, 17%)",
  elements:"hsl(209, 23%, 22%)",
  text:"hsl(0, 0%, 100%)"

};

export const GlobalStyles = createGlobalStyle`
body{
    background-color:${props=>props.theme.body};
    color:${props=>props.theme.text}
}
.card,.back-btn,header,.search-div,input[type="text"],input[type="text"]::placeholder,select,button,.back-btn,.border-country,.icon{
    background-color:${props=>props.theme.elements}
}
.icon,header span{
    color:${props=>props.theme.text}
}
`;
