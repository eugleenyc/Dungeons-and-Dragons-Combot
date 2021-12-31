# solo-project

12/27/21
- Commit: Finished webpack config and boilerplate for express and react
- Need idea
- dm tool for dm?

12/28/21
- Furious google session.
- Idea: use dialogflow and google api to lookup data from D&D5E DB (https://www.dnd5eapi.co/docs/)
- somehow started gcloud project and installed firebase??? No real idea what happened here
- feeling panicked
- git reset to previous commit
- Found nodejs dialogflow api (https://github.com/googleapis/nodejs-dialogflow)
- Followed (https://cloud.google.com/dialogflow/es/docs/quick/setup)
- enabled API
- set up authentication
- added gcloud storage
- added gcloud dialogflow
- iam permissions for dialogflow not working... Don't understand.
- feeling pissed.
- reset everything. I think firebase made things screwy. It works now. FML.
- need to pull from 5E api (only search for monsters by type, CR, name)
- Project Rescope: On index, chatbox with input box. on enter, send to dialogflow. parse response. send query to d&d5e api. 
- Read through documentation of intents. Need more time to learn. Not enough coding. Will skip for now
- Spent a lot of time trying to figure out what to do and how to place things. Settled on dialogFlow being serverside
- wrote controller to send to dialogflow
- not sure if dialogFlow should be router depending on response. How does that work?
- wrote controller to get from dnd5eapi
- fetch wouldn't work since it doesn't like require. Used import and broke everything. Had to fix all the breaking points.
- feeling demoralized.
- BACKEND LOOP COMPLETE! Request from postman sends to dialogFlow which is parsed and sends fetch to dnd5eapi 

12/28/21
- FRONT END LOOP COMPLETE! Set up input box which can send query and receive data
- Production mode is broken... when???
- mulling over what I should do.
- Wrote scraper and simple script to build entries for type and name
- Wrote pulling AC and Type as well
- Write specifically pulling by name
- Write stacking query parameters
- spent time trying to learn context on the GUI
- can't understand why context doesn't follow on backend
- Need contexts in query apparently
- read a ton on the documentation, but can't get it to work
- I hate documentation.
- found out the GUI has the api code when you FUCKING SCROLL DOWN!!!
- Turns out I need to SLOW DOWN when reading the documentation.
- context name was completely wrong. Copied from GUI, works.
- BACK END IS DONE!!!! COMPLETELY DONE!!!!

12/29/21
- Let's do some front end
- built out react with hooks with redux templates from previous units
- Wouldn't render properly.
- Ronak helped. Do not need connect with react with hooks!
- Set up state store and reducer.
- Manual dispatch works but actions dispatcher doesn't....
- NEED TO FIX ACTION DISPATCHER
- State wasn't working. So confused.
- Ronak helped again. Spelling error.
- All stored in state now
- Working on monsterContainer in order to show proper. Have logic finished.
- Will show everything unstyled except for single creature.