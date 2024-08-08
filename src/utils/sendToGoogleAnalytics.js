import ReactGA from "react-ga4";

function sendToAnalytics({ id, name, value }) {
    ReactGA.ga('send', 'event', {
        eventCategory: 'Web Vitals',
        eventAction: name,
        eventValue: value,
        eventLabel: id, 
        nonInteraction: true, 
    });
}

export default sendToAnalytics;