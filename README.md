# http-error-types
WEB (HTTP) Error Response Status Codes enumeration which includes an HttpError class extending the javascript Error class. Definintions are as per defined in Wikipedia (https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

# Installation and import
```
npm i http-error-types --save
```
To use in your code, simply import it and start throwing as HttpError
```
import HttpError, { clientErrorCodes, serverErrorCodes } from 'http-error-types';

// clientside error
throw new HttpError(clientErrorCodes.badRequest, result.error.message);
// server side error
throw new HttpError(serverErrorCodes.internalServer, result.error.message)
```

Handling responses in expressJs is much simpler, adding an express error middleware for example is handled like the following
```
this.app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  // HttpError has an 'isHttpError' property to check if it was thrown using our custom Error type
  if (!err.isHttpError) { // generic error
    console.error(err); // show error in server logs
    return res.status(500).send({ error: 'Unhandled error' }); //show generic message back
  }
  // its thrown as HttpError so its safe to use the message and statusCode
  res.status(err.statusCode).send(err.message);
});
```

# Enums
* clientErrorCodes - These are lists of globaly accepted server side error codes
* serverErrorCodes - These are lists of globaly accepted server side error codes

## Sample use
```
const s: clientErrorCodes = clientErrorCodes.badRequest;

if (s === 500 || a === clientErrorCodes.unauthorized) {
  console.log('test');
}
```

# HttpError class
This class extends the default Javascript Error by adding 2 properties and a cutom constructor
```
try{
  throw new HttpError(clientErrorCodes.unauthorized, 'Please log-in first');
} catch(err) {
  // note in Typescript, we cannot define the type of catch err.
  // We can however manualy check if it derives from a certain class instance
  if (err instaceof HttpError) {
    console.log(`Error (${err.statusCode}) ${err.statusName}: ${err.message}`);
    // this prints out the following:
    // "Error (401) unauthorized: Please log-in first
  }
}
```

## Constructor parameters
* clientErrorCodes | serverErrorCodes - The first parameter is either one of the error code enumerations
* message - The error message to send similar to new Error(message)

## Class properties
* statusCode - The numeric error code value
* statusName - The human readable error code value
