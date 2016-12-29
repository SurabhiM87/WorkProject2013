/**
 * Created by surabhimendiratta on 12/12/13.
 */

var win =Ext.define('EDGAR.view.Products.FilesViewport', {
    extend: 'Ext.container.Container',
    requires:[
        'EDGAR.view.LiveSearchGridPanelModified',
        'EDGAR.view.Products.CustomerUsersGrid'

    ],

    xtype: 'filesViewport',
    alias : 'widget.filesViewport',
    layout: {
        type: 'vbox',
        align: 'stretch'  // Child items are stretched to full width
    },
    height: 620,
    width: 820,
//    title: 'Assign Project to Users',


    items: [


        {
            itemId: 'gridFiles',
//            region: 'center',
//            title: 'Users',
            xtype: 'gridFiles',
            split: true,
            scrollable: true,
            flex: 4.5

        },
//        {
//            itemId: 'gridCustomerUsers',
//            region: 'center',
//            title: 'Users',
//            xtype: 'gridCustomerUsers'
//        }

        {
//            region:'south',
            height: 80,
//            margin: "0,0,10,0",
            itemId: 'upload',
            html: ' <div id="dragload"><h1>Drag files here or use the button below to upload the files</h1></div>',
            flex: 1,
            listeners:
            {
                afterrender: function(){
                    Ext.create('Ext.ux.upload.Button', {
                        renderTo: 'dragload',
                        text: 'Select files',
                        scale:'small',
                        plugins: [{
                            ptype: 'ux.upload.window',
                            title: 'Upload',
                            width: 520
                        }
                        ],
                        uploader:
                        {
                            url: serverLocation + 'Upload?folderStructure=' + folderStructure,
                            //uploadpath: '/Root/files',
                            autoStart: false,
                            max_file_size: '2020mb',
                            drop_element: 'dragload',
                            statusQueuedText: 'Ready to upload',
                            statusUploadingText: 'Uploading ({0}%)',
                            statusFailedText: '<span style="color: red">Error</span>',
                            statusDoneText: '<span style="color: green">Complete</span>',
                            statusInvalidSizeText: 'File too large',
                            statusInvalidExtensionText: 'Invalid file type'
                        },
                        listeners:
                        {
                            filesadded: function(uploader, files)
                            {
                                var selectedProject = Ext.getCmp('documentGrid').getSelectionModel().getLastSelected();
                                var projectName = selectedProject.get('jobNo');
                                if((projectName.search("/"))!= -1){
                                    projectName = projectName.replace("/","@")
                                }
                                var year = selectedProject.get('year');
                                var formType = selectedProject.get('formType');

                                if((formType.search("/"))!= -1){
                                    formType = formType.replace("/","@")
                                }
                                if (companyName.search("&")!=-1){
                                    var company = companyName.replace("&","$")
                                }
                                var projectId = selectedProject.get('id');
                                var folderStructure = company + "/" + year + "/" + formType + "/" + projectName + "/";
                                uploader.setUrl(serverLocation + 'Upload?folderStructure=' + folderStructure+ '&projectId=' + projectId);
                                //console.log('filesadded');
                                return true;
                            },
                            beforeupload: function(uploader, file)
                            {
                                //console.log('beforeupload');
                            },
                            FileSystemed: function(uploader, file)
                            {
                                //console.log('FileSystemed');
                            },
                            uploadcomplete: function(uploader, success, failed)
                            {
                                Ext.getCmp('uploadPopup').close();

                               var store =  Ext.getStore('Files');
                                store.proxy.url = serverLocation + 'GetFileData?projectId=' + selectedProjectId;
                                store.reload();

                                var filesViewPort = Ext.getCmp('fileGridPopup'+selectedProjectId).getComponent('filePanel'+selectedProjectId).getComponent(selectedProjectId);
                                filesViewPort.getComponent('gridFiles').getView().refresh();

                            },
                            scope: this
                        }
                    });
                }
            }

            //}//i ended the border panel here
        }
    ]
});
