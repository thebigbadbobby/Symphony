# Docs for the Store Settings (Edit Business) Page

## Note:
This page is used to update business information, it is assumed the user has a business already due to the website forcing the user to create one before accessing the full website. 

## Summary:
The user, who is the business owner, edits their business information and hits 'save'. The information is sent to the backend, which is then verified or declined and the response is sent back to the webpage. This page is used strictly as an updater to their business information.

## Files:
EditBusiness.js is the file containing the webpage objects and functionality.
EditBusiness.styles.js is the file containing the different styles used on the webpage.

## EditBusiness.js Overview:
The webpage contains 3 fields for the business's information: name, address, phone. These fields are auto-filled by the user's current business information, this is done through a get request by Axios. It also has a button 'save' used to send the entered information as a patch request to the backend, through Axios. The backend then replies with the http response or an error. Both of these outcomes trigger a Snackbar alert which neatly displays at the bottom of the screen. If the information was entered and sent correctly to the backend, then it is saved on the database.

## Auto-fill (get) call
For auto-filling the business information, an http get request is sent to the backend. The backend then checks the database if the user exists as an owner, and then if that owner has a business. If either of those checks fail, then it results in a failure. If they both pass, then the information is passed on from the database.
    Success: The business information is sent back to the frontend, and gets auto-filled on the webpage. 

    Failure: It should never fail, the user should always have a business. But if it does fail, the fill-ins will be blank.

## Save (patch) call
For saving the business information, an http patch request is sent to the backend. The backend then checks that the request contains all the necessary information: business name, business address, and business phone. The information is pulled from the fill-in boxes. If every entry has a value then it is sent to the backend, and then the backend makes a final check that the phone number is in the correct format (###-###-####). If all the checks pass then it results in success, otherwise it results in failure.
    Success: The business information is saved on the database, and a Snackbar alert with a success message pops up to let the user know it succeeded.

    Failure: The business information has failed to save on the database, and a Snackbar alert with a failure message pops up and lets the user know it failed.