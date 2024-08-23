import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center space-x-5 my-4">
      <a target="_blank" href="https://x.com/JaviYagami" rel="noreferrer">
        <img
          src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter_colored_svg-32.png"
          alt="twitter"
          loading="lazy"
          className="w-5 h-5"
        />
      </a>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/javier-delgado-cruces-423501170/"
        rel="noreferrer"
      >
        <img
          src="https://cdn1.iconfinder.com/data/icons/logotypes/32/linkedin-32.png"
          alt="linkeding"
          loading="lazy"
          className="w-5 h-5"
        />
      </a>
      <a target="_blank" href="https://github.com/alstinson" rel="noreferrer">
        <img
          src="https://cdn1.iconfinder.com/data/icons/picons-social/57/github_rounded-32.png"
          alt="github"
          loading="lazy"
          className="w-5 h-5"
        />
      </a>
      <a
        target="_blank"
        href="https://github.com/AlStinson/pushpush-web"
        rel="noreferrer"
      >
        Source code
      </a>
      <a
        target="_blank"
        href="https://github.com/AlStinson/pushpush-web/issues"
        rel="noreferrer"
      >
        Issues
      </a>
    </footer>
  );
};

export default Footer;
