//copy from dragndrop
export function isIE() {
    var nav = navigator.userAgent.toLowerCase();
    return nav.indexOf("msie") !== -1 ? parseInt(nav.split("msie")[1]) : false;
}