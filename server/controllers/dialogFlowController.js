import dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';

const dialogFlowController = {};


dialogFlowController.sendQuery = async (req, res, next) => {
  console.log('\n\nrunning: dialogFlowController.sendQuery');
  //needs to receive form data with req.body.query being the string to be sent to dialogFlow
  console.log('req',req.body);
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
  //if there was a previous validQuery, get a specific one from the list by feeding context into intent
  if (req.app.locals.validQuery) {
    request.queryParams={
      contexts:[
        {
          'name': 'projects/solo-project-336520/locations/global/agent/sessions/89625f34-c93b-6a90-c78c-dde80b588449/contexts/challengeratingintent-followup',
          'lifespanCount': 5
        }]
    }
  }
    
  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response Text: ${result.fulfillmentText}`);

  //save fulfillmentText to res.locals
  res.locals.responseText = result.fulfillmentText;
    
  //Parses out different objects depending on the intent used by dialogFlow
  const queryObjsArr = [];
  if (Array.isArray(req.app.locals.queryObjs)) queryObjsArr.push(...req.app.locals.queryObjs);
  console.log('stored app locals:', queryObjsArr);

  //creates a reset boolean in res. 
  res.locals.reset = false;
  //creates a valid query boolean in res.
  res.locals.validQuery = false;
  //creates a specific boolean in res.
  res.locals.specificQuery = false;
  res.locals.fulfillmentText = result.fulfillmentText;
  switch(result.intent.displayName) {
  case 'Challenge Rating Intent': {
    console.log(`  Intent: ${result.intent.displayName}`);
    res.locals.validQuery = true;
    //parsing. CR, type, and AC are the same basically. Need to refactor
    const challengeRatingObj = result.fulfillmentMessages[1].payload.fields;
    challengeRatingObj.cr = challengeRatingObj.cr.stringValue;
    queryObjsArr.push(challengeRatingObj);
    res.locals.dnd5eapiQuery = queryObjsArr;
    console.log('challengeRatingObj stored');
    next();
    break;
  }
  case 'Monster Type Intent': {
    console.log(`  Intent: ${result.intent.displayName}`);
    res.locals.validQuery = true;
    const typeObj = result.fulfillmentMessages[1].payload.fields;
    typeObj.type = typeObj.type.stringValue;
    queryObjsArr.push(typeObj);
    res.locals.dnd5eapiQuery = queryObjsArr;
    console.log('typeObj stored');
    next();
    break;
  }
  case 'Armor Class Intent': {
    console.log(`  Intent: ${result.intent.displayName}`);
    res.locals.validQuery = true;
    const acObj = result.fulfillmentMessages[1].payload.fields;
    acObj.ac = acObj.ac.stringValue;
    queryObjsArr.push(acObj);
    res.locals.dnd5eapiQuery = queryObjsArr;
    console.log('acObj stored');
    next();
    break;
  }
  //if it's a specific name, it will set it so that the dnd5e api get is SPECIFIC to that name
  case 'Monster Name Intent': {
    console.log(`  Intent: ${result.intent.displayName}`);
    res.locals.specificQuery = true;
    const nameObj = result.fulfillmentMessages[1].payload.fields;
    nameObj.name = nameObj.name.stringValue;
    res.locals.dnd5eapiQuery = nameObj;
    console.log('nameObj based on search string stored');
    next();
    break;
  }
  
  //if CR, type, or AC have been previously used, it will respond with a number.
  case 'Challenge Rating Intent - select.number': {
    console.log(`  Intent: ${result.intent.displayName}`);
    res.locals.specificQuery = true;
    console.log(result.fulfillmentText)
    const num = Number(result.fulfillmentMessages[1].payload.fields.number.stringValue);
    console.log(num);
    const monsterName = req.app.locals.monsterList.results[num-1].name;
    console.log(monsterName);
    const nameObj = {"name": monsterName};
    res.locals.dnd5eapiQuery = nameObj;
    console.log('nameObj based on number stored');
    next();
    break;
  }
  //if a reset intent is had, it resets everything
  case 'Reset Intent': {
    console.log(`  Intent: ${result.intent.displayName}`);
    res.locals.reset = true;
    res.locals.validQuery = false;
    res.locals.specificQuery = false;
    res.locals.dnd5eapiQuery = [];
    next();
    break;
  }
  //if it's basic stuff, just send the basics back
  default: {
    if (result.intent) console.log(`  Intent: ${result.intent.displayName}`);
    else console.log('  No intent matched.');
    next();
  }
  }
  // console.log(res.locals.dnd5eapiQuery);
};
export default dialogFlowController;