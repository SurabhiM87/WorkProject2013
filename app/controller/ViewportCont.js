var refMainPage;
var t0,t1;
var domEle = [], treeEle;
var pageData = [],file_name = [],file_version = [],contentId = [], file_filePath=[], file_fileid =[];
var edited = false;
var tinyMceEdited = false;
var myMask;
var savedPaths = [,];
var compIndex = -1;
var activeTabIndex = 0;
var editedPart = 'section';

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
            // 'button[itemId=urlId]': {
            //     click: this.editLink
            // },
            'button[itemId=saveId]':{
                click: this.saveTextAsFile
            },
            'button[itemId=closeId]':{

                click: function(){
                    var filesViewPort = Ext.getCmp('fileGridPopup'+selectedProjectId).getComponent('filePanel'+selectedProjectId).getComponent(selectedProjectId);
                    var fileGrid = filesViewPort.getComponent('gridFiles');
                    var fileTabPanel = Ext.getCmp('fileGridPopup'+selectedProjectId).getComponent('filePanel'+selectedProjectId);
                    Ext.Msg.confirm('Confirmation', 'Are you sure you want to exit without Saving?', function(button) {
                        if (button === 'yes') {
                            // document.location.reload();
                            var state = "edit";
                            var fileName = file_name[activeTabIndex];
                            var version = file_version[activeTabIndex];
                            var filePath = file_filePath[activeTabIndex];
                            var fileId = file_fileid[activeTabIndex];
//                            $.post(serverLocation + 'StateChange?fileName=' + fileName + '&version=' + version + '&state=' + state + '&filePath=' + filePath).success(function(data) {
                            $.post(serverLocation + 'FileStateChange?fileId=' + fileId + '&state=' + state).success(function(data){
                                console.log('State Changed');
                                var store =  Ext.getStore('Files');
                                store.proxy.url = serverLocation + 'GetFileData?projectId=' + selectedProjectId;
                                store.reload();
                                fileGrid.getView().refresh();
                            });
                            file_name.splice(activeTabIndex,1);
                            file_version.splice(activeTabIndex,1);
                            file_filePath.splice(activeTabIndex,1);
                            contentId.splice(activeTabIndex,1);
                            var activeTab = fileTabPanel.getActiveTab();
                            activeTab.destroy();
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
                            if(Ext.getStore('tocStructure' + activeTabIndex).data.length>0){
                                refMainPage.unlockSection();
                            }
                        } else {
                            // do something when No was clicked.
                        }
                    });
                    
                }
            },
        });
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
                if(editedPart==='section'){
                    var str = $('#'+ contentId[activeTabIndex]).html();
                    str = str.replace(ele,content);
                    $('#'+ contentId[activeTabIndex]).html(str);
                    //unlock the section...do it same as you did for files
                    if(Ext.getStore('tocStructure' + activeTabIndex).data.length>0){
                        refMainPage.unlockSection();
                    }
                }
                else{
                    $(ele).replaceWith($(content)[0]);
                }
                Ext.ComponentQuery.query('#htmlData')[activeTabIndex].getActiveTab().close();
            } else {
                
              }
        });
    },


    saveTextAsFile: function()
    {
        var selectedProject = Ext.getCmp('documentGrid').getSelectionModel().getLastSelected();

        var state = "edit";
        var fileId = file_fileid[activeTabIndex];

        $.post(serverLocation + 'FileStateChange?fileId=' + fileId + '&state=' + state);

        var projectName = selectedProject.get('jobNo');
        if((projectName.search("/"))!= -1){
            projectName = projectName.replace("/","@");
        }
        var year = selectedProject.get('year');
        var formType = selectedProject.get('formType');
        if((formType.search("/"))!= -1){
            formType = formType.replace("/","@");
        }
        var projectId = selectedProject.get('id');
        var folderStructure = companyName + "/" + year + "/" + formType + "/" + projectName + "/";
        var fileTabPanel = Ext.getCmp('fileGridPopup'+selectedProjectId).getComponent('filePanel'+selectedProjectId);
        if(tinyMceEdited && edited){
            Ext.Msg.confirm('Confirmation', 'Are you sure you want to save the document?', function(button) {
            if (button === 'yes') {
                myMask2 = new Ext.LoadMask(Ext.getBody(), {msg:"Saving..."});
//                myMask2.show();
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
                }


                var fileName = file_name[activeTabIndex];
                var version = file_version[activeTabIndex];
//                var filePath = file_filePath[activeTabIndex];

               var oReq = new XMLHttpRequest();
                oReq.onload = reqListener;

                oReq.open("post", serverLocation + 'Update?targetpath=testFiles&fileName=' + fileName + '&version=' + version + '&filePath=' + folderStructure + '&projectId='+projectId, true);
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
                    var filesViewPort = Ext.getCmp('fileGridPopup'+selectedProjectId).getComponent('filePanel'+selectedProjectId).getComponent(selectedProjectId);
                    var fileGrid = filesViewPort.getComponent('gridFiles');
                            // document.location.reload();         //CHANGE IT 
                    var fileTabPanel = Ext.getCmp('fileGridPopup'+selectedProjectId).getComponent('filePanel'+selectedProjectId);
                    var state = "edit";
                    var fileName = file_name[activeTabIndex];
                    var version = file_version[activeTabIndex];
                    var filePath = file_filePath[activeTabIndex];
                    var fileId = file_fileid[activeTabIndex];
//                    $.post(serverLocation + 'StateChange?fileName=' + fileName + '&version=' + version + '&state=' + state + '&filePath=' + filePath).success(function(data) {
//                        $.post(serverLocation + 'FileStateChange?fileId=' + fileId + '&state=' + state).success(function(data){
                        console.log('State Changed');
                        var store =  Ext.getStore('Files');
                        store.proxy.url = serverLocation + 'GetFileData?projectId=' + selectedProjectId;
                        store.reload();
                        fileGrid.getView().refresh();
//                    });
                    file_name.splice(activeTabIndex,1);
                    file_version.splice(activeTabIndex,1);
                    file_filePath.splice(activeTabIndex,1);
                    contentId.splice(activeTabIndex,1);
                    fileTabPanel.getActiveTab().destroy();
//                    myMask2.hide();
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
                    fileTabPanel.getActiveTab().destroy();
                }
                else{
                    // do something when No was clicked.
                }
            });
        }

    },

  
    unlockSection: function(){
        var section = Ext.getStore('metaData').data.items[0].get('currSection');
        var projectId = Ext.getStore('metaData').data.items[0].data.currentProjectId;
        var userId = Ext.getStore('metaData').data.items[0].data.userId;
        var fileId = file_fileid[activeTabIndex];
        var sectionId = section.raw.secId;
        var state = "edit";
        $.get(serverLocation + 'SectionStateChange?projectId=' + projectId + '&fileId=' + fileId + '&sectionId=' + sectionId + '&userId=' + userId + '&state=' + state).success(function(data) {
            console.log(data);
            section.set('icon','packages/ext-theme-classic/build/resources/images/tree/leaf.gif');
        });
    },

 
});