# html-codes
HTML Codes enumeration which includes an HtmlError class extending the javascript Error class.

# Installation 
```
npm i html-codes --save
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

# HtmlError class
This class extends the default Javascript Error by adding 2 properties and a cutom constructor
```
try{
  throw new HtmlError(clientErrorCodes.unauthorized, 'Please log-in first');
} catch(err) {
  // note in Typescript, we cannot define the type of catch err.
  // We can however manualy check if it derives from a certain class instance
  if (err instaceof HtmlError) {
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
