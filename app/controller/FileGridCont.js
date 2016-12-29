var refFileGrid;

Ext.define('EDGAR.controller.FileGridCont', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.data.TreeStore',
        'Ext.tree.Panel',
        'Ext.form.field.Hidden',
        'Ext.LoadMask'
    ],

    views: [
        'EDGAR.view.FileGrid',
        'MainPage'
    ],

    init: function() {

        refFileGrid = this;
        this.control({
            'button[itemId=urlId]': {
                click: this.editLink
            },
            'actioncolumn[itemId=edit]': {
                click: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                    if (record.data.state == "lock" && record.data.fileName.substring(0, 2) === "ex") {
                        Ext.Msg.alert('Access Denied', 'Another user is currently editing the file.');
                    } else {
                        var fileName = record.data.fileName;
                        var version = record.data.version;
                        var filePath = record.data.filePath;
                        var fileId = record.data.id;
                        refFileGrid.editLink(fileName, version, filePath, fileId);
                    }
                }
            },
            'actioncolumn[itemId=download]': {
                click: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                    refFileGrid.downloadFile(record);
                }
            }
        });
    },

    editLink: function(fileName, version, filePath, fileId) {
        var fileTabPanel = Ext.getCmp('fileGridPopup' + selectedProjectId).getComponent('filePanel' + selectedProjectId);

        compIndex = fileTabPanel.items.length - 1;
        Ext.getCmp('fileGridPopup' + selectedProjectId).mask("Loading...");
        Ext.getCmp('main_panel').getEl().mask("Loading...");
        //t0 = window.performance.now();
        var location = document.location.toString();
        file_name[compIndex] = fileName;
        file_version[compIndex] = version;
        file_filePath[compIndex] = filePath;
        file_fileid[compIndex] = fileId;
        console.log(activeTabIndex);
        console.log(file_name);
        var state = "lock";
        var linkAddress = serverLocation + "Download?fileName=" + fileName + '&version=' + version + '&filePath=' + filePath;
        $.post(serverLocation + 'FileStateChange?fileId=' + fileId + '&state=' + state);
        refFileGrid.getLink(linkAddress);
    },



    getLink: function(linkAddress) {
        var fileTabPanel = Ext.getCmp('fileGridPopup' + selectedProjectId).getComponent('filePanel' + selectedProjectId);
        //var linkAddress = Ext.getCmp("MyForm").getForm().findField("link").getValue();
        //console.log(linkAddress);  
        var location = document.location.toString();
        //console.log(linkAddress);
        // if((linkAddress == location + "SampleHTML/A_Christmas_Carol.htm") || (linkAddress == location + "SampleHTML/Peeps_At_Many_Lands.htm") || (linkAddress == location + "SampleHTML/Wuthering_Heights.htm")){
        $.get(linkAddress).success(function(data) {
            // console.log(data);
            // var view = Ext.widget('adduser');

            var bodyindex1 = data.match(/<body/i).index;
            var bodyindex2 = data.length;
            var body = data.substring(bodyindex1, bodyindex2);

            // Ext.getCmp('viewport').destroy();
            contentId[compIndex] = "content" + compIndex;
            var finalData = "<div id='content" + compIndex + "' style='margin-top:20px;width:100%;' class='editable" + compIndex + "'  height='100%'>";
            finalData += body;
            pageData[compIndex] = data;
            finalData += "</div>";
            finalData = refFileGrid.changePaths(finalData);
            var titleDoc = "";
            if (pageData[compIndex].match(/<title/i) !== null) {
                var index1 = pageData[compIndex].match(/<title/i).index;
                var index2 = pageData[compIndex].match(/<\/title>/i).index;
                titleDoc = pageData[compIndex].substring(index1 + 7, index2);
            }


            if (titleDoc.length > 20) {
                titleDoc = titleDoc.substring(0, 20) + '...';
            }

            // var win = new Ext.widget('mytab',{
            //     id: 'tab'+ compIndex,
            //     title: file_name
            // });
            // var newTab = Ext.getCmp('mainTab').add(win).show();

            var newTab = fileTabPanel.add({
                xtype: 'mytab',
                title: file_name[compIndex],
                iconCls: 'icons',
                icon: 'resources/icons/text_html.png',
            }).show();

            // console.log(data);
            console.log(fileTabPanel.getActiveTab());
            Ext.ComponentQuery.query('#htmlData')[compIndex].add({
                title: titleDoc,
                itemId: 'document',
                autoScroll: true,
                bodyStyle: 'padding:10px;',
                html: finalData,
                tbar: [

                    // xtype: 'toolbar',
                    // id: 'saveCancelToolbar',
                    // style: 'margin-top: 15px;margin-right: 10px; width: 735px; margin-left: -10px; position: fixed;',
                    // cls: 'toolbar',

                    {
                        xtype: 'tbfill'
                    }, {
                        text: 'Save',
                        itemId: 'saveId'
                    }, {
                        xtype: 'tbspacer',
                        width: 20
                    }, {
                        text: 'Close',
                        itemId: 'closeId'
                    }, {
                        xtype: 'tbspacer',
                        width: 20
                    }

                ]
            });
            Ext.getCmp('main_panel').getEl().unmask();
            Ext.getCmp('fileGridPopup' + selectedProjectId).unmask();
            // Basic mask:
            myMask = new Ext.LoadMask(Ext.ComponentQuery.query('#west-region-container')[compIndex], {
                msg: "Loading..."
            });
            myMask.show();
            myMask.setPosition(70, 60);
            refFileGrid.addToc();
            refFileGrid.getFormTemplate();
            refFileGrid.registerEvents();
            $('#content' + compIndex).click(function(ev) {
                refFileGrid.backLink(ev);
            });
        });
    },

    /************************************************* Tree structure for sections using JSON starts*****************************************************/

    getFormTemplate: function() {
        var type = Ext.getCmp('documentGrid').getView().getSelectionModel().getSelection()[0].data.formType;
        var myStore = Ext.create('Ext.data.Store', {
            id: 'tocStructure'+ activeTabIndex,
            fields: [
                'sectionId',
                'anchorTag',
                'sectionNum',
                'itemNum'
            ],
            proxy: {
                type: 'ajax',
                url: serverLocation + "FormTemplate?formType=" + type,
                reader: {
                    type: 'json',
                    root: 'users'
                }
            },
            autoLoad: true,
            listeners: {
                load: function() {
                    console.log(myStore);
                    refFileGrid.addDocStructure(myStore);
                }
            }
        });
        return myStore;
    },

    addDocStructure: function(store) {
        console.log(store);
        var JSONStart = ' { "root": { "text": "Document", "expanded": true , "children": [ ';
        var JSONEnd = ']}}';
        var ToCjsonHtml = JSONStart + this.jsonDocStructure(store) + JSONEnd;

        ToCjsonHtml = ToCjsonHtml.replace(/ "expanded": false, "children": \n\[\]},/g, '"leaf": true },');
        ToCjsonHtml = ToCjsonHtml.replace(/},]/g, '}]');
        console.log(ToCjsonHtml);
        var treeObj = JSON.parse(ToCjsonHtml);
        var treeObjStr = JSON.stringify(treeObj);
        // localStorage.Tree = treeObjStr;
        refFileGrid.createTreeMain(treeObjStr);
        if(store.data.length>0){
            refFileGrid.applyLocks();
        }        
        Ext.ComponentQuery.query('#west-region')[compIndex].setActiveTab(1);
        Ext.ComponentQuery.query('#west-region')[compIndex].setActiveTab(0);
    },
    // jsonDocStructure: function(){
    //     var str="";
    //     var anchorTags = $('a[name]');
    //     if(anchorTags.length>0){
    //         $('a[name]').each(function(){
    //             var name = this.name;
    //             console.log(name);
    //             str += '\n{ "text": "' + name + '",';
    //             str += '"leaf": true },';
    //         });
    //     }
    //     return str;
    // },

    jsonDocStructure: function(store) {
        var str = "";
        var anchorTags = store.data.items;
        var docAnchorTags = $('#content'+ [activeTabIndex]).find('a[name]');
        for (i = 0; i < anchorTags.length; i++) {
            var name = anchorTags[i].data.anchorTag;
            for (j = 0; j < docAnchorTags.length; j++) {
                var docAnchorName = docAnchorTags[j].name;
                if (docAnchorName === name) {
                    console.log(name);

                    if (anchorTags[i].data.sectionNum.length > 0) {
                        str += '\n{ "text": "' + anchorTags[i].data.sectionNum + ': ' + anchorTags[i].data.itemNum + '", "aTag": "' + anchorTags[i].data.anchorTag + '", "secId": "' + anchorTags[i].data.sectionId + '", ';
                    } else {
                        str += '\n{ "text": "' + anchorTags[i].data.itemNum + '", "aTag": "' + anchorTags[i].data.anchorTag + '", "secId": "' + anchorTags[i].data.sectionId + '",';
                    }
                    str += '"leaf": true },';
                }
            }
        }
        console.log(str);
        return str;
    },

    /************************************************* Tree structure for sections using JSON ends*****************************************************/
    /************************************************* Build Tree with Sections starts *****************************************************/

    createTreeMain: function(data) {
        var contextEl;
        var currSection;
        // var data = localStorage.Tree;
        //data = JSON.parse(data);
        data = JSON.parse(data);
        //console.log(data);
        var settingsTreeStore = Ext.create('Ext.data.TreeStore', data);
        Ext.ComponentQuery.query('#west-region-container')[compIndex].add({
            xtype: 'treepanel',
            itemId: 'DOMTreePanelMain',
            border: 0,
            renderTo: Ext.getBody(),
            store: settingsTreeStore,
            listeners: {
                itemclick: function(node, rec) {
                    //console.log(rec, rec.data.depth, rec.data.index);
                    // var ele = refFileGrid.goToElement(rec);
                    var ele = refFileGrid.goToDocEle(rec);
                    if (ele !== null) {
                        ele.scrollIntoView();
                    }
                },
                beforerender: function(node, rec) {
                    console.log(rec);
                }
            },
        });

        //t1 = window.performance.now();
        //console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
        myMask.hide();

        /* Right Click menu on the Tree */
        Ext.ComponentQuery.query('#DOMTreePanelMain')[compIndex].on('itemcontextmenu', function(view, record, item, index, event) {
            // menu1.showAt(event.getXY());
            if(!record.isRoot()){
                currSection = record;
                event.stopEvent();
                var offset = $('body').offset();
                var xpos = event.getX() - offset.left;
                var ypos = event.getY() - offset.top;
                contextMenu1.showAt(xpos, ypos);
            }
        }, this);

        var contextMenu1 = new Ext.menu.Menu({
            items: [{
                text: 'Edit',
                handler: function() {
                    if (Ext.ComponentQuery.query('#htmlData')[activeTabIndex].items.length >= 2) {
                        alert("Only one part of the page can be edited at a time!" +
                            "Please close or save the editable part and then try again");
                    } else {
                        var ele = refFileGrid.goToDocEle(currSection);
                        var section = refFileGrid.getSection(ele);
                        editedPart = 'section';
                        refFileGrid.popTinymce(section);
                        refFileGrid.lockSection();
                    }
                }
            }]
        });

        /* Right Click menu on the Page */
        Ext.ComponentQuery.query('#htmlData')[activeTabIndex].getEl().on('contextmenu', function(ev) {
            ev.preventDefault();
            contextEl = ev.target;
            refFileGrid.backLink(ev);
            var offset = $('body').offset();
            var xpos = ev.getX() - offset.left;
            var ypos = ev.getY() - offset.top;
            contextMenu2.showAt(xpos, ypos);
        }, this);

        var contextMenu2 = new Ext.menu.Menu({
            items: [{
                text: 'Edit',
                handler: function(ev) {
                    //console.log(contextEl);
                    if (contextEl.id != contentId[activeTabIndex]) {
                        if (Ext.ComponentQuery.query('#htmlData')[activeTabIndex].items.length >= 2) {
                            alert("Only one part of the page can be edited at a time!" +
                                "Please close or save the editable part and then try again");
                        } else {
                            var treeTabId = Ext.ComponentQuery.query('#west-region')[activeTabIndex].getActiveTab().itemId;
                            if (treeTabId === "west-region-container_QES") {
                                while (contextEl.parentElement.id === "") {
                                    contextEl = contextEl.parentElement;
                                }
                                $('#' + contentId[activeTabIndex]).click();
                                //console.log(contextEl);
                                refFileGrid.popTinymce(contextEl);
                                editedPart = 'divs';
                            } else {
                                if(Ext.getStore('tocStructure' + activeTabIndex).data.length>0){
                                    var element = contextEl;
                                    // var nodes = Ext.ComponentQuery.query('#DOMTreePanelMain')[activeTabIndex].getRootNode().childNodes;
                                    while (element.parentElement.id != contentId[activeTabIndex]) {
                                        element = element.parentElement;
                                    }
                                    var startBookmark = $(element).prevAll().find('a').last()[0];
                                    var endBookmark = $(element).nextAll().find('a').first()[0];
                                    var string = $('#' + contentId[activeTabIndex]).html();
                                    var index1 = string.indexOf(startBookmark.outerHTML);
                                    var index2 = string.indexOf(endBookmark.outerHTML);
                                    var section = string.substring(index1, index2);
                                }
                                else{
                                    var section = $('#' + contentId[activeTabIndex]).html();
                                }
                                refFileGrid.popTinymce(section);
                                refFileGrid.lockSection();
                                editedPart = 'section';                                
                                tinymce.execCommand('mceSpellCheck', true);
                            }
                        }
                    }
                }
            }]
        });
    },

    /************************************************* Build Tree with Sections ends *****************************************************/

    /************************************************* Tree structure for HTML using JSON starts *****************************************************/
    addToc: function() {
        var JSONStart = ' { "root": { "text": "Document", "expanded": true , "children": [ ';
        var JSONEnd = ']}}';
        // var JSONStart = ' { "expanded": true , "children": [ ';
        // var JSONEnd = ']}';
        var ToCjsonHtml = JSONStart + this.jsonHtmlTree() + JSONEnd;
        ToCjsonHtml = ToCjsonHtml.replace(/ "expanded": false, "children": \n\[\]},/g, '"leaf": true },');
        // ToCjsonHtml = ToCjsonHtml.replace(/ "expanded": false, "children": \n\[\]},/g, '"leaf": true, "checked": false },');
        //console.log(ToCjsonHtml);
        ToCjsonHtml = ToCjsonHtml.replace(/},]/g, '}]');
        //console.log(ToCjsonHtml);

        var treeObj = JSON.parse(ToCjsonHtml);
        var treeObjStr = JSON.stringify(treeObj);
        // localStorage.Tree = treeObjStr;
        refFileGrid.createTreeQES(treeObjStr);
    },


    jsonHtmlTree: function(obj) {
        var obj = obj || document.getElementById('content' + compIndex);
        //console.log(obj);
        jQuery.fn.justtext = function() {
            return $(this).clone()
                .children()
                .remove()
                .end()
                .text();
        };

        var reqText = $(obj).justtext();
        reqText = reqText.replace(/\n/g, '').replace(/"/g, '').replace(/\\/g, ''); //Remove double quotes and empty lines
        //console.log(reqText);
        if (obj.textContent.length > 20) {
            reqText = reqText.replace(/\t/g, '').substring(0, 27);
            var str = '\n{ "text": "' + obj.tagName + ': ' + reqText + '...' + '",';
        } else
            var str = '\n{ "text": "' + obj.tagName + ' ( No Text)' + '",';
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
            if (parent.nodeType == 1) {
                str += ']},';
            }
        } else {
            // str += '"leaf": true, "checked": false},' 
            str += '"leaf": true },';
        }
        return str;
    },

    /************************************************* Tree structure for HTML using JSON ends*****************************************************/
    /************************************************* Build Html Tree starts *****************************************************/
    createTreeQES: function(data) {
        var contextEl;
        var currSection;
        // var data = localStorage.Tree;
        //data = JSON.parse(data);
        data = JSON.parse(data);
        //console.log(data);
        var settingsTreeStore = Ext.create('Ext.data.TreeStore', data);
        Ext.ComponentQuery.query('#west-region-container_QES')[compIndex].add({
            xtype: 'treepanel',
            itemId: 'DOMTreePanelQES',
            border: 0,
            renderTo: Ext.getBody(),
            store: settingsTreeStore,
            listeners: {
                itemclick: function(node, rec) {
                    //console.log(rec, rec.data.depth, rec.data.index);
                    var ele = refFileGrid.goToElement(rec);
                    ele.scrollIntoView();
                },
            },
        });

        //t1 = window.performance.now();
        //console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
        myMask.hide();

        /* Right Click menu on the Tree */
        Ext.ComponentQuery.query('#DOMTreePanelQES')[compIndex].on('itemcontextmenu', function(view, record, item, index, event) {
            // menu1.showAt(event.getXY());
            currSection = record;
            event.stopEvent();
            var offset = $('body').offset();
            var xpos = event.getX() - offset.left;
            var ypos = event.getY() - offset.top;
            contextMenu1.showAt(xpos, ypos);
        }, this);

        var contextMenu1 = new Ext.menu.Menu({
            items: [{
                text: 'Edit',
                handler: function() {
                    if (Ext.ComponentQuery.query('#htmlData')[activeTabIndex].items.length >= 2) {
                        alert("Only one part of the page can be edited at a time!" +
                            "Please close or save the editable part and then try again");
                    } else {
                        var ele = refFileGrid.goToElement(currSection);
                        refFileGrid.popTinymce(ele);
                        editedPart = 'divs';
                    }
                }
            }, {
                text: 'Add node before this node',
                handler: function() {
                    var ele = refFileGrid.goToElement(currSection);
                    refFileGrid.addNewNode(ele, 'before');
                }
            }, {
                text: 'Add node after this node',
                handler: function() {
                    var ele = refFileGrid.goToElement(currSection);
                    refFileGrid.addNewNode(ele, 'after');
                }
            }]
        });

        // /* Right Click menu on the Page */
        //     Ext.ComponentQuery.query('#htmlData')[activeTabIndex].getEl().on('contextmenu', function(ev) {
        //         ev.preventDefault();
        //         contextEl = ev.target;
        //         var offset = $('body').offset();
        //         var xpos = ev.getX() - offset.left;
        //         var ypos = ev.getY() - offset.top;
        //         contextMenu2.showAt(xpos, ypos);
        //     },this);

        //     var contextMenu2 = new Ext.menu.Menu({
        //         items: [
        //         {   text: 'Edit',
        //             handler: function(){
        //                 //console.log(contextEl);
        //                 if(contextEl.id!=contentId[activeTabIndex] ){
        //                     if(Ext.ComponentQuery.query('#htmlData')[activeTabIndex].items.length>=2){
        //                         alert("Only one part of the page can be edited at a time!"+
        //                         "Please close or save the editable part and then try again");
        //                     }
        //                     else{
        //                         while(contextEl.parentElement.id === ""){
        //                             contextEl = contextEl.parentElement;
        //                         }
        //                         $('#'+ contentId[activeTabIndex]).click();
        //                         //console.log(contextEl);
        //                         refFileGrid.popTinymce(contextEl);
        //                     }
        //                 }
        //             }
        //         }]
        //     });
    },

    /************************************************* Build Html tree ends *****************************************************/

    // change image paths
    changePaths: function(finalData) {
        var htmlObj = $.parseHTML( finalData );
        var filename;
        var imgTags = $(htmlObj).find('img');
        for (i = 0; i < imgTags.length; i++) {
            if (imgTags[i].src.lastIndexOf("/") != -1) {
                var fileNameIndex = imgTags[i].src.lastIndexOf("/") + 1;
                filename = imgTags[i].src.substr(fileNameIndex);
            } else {
                filename = imgTags[i].src;
            }
            savedPaths[compIndex, i] = filename;
            var fileName = file_name[activeTabIndex];
            var version = file_version[activeTabIndex];
            var filePath = file_filePath[activeTabIndex];
            var newFilePath = filePath.substring(0, filePath.lastIndexOf("/")) + '/' + filename;
            imgTags[i].src = serverLocation + "Download?fileName=" + filename + '&version=' + version + '&filePath=' + newFilePath;
        }
        finalData = htmlObj[0].outerHTML;
        return finalData;
    },

    backLink: function(ev) {
        var treeTabId = Ext.ComponentQuery.query('#west-region')[activeTabIndex].getActiveTab().itemId;
        // 
        var element = ev.target;
        var treeElement;
        if (treeTabId === "west-region-container_QES") {
            var depth = 0;
            var index = [];
            var i = 0;
            while (element.id === "" || element.id != contentId[activeTabIndex]) {
                depth++;
                i++;
                index[i] = $(element).index();
                element = element.parentElement;
            }
            //console.log(index);
            treeElement = Ext.ComponentQuery.query('#DOMTreePanelQES')[activeTabIndex].getRootNode().firstChild;
            var length = index.length;
            while (length > 1) {
                if (treeElement.isVisible()) {
                    treeElement.expand();
                }
                treeElement = treeElement.childNodes[index[length - 1]];
                length--;
            }
            //console.log(treeElement);
            Ext.ComponentQuery.query('#DOMTreePanelQES')[activeTabIndex].getSelectionModel().select(treeElement);
            treeEle = treeElement;
        } else {
            var updated = false;
            var nodes = Ext.ComponentQuery.query('#DOMTreePanelMain')[activeTabIndex].getRootNode().childNodes;
            while(!updated){
                while ($(element).parent()[0].id != contentId[activeTabIndex]) {
                    element = $(element).parent()[0];
                }
                treeElement = $(element).prevAll().find('a').last();
                $(nodes).each(function() {
                    if (($(this)[0].raw.aTag === treeElement[0].name)) {
                        treeElement = $(this);
                        updated = true;
                    }
                });
                element = treeElement;
            }
            Ext.ComponentQuery.query('#DOMTreePanelMain')[activeTabIndex].getSelectionModel().select(treeElement);
            treeEle = treeElement;
        }

    },


    goToDocEle: function(rec) {
        var atags = $('a[name]');
        for (i = 0; i < atags.length; i++) {
            if (atags[i].name === rec.raw.aTag) {
                var ele = atags[i];
                return ele;
            }
        }
        return null;
    },

    getSection: function(element) {
        while (element.parentElement.id != contentId[activeTabIndex]) {
            element = element.parentElement;
        }
        var nextEle = $(element).nextAll().find('a').first()[0];
        while (nextEle.parentElement.id != contentId[activeTabIndex]) {
            nextEle = nextEle.parentElement;
        }
        var string = $('#' + contentId[activeTabIndex]).html();
        var index1 = string.indexOf(element.outerHTML);
        var index2 = string.indexOf(nextEle.outerHTML);
        var section = string.substring(index1, index2);
        return section;
    },

    goToElement: function(rec) {
        var depth = rec.data.depth;
        var index = [];
        var depthArr = [];
        var i = depth - 2;
        var element = rec;
        while (i != -1) {
            depthArr[i] = element.data.depth;
            index[i] = element.data.index;
            i--;
            element = element.parentNode;
        }
        //console.log("Index: " + index);
        //console.log("Depth: " + depthArr);
        var indexNum = 0;
        element = $('#' + contentId[activeTabIndex]);
        while (indexNum != (depth - 1)) {
            element = $(element).children()[index[indexNum]];
            indexNum++;
        }
        // console.log("FOUND ELEMENT:" + element.tagName);
        return element;
    },

    registerEvents: function() {
        var hyperLinks = $('a[href*="#"]');
        for (var i = 0; i < hyperLinks.length; i++) {
            var temp = $(hyperLinks)[i];
            temp.onclick = function(ev) {
                ev.preventDefault();
                var hashtag = this.hash.replace("#", "");
                var linkTo = $('a[name*="' + hashtag.toLowerCase() + '"]')[0] || $('a[name*="' + hashtag.toUpperCase() + '"]')[0];
                if (linkTo !== undefined) {
                    $(linkTo)[0].scrollIntoView();
                } else {
                    alert("No link available");
                }
            };
        }
    },


    addNewNode: function(ele, when) {
        //var ele = domEle[activeTabIndex];
        var tree = Ext.ComponentQuery.query('#DOMTreePanelQES')[activeTabIndex];
        var selModel = tree.getSelectionModel();
        var node = selModel.getLastSelected();
        var parentNode = node.parentNode;
        var newNode = {
            leaf: true,
            text: 'P: New Node'
        };
        if (when === 'before') {
            $(ele).before('<p>New Node</p>');
            var insertIndex = node.data.index;
        } else {
            $(ele).after('<p>New Node</p>');
            var insertIndex = node.data.index + 1;
        }
        parentNode.insertChild(insertIndex, newNode);
    },

    lockSection: function() {
        var section = Ext.ComponentQuery.query('#DOMTreePanelMain')[activeTabIndex].getSelectionModel().selected.items[0];
        console.log('Section has state: asdsad');
        var projectId = Ext.getStore('metaData').data.items[0].data.currentProjectId;
        var userId = Ext.getStore('metaData').data.items[0].data.userId;
        var fileId = file_fileid[activeTabIndex];
        var sectionId = section.raw.secId;
        var state = "lock";
        $.get(serverLocation + 'SectionStateChange?projectId=' + projectId + '&fileId=' + fileId + '&sectionId=' + sectionId + '&userId=' + userId + '&state=' + state).success(function(data) {
            console.log(data);
            section.set('icon', 'resources/icons/sectionLock.png');
        });
        Ext.getStore('metaData').data.items[0].set('currSection', currSection);
    },

    applyLocks: function() {
        var treeNodes = Ext.ComponentQuery.query('#DOMTreePanelMain')[compIndex].getView().node.childNodes;
        var sectionStartId = treeNodes[0].raw.secId;
        var sectionEndId = treeNodes[treeNodes.length - 1].raw.secId;
        var projectId = Ext.getStore('metaData').data.items[0].data.currentProjectId;
        var fileId = file_fileid[activeTabIndex];
        $.get(serverLocation + 'GetSectionData?projectId=' + projectId + '&fileId=' + fileId + '&sectionStartId=' + sectionStartId + '&sectionEndId=' + sectionEndId).success(function(data) {
            console.log(data);
            //console.log("Status: " + data);
            var sectionLockList = JSON.parse(data);
            for (i = 0; i < sectionLockList.length; i++) {
                var sectionId = sectionLockList[i].sectionId;
                for (j = 0; j < treeNodes.length; j++) {
                    var secId = treeNodes[j].raw.secId;
                    if (parseInt(secId, 10) === sectionId) {
                        treeNodes[j].set('icon', 'resources/icons/sectionLock.png');
                    }
                }
            }
        });
    },

    /************************************************* TinyMCE code starts *****************************************************/

    popTinymce: function(ele) {
        var headContent = "";
        if (pageData[activeTabIndex].match(/<style/i) !== null) {
            var index1 = pageData[activeTabIndex].match(/<style/i).index;
            var index2 = pageData[activeTabIndex].match(/<\/style>/i).index;
            headContent = pageData[activeTabIndex].substring(index1, index2 + 7);
        }

        var htmlOfEl = "<div id='contentEdit" + activeTabIndex + "' name = 'ele' class='editable' width='100%' height='100%'> ";

        var treeTabId = Ext.ComponentQuery.query('#west-region')[activeTabIndex].getActiveTab().itemId;
        if (treeTabId === "west-region-container_QES") {
            domEle[activeTabIndex] = ele;
            // console.log(document.getElementById(contentId[activeTabIndex]));
            htmlOfEl += ele.outerHTML;
        } else {
            domEle[activeTabIndex] = ele;
            // console.log(document.getElementById(contentId[activeTabIndex]));
            htmlOfEl += ele;
        }
        htmlOfEl += headContent + "</div>";
        var tab = Ext.ComponentQuery.query('#htmlData')[activeTabIndex].add({
            itemId: 'editTab',
            title: 'Edit',
            autoScroll: false,
            html: htmlOfEl,
            tbar: [

                {
                    xtype: 'tbfill'
                }, {
                    text: 'Save',
                    itemId: 'saveDiv'
                }, {
                    xtype: 'tbspacer',
                    width: 20
                }, {
                    text: 'Save and Close',
                    itemId: 'saveandCloseDiv'
                }, {
                    xtype: 'tbspacer',
                    width: 20
                }, {
                    text: 'Cancel',
                    itemId: 'cancelDiv'
                }, {
                    xtype: 'tbspacer',
                    width: 20
                }

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
            height: Ext.ComponentQuery.query('#htmlData')[0].getHeight() - 71,
            width: '100%',
            selector: "#contentEdit" + activeTabIndex,
            theme: "advanced",
            plugins: "autolink,lists,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
            statusbar: false,
            // Theme options
            theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,search,replace,|,bullist,numlist,|,formatselect,fontselect,fontsizeselect",
            theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,undo,redo,|,outdent,indent,blockquote,|,link,unlink|,insertdate,inserttime,preview,|,forecolor,backcolor,|,removeformat,|,sub,sup,|,iespell,|,print,|,fullscreen,|,mybutton,|,spellchecker",
            theme_advanced_buttons3: "tablecontrols,|,charmap",
            theme_advanced_toolbar_location: "top",
            theme_advanced_toolbar_align: "left",
            theme_advanced_statusbar_location: "none",
            theme_advanced_resizing: true,
            valid_children: "+body[style]",
            convert_fonts_to_spans: false,
            forced_root_block: false,
            force_br_newlines: true,
            force_p_newlines: false,
            // Skin options
            skin: "o2k7",
            init_instance_callback: function() {
                tinyMCE.activeEditor.controlManager.setActive('spellchecker', true);
                tinymce.execCommand('mceSpellCheck', true);
            },
            // skin_variant : "silver",
            // save_enablewhendirty: true,
            onchange_callback: function() {
                tinyMceEdited = true;
            },
            setup: function(ed) {
                ed.addButton('mybutton', {
                    title: 'Page Break',
                    image: 'resources/icons/pageBreak.gif',
                    onclick: function() {
                        // Add you own code to execute something on click
                        ed.focus();
                        ed.selection.setContent('<!-- Field: Page; Sequence: 1 --><div style="margin-top: 12pt; margin-bottom: 6pt; border-bottom:Black 2px solid"><table cellpadding="0" cellspacing="0" style="width: 100%; font: 10pt Times New Roman, Times, Serif"><tbody><tr><td style="text-align: center; width: 100%">1</td></tr></tbody></table></div><div style="page-break-before: always; margin-top: 6pt; margin-bottom: 12pt"><table cellpadding="0" cellspacing="0" style="width: 100%; font: 10pt Times New Roman, Times, Serif"><tbody><tr><td style="text-align: center; width: 100%">&nbsp;</td></tr></tbody></table></div><!-- Field: /Page -->');
                    }
                });
                tinymce.execCommand('mceSpellCheck', true);
                ed.onKeyDown.add(function(ed, evt) {
                    //console.debug('Key up event: ' + evt.keyCode);
                    if (evt.keyCode == 9) { // tab pressed
                        //console.log("I pressed TAB");
                        ed.execCommand('mceInsertContent', false, '&emsp;&emsp;'); // inserts tab
                        evt.preventDefault();
                    }
                });
            }
        });
    },

    /************************************************* TinyMCE code ends *****************************************************/
    /************************************************* Download File starts *****************************************************/

    downloadFile: function(rec) {
        console.log(rec);
        var fileNamewithoutext = rec.data.fileName;
        var extension = rec.data.extension;
        var fileName = fileNamewithoutext + "." + extension;
        var version = rec.data.version;
        var filePath = rec.data.filePath;
        var fileId = rec.data.id;

        var state = "edit";
        console.log(filePath);
        file_name[activeTabIndex] = fileName;
        file_version[activeTabIndex] = version;
        file_fileid[activeTabIndex] = fileId;
        $.get(serverLocation + 'Download?fileName=' + fileNamewithoutext + '&version=' + version + '&state=' + state + '&filePath=' + filePath).success(function(data) {
            // console.log(data);
            window.location = serverLocation + 'Download?fileName=' + fileNamewithoutext + '&version=' + version + '&filePath=' + filePath;
        });
    }

    /************************************************* Download File ends *****************************************************/



});