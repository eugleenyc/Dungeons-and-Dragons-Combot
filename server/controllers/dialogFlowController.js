import dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';

const dialogFlowController = {};


dialogFlowController.sendQuery = async (req, res, next) => {
  console.log('running: dialogFlowController.sendQuery');
  //needs to receive form data with req.body.query being the string to be sent to dialogFlow
  console.log('req',req.body.query);
  //include the project ID
  const projectId = 'solo-project-336520';
  // A unique identifier for the given session
  const sessionId = uuidv4();
    
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );
    
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: req.body.query,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };
    
  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response Text: ${result.fulfillmentText}`);

  //save fulfillmentText to res.locals
  res.locals.responseText = result.fulfillmentText;
    
  //parsing out the object from fulfillment
  const challengeRatingObj = result.fulfillmentMessages[1].payload.fields;
  challengeRatingObj.cr = challengeRatingObj.cr.stringValue;
  res.locals.dnd5eapiQuery = challengeRatingObj;
  console.log(res.locals.dnd5eapiQuery);

  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log('  No intent matched.');
  }
  next();
};
export default dialogFlowController;