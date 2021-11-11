// to check if a string contains a URL link or not 
function checkLink(message){
    let checker = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?")
    return checker.test(message)
    // returns true if the string contains a link else returns false
}