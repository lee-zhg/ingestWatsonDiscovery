
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
  //var knowledges = JSON.parse(results);

  // for testing without accessing to ServiceNow
  var knowledges = [ { 
        "short_description": "Instance Security Center - Resources (incl. Security Fixes)", 
        "roles": "admin,security_dashboard_user", 
        "wiki": "https://hi.service-now.com/kb_view.do?sysparm_article=KB0714239", 
        "direct": "false", 
        "rating": "5", 
        "description": "", 
        "source": "", 
        "sys_updated_on": "2018-01-01 00:00:00", 
        "disable_suggesting": "false", 
        "sys_class_name": "kb_knowledge", 
        "number": "KB0011106", 
        "sys_id": "032a4adbb3531300e64be12b86a8dc10", 
        "use_count": "0", 
        "sys_updated_by": "admin", 
        "flagged": "false", 
        "disable_commenting": "false", 
        "sys_created_on": "2018-01-01 00:00:00", 
        "sys_domain": { 
            "link": "https://dev91016.service-now.com/api/now/table/sys_user_group/global", 
            "value": "global" 
        }, 
        "valid_to": "2020-01-01", 
        "retired": "", 
        "workflow_state": "published", 
        "text": "", 
        "sys_created_by": "admin", 
        "display_attachments": "false", 
        "image": "", 
        "sys_view_count": "0", 
        "article_type": "wiki", 
        "cmdb_ci": "", 
        "author": { 
            "link": "https://dev91016.service-now.com/api/now/table/sys_user/6816f79cc0a8016401c5a33be04be441", 
            "value": "6816f79cc0a8016401c5a33be04be441" 
        }, 
        "can_read_user_criteria": "", 
        "sys_mod_count": "1", 
        "active": "true", 
        "cannot_read_user_criteria": "", 
        "published": "2018-01-01", 
        "sys_domain_path": "/", 
        "sys_tags": "", 
        "meta_description": "", 
        "kb_knowledge_base": { 
            "link": "https://dev91016.service-now.com/api/now/table/kb_knowledge_base/012977ecb3131300e64be12b86a8dc2d", 
            "value": "012977ecb3131300e64be12b86a8dc2d" 
        }, 
        "meta": "", 
        "topic": "General", 
        "category": "", 
        "kb_category": { 
            "link": "https://dev91016.service-now.com/api/now/table/kb_category/5faacadbb3531300e64be12b86a8dcf5", 
            "value": "5faacadbb3531300e64be12b86a8dcf5" 
        } 
    }, 
    { 
        "short_description": "How to Deal with Spam", 
        "roles": "", 
        "wiki": null, 
        "direct": "false", 
        "rating": "", 
        "description": "", 
        "source": "", 
        "sys_updated_on": "2014-12-19 15:54:36", 
        "disable_suggesting": "false", 
        "sys_class_name": "kb_knowledge", 
        "number": "KB0000011", 
        "sys_id": "0b48fd75474321009db4b5b08b9a71c2", 
        "use_count": "0", 
        "sys_updated_by": "johnoliver.mendoza", 
        "flagged": "false", 
        "disable_commenting": "false", 
        "sys_created_on": "2014-09-09 23:31:10", 
        "sys_domain": { 
            "link": "https://dev91016.service-now.com/api/now/table/sys_user_group/global", 
            "value": "global" 
        }, 
        "valid_to": "2020-01-01", 
        "retired": "", 
        "workflow_state": "published", 
        "text": "<p><span style=\"font-size: 18pt;\"><strong>How to Deal with Spam</strong></span></p>\n<p>Spam has increasingly become a problem on the Internet. While every Internet user receives some spam, email addresses posted to web sites or in newsgroups and chat rooms attract the most spam.</p>\n<p>To reduce the amount of spam you receive:</p>\n<ul><li>Don&#39;t reply to spam</li><li>Be careful releasing your email address, and know how it will be used</li><li>Be proactive  <br /><br /></li></ul>\n<p style=\"font-size: 12pt;\"><strong>Don&#39;t reply to spam</strong></p>\n<p>If you reply to spam, the spammer or the automated program on the other end will then know that your address is connected to a live person, and the spammer will then bombard you with even more spam, and circulate your address to other spammers. It is critical that you pause and think before replying to any spam. Consider the following guidelines:</p>\n<ul><li>Setting up your email account to generate automatic responses while you are away can have the unfortunate side-effect of verifying your email address to every spammer that sends you spam. </li><li>If the message appears to come from a legitimate company, the company may have obtained your email address from some transaction between you and the company. In fact, you may have inadvertently provided your email address (e.g., if you didn&#39;t check a box marked Don&#39;t send me product updates). In these cases, it is usually safe to reply and ask to be removed from the mailing list. </li><li>If it is not a company you recognize, use your judgment. To be safe, copy and paste the link to the company&#39;s site into the browser rather than clicking it in the email message. </li><li>If the spam is clearly from a disreputable source, never respond. Do not follow the (probably bogus) unsubscribe directions. In most cases, if you never reply, the network of spammers will eventually decide your email address is a dud, and will stop using it as often.<br /><br /></li></ul>\n<p style=\"font-size: 12pt;\"><strong>Be careful releasing your email address, and know how it will be used</strong></p>\n<p>Every time you communicate on the Internet or browse a web site, there are opportunities for spammers to intercept your communications to obtain your email address and other personal information.</p>\n<p>Otherwise reputable companies may sell or exchange your email address with other companies, and this information may eventually find its way to a spammer. At worst, spammers will use automated programs to bombard these lists of email addresses with spam. Consider the following guidelines:</p>\n<ul><li>Subscribe only to essential discussion lists, and ensure that they are moderated. </li><li>Think twice before offering your email address to a web site. You may wish to check the site&#39;s privacy policy first to be sure it uses secure technology, and that the company does not share your email address with others. </li><li>If you need to list email addresses on your web site, present the addresses in a way that makes them less vulnerable to collection and abuse by spammers.</li><li>Every time you are asked for your email address verbally or on paper, think carefully about whether or not you want to receive any information from that company or organization. It is usually best to decline to provide your email address. </li><li>Whenever possible, advocate that organizations you are involved in or do business with default to the opt-in model. This requires you to specifically request to be added to their email lists, rather than the opt-out model, where they add you to email lists automatically, and then give you the option of asking to be removed. <br /><br /></li></ul>\n<p style=\"font-size: 12pt;\"><strong>Be proactive</strong></p>\n<p>Adjusting the security settings in your web browser is a good preventive measure. For a higher level of security, have your browser disallow:</p>\n<ul><li>Accepting cookies</li><li>Listing your name and other personal information in your browser profile</li><li>Filling in form fields for you</li></ul>\n<p>This will help reduce the amount of personal information transmitted to sites at the expense of full functionality, since many legitimate web sites require you to accept cookies.</p>\n<p>Do not contribute to the spam problem by producing any of it yourself! In particular, learn about chain mail and do not forward chain mail to others. Also, if you receive an email message that appears to warn of some horrible thing happening (a virus that reportedly deletes all your files, for example) or is a touching sob story (about helping to save a poor sick girl or boy, for example), be suspicious.</p>\n<p>Nearly every instance of chain mail is a hoax. The message may even come from someone you know and respect who is simply not aware that it&#39;s a hoax. Learn about hoaxes and the sites available to verify hoaxes, and do not forward them to others. <br /><br /></p>\n<p style=\"font-size: 12pt;\"><strong>Questions regarding X-rated spam (unsolicited mass e-mail)</strong></p>\n<p> Some members of the Company have at times expressed concern to IT regarding their own accountability for unsolicited e-mail of a sexual nature sent to their Company e-mail address. In some cases, an employee worries that a supervisor or co-worker might think the employee solicited the mail. In other cases, the person fears that an IT employee asked to assist with the computer might think the person had solicited the sexually-oriented mail.</p>\n<p>Most people who either have experienced spam or have read about spam understand that spammers do not wait to be asked; they are in the business of aggressive marketing. Many spammers are deceitful, trying to fool people into opening their unwanted e-mail by pretending to be someone else or using a subject line which fools the recipient into opening the mail. Sometimes they claim falsely that the person is receiving the e-mail because the person asked for it, or expressed interest in material of a similar nature. The truth is that few people welcome spam and even fewer ask for it.</p>\n<p>If a supervisor or co-worker thinks otherwise, IT can reassure them. Certainly, IT technicians and consultants understand that spam is a plague and not something invited by the recipient. As extra protection, depending upon how you receive your e-mail on campus, there are ways to quarantine spam and/or filter your incoming e-mail.  It is advisable to immediately delete any such emails you receive.</p>", 
        "sys_created_by": "johnoliver.mendoza", 
        "display_attachments": "false", 
        "image": "", 
        "sys_view_count": "0", 
        "article_type": "text", 
        "cmdb_ci": "", 
        "author": { 
            "link": "https://dev91016.service-now.com/api/now/table/sys_user/62d78687c0a8010e00b3d84178adc913", 
            "value": "62d78687c0a8010e00b3d84178adc913" 
        }, 
        "can_read_user_criteria": "", 
        "sys_mod_count": "4", 
        "active": "true", 
        "cannot_read_user_criteria": "", 
        "published": "2014-09-09", 
        "sys_domain_path": "/", 
        "sys_tags": "", 
        "meta_description": "", 
        "kb_knowledge_base": { 
            "link": "https://dev91016.service-now.com/api/now/table/kb_knowledge_base/a7e8a78bff0221009b20ffffffffff17", 
            "value": "a7e8a78bff0221009b20ffffffffff17" 
        }, 
        "meta": "", 
        "topic": "Policies", 
        "category": "", 
        "kb_category": { 
            "link": "https://dev91016.service-now.com/api/now/table/kb_category/5681bf8bff0221009b20ffffffffff95", 
            "value": "5681bf8bff0221009b20ffffffffff95" 
        } 
    }, 
    { 
        "short_description": "Where can I obtain updates and new releases?\n\t\t", 
        "roles": "", 
        "wiki": null, 
        "direct": "false", 
        "rating": "", 
        "description": "", 
        "source": "", 
        "sys_updated_on": "2014-12-19 15:54:17", 
        "disable_suggesting": "false", 
        "sys_class_name": "kb_knowledge", 
        "number": "KB0000012", 
        "sys_id": "0dd6457187032100deddb882a2e3ecb3", 
        "use_count": "1", 
        "sys_updated_by": "johnoliver.mendoza", 
        "flagged": "false", 
        "disable_commenting": "false", 
        "sys_created_on": "2014-09-09 23:31:10", 
        "sys_domain": { 
            "link": "https://dev91016.service-now.com/api/now/table/sys_user_group/global", 
            "value": "global" 
        }, 
        "valid_to": "2020-01-01", 
        "retired": "", 
        "workflow_state": "published", 
        "text": "<p><span style=\"font-size: 18pt;\"><strong>Where can I obtain updates and new releases for Mac OS X?</strong></span><span class=\"Apple-tab-span\"> </span></p>\n<p>To find updates and new releases for Mac OS X, try any of the following options:</p>\n<ul><li>Use Software Update to download and install updates, and even full releases, of the operating system. </li><li>To download the full version of Mac OS X 10.9 (Mavericks), open the Mac App Store, available in Mac OS X 10.6.6 and later. You may access it from the Apple menu. You can also buy other software products from Apple and third-party developers in the App Store.</li><li>To order Apple merchandise, visit the <a title=\"\" href=\"http://store.apple.com/us\" rel=\"nofollow\">Apple Store</a> or call 800-MY-APPLE. For information about upgrades, call 800-785-9445. </li></ul>\n<p> </p>", 
        "sys_created_by": "johnoliver.mendoza", 
        "display_attachments": "false", 
        "image": "", 
        "sys_view_count": "0", 
        "article_type": "text", 
        "cmdb_ci": "", 
        "author": { 
            "link": "https://dev91016.service-now.com/api/now/table/sys_user/46d85d4aa9fe198101e36eb956587fe7", 
            "value": "46d85d4aa9fe198101e36eb956587fe7" 
        }, 
        "can_read_user_criteria": "", 
        "sys_mod_count": "4", 
        "active": "true", 
        "cannot_read_user_criteria": "", 
        "published": "2014-09-09", 
        "sys_domain_path": "/", 
        "sys_tags": "", 
        "meta_description": "", 
        "kb_knowledge_base": { 
            "link": "https://dev91016.service-now.com/api/now/table/kb_knowledge_base/a7e8a78bff0221009b20ffffffffff17", 
            "value": "a7e8a78bff0221009b20ffffffffff17" 
        }, 
        "meta": "", 
        "topic": "Policies", 
        "category": "", 
        "kb_category": { 
            "link": "https://dev91016.service-now.com/api/now/table/kb_category/4008ed12ff0131009b20ffffffffffef", 
            "value": "4008ed12ff0131009b20ffffffffffef" 
        } 
    }, 
    { 
        "short_description": "Are Copyrighted Files Illegal to Have On My\n\t\t\tComputer?\n\t\t", 
        "roles": "", 
        "wiki": null, 
        "direct": "false", 
        "rating": "", 
        "description": "", 
        "source": "", 
        "sys_updated_on": "2014-12-19 15:55:18", 
        "disable_suggesting": "false", 
        "sys_class_name": "kb_knowledge", 
        "number": "KB0000009", 
        "sys_id": "1addc9f1474321009db4b5b08b9a7120", 
        "use_count": "1", 
        "sys_updated_by": "johnoliver.mendoza", 
        "flagged": "false", 
        "disable_commenting": "false", 
        "sys_created_on": "2014-09-09 20:33:34", 
        "sys_domain": { 
            "link": "https://dev91016.service-now.com/api/now/table/sys_user_group/global", 
            "value": "global" 
        }, 
        "valid_to": "2020-01-01", 
        "retired": "", 
        "workflow_state": "published", 
        "text": "<p><span style=\"font-size: 18pt;\"><strong>Are Copyrighted Files Illegal to Have On My Computer?</strong></span></p>\n<p>Tools built to make use of the Internet easier have created special concerns for the holders of copyright. While it takes time and energy for someone to photocopy all the pages of a book, it takes scarcely any time for someone to download an album of music, a feature film, an episode of a television show, or a computer game. Sometimes, because it is easy to download copyrighted material, it is tempting to believe it is legal to do so.</p>\n<p>But it is legal only if the material being downloaded is in the public domain, if the copyright holder has given you permission to make a copy of the material, or if you are making copies for purposes of criticism, comment, news reporting, scholarly or instructional purposes such that the &#34;fair use&#34; exception under federal copyright law applies. However, most contemporary music, film, television shows, computer games, and computer software are not likely to be in the public domain. Nor is it likely that downloading such materials in their entirety for entertainment purposes without permission from the rights-holder will meet the &#34;fair use&#34; criteria.</p>\n<p>Therefore, if you do not know whether material is copyrighted or not, assume that it is, and proceed accordingly.</p>\n<p><span style=\"font-size: 12pt;\"><b>But what if I own legal copies of the material?</b></span></p>\n<p>Even if you have legally obtained copies of copyrighted materials on your computer, you must be careful to protect those copies against unauthorized copying by others.</p>\n<p>In particular, file sharing technologies such as BitTorrent, and so-called &#34;private&#34; sharing networks (to the extent you have reason to use such technologies for legitimate purposes) should be used responsibly and with great care to ensure that copyrighted materials are not being made available for copying by others not legally entitled to do so. Indeed, failure to restrict unauthorized access to copyrighted materials stored on your computer may constitute contributory infringement under federal copyright law.</p>\n<p><span style=\"font-size: 12pt;\"><b>What is legal to download?</b></span></p>\n<p>Some material is in the public domain, and is available through web or file transfer sites maintained for that purpose. Some recording artists and some television studios provide streaming versions of performances for your viewing or listening.  And some performers do give permission to copy and share some of their work.</p>\n<p><span style=\"font-size: 12pt;\"><b>How will the rights-holder know?</b></span></p>\n<p>The music industry, the film and television industry, and organizations representing software manufacturers and firms creating computer games, have become increasingly concerned about copyright infringement via the Internet, and have pursued the infringers - sometimes filing lawsuits against the individuals. Other kinds of copyrighted materials also are of concern.</p>\n<p>Just as some Employees search the Internet for music, films, or other material they would like, the rights-holders or their agents often search the Internet for computers that are holding and/or distributing unauthorized copies. When rights-holders find an unauthorized copy of a work, they often file an infringement complaint with the service provider. Sometimes, they file a lawsuit. And under some circumstances, they may file criminal charges.</p>\n<p>The Company is the service provider for its employees. Unless these complaints are addressed promptly, the Company may also be held liable for infringement. So if you use the Company network to make illegal copies, or if you fail to protect legally obtained copies on your computer, you put yourself and the Company at risk.</p>\n<p><span style=\"font-size: 12pt;\"><b>What happens if I get caught?</b></span></p>\n<p>Penalties for copyright infringement include civil and criminal penalties. In general, anyone found liable for civil copyright infringement may be ordered to pay either actual damages or &#34;statutory&#34; damages affixed at not less than $750 and not more than $30,000 per work infringed. For &#34;willful&#34; infringement, a court may award up to $150,000 per work infringed. A court can, in its discretion, also assess costs and attorney&#39;s fees. For details see Title 17, United States Code, Sections 504, 505.</p>\n<p>Willful copyright infringement can also result in criminal penalties, including imprisonment of up to five years and fines of up to $250,000 per offense.</p>\n<p>Violation of federal copyright law is also a violation of Company regulations and will be reported to appropriate disciplinary authorities. Employees may receive a warning, disciplinary probation, or other, even more serious, penalty as a result of infringement. Company policy also requires that loss of computing and network privileges be considered as part of the penalty in cases of repeated infringement.</p>\n<p><span style=\"font-size: 12pt;\"><b>Does IT scan my computer for illegal files?</b></span></p>\n<p>Although most campus copyright infringement is revealed when the Company receives complaints from the rights-holder or agent, some unauthorized service of music, films, television, computer games, and proprietary software has been discovered by IT simply because of the network performance problems caused by the traffic.</p>\n<p>In such cases, IT does not peruse files, but makes inferences which it reports to the appropriate disciplinary authority, while notifying the employee of the potential disciplinary and legal action. As a general matter, the Company is committed to protection of privacy, unless intrusion is warranted, and does not actively monitor its computing network for purposes of seeking out infringing activity on the part of its users. Further, the language of the Digital Millennium Copyright Act makes it clear that the service provider is not expected to be aware of content carried through its services, only to be properly responsive when alleged infringement is reported.</p>\n<p>Please be aware the Company cannot knowingly assist you in illegal activity, such as making unauthorized copies or sharing copyrighted materials without authorization. To do so would be to participate in violating federal law and, in acting as agents of the Company, staff are forbidden to do so.</p>\n<p> </p>", 
        "sys_created_by": "johnoliver.mendoza", 
        "display_attachments": "false", 
        "image": "", 
        "sys_view_count": "0", 
        "article_type": "text", 
        "cmdb_ci": "", 
        "author": { 
            "link": "https://dev91016.service-now.com/api/now/table/sys_user/46d14f04a9fe19810142e40c6b071512", 
            "value": "46d14f04a9fe19810142e40c6b071512" 
        }, 
        "can_read_user_criteria": "", 
        "sys_mod_count": "2", 
        "active": "true", 
        "cannot_read_user_criteria": "", 
        "published": "2014-09-09", 
        "sys_domain_path": "/", 
        "sys_tags": "", 
        "meta_description": "", 
        "kb_knowledge_base": { 
            "link": "https://dev91016.service-now.com/api/now/table/kb_knowledge_base/a7e8a78bff0221009b20ffffffffff17", 
            "value": "a7e8a78bff0221009b20ffffffffff17" 
        }, 
        "meta": "", 
        "topic": "Policies", 
        "category": "", 
        "kb_category": { 
            "link": "https://dev91016.service-now.com/api/now/table/kb_category/5a7b2552ff0131009b20ffffffffffb1", 
            "value": "5a7b2552ff0131009b20ffffffffffb1" 
        } 
    }];

  // check array size
  //console.log(knowledges.length);
  //console.log('##############################222\n');
  //console.log(knowledges + '\n');
  //console.log('##############################222\n');


  // process each Knowledge entry
  for (var i = 0; i < knowledges.length; i++) {
  
    if (i > 10)
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


