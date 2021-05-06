# Testing Routes and Models

### To test a model
1. Create an instance of the item with all possible values.
1. Verify it exists in the database

### To test a route file
1. Call every route using REST test files.
1. Test that missing arguments return the correct error messages.
1. Call the routes using all arguments.
1. Check that the database reflects all changes.