//handle normal errors like login issues
export const globalErrorHandler = (err, req, res, next)=>{
    //Build error object
    ///Stack about error, which line of code error occured
    const stack = err?.stack;
    const message =err?.message;
    const status = err?.statusCode ? err?.statusCode : 500;
    
    //Display error of stack and a message which for example can be invalid login credentials
    res.status(status).json({
        stack,
        message,
    });
};

//handle 404 errors such as not found pages
export const notFound = (res, req, next) =>{
    const err = new Error(`Route ${req.originalUrl} not found`);
    //Moves to next line in code after checking if url exist in app.js
    next(err);
}