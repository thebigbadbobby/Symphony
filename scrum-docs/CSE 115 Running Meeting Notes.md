Meeting Notes

# 12/7/20 - Monday

### Agenda:

- Scrum (Quick)

- TSR - reminder again

- Sprint Wrapup

- Bug Report

### Action Items:

- David redo diagram for presentation (make it clearer)

- Mason: Update figma to be better (bigger titles)

- Mason: Speed up parts of aidan’s video

### Notes:

- Bug report

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Mason

  - Haven’t done anything, but starting

  - Look through presentation

- Aidan

  - Made the video

- David

  - Fixed some bugs and merged it, helped make video

- Daniel

  - Didn’t do much

- Langqi

  - Updated presentation slides

# 12/2/20 - Wednesday

### Agenda:

- Scrum

- TSR

- Demo???

### Action Items:

- Mason: Has to find error that caused problem

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Mason

  - Bug fixes for twilio

  - Did a whole run through, make sure everything works

- Aidan

- David

  - Handled locality for the routing script - going to do small bug fix and try and fix problem we found during the meeting

- Daniel

- Langqi

  - Added documentation to routing and started looking at final presentation

  - Open pr for documentation and work more on presentation

# 12/2/20 - Wednesday

### Agenda:

- Scrum

- Demo today

### Action Items:

- Twilio 1:30pm -> 1pm

- TSRs

- Twilio todos

- Twilio needs to send addresses at 1:30 instead of 1:00

- Pickup needs to be sent three times if there are three pickups OrderIDs. Need to change it so driver only has to text twilio pickup once

- Dropoff needs to be changed to dropoff all orders with matching address with one picture

- Next order is currentIndex + 1, need to update twilio

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Mason

  - Demo stuff

- Aidan

  - Add locality in frontend

- David

  - Came up with some "pretty real" fake addresses, did some visualization using google my map for demo/slides presentation

- Daniel

  - Worked on getting twilio tests set up using jest. Wants to test twilio

- Langqi

  - Create cleanup branch, and save routing input file

# 11/30/20 - Monday

### Agenda:

- Scrum

- Talk about things left to do

### Action Items:

- David: Come up with good "dummy" routes (business addresses, driver addresses, dropoff addresses)

- Daniel: Tests

- Mason: Flush out demo (with david’s addresses)

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Mason

  - Added documentation. Worked with Daniel on twilio stuff. Added functions to handle driver’s states, transition, error handling. Small changes to driver/business schemas.

- Aidan

  - No progress this week, swamped with 185. Planning on getting locality option in sign up page, then owner setting page

- David

  - Did a LOT of clean up for the python script for future maintenance

- Daniel

  - Helped with Mason on twilio. Will do more testing and run through a full route driver testing.

- Langqi

  - Added types and condensed orderIds

- Demo - flush this out:

  - Two people log in to become "fake" businesses

  - They each add 2 orders - Predetermine addresses

  - We manually create/have created drivers that are us

  - Show driver checkin

  - We manually run the routing script

  - We manually call the deliver-routes (list of stops and where) - This can be called by backend automatically when routes are populated

  - We show ourselves as drivers, picking up and dropping off until done

  - Go back

- Project Reflection Essay - 11th (individual)

- Final presentation - 9th/11th (team)

  - Video

  - Make presentation

  - Plan talking

  - Flush out Demo

- Project Submission - 8th (team)

  - Sprint 4 docs

  - Release 1.0 (whatever that means)

- All release docs in repo (team)

  - Sprint 4 report

  - Test plan/report

  - Prototype document

  - Installation guide/user manual

- Acceptance test - 9-11th (team)

  - Full system demo

  - Code inspection

  - Scrum stuff

  - Member contributions

# 11/25/20 - Wednesday

### Agenda:

- Scrum (quick)

- End of sprint

- Pre-sprint 4

### Action Items:

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Mason

  - Got the docker to work, also added a backdoor

- Aidan

  - Haven’t done anything cuz need new task. Will take on ‘owner settings’ page.

