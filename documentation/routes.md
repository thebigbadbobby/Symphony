# Routes Documentation

### Business Routes

  #### get completed-orders
      - `description`
         - gets a business's completed order history
      - `params`
         - business: id 
      - `payload`
         - array of completed order objects

  #### post delete-order
  
  - `description`
    - description deletes a business's order
  - `params`
    - business: id
    - order: id
  - `payload`
    - Return success message
    
  #### post sign-in
   
   - `description`
       - finds owners business
     - `params`
       - ownerEmail: String
     - `payload`
       - businessID: ID
       - newUser: boolean
  
  #### post add-business
     
     - `description`
         - finds owners business
     - `params`
        - businessName: String
        - businessPhone: String
        - pickupAddress: String
        - ownerFullName: String
        - ownerPhone: String
        - ownerEmail: String
     - `payload`
        - businessID: ID
        - newUser: boolean
   #### patch update-business
   - `description`
       - updates information about the business
    - `params`
         - business: ID,
         - businessPhone: String (optional property)
         - pickupAddress: String (optional property)
         - businessName: String (optional property)
    - `payload`
        - success message
   
        
  
       
       
   