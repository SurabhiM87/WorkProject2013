var refMainPage;
var t0,t1;
var domEle = [], treeEle;
var pageData = [],file_name = [],file_version = [],contentId = [];
var edited = false;
var tinyMceEdited = false;
var myMask;
var savedPaths = [,];
var compIndex = -1;
var activeTabIndex = 0;

Ext.define('EDGAR.controller.ViewportCont', {
    extend: 'Ext.app.Controller',
    requires: [
    'Ext.data.TreeStore',
    'Ext.tree.Panel',
    'Ext.form.field.Hidden',
    'Ext.LoadMask'
    ],

    views: [
        'EDGAR.view.FileGrid',
        'MainPage',
        'Viewport',
        'EDGAR.view.Products.UserGrid',
        'EDGAR.view.Products.UserGridButtons',
        'EDGAR.view.Products.UserInformation'

    ],

    init: function() {
        
        refMainPage = this;
        this.control({
            'button[itemId=urlId]': {
                click: this.editLink
            },
            'button[itemId=saveId]':{
                click: this.saveTextAsFile
            },
            'button[itemId=closeId]':{
                click: function(){
                    var filesViewPort = Ext.getCmp('fileGridPopup'+selectedProjectId).getComponent('filePanel'+selectedProjectId).getComponent(selectedProjectId);
                    var fileGrid = filesViewPort.getComponent('gridFiles');
                    Ext.Msg.confirm('Confirmation', 'Are you sure you want to exit without Saving?', function(button) {
                        if (button === 'yes') {
                            // document.location.reload();
                            var state = "edit";
                            var fileName = file_name[activeTabIndex];
                            var version = file_version[activeTabIndex];
                            $.post(serverLocation + 'StateChange?fileName=' + fileName + '&version=' + version + '&state=' + state).success(function(data) {
                                console.log('State Changed');
                                Ext.getStore('Files').reload();
                                fileGrid.getView().refresh();
                            });
                            file_name.splice(activeTabIndex,1);
                            file_version.splice(activeTabIndex,1);
                            contentId.splice(activeTabIndex,1);
                            Ext.getCmp('mainTab').getActiveTab().destroy();
                        } else {
                            // do something when No was clicked.
                        }
                    });                    
                }
            },
            'button[itemId=saveandCloseDiv]' : {
                click:  function(){
                    refMainPage.saveAndClose(this);
                }
            },
            'button[itemId=saveDiv]' : {
                click:  function(){
                    refMainPage.saveOnly(this);
                }
            },
            'button[itemId=cancelDiv]':{
                click: function(){
                    Ext.Msg.confirm('Confirmation', 'Are you sure you want to exit the editor?', function(button) {
                        if (button === 'yes') {
                            Ext.ComponentQuery.query('#htmlData')[activeTabIndex].getActiveTab().close();
                        } else {
                            // do something when No was clicked.
                        }
                    });
                    
                }
            },
            'actioncolumn[id=edit]':{
                click: function(grid, rowIndex, colIndex, actionItem, event, record, row){
                    if(record.data.state == "lock"){
                        Ext.Msg.alert('Access Denied', 'Another user is currently editing the file.');
                    }
                    else{
                        var fileName = record.data.name;
                        var version = record.data.version;
                        refMainPage.editLink(fileName,version);
                    }
                }
            },
            'actioncolumn[id=download]':{
                click: function(grid, rowIndex, colIndex, actionItem, event, record, row){
                    refMainPage.downloadFile(record);
                }
            }
            // 'button[id=FirstLink]':{
            //     click: function(){
            //         var incomingID = FirstLink;
            //         this.editLink(incomingID);
            //     }  
            // },
            // 'button[id=SecondLink]':{
            //     click: function(){
            //         var incomingID = SecondLink;
            //         this.editLink(incomingID);
            //     }  

            // },
            // 'button[id=ThirdLink]':{
            //     click: function(){
            //         var incomingID = ThirdLink;
            //         this.editLink(incomingID);
            //     }   
            // },
            // 'button[id=uploadFile]':{
            //     click: function(){
            //         this.uploadFiles();
            //     }
            // }

        });
    },

    editLink: function(fileName, version){
        compIndex = Ext.getCmp('mainTab').items.length - 1;
        Ext.getCmp('viewport').setLoading(true);
        //t0 = window.performance.now();
        var location = document.location.toString();
        file_name[compIndex] = fileName;
        file_version[compIndex] = version;
        console.log(activeTabIndex);
        console.log(file_name);
        var state = "lock";
        var linkAddress = serverLocation + "Download?fileName="+ fileName+ '&version=' + version + '&state=' + state;
        ///console.log(linkAddress);
        // if(incomingID == FirstLink){
        //     linkAddress ="http://corp.quantilus.com/AuthoringTool/SampleHTML/A_Christmas_Carol.htm";
        // }
        // else if(incomingID == SecondLink){
        //     linkAddress = "http://corp.quantilus.com/AuthoringTool/SampleHTML/Peeps_At_Many_Lands.htm";
        // }
        // else{
        //     linkAddress = "http://corp.quantilus.com/AuthoringTool/SampleHTML/Wuthering_Heights.htm";
        // }
       
                //refMainPage.editHtml();
        refMainPage.getLink(linkAddress);
                // refMainPage.createTree();
                // refMainPage.editHtml();
                // refMainPage.addToc();
                // refMainPage.createTree();
       
    },

    getLink: function(linkAddress){
        //var linkAddress = Ext.getCmp("MyForm").getForm().findField("link").getValue();
        //console.log(linkAddress);  
        var location = document.location.toString();
        //console.log(linkAddress);
        // if((linkAddress == location + "SampleHTML/A_Christmas_Carol.htm") || (linkAddress == location + "SampleHTML/Peeps_At_Many_Lands.htm") || (linkAddress == location + "SampleHTML/Wuthering_Heights.htm")){
            $.get(linkAddress).success(function(data) {
                //console.log(data);  
                // var view = Ext.widget('adduser');
                        
                var bodyindex1 = data.match(/<body/i).index;
                var bodyindex2 = data.length;
                var body = data.substring(bodyindex1,bodyindex2);

               // Ext.getCmp('viewport').destroy();
                contentId[compIndex] = "content"+compIndex;
                var finalData = "<div id='content" + compIndex + "' style='margin-top:20px;width:100%;' class='editable" + compIndex + "'  height='100%'>";
                finalData += body;
                pageData[compIndex] = data;
                finalData += "</div>";

                var titleDoc = "";
                if( pageData[compIndex].match(/<title/i) != null)  {
                    var index1 = pageData[compIndex].match(/<title/i).index ;
                    var index2 = pageData[compIndex].match(/<\/title>/i).index ;
                    var titleDoc = pageData[compIndex].substring(index1+7,index2);
                }


                if(titleDoc.length>20){
                    titleDoc = titleDoc.substring(0,20)+ '...';
                }

                // var win = new Ext.widget('mytab',{
                //     id: 'tab'+ compIndex,
                //     title: file_name
                // });
                // var newTab = Ext.getCmp('mainTab').add(win).show();

                var newTab = Ext.getCmp('mainTab').add({
                    xtype: 'mytab',
                    title: file_name[compIndex],
                    iconCls: 'icons',
                    icon: 'resources/icons/text_html.png',
                }).show();
                
                // console.log(data);
                console.log( Ext.getCmp('mainTab').getActiveTab())
                Ext.ComponentQuery.query('#htmlData')[compIndex].add({
                    title: titleDoc,
                    itemId: 'document',
                    autoScroll: true,
                    bodyStyle: 'padding:10px;',
                    html:finalData,
                    tbar : [
                          
                            // xtype: 'toolbar',
                            // id: 'saveCancelToolbar',
                            // style: 'margin-top: 15px;margin-right: 10px; width: 735px; margin-left: -10px; position: fixed;',
                            // cls: 'toolbar',
                            
                            { xtype: 'tbfill' },
                            {
                                text: 'Save',
                                itemId: 'saveId'
                            },
                            { xtype: 'tbspacer',width: 20 },
                            {
                                text:'Close',
                                itemId: 'closeId'
                            },
                            { xtype: 'tbspacer',width: 20 }

                        ]
                });
                Ext.getCmp('viewport').setLoading(false);
                
                // Basic mask:
                myMask = new Ext.LoadMask(Ext.ComponentQuery.query('#west-region-container')[compIndex], {msg:"Loading..."});
                myMask.show();
                myMask.setPosition(70,60);
                refMainPage.addToc();
            });
    },

    addToc: function(){
        var JSONStart = ' { "root": { "expanded": true , "children": [ ';
        var JSONEnd = ']}}';
        // var JSONStart = ' { "expanded": true , "children": [ ';
        // var JSONEnd = ']}';
        var ToCjsonHtml = JSONStart+ this.jsonHtmlTree()+ JSONEnd;
        ToCjsonHtml = ToCjsonHtml.replace(/ "expanded": false, "children": \n\[\]},/g, '"leaf": true },');
        // ToCjsonHtml = ToCjsonHtml.replace(/ "expanded": false, "children": \n\[\]},/g, '"leaf": true, "checked": false },');
        console.log(ToCjsonHtml);
        ToCjsonHtml = ToCjsonHtml.replace(/},]/g, '}]');
        console.log(ToCjsonHtml);

        var treeObj = JSON.parse(ToCjsonHtml);
        var treeObjStr = JSON.stringify(treeObj);
        // localStorage.Tree = treeObjStr;
        refMainPage.createTree(treeObjStr);
    },

    jsonHtmlTree: function(obj){
        var obj = obj || document.getElementById('content'+ compIndex);
        //console.log(obj);
        jQuery.fn.justtext = function() {
            return $(this).clone()
                    .children()
                    .remove()
                    .end()
                    .text();
        };

        var reqText = $(obj).justtext();
        reqText = reqText.replace(/\n/g,'').replace(/"/g,'').replace(/\\/g,'');       //Remove double quotes and empty lines
            //console.log(reqText);
            if(obj.textContent.length>20){
                reqText = reqText.replace(/\t/g,'').substring(0,27);
                var str = '\n{ "text": "' + obj.tagName + ': ' +  reqText + '...' + '",';
            }
            else
                var str = '\n{ "text": "' + obj.tagName + ' ( No Text)'+ '",';
        parent = obj;
        if (obj.hasChildNodes()) {
            str += ' "expanded": false, "children": \n[';
            var child = obj.firstChild;
            while (child) {
                if (child.nodeType == 1) {
                    str += this.jsonHtmlTree(child);
                }
                previous = child;
                child = child.nextSibling;
            }
            if(parent.nodeType==1){
                str += ']},';
            }      
        }
        else{
          // str += '"leaf": true, "checked": false},' 
          str += '"leaf": true },' 
        }
      return str;
    },
  
    createTree: function(data){
        var contextEl;  
        var currSection;
        // var data = localStorage.Tree;
        //data = JSON.parse(data);
        data = JSON.parse(data);
        //console.log(data);
        var settingsTreeStore = Ext.create('Ext.data.TreeStore', data);
        Ext.ComponentQuery.query('#west-region-container')[compIndex].add({
                xtype: 'treepanel',
                itemId: 'DOMTreePanel',
                border: 0,
                renderTo: Ext.getBody(),
                store: settingsTreeStore,
                listeners : {
                    itemclick: function(node, rec){
                        //console.log(rec, rec.data.depth, rec.data.index);
                        var ele = refMainPage.goToElement(rec);
                        ele.scrollIntoView();
                    },
                },  
            });
           
        //t1 = window.performance.now();
        //console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
          myMask.hide();
        
/* Right Click menu on the Tree */
        Ext.ComponentQuery.query('#DOMTreePanel')[compIndex].on('itemcontextmenu', function(view, record, item, index, event){
            // menu1.showAt(event.getXY());
            currSection = record;
            event.stopEvent();
            contextMenu1.showAt(event.getXY());
        },this);
    
        var contextMenu1 = new Ext.menu.Menu({
            items: [
            {   text: 'Edit',
                handler: function(){
                    if(Ext.ComponentQuery.query('#htmlData')[activeTabIndex].items.length>=2){
                        alert("Only one part of the page can be edited at a time!"+
                            "Please close or save the editable part and then try again");
                    }
                    else{    
                        var ele = refMainPage.goToElement(currSection);
                        refMainPage.popTinymce(ele);
                    }
                }
            }]
        });

        refMainPage.registerEvents();
        refMainPage.changePaths();
        $('#content'+ compIndex).click(function(ev){
            refMainPage.backLink(ev);
        });

/* Right Click menu on the Page */    
        Ext.ComponentQuery.query('#htmlData')[activeTabIndex].getEl().on('contextmenu', function(ev) {
            ev.preventDefault();
            contextEl = ev.target;
            contextMenu2.showAt(ev.getXY());
        },this);
    
        var contextMenu2 = new Ext.menu.Menu({
            items: [
            {   text: 'Edit',
                handler: function(){
                    //console.log(contextEl);
                    if(contextEl.id!=contentId[activeTabIndex] ){
                        if(Ext.ComponentQuery.query('#htmlData')[activeTabIndex].items.length>=2){
                            alert("Only one part of the page can be edited at a time!"+
                            "Please close or save the editable part and then try again");
                        }
                        else{
                            while(contextEl.parentElement.id == ""){
                                contextEl = contextEl.parentElement;
                            }
                            $('#'+ contentId[activeTabIndex]).click();
                            //console.log(contextEl);
                            refMainPage.popTinymce(contextEl);
                        }
                    }
                }
            }]
        });
    },

    popTinymce: function(ele){
        var headContent = "";
        if(pageData[activeTabIndex].match(/<style/i) != null){
            var index1 = pageData[activeTabIndex].match(/<style/i).index;
            var index2 = pageData[activeTabIndex].match(/<\/style>/i).index;
            headContent = pageData[activeTabIndex].substring(index1,index2+7);
        }

        domEle[activeTabIndex] = ele;
        console.log(document.getElementById(contentId[activeTabIndex]));
        var htmlOfEl ="<div id='contentEdit" + activeTabIndex + "' name = 'ele' class='editable' width='100%' height='100%'> ";
        htmlOfEl += ele.outerHTML;
        htmlOfEl += headContent + "</div>";
        var tab =   Ext.ComponentQuery.query('#htmlData')[activeTabIndex].add({
                        itemId: 'editTab',
                        title: 'Edit',
                        autoScroll: true,
                        html:htmlOfEl,
                        tbar : [
                           
                            { xtype: 'tbfill' },
                            {
                                text: 'Save',
                                itemId: 'saveDiv'
                            },
                            { xtype: 'tbspacer',width: 20 },
                            {
                                text: 'Save and Close',
                                itemId: 'saveandCloseDiv'
                            },
                            { xtype: 'tbspacer',width: 20 },
                            {
                                text:'Cancel',
                                itemId: 'cancelDiv'
                            },
                            { xtype: 'tbspacer',width: 20 }

                        ]
                    });
        Ext.ComponentQuery.query('#htmlData')[activeTabIndex].setActiveTab(tab);

/* TinyMCE 4 Code */
        // tinymce.init({
        //         selector: "#contentEdit",
        //         height: 700,
        //         width: 915,
        //         resize: false,
        //         menubar: false,
        //         plugins: [
        //                     "advlist autolink autosave link lists charmap print preview hr anchor pagebreak spellchecker",
        //                     "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        //                     "table contextmenu directionality emoticons template textcolor paste fullpage textcolor"       
        //             ],

        //         toolbar1: "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist | fontselect fontsizeselect| mybutton",
        //         toolbar2: "searchreplace | undo redo | link unlink anchor | inserttime preview | forecolor backcolor | table | removeformat | subscript superscript | charmap | print fullscreen | spellchecker | pagebreak restoredraft",
        //         setup: function(editor) {
        //             editor.addButton('mybutton', {
        //                 text: 'SAVE',
        //                 icon: false,
        //                 onclick: function() {
        //                     // editor.insertContent('Main button');
        //                     refMainPage.saveAndClose(this);
        //                 }
        //             });
        //         }
        //     });

/* TinyMCE 3 Code */
        tinyMCE.init({
        // General options
                height: 720,
                width: '100%',
                selector: "#contentEdit"+ activeTabIndex,
                theme : "advanced",
                plugins : "autolink,lists,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
                statusbar: false,
                // Theme options
                theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,search,replace,|,bullist,numlist,|,formatselect,fontselect,fontsizeselect",
                theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,undo,redo,|,outdent,indent,blockquote,|,link,unlink|,insertdate,inserttime,preview,|,forecolor,backcolor,|,removeformat,|,sub,sup,|,iespell,|,print,|,fullscreen,|,spellchecker",
                theme_advanced_buttons3 : "tablecontrols,|,charmap",
                theme_advanced_toolbar_location : "top",
                theme_advanced_toolbar_align : "left",
                theme_advanced_statusbar_location : "none",
                theme_advanced_resizing : true,
                valid_children : "+body[style]",
                convert_fonts_to_spans : false,
                // Skin options
                skin : "o2k7",
                // skin_variant : "silver",
                // save_enablewhendirty: true,
                onchange_callback : function(){
                    tinyMceEdited = true;
                },
                setup : function(ed) {
                  ed.onKeyDown.add(function(ed, evt) {
                      console.debug('Key up event: ' + evt.keyCode);
                      if (evt.keyCode == 9){ // tab pressed
                        console.log("I pressed TAB");
                        if(evt.shiftKey) {
                            console.log("Outdent");
                            ed.execCommand('Outdent');
                        }
                        else{
                            console.log("Indent");
                            ed.execCommand('Indent');
                        }
                        //ed.execCommand('mceInsertRawHTML', false, '\x09'); // inserts tab
                        evt.preventDefault();
                        evt.stopPropagation();
                        return false;
                      }
                  });
               }
        });
    },


    goToElement: function(rec){
        var depth = rec.data.depth;
        var index = [];
        var depthArr = [];
        var i = depth-2;
        var element = rec;
        while(i!=-1){
            depthArr[i] = element.data.depth;
            index[i] = element.data.index;
            i--;
            element = element.parentNode;
        }
        //console.log("Index: " + index);
        //console.log("Depth: " + depthArr);
        var indexNum = 0;
        element = $('#'+ contentId[activeTabIndex]);
        while(indexNum!=(depth-1)){
            element = $(element).children()[index[indexNum]];
            indexNum++;
        }
        // console.log("FOUND ELEMENT:" + element.tagName);
        return element;
    },

    
    saveOnly: function(){
        edited = true;
        var content = tinyMCE.activeEditor.getContent();
        var ele = domEle[activeTabIndex];
        console.log(ele);
        $(ele).replaceWith($(content)[0]);
    },

    saveAndClose: function(){
            Ext.Msg.confirm('Confirmation', 'Are you sure you want to save the edited content?', function(button) {
                if (button === 'yes') {
                    edited = true;
                    var content = tinyMCE.activeEditor.getContent();
                    var ele = domEle[activeTabIndex];
                    console.log(ele);
                    $(ele).replaceWith($(content)[0]);
                    // $(ele).replaceWith($(content)[1]);
                    Ext.ComponentQuery.query('#htmlData')[activeTabIndex].getActiveTab().close();
                } else {
                    
                  }
            });
    },

    registerEvents: function(){
        var hyperLinks = $('a[href*="#"]');
        for(var i=0;i<hyperLinks.length;i++){
            var temp = $(hyperLinks)[i];
            temp.onclick = function(ev) {
                ev.preventDefault();
                var hashtag = this.hash.replace("#","");
                var linkTo = $('a[name*="'+hashtag.toLowerCase()+'"]')[0] || $('a[name*="'+hashtag.toUpperCase()+'"]')[0] ;
                if(linkTo!=undefined){
                    $(linkTo)[0].scrollIntoView();
                }
                else{
                    alert("No link available");
                }
            };
        }
    },

    changePaths: function(){
        var refToContent = document.getElementById('content'+ compIndex);
        var imgTags = refToContent.getElementsByTagName('img');
        for(i=0;i<imgTags.length;i++){
            if(imgTags[i].src.lastIndexOf("/")!=-1){
                var fileNameIndex = imgTags[i].src.lastIndexOf("/") + 1;
                var filename = imgTags[i].src.substr(fileNameIndex);
            }
            else{
                var filename = imgTags[i].src;
            }
            savedPaths[compIndex,i] = filename;
            imgTags[i].src = serverLocation + "testFiles/" + filename;
        }
    },

    replaceChangedPaths: function(){
        var refToContent = document.getElementById(contentId[activeTabIndex]);
        var imgTags = refToContent.getElementsByTagName('img');
        for(i=0;i<imgTags.length;i++){
            imgTags[i].src = savedPaths[activeTabIndex,i];
        }
    },


    backLink: function(ev){
        var depth = 0;
        var index = [];
        var element = ev.target;
        var i=0;
        while(element.id == "" || element.id !=contentId[activeTabIndex]){
            depth++;
            i++;        
            index[i] = $(element).index();
            element = element.parentElement;
        }
        //console.log(index);

        var treeElement = Ext.ComponentQuery.query('#DOMTreePanel')[activeTabIndex].getRootNode().firstChild;
            var length = index.length;
            while(length>1){
                if(treeElement.isVisible()){
                    treeElement.expand();
                }
                treeElement = treeElement.childNodes[index[length-1]];
                length--;
            }
            //console.log(treeElement);
            Ext.ComponentQuery.query('#DOMTreePanel')[activeTabIndex].getSelectionModel().select(treeElement);
            treeEle = treeElement;
    },

    saveTextAsFile: function()
    {
        if(tinyMceEdited && edited){
            Ext.Msg.confirm('Confirmation', 'Are you sure you want to save the document?', function(button) {
            if (button === 'yes') {
                myMask2 = new Ext.LoadMask(Ext.getBody(), {msg:"Saving..."});
                myMask2.show();
                $('#'+ contentId[activeTabIndex]).find('meta').remove();
                Encoder.EncodeType = "entity";
                refMainPage.replaceChangedPaths();
                var textToWrite = document.getElementById(contentId[activeTabIndex]).innerHTML.replace(/\<tbody>/gi,"").replace(/\<\/tbody>/gi,"");   //Remove TBODY tags
                // console.log(textToWrite);
                textToWrite = textToWrite.replace(/nowrap=""/gi,'nowrap');
                textToWrite = Encoder.htmlEncode(textToWrite);
                textToWrite = Encoder.correctEncoding(textToWrite);
                textToWrite = textToWrite.replace(/&#10;/g, '\n');
                // textToWrite = cleanUp();
                var index = pageData[activeTabIndex].match(/<body/i).index;
                var tillBody = pageData[activeTabIndex].substring(0,index);

                var header = tillBody + "<BODY>";
                var footer = '</BODY></HTML>';
                textToWrite = header + textToWrite + footer;
                // console.log(textToWrite);
                //console.log('\n' + textToWrite);?data='+ encodedData + '&fileName=' + file_name
                var textFileAsBlob = new Blob([textToWrite], {type:"text/html"});
                var encodedData = encodeURIComponent(textToWrite);
                //encodedData = encodedData.replace(/#/g,'<?*score*?>');
                // console.log('\n' + encodedData);
                 
                function reqListener () {
                  console.log(this.responseText);
                };
                var fileName = file_name[activeTabIndex];
                var version = file_version[activeTabIndex];

               var oReq = new XMLHttpRequest();
                oReq.onload = reqListener;
                oReq.open("post", serverLocation + 'Update?targetpath=testFiles&fileName=' + fileName + '&version=' + version, true);
                oReq.send(textToWrite);

                oReq.addEventListener("progress", updateProgress, false);
                oReq.addEventListener("load", transferComplete, false);
                oReq.addEventListener("error", transferFailed, false);
                oReq.addEventListener("abort", transferCanceled, false);


                // ...

                // progress on transfers from the server to the client (downloads)
                function updateProgress (oEvent) {
                  if (oEvent.lengthComputable) {
                    var percentComplete = oEvent.loaded / oEvent.total;
                    console.log(percentComplete);
                  } else {
                    // Unable to compute progress information since the total size is unknown
                  }
                }

                function transferComplete(evt) {
                            // document.location.reload();         //CHANGE IT 
                    
                    var state = "edit";
                    var fileName = file_name[activeTabIndex];
                    var version = file_version[activeTabIndex];
                    $.post(serverLocation + 'StateChange?fileName=' + fileName + '&version=' + version + '&state=' + state).success(function(data) {
                        console.log('State Changed');
                        Ext.getStore('Files').reload();
                        Ext.getCmp('gridFiles').getView().refresh(); 
                    });
                    file_name.splice(activeTabIndex,1);
                    file_version.splice(activeTabIndex,1);
                    contentId.splice(activeTabIndex,1);
                    Ext.getCmp('mainTab').getActiveTab().destroy();
                    myMask2.hide();
                }

                function transferFailed(evt) {
                  Ext.Msg.alert('Status', 'File cannot be saved.');
                }

                function transferCanceled(evt) {
                  alert("The transfer has been canceled by the user.");
                }
            } else {
                // do something when No was clicked.
            }
            });
        }   
        else{
                Ext.Msg.confirm('Confirmation', 'No Changes have been made to the document. \nAre you sure you want to save the document without editing?', function(button) {
                if (button === 'yes') {
                    // document.location.reload();         //CHANGE IT 
                    Ext.getCmp('mainTab').getActiveTab().destroy();
                }
                else{
                    // do something when No was clicked.
                }
            });
        }

    },

  
    downloadFile: function(rec){
        console.log(rec);
        var fileName = rec.data.name;
        var version = rec.data.version;
        // file_name[activeTabIndex] = fileName;
        // file_version[activeTabIndex] = version;
         $.get(serverLocation + 'Download?fileName=' + fileName + '&version=' + version).success(function(data) {
                        // console.log(data);
                        window.location = serverLocation + 'Download?fileName='+ fileName + '&version=' + version;
                    });

    }

});