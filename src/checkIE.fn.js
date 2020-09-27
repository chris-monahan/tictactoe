function checkIEVersion() {
    let ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {  // If Internet Explorer, return version number
    
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
    }
    else{
        return null
    }
}

function checkIsIE(){
    return (checkIEVersion() !== null);
}

export default {
    version: checkIEVersion,
    isIE: checkIsIE
}