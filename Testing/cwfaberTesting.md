# Request Products Testing:

1. Using "product/add-products" route, add 10 products with unique itemName, itemDescription, and price fields.
2. Open Shoplink Server, login as customer via Google OAuth
3. Verify that the 10 products appear in UI correctly
4. Open a request for each product
5. Verify that the requests appear in the database with correct fields, by verifying the collection on MongoDB.

# Amazon Web Services Testing:

1. Log in to EC2 Instance via ssh (ssh -i "path-to-pem-file" ec2-user@"given-public-dns")
2. Run npm run prod
3. Verify that the server loads on local browser
4. Log in as business, add 5 products with unique fields and identifiers using create-product page
5. Log out and log in as customer, verify that all products appear on request-products, with correct fields
6. Open a request for each product
7. Verify that each request appears on checkout-products, with correct fields
8. Close server, drop product/requests collections