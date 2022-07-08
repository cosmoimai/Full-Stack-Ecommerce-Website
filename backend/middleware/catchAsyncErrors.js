module.exports = (theFunc) => (req, res, next) => {
    // console.log("I am in catchAsyncErrors.js")
    Promise.resolve(theFunc(req, res, next)).catch(next)
}