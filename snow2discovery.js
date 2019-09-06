
/**
 * Copyright 2018 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


require('dotenv').config({silent: true});

var request = require('request');
var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
var fs = require('fs');
var tempfile = 'tmp/tempfile.json';

var discovery = new DiscoveryV1({
  version_date: '2018-12-03',
  iam_apikey: process.env.DISCOVERY_IAM_APIKEY,
  url: process.env.DISCOVERY_URL
});


// call ServiceNpw to retrieve knowledge entries
var snow = callServiceNow().then(function (body) {

  //console.log('##############################111\n');
  console.log(body + '\n');
  //console.log('##############################111\n');

  // get array of Knowledge entries
  var results = body.substring(10, body.length-1);
  var knowledges = JSON.parse(results);

  // check array size
  //console.log(knowledges.length);
  //console.log('##############################222\n');
  //console.log(knowledges + '\n');
  //console.log('##############################222\n');


  // process each Knowledge entry
  for (var i = 0; i < knowledges.length; i++) {
  
    if (i > 1)
      break;

    console.log('##############################222\n');
    console.log(i);

    var temp_file_contents;
    var s_desc = JSON.stringify(knowledges[i].short_description);

    /*
    // article_type == 'text'
    if (knowledges[i].article_type == 'text') {
      temp_file_contents = '{ \
        "number": "' + knowledges[i].number + '", \
        "article_type": "' + knowledges[i].article_type + '", \
        "workflow_state": "' + knowledges[i].workflow_state + '", \
        "short_description": "' + knowledges[i].short_description + '", \
        "sys_updated_on": "' + knowledges[i].sys_updated_on + '", \
        "sys_updated_by": "' + knowledges[i].sys_updated_by + '", \
        "text": "' + knowledges[i].text + '", \
        "wiki": "", \
        "title": "' + knowledges[i].short_description + '", \
        "body": "' + knowledges[i].text + '", \
        "sourceUrl": "" \
      }';
    }
    */

    // article_type == 'text'
    if (knowledges[i].article_type == 'text') {
      var body_content = JSON.stringify(knowledges[i].text);
      temp_file_contents = '{ \
        "number": "' + knowledges[i].number + '", \
        "article_type": "' + knowledges[i].article_type + '", \
        "workflow_state": "' + knowledges[i].workflow_state + '", \
        "short_description": ' + s_desc + ', \
        "sys_updated_on": "' + knowledges[i].sys_updated_on + '", \
        "sys_updated_by": "' + knowledges[i].sys_updated_by + '", \
        "text": ' + body_content + ' , \
        "wiki": "", \
        "title": ' + s_desc + ', \
        "body": ' + body_content + ', \
        "sourceUrl": "" \
      }';
    }

    // article_type == 'wiki'
    if (knowledges[i].article_type == 'wiki') {
      temp_file_contents = '{ \
        "number": "' + knowledges[i].number + '", \
        "article_type": "' + knowledges[i].article_type + '", \
        "workflow_state": "' + knowledges[i].workflow_state + '", \
        "short_description": ' + s_desc + ', \
        "sys_updated_on": "' + knowledges[i].sys_updated_on + '", \
        "sys_updated_by": "' + knowledges[i].sys_updated_by + '", \
        "text": "", \
        "wiki": "' + knowledges[i].wiki + '", \
        "title": ' + s_desc + ', \
        "body": "", \
        "sourceUrl": "' + knowledges[i].wiki + '" \
      }';
    }

    //console.log("!!!!!!!!!!!!!!");
    //console.log(temp_file_contents);
    //console.log("!!!!!!!!!!!!!!");
    
    // there should be a better way
    //var one_entry = JSON.stringify(temp_file_contents);
    var one_entry = temp_file_contents;
    tempfile = "tmp/" + knowledges[i].number + ".json";
    fs.writeFileSync(tempfile, one_entry);
    var file = fs.readFileSync(tempfile);

    
    discovery.addDocument({ environment_id: process.env.DISCOVERY_ENVIRONMENT_ID, collection_id: process.env.DISCOVERY_COLLECTION_ID, file: file, filename: tempfile},
      function(error, data) {
        console.log(JSON.stringify(data, null, 2));
        }
    );
    
      
    //console.log(knowledges[i].number);
    //console.log(knowledges[i].article_type);
    //console.log(knowledges[i].workflow_state);
    //console.log(knowledges[i].short_description);
    //console.log(knowledges[i].sys_updated_on);
    //console.log(knowledges[i].sys_updated_by);
    //console.log(knowledges[i].wiki);
    //console.log(knowledges[i].text);
    //console.log(knowledges[i]);
    console.log('##############################222\n');

  }
          
  return null;

}).catch((error) => {
  console.error(error);
  console.error("Failed when calling Discovery service");
});



//process.env.SNOW_AUTH=BASIC YWRtaW46NHl1d3BGZVJZSDJO
//process.env.SNOW_CONTEXT_TYPE=application/json
//process.env.SNOW_REST_URL

/*
var myfilename = 'training/icd_003.json';
var file = fs.readFileSync(myfilename);
//console.log(file);

discovery.addDocument({ environment_id: process.env.DISCOVERY_ENVIRONMENT_ID, collection_id: process.env.DISCOVERY_COLLECTION_ID, file: file, filename: myfilename},
function(error, data) {
  console.log(JSON.stringify(data, null, 2));
  }
);
*/


/**
 * Call ServiceNow system to retrieve entries in Knowledge
 * @return string              Returned messages from ServiceNow call
 */
function callServiceNow() {

  return new Promise((resolve, reject) => {

    try {

      request({

        headers: {
          'Authorization': process.env.SNOW_AUTH,
          'CONTENT-TYPE': process.env.SNOW_CONTEXT_TYPE,
          'Accept':process.env.SNOW_CONTEXT_TYPE
        },

        url: process.env.SNOW_REST_URL,
        method: 'GET'

      }, function (err, resp, body) {
        if (err) {
          resolve(err);
        } else {
          //console.log("=====================");
          //console.log(body);

          resolve(body);

        }

      });

    } catch (error) {
      console.error(error);
      console.error("Failed when calling ServiceNow service");
    }

  });

}


