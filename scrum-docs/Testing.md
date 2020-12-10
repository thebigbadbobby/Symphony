# Testing

> Include a file/directory named ‘Testing’ in your Git Repository.  
> There should be details (can be in a separate file in the directory) provided by each team member about the module and the functional testing they have done. Each team member picks a module or module and lists the equivalence classes and the test cases selected to cover all equivalence classes.

**Mason**

- Client:

  - I had initially tried setting up automated testing for the client, but I struggled a lot trying to figure out how to get it to work with the google login since the app couldn't set up in an automated testing environment without that.
  - Eventually, I gave up and decided to do manual testing.
  - Another disclaimer is that I also didn't really know how to do testing until we started talking about it in class, and by that time, most of the frontend was already built.
  - All of the testing is done by hand and definitely needs to be automated in the future.

  Login:

  - (as new user) Click "sign-in"
    - verify that there is an api call to the /sign-in endpoint.
    - verify that the thing shown is the sign-up component
  - (as returning user) Click "sign-in"
    - verify that there is an api call to the /sign-in endpoint.
    - verify that the thing shown is the Today's Orders page

  Sign-Up:

  - Click "save" without entering anything
    - verify that the page does not advance
    - verify that the correct boxes error
  - Enter in just the business name and click "save"
    - verify that the page does not advance
    - verify that the correct boxes error
  - Enter in everything and try to change the locality and click "save"
    - verify that the dropdown changes
    - verify that the page shown next is the Today's Orders page
    - verify that the data matches that inputted in the database

  Today's Orders:

  - Click "save" without entering anything
    - verify error toast
  - Enter one field and click "save"
    - verify error toast
  - Enter all fields and click "save"
    - verify state update to saved
    - verify toast shows saved
    - verify that on page refresh, the order is fetched
  - Add another order and click "save"
    - verify state update to saved
    - verify toast shows saved
    - verify that on page refresh, both orders are fetched
  - Edit one of the order's fields
    - verify that the state updates to show that it has been edited.

**David**  
- Python Routing Script:
  - Manual Testing 
    - Test /computeRoute  
      - STEP UP: Put Testing Data inside Dev/Test  
      - EXECUTION: Call /computeRoute, using calculate-route.http  
      - VERIFY: Mannual inspect. Result should be a valid json inside /routes/dailyDestinationList  
    - Test Python Scirpt  
      - STEP UP: Have the output from /computeRoute ready  
      - EXECUTION: run `python3 ./routing/routeCalculation.py [path-to-json] [OPEN_ROUTE_API_KEY]`  
      - VERYIFY: Make sure python script ends without error. Its very hard to systematically proof the correctness of the every route so we are going to trust the ORTools library. Verify that the output is in a desired json format see inside save-routing-output.http for sample format
    - Test /save-routing-output
      - STEP UP: Prepare test data, format @save-routing-output.http
      - EXECUTION: Run save-routing-output.http
      - VERYIFY: Mannual inspect newly created route inside DB, inspect all inputed driver has recieve a route

    

**Daniel**
**Langqi**


**Aidan**

- Store Settings (Edit Business):
  - The webpage pulls the business information that the store has previously saved
 
 - Edit information in the fields: "Name", "Address", "Phone Number", and "Locality".
 - Click "save" to save the changes.
   - verify that changes were made
     - if no changes made then send a fail message
     - if the changes fail to save send an error message
     - else send a successful save message
   - verify that the changes are properly saved to the database
     - thoroughly test each input for different values and different formats
     - make sure that these tests are indeed saved correctly
   - verify that the message snackbar works properly
     - error messages popup when they should
     - success messages popup when they should
