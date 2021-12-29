# solo-project

12/27/21
-Commit: Finished webpack config and boilerplate for express and react
-Need idea
-dm tool for dm?

12/28/21
-Furious google session.
-Idea: use dialogflow and google api to lookup data from D&D5E DB (https://www.dnd5eapi.co/docs/)
-somehow started gcloud project and installed firebase??? No real idea what happened here
-feeling panicked
-git reset to previous commit
-Found nodejs dialogflow api (https://github.com/googleapis/nodejs-dialogflow)
-Followed (https://cloud.google.com/dialogflow/es/docs/quick/setup)
-enabled API
-set up authentication
-added gcloud storage
-added gcloud dialogflow
-iam permissions for dialogflow not working... Don't understand.
-feeling pissed.
-reset everything. I think firebase made things screwy. It works now. FML.
-need to pull from 5E api (only search for monsters by type, CR, name)
-Project Rescope: On index, chatbox with input box. on enter, send to dialogflow. parse response. send query to d&d5e api. 
-Read through documentation of intents. Need more time to learn. Not enough coding. Will skip for now
-Spent a lot of time trying to figure out what to do and how to place things. Settled on dialogFlow being serverside
-wrote controller to send to dialogflow
-not sure if dialogFlow should be router depending on response. How does that work?
-wrote controller to get from dnd5eapi
-fetch wouldn't work since it doesn't like require. Used import and broke everything. Had to fix all the breaking points.
-feeling demoralized.
-FULL LOOP COMPLETE! Request from postman sends to dialogFlow which is parsed and sends fetch to dnd5eapi 