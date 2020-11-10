# Making API Calls

Whenever you want to make an api call, we want it to work here and in production. As a result, we have to extend the built in axios API. This currently exists as an export called `axiosWrap`. All of the normal documentation for axios will still apply and you will still make calls with `/api/endpoint`, the only difference is that you will replace `axios` with `axiosWrap` and you only have to import `axiosWrap` into your component. The example below will make this more clear.

## Example

An example from the axios documentation:

```
import axios from 'axios'

axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

A converted example:

```
import { axiosWrap } from '../axios-wrapper'

axiosWrap.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
