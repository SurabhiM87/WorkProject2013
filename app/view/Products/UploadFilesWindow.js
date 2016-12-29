/**
 * Created by surabhimendiratta on 12/11/13.
 */

Ext.define('EDGAR.view.products.UploadFilesWindow', {
    extend: 'Ext.window.Window',
    requires:[
        'Ext.ux.upload.Button',
        'Ext.ux.upload.plugin.Window'
    ],

    id: 'uploadFilesWindowPopup',
    xtype: 'uploadFilesWindowPopup',
    renderTo: Ext.getBody(),
    width: 700,
    height:270,
    title: Ext.getCmp('tbxJobName').value,

    bodyPadding: 10,
    constrain: true,
    modal:true,
//    minWidth:1000,
    minHeight:270,
//    maxWidth:1000,
    maxHeight:270,
    color: '#fff',
    closeAction :'close',

    items:[{
        xtype: 'panel',
        height: 100,
        html: ' <div id="dragload2"><h1>Drag files here or use the button below to upload the files</h1></div>',

        listeners:
        {
            afterrender: function(){
                Ext.create('Ext.ux.upload.Button', {
                    renderTo: 'dragload2',
                    margin: '30,5,5,5',
                    text: 'Select files',
                    scale:'small',
                    plugins: [{
                        ptype: 'ux.upload.window',
//                        title: Ext.getCmp('tbxJobName').value,
                        width: 520,
                        margin:'100,100,100,100',
                    }
                    ],
                    uploader:
                    {
                        url: serverLocation + 'Upload?folderStructure=' + folderStructure,
                        //uploadpath: '/Root/files',
                        autoStart: false,
                        max_file_size: '2020mb',
                        drop_element: 'dragload2',
                        statusQueuedText: 'Ready to upload',
                        statusUploadingText: 'Uploading ({0}%)',
                        statusFailedText: '<span style="color: red">Error</span>',
                        statusDoneText: '<span style="color: green">Complete</span>',
                        statusInvalidSizeText: 'File too large',
                        statusInvalidExtensionText: 'Invalid file type',

                    },
                    listeners:
                    {
                        filesadded: function(uploader, files)
                        {
                            console.log('filesadded');
                            return true;
                        },
                        beforeupload: function(uploader, file)
                        {
                            console.log('beforeupload');
                        },
                        FileSystemed: function(uploader, file)
                        {
                            console.log('FileSystemed');
                        },
                        FileUploaded: function(uploader, file, status)
                        {
                            console.log('fileuploaded');
                        },
//                        uploadcomplete: function(uploader, success, failed, response)
//                        {
//
//
//                            Ext.getStore('Files').reload();
//                            Ext.getCmp('gridFiles').getView().refresh();
//
//                            //Add project
//                            $.ajax({
//                                type: "POST",
//                                url: serverLocation + 'CreateNewProject',
//                                data: {
//
//                                    jobName: Ext.getCmp('tbxJobName').value,
//                                    year:Ext.getCmp('tbxYear').value,
//                                    formType: Ext.getCmp('tbxFormType').value,
//                                    deadlineDate: Ext.getCmp('tbxDeadlineDate').value,
//                                    filingDescription: Ext.getCmp('tbxFilingDescription').value,
//                                    company: selectedCustomerId,
//                                    createdBy: loggedInUserId
//                                }
//                            }).done(function(msg){
//
//                                    var newProjectId = msg;
//
//                                    Ext.getStore('Document').reload();
//
////                                    Ext.getCmp('documentGrid').getView().refresh();
//
//
//
//                                    var storeCount = Ext.getStore('AssignUserRightGridStore').getCount();
//
//                                    for(var i=0; i<storeCount; i++){
//
//                                        $.ajax({
//                                            type: "POST",
//                                            url: serverLocation + 'AddUsertoProject',
//                                            data: {
//
//                                                userId: Ext.getStore('AssignUserRightGridStore').getAt(i).data.id,
//                                                projectId: newProjectId
//
//                                            }
//                                        })
////                                        $.ajax({
////                                            type: "POST",
////                                            url: serverLocation + 'AddFiletoProject',
////                                            data: {
////
////                                                fileId: fileId,
////                                                projectId: newProjectId
////
////                                            }
////                                        }).done(
////                                                Ext.Msg.alert('Success!', 'New project added successfully!')
////                                            )
//                                    }
//                                })
//
//
////                            Add Users to the project
//
//
//                            Ext.getStore('Document').reload();
//                            Ext.getCmp('uploadPopup').close();
//                            Ext.getCmp('uploadFilesWindowPopup').close();
//                            Ext.getCmp('assignProjectPopup'+selectedCustomerId).close();
//
//
//                        },
                        scope: this
                    }
                });
            }
        }
    }],


    buttons: [

        {
            text: 'Back',
            itemId: 'uploadBackBtn',
            margin: '5 5 5 5'
        },
        {
            text: 'Finish',
            itemId: 'uploadFinishBtn',
            margin: '5 5 5 5'

        }

    ]


})