- David

  - PR - handle multiple drivers going to test to make sure it works, and code clean up

- Daniel

  - Twilio stuff, almost done

- Langqi

  - Working on the collapsing stuff if the addresses are the same and making orderId’s into list, keep working on that

# 11/23/20 - Monday

### Agenda:

- Scrum

- End of sprint

### Action Items:

### Notes:

- Meeting on wednesday night, but skipping saturday night

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Mason

  - Live demo

    - Production is now up to date

    - Login is now fixed

    - Now has ‘unsaved change’ alert to unsaved changes

    - Delete also writes to db

    - Everything works. "It just works"

- Aidan

  - Business info page ui update. Now fetch from db to show user their business info

- David

  - Did the pip freeze and the api key - and some bug fixes and stuff

- Daniel

  - Worked on Twilio. Discuss with team on text detail

- Langqi

  - Going to add a boolean to personal route to show completedRoute

# 11/21/20 - Saturday

### Agenda:

- Scrum

### Action Items:

- Add a pip install to dockerfile - need to add requirements.txt

- Add credentials file to server

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Mason

  - Adding delete order functionality. Working on delete updates to database (not just front-end)

- Aidan

  - Final touches on edit business pages

- David

  - cleaned up the code, going to make compute_trigger.sh a part of the db and make the OPEN_ROUTE_API_KEY in .env

- Daniel

  - Added field to driver to represent state, also looked into loading thing (but couldn’t get it to work), going to keep working on twilio

- Langqi

  - Finished the endpoint of updating the current progress of the driver. Twilio can use the endpoint now.

# 11/18/20 - Wednesday

### Agenda:

- Scrum

### Action Items:

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Mason

  - Worked on fixing google issue where the basic object properties changed

- Aidan

  - Got the inputs to pull the business’ information from the backend. Going to work on tidying up the store settings webpage. May work on Twilio if help is needed.

- David

  - Everything on the backend-routing part is now connected. Everything after order input (order inside db) and before driver texting (twilio use routing info) is now up and running.

- Daniel

  - Order history table finished. Going to work on twilio and order history page with no previous orders

- Langqi

  - DB visualization, going to work on fixing `completed-order` db and `/complete-order`

# 11/16/20 - Monday

### Agenda:

- Scrum

### Action Items:

- Put the production mongo url on production

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Mason

  - Worked on the Order page, now can add multiple orders and remove any order. Save button saves all orders.

- Aidan

  - Been stuck on the same issue, but trying to figure it out

- David

  - Stuck on updating the driver field. Will update everyone on the solution

- Daniel

  - Order history page. Now has the order history table

- Langqi

  - Bug fix

# 11/14/20 - Saturday

### Agenda:

- Scrum

### Action Items:

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Mason

  - "Everything on the server...works" Only use `npm run dev`

  - Demo on frontend register new owner + driver message. Everything that involves a user is now working on PROD. Nice.

- Aidan

  - Worked on making pull for business.

- David

  - Worked on the shell script for calling route.py

  - Work on getting some sort of requirements.txt set up so we can install python libraries

- Daniel

  - Makes completed orders endpoint

- Langqi

  - Finished the google maps url

- EC2 instance calls the script

- David’s script calls /computeRoute which runs the python script

- When the python script is done, it calls /saveRoutingOutput, which saves the routing output into the database into "personal_routes" and it assigns the route to the driver (in the todays route field)

- A trigger in the database listens for a change to Today’s route (or something like that), when it hears changes, it calls the Twilio endpoint that will text the driver that their route is ready (by calling /routeUrl to get the google maps url)

- Every time the driver texts dropoff/pickup, it updates the driver’s progress along their route using the /update-progress {driverId: xxx} endpoint

# 11/11/20 - Wednesday

### Agenda:

- Scrum

- Don’t forget to do the TSR

- David is the new scrum master

### Action Items:

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Mason

  - Improve business info page. Now has store close time

  - Our ec2 now has load-balancer to forward https to http port

- Aidan

  - Merged in his stuff with main

- David

  - Implement orderId in python script.

  - Going to write shell script to invoke /computeRoute

