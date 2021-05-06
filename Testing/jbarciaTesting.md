# Purchase History Testing:
1. Open Shoplink app
2. Sign in as a customer
3. Click request on listing 'Chocolate Cake'
4. Using sidebar, navigate to "Checkout Products"
5. Verify that 'Chocolate Cake' is listed on "Checkout Products"
6. In MongoDB, modify return date (returnOpt[1]) of 'Chocolate Cake' request to '2021-02-02T01:05:38.294Z'
7. On Shoplink App, using sidebar navigate to "Purchase History"
8. Verify that 'Chocolate Cake' is listed


# Edit Account Testing (customer):
1. Open Shoplink App
2. Sign in as a customer
3. Open side menu
4. Navigate to "Edit Account" page
5. Fill in new user information:  
    Business Name=Kim's Bakery  
    Business Phone Number=805-123-4567  
    Store Address=564 Ocean St. Santa Cruz, California 93421  
    Locality=Santa Cruz
6. Select 'Update'
7. Refresh page
8. Verify that new info is now displayed instead of previously saved information

# Edit Account Testing (business):
1. Open Shoplink App
2. Sign in as a business owner
3. Open side menu
4. Navigate to "Edit Account" page
5. Fill in new user information:  
    Name=Sammy Slug  
    Phone Number=805-123-4567  
    Email=sammy@ucsc.edu  
6. Select 'Update'
7. Refresh page
8. Verify that new info is now displayed instead of previously saved information