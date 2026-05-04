import { useEffect } from "react";
import { T } from "../utils/theme";

const GlobalStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{background:${T.cream};color:${T.ink};font-family:'Jost',sans-serif;font-weight:300;overflow-x:hidden}
      input,textarea,select,button{font-family:'Jost',sans-serif}
      @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
      @keyframes heroZoom{from{transform:scale(1.07)}to{transform:scale(1)}}
      @keyframes scrollLine{0%{transform:scaleY(0);transform-origin:top;opacity:1}50%{transform:scaleY(1);transform-origin:top;opacity:1}100%{transform:scaleY(1);transform-origin:bottom;opacity:0}}
      .fadeUp{animation:fadeUp 0.9s ease forwards}
      .fadeUp-1{animation:fadeUp 0.9s 0.1s ease both}
      .fadeUp-2{animation:fadeUp 0.9s 0.2s ease both}
      .fadeUp-3{animation:fadeUp 0.9s 0.3s ease both}
      .fadeUp-4{animation:fadeUp 0.9s 0.5s ease both}
      .fadeUp-5{animation:fadeUp 0.9s 0.7s ease both}
      .nav-menu-open { display: flex !important; }
      .hamburger-line { display:block; width:22px; height:1.5px; background:currentColor; transition: all 0.3s; }
      .admin-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
      .hide-mobile { display: block; }
      @media(max-width:639px){
        .hide-mobile { display: none !important; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return null;
};

export default GlobalStyles;