- Daniel

  - Worked on sign in/register page

- Langqi

  - Update personal route model. Now include orderId and a `currentIndex` to keep track of driver status.

  - Going to add another api call to move currentIndex (for twilio)

# 11/9/20 - Monday

### Agenda:

- Scrum

- Get everybody up to speed on the connection between routing & twilio

- Don’t forget to do your RAC!

### Action Items:

- Draw up the Database

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Mason

  - Worked with Langqi and Aidan to help them out with their tasks. SUPER busy with midterm.

  - Fill in the remaining holes

- Aidan

  - Need to add more input boxes to the edit business page so the business may add more locations.

- David

  - Worked on the documentation of the routing API. Need to look into database communication.

- Daniel

  - Made it so the business ID is now registered with google account. All calls to the backend can be sent with this ID to help identification.

- Langqi

  - Worked with David to come up with the database file and documentation.

# 11/7/20 - Saturday

### Agenda:

- Scrum

- Get everybody up to speed on the connection between routing & twilio

### Action Items:

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Mason

  - Met with Langqi and discussed connection between routing and Twilio.

  - Finished the "pickup" part of the twilio! (and actually the whole bottom story is done!

- Aidan

  - Finished the store settings page for the most part (will need to have additional boxes for multiple store locations).

- David

  - Worked with Langqi to get everything python related to communicate with the backend. Want to implement the route model which is an array of order ID’s.

- Daniel

  - Made it so business ID is posted when logging in.

- Langqi

  - Created the route model for tracking order ID’s. Working on storing daily route for every driver, and storing output from python script. Link addresses to orders. Need to make sure the initial location of the route works properly and doesn’t need your location.

# 11/4/20 - Wednesday

### Agenda:

- Do your TRS things

- Scrum

- How are we going to get the route thing to run automatically?

- **Timeline:**

  - What is rolling out:

    - Next-day delivery

      - 2 groups of businesses

        - Pickup 2:00-5:00 MWF

        - Pickup 2:00-5:00 TTS

    - New price: $5.99

    - Business owner copy pastes order info into frontend application

      - Order passed to Open Route Service and Google ORS

  - Nov 24 - Base Web app will be functional including:

    - Frontend for business owners

    - Twilio backend for drivers

    - Route creation backend

  - Dec 1st - Start delivering with small businesses

- Potential problems + additional features:

  - Breaking businesses up into 2 delivery groups

  - How to put all delivery orders into 1 route (without multiple text links)

### Action Items:

### Notes:

- Going to run automatically via ec2 scheduling

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Mason

  - Research getting images to show on Twilio, good to move forward now! Going to work on getting it to properly work.

- Aidan

  - Working on the business frontend going to look into snackbar and how to use the api in the frontend to save.

- David

  - Working on python output with Langqi. Going to finish that.

- Daniel

  - Completed the sidebar for the most part. Need to make it so the sidebar overlays.

- Langqi

  - Worked on python script with David. Going to work with Mason to connect the output of the python script to Twilio.

# 11/2/20 - Monday

### Agenda:

- Scrum

- Let’s come up with a timeline for finishing the (base) features

- Can we be done by the end of sprint 3 (November 24th)

  - Twilio, routing, business ui is done/functional

### Action Items:

- Mason look at daniels side-bar pr

- Mason merge in documentation changes

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Mason

  - Made figma design for driver workflow.

- Aidan

  - Worked on figuring out text boxes. Need to meet with Mason and look into Axios (and main for Langqi’s merge).

- David

  - Worked with Langqi to upgrade the input functionality of the routing script.

- Daniel

  - Got the sidebar working on the webpage. Need to work a tiny bit more on the sidebar.

- Langqi

  - Worked on having orders on the webpage get sent to the database. Worked on address pairs.

# 10/31/20 - Saturday

### Agenda:

- Scrum

### Action Items:

- Mason and David meet

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Aidan:

  - Worked on the business page.

- Mason:

  - Added loading screen, and documentation around useEffect. Finished task! Will probably work on making it so you can text an image to Twilio.

- Daniel:

  - Worked on making the sidebar, shaved.

- David:

  - Made the python script send results to the backend. Keep working with Langqi.

- Langqi:

  - Enjoying Halloween, working on storing information on the database, working on fixing bugs.

# 10/28/20 - Wednesday

### Agenda:

- Start of sprint 2

- Reevaluate for sprint 2 (apparently it starts today)

- Don’t forget to do TSR before meeting with TA!

### Action Items:

- Aidan, enter things into jira

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

# 10/26/20 - Monday

### Agenda:

- Scrum (fast)

- Talk about/write down sprint wrapup: [https://piazza.com/class_profile/get_resource/kfri58lp6io6ll/kgmddmxpr6x3d7](https://piazza.com/class_profile/get_resource/kfri58lp6io6ll/kgmddmxpr6x3d7)

- Reevaluate for sprint 2 (optional)

### Action Items:

- Mason: Try to get docker container into ec2

- Mason: Prep for sprint 2 - Make a google doc for next sprint - then everybody will add to jira.

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Daniel:

  - Got everything in a docker container

- David:

  - Connected the frontend to the database

  - Looked into implementing backend with routing (npm module that calls python script)

- Mason:

  - Worked on loading, found an issue with way useState was implemented

- Langqi:

  - Connected the frontend to the database

  - Try to retrieve info in text field and put it in right format and send it to database

- Aidan:

  - Ran into http error, figured it out though.

  - Keep doin that

# 10/24/20 - Saturday

### Agenda:

- Scrum

- Sprint wrapup: [https://piazza.com/class_profile/get_resource/kfri58lp6io6ll/kgmddmxpr6x3d7](https://piazza.com/class_profile/get_resource/kfri58lp6io6ll/kgmddmxpr6x3d7)

- Driving?

### Action Items:

- Look into backend api thing from amplify

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Daniel:

  - David and Daniel met to work on the api - some progress towards implementing some api methods

  - Finishing the api, delete, order history, update business… etc

  - Look into hosting

- David:

  - Daniel with api

  - Look into ec2 potentially or some other way to host the backend

- Mason:

  - pushed to server

  - Loading page for glogin and look deeper into testing

- Langqi:

  - Building the dashboard page - main problem, not full control of components - talk to Mason

  - Keep working on it

- Aidan:

  - Worked on routing poc

  - is going to look into finishing it and getting python

- Daniel is okay doing it as long as he is free (driving)

# 10/21/20 - Wednesday

### Agenda:

- Focus on getting everything "up" to do one simple thing.

- Did people understand what he was talking about about infrastructure?

- Github Team?

- Defined architecture for frontend… feedback

- Probably need to do a better job on the project board (how should we structure it next sprint)

- Scrum

- What do we do with the ta

### Action Items:

- Questions for TA: Tomorrow at 2pm

  - What is her background?

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Daniel:

  - Mongo has models - each model is a table

  - Make a person table with name, email

  - Add more api endpoints

- David:

  - Did a little bit of overlap with daniel… but also thought about private info handling and focused on learning mongo

  - Met with Aidan and he is in charge of routing

  - Help daniel with api stuff (talk to daniel)

- Mason:

  - Figured out architecture, set up the repo for login for user

  - Get the google login to be persistent and use daniels api to push to db, tell david about good api endpoints

- Langqi:

  - Building some components on main page, the header in the main page and added several text fields.

  - Frontend textbox stuff

- Aidan:

  - Change routing code to run more efficiently - using matrices

  - keep doing his thing with the routing - ask langqi about frontend if any

Daniel and Aidan want to contribute to the frontend

Possibly look further into how our python script will interact with our Node.js code

# 10/19/20 - Monday

### Agenda:

- Presentation - everybody present a part??

  - Mason - first slides, maybe sprint 1

  - Aidan - sprint 2

  - Daniel - sprint 3

  - Langqi - sprint 4

  - David - technology

  - Mason? - challenges & MVP

- Scrum

### Action Items:

- Whitelist your ip address (done)

- Download MongoDB compass for data visualization if needed (may not be everybody)

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Daniel:

  - Made the Mongo DB database - invited everybody, project owner permissions

  - Researched how to use mongo DB

  - Figure out database structure - map it out

- David:

  - Didn’t do much - super busy and learned some frontend

  - Work more on routing stuff

- Mason:

  - Google login, Here is the repo from farhan in react: [https://github.com/Fs77X/NoteQuest/tree/master/client/src](https://github.com/Fs77X/NoteQuest/tree/master/client/src)

  - Work on architecture

- Langqi:

  - Researching react and how it works. Understanding the architectural stuff.

  - Keep trying to learn react and talk to Mason

- Aidan:

  - David was trying to find alternatives to openrouteservice (different api) found some options (subscription based)

  - Going to meet with david and show him apis he found and probably work on open route stuff

  - Make code for testing multiple api key looping.

# 10/17/20 - Saturday

### Agenda:

- Scrum

### Action Items:

- David and Daniel setup MongoDB

- Langqi - Build the UI (that’s designed for small business owner) - mobile friendly

- Mason - tackle google oauth

### Notes:

- Questions:

  - What have you done since last meeting?

  - What will you do before the next meeting?

  - Are you stuck on anything?

- Daniel:

  - Working on getting text messages working - able to parse a message "hi" responds with hello

  - Still needs to figure out how to receive pictures

  - We have $50 in credits.

  - We are going to use MongoDB because we get $200 in credits for each dev credits

- David:

  - Working on getting poc on google or tools - David was using directions: should probably use "Matrix" instead…

  - But got ors tools to calc most efficient route

- Mason:

  - Setup Aidan with frontend

  - Installed material UI

  - Presentation

- Langqi:

  - Wireframe and edits

  - Trying to setup frontend

  - unfamiliar with react and vscode

  - Can help with google login

- Aidan:

  - Looking for possible replacement APIs for the distance calculating service.

  - I’m still unsure where else I can help.

# 10/13/20 - Tuesday

### Agenda:

- Get to know each other Q’s:

  - What’s your favorite tv show?

- SCRUM Master?

- Jira

- Go though user stories and do the poker thing

- Schedule

- Another meeting on the weekend? I feel like we haven’t seen each other in a long time.

- Design for rough wireframe? - Langqi - Rough, maybe on figma??, mason can help

- Presentation for release plan?

- Define MVP - Mason

### Action Items:

- Mason give david more power to database

- Mason, share routing thing with Aidan and David

- Twilio api stuff, david? Daniel?, Aidan??

- Mason schedule other meeting

- Mason, Aidan figure out sprint planning - Everybody, give feedback

- Mason figure out agile board

- Langqi, Daniel, mason figure out frontend ui "framework"

### Notes:

- Everybody is scrum master

# 10/6/20 - Tuesday

### Agenda:

- Introductions:

  - Who you are, (name, year, things you are interested in)

  - what you want to get out of this quarter

  - What crazy activities do you dream of trying someday?

- What is Kahzum?

- What do we want to accomplish?

- Scheduling recurring meetings - what kind of strategy works best for you guys

### Action Items:

- David: Setup DB2

- Langqi and Aidan: flutter vs react

- Daniel: boilerplate for node

- Mason: access to david for aws credits, git procedures

### Notes:

- David recommends Greece

- David is interested and has experience in backend dev

- Daniel wants to go to Japan and go skydiving - wants to learn frontend development

- Aidan is experienced in lower level code - wants to learn frontend and backend

- langqi - experience in backend and database and how frontend and backend communicate - heard about flutter before - likes user experience UI/UX

- Recurring meeting on Tuesday 5:30-7:00 - for updates on progress

- Friday evening post an update on progress in slack

- Jira: use that, monday.com

- Hosting: aws

- Database: DB2

- Frontend: Javascript/typescript/flutter

- Backend: Node.js, flask,

- Focus: how fast can build? how easy is learning curve? which looks better/seems to have better libraries for ui. Make sure we can use on desktop
