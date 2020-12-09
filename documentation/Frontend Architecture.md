## Application Structure (nesting means it is inside):

- App

  - LogIn (where the user can click the login button)

    - GoogleLoginButton

  - Main (the main part of the app)

    - SideBar (the thing on the left side of the figma)

    - Dashboard (a container to hold the 3 different types of screens and cycle between them)

      - TodaysOrders (where the business owner fills out their daily orders - the yellow in your picture)

      - OrderHistory (where they can see past orders - the blue in your picture)

      - StoreSettings (where they can edit their store information - the black part in your picture)

## Making Components:

- Every component will have 2 files (see how to structure them further down the page):

  - component.js

  - component.style.js

- Use functional style:

  - **How-to article: **[https://www.robinwieruch.de/react-function-component#react-function-component-typescript](https://www.robinwieruch.de/react-function-component#react-function-component-typescript)

  - [https://itnext.io/add-state-and-lifecycle-methods-to-function-components-with-react-hooks-8e2bdc44d43d](https://itnext.io/add-state-and-lifecycle-methods-to-function-components-with-react-hooks-8e2bdc44d43d)

  - Example:

some \*.js file

```
// ... Any imports you need, here are some examples:
/**
import React from "react";
import img from "../../fiat-slug.png";
import { Grid } from "@material-ui/core"
*/
// To import a function from a seperate file, you would do import { functionName1, functionName2 } from './../pathToFile'

const SomeDumbComponent = () => {
 return (
   <div class="dumb-component-container">
     This is some display stuff that has no binding
   </div>
 )
}

// Use export const so that you can also import other functions from this file
export const Main = (props) => {
 return (
   <React.Fragment>
     <div class="main-container">
       This is the main container
       <SomeDumbComponent />
     </div>
   </React.Fragment>
 )
}
```

- Two types of components:

  - Stateless => everything is hardcoded

    - Think like a next button would be a component with hardcoded state, you likely wouldn’t want to have the word "next" dynamically change

  - Stateful => some parts are dynamically determined

    - Think like a welcome message for an application that says "Good Morning, Mason!". Here, we would want to dynamically change Mason to whatever the small business owner's name is. That means that some of the state in this component needs to be determined at runtime.

    - To create a state variable, do the following:

      - let [var1, setVar1] = useState("initialState")

      - this sets the state of var1 to the string "initialState"

      - **NOTE: **setVar1 will set var1 **asynchronously** so you can’t use that variable directly afterwards

  - BOTH types of components will follow the functional style

- Handling lifecycle hooks: See the "Outside Example" also, this:

  - [https://www.robinwieruch.de/react-function-component#react-function-component-state](https://www.robinwieruch.de/react-function-component#react-function-component-state)

- Passing in props:

```
function Welcome(props) {

return <h1>Hello, {props.name}</h1>;

}

<Welcome name="Sara" />;
```

- The above code adds a field to the object called props called "name" with the value “Sara” into the Welcome component

- Passing out events:

```
<a href="#" onClick={handleClick}>

      Click me

</a>
```

- Where "handleClick" is a function that is executed on click

- list of events: [https://reactjs.org/docs/events.html](https://reactjs.org/docs/events.html)

- To do custom events, pass a callback function into the react component (I did this with the google login)

- Interacting with the backend:

  - Likely create a component that specifically is used to talk to the backend (also, remember that components are just functions).

- UseEffect:

  - The use effect function is essentially all the lifecycle hooks combined into one. When the component first initializes, use effect will be called no matter what, then it will be called whenever there is a change (like some variable is set using setVar1) and the dom needs to be re-rendered. If the array at the end is empty, it will ONLY run on first render

  - The syntax is:

```
useEffect(() => {

    // Stuff we want to run

}, [commaSeperated, listofVariables, toRunOn])
```

## Folder Structure:

- App.js will be at the root directory, but that will be the only component located there.

- Components will be stored in the "Components" folder

  - Components are defined to be anything that is stateful.

  - Stateless components can be directly implemented within the file itself as a separate function

  - If the stateless component is too complex, you can move it to a separate file, but keep it within the folder of the component that uses it.

- Shared components will be located within the "Shared" folder that is located at “src/components/shared”

## File Structure:

Component.js

```
// ... Any imports you need, here are some examples:
/**
import React from "react";
import style from "somethin"
import img from "../../fiat-slug.png";
import { Grid } from "@material-ui/core"
*/
// To import a function from a separate file, you would do import { functionName1, functionName2 } from './../pathToFile'
// Don't forget to import your styles!
// import styles from './component.styles'
/** ------------ Presentational Components ------------ */
// These functions can be used in the dynamic component at the bottom
const SomeDumbComponent = () => {
 return (
   <div className={styles.componentContainer}>
     This is some display stuff that has no binding
   </div>
 )
}
/** ------------ END Presentational Components ------------ */
 /** ------------ Dynamic/Main Component ------------ */
// There is only one of these per *.js file, it uses the presentational components in this file as well as any props passed to it.
 // Use export const so that you can also import other functions from this file
export const Main = (props) => {
 return (
   <React.Fragment>
     <div className={styles.mainContainer}>
       This is the main container
       <SomeDumbComponent />
     </div>
   </React.Fragment>
 )
}
/** ------------ END Dynamic/Main Component ------------ */
```

component.style.js

```
// make sure to import makestyles from material ui
import { makeStyles } from '@material-ui/core/styles';

// This defines the classes in the other component file so we can style them.
// Note that where css is flex-direction, this uses camel case so flexDirection.
const styles = makeStyles((theme) => ({
// 'app' is the name of the selector, everything inside it is the css props
app: {
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
},
logIn: {
margin: theme.spacing(1),
backgroundColor: theme.palette.secondary.main,
},
mainContent: {
width: '100%', // Fix IE 11 issue.
marginTop: theme.spacing(1),
},
}));

export default styles;

```

## Outside Example:

In general, this seems to be a helpful example to show a lot of the ways to do everything in one function:

```
import React, { useState, useEffect } from "react";
import axios from "axios";

export const TodoListFunctionComponent = () => {
const [todos, setTodos] = useState();
const [nextTodoId, setNextTodoId] = useState(0);
const [newTodoLabel, setNewTodoLabel] = useState("");

useEffect(() => {
axios
.get(
"https://gist.githubusercontent.com/witalewski/fc8f043d53a0d505f84c5ddb04ae76ea/raw/7c505bbc1675a0bc8a067f8b633b531c769bb64c/data.json"
)
.then(({ data }) => {
setTodos(data);
setNextTodoId(data.length);
});
}, []);

const markTodoAsDone = (id, done) =>
setTodos(todos.map(todo => (todo.id === id ? { ...todo, done } : todo)));

const removeTodo = id => setTodos(todos.filter(todo => todo.id !== id));

const addNewTodo = () => {
setTodos([
...todos,
{
id: nextTodoId,
label: newTodoLabel,
done: false
}
]);
setNextTodoId(nextTodoId + 1);
setNewTodoLabel("");
};

return todos ? (

   <div className="todo-list">
     <ul>
       {todos.map(todo => (
         <li key={todo.id}>
           <input
             type="checkbox"
             checked={todo.done}
             onChange={({ target }) => markTodoAsDone(todo.id, target.checked)}
             label={todo.label}
           />
           <span className={todo.done ? "done" : ""}>{todo.label}</span>
           <button onClick={() => removeTodo(todo.id)}>X</button>
         </li>
       ))}
     </ul>
     <div className="new-todo">
       <input
         type="text"
         value={newTodoLabel}
         onChange={({ target }) => setNewTodoLabel(target.value)}
       />
       <button onClick={addNewTodo}>Add</button>
     </div>
   </div>
 ) : (
   <div>Loading...</div>
 );
};
```
