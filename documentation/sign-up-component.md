# The Sign up component

**Note:** This documentation will be minimal because the code is pretty well commented.

## What does it do:

The sign up component takes in the user's information from their google login and only displays if the user does not have a business that they are a part of. This sign up page basically allows the user to enter their business information for us and once complete, redirects the user to their (new) business' dashboard.

## What does it consist of:

`validateInput`: A helper function for validating inputs from the user and erroring if necessary.

`getFirstName`: Helper function to get the user's first name

`SignUp`: The main sign up component, handles taking the users information in a form

- `TextMaskCustom`: A material UI example that used a special masking library... this code is almost verbatim from the documentation
- `onChange`: Called whenever there is an input change... updates the object holding the form state
- `handleDropdownChange`: Handles when one of the dropdowns changes (since annoyingly this has a different process than the inputs)
- `handleSubmit`: Handles the submit button on the form.

## State Variables

`props`:

- `user`: the user object from google
- `businessCreated`: A callback function to call once the business is successfully created.

`formState`: The state of each input from the form stored as an object
`formErrors`: the state of the form's errors.
