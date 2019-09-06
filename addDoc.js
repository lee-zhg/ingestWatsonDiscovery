
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

var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
var fs = require('fs');

var discovery = new DiscoveryV1({
  version_date: '2018-12-03',
  iam_apikey: process.env.DISCOVERY_IAM_APIKEY,
  url: process.env.DISCOVERY_URL
});

var myfilename = 'training/icd_001.json';
var file = fs.readFileSync(myfilename);
//console.log(file);

discovery.addDocument({ environment_id: process.env.DISCOVERY_ENVIRONMENT_ID, collection_id: process.env.DISCOVERY_COLLECTION_ID, file: file, filename: myfilename},
function(error, data) {
  console.log(JSON.stringify(data, null, 2));
  }
);




