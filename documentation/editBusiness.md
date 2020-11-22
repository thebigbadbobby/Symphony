# Docs for the Store Settings (Edit Business) Page

## Summary:
The user, who is the business owner, enters their business information and hits 'save'. The information is sent to the backend, which is then verified or declined and the response is sent back to the webpage. 

## Files:
EditBusiness.js is the file containing the webpage objects and functionality.
EditBusiness.styles.js is the file containing the different styles used in the webpage.

## EditBusiness.js Overview:
The webpage contains 3 fields for the business's information: name, address, phone. It also has a button, 'save', used to send the entered information as a post request to the backend, through Axios. The backend then replies with the http response or an error. Both of these outcomes trigger a Snackbar alert which neatly displays at the bottom of the screen. If the information was entered and sent correctly to the backend, then it is saved on the database.

