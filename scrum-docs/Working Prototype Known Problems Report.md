# Working Prototype Known Problems Report

> Kahzum Logistical Delivery Platform  
> 12/7/20

## Known bugs

In general, the format is:

> 1. The item entry of the input/action that causes failure;
> 2. location of fault (if known);
> 3. possible action for removal of fault.

### Bug list

- You cannot access the production frontend from an incognito tab or with cookies disabled because of how Google oauth works
  - Fix: possibly have a toast popup informing the user that is the reason for the error
- During the sign up, there is a default value warning in the console when the small business owner clicks save
  - Caused by the locality dropdown in the sign up component
  - I think we need to switch it so that it sets value instead of default value and updates on blur... I think.
- Texting an image without the words "dropoff" to twilio causes it to silently fail.
  - This is some edge case that I can't find. The fix is unclear.
- On rare occasions, texting "on my way" doesn't register with twilio (but also doesn't error?)
  - I'm not sure if this is a real problem or not since texting "on my way" again returns a result.
- Async problem with compute-routing-output 
  - needs async function and await
- If business enters incorrect address, then the google maps link doesn’t work
  - Not trust our users so much
- `compute_route.sh` doesn’t return a status code when there are no orders.
  - Figure out where it needs to return the status code.
- On the on my way text for multiple orders causes an off by one. It's because that code is based on an old assumption where there couldn't be multiple orders
   - Fixing twilio function for onway to use fairly new data structure
