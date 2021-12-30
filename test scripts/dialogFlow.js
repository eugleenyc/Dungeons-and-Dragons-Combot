// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START dialogflow_quickstart]

import dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';


/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function dialogFlow(userDialog) {
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
    queryParams:{
      contexts:[{'name': 'projects/solo-project-336520/locations/global/agent/sessions/89625f34-c93b-6a90-c78c-dde80b588449/contexts/challengeratingintent-followup','lifespanCount': 5}]
    },
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: userDialog,
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
  console.log('  Response Text: ',result);
  

  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
    return;
  } else {
    console.log('  No intent matched.');
  }
}
// [END dialogflow_quickstart]

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error(`
    USAGE:
       node quickstart.js <projectId>
     EXAMPLE:
       node quickstart.js my-project-id
    You can find your project ID in your Dialogflow agent settings:  https://dialogflow.com/docs/agents#settings.
  `);
  process.exit(1);
}

dialogFlow('get number 5').catch(console.error);
