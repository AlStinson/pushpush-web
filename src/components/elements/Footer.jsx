import Icon from '../styles/Icon';
import './Footer.css'

const Footer = () => {
    return <footer>
        <a href='/'>Main menu</a>
        <a target='_blank' href='/rules/pushpush_rules_es.pdf'>Rules</a>
        <a target='_blank' href="https://x.com/JaviYagami" rel="noreferrer"><Icon src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter_colored_svg-32.png" alt="twitter" loading='lazy' /></a>
        <a target='_blank' href="https://www.linkedin.com/in/javier-delgado-cruces-423501170/" rel="noreferrer"><Icon src="https://cdn1.iconfinder.com/data/icons/logotypes/32/linkedin-32.png" alt="linkeding" loading='lazy' /></a>
        <a target='_blank' href="https://github.com/alstinson" rel="noreferrer"><Icon src='https://cdn1.iconfinder.com/data/icons/picons-social/57/github_rounded-32.png' alt='github' loading='lazy' /></a>
        <a target='_blank' href='https://github.com/AlStinson/pushpush-web' rel="noreferrer">Source code</a>
    </footer>
};

export default Footer;