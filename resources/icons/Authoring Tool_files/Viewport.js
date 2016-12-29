var serverLocation = "http://192.168.1.28:8080/EDGARFileSystem/";

initSessionMonitor();

window.ondragenter = function(e)
{
    e.dataTransfer.dropEffect = 'none';
    e.preventDefault();
    return false;
};

window.ondragover = function(e)
{
    e.preventDefault();
    return false;
};

window.ondrop = function(e)
{
    return false;
};

window.ondragleave = function(e)
{
    return false;
};

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux': 'ext/src/ux',
        'Ext.ux.upload': 'ext/src/ux/upload'
    }
});


Ext.onReady(function () {
    var BROWSER_AGENT = navigator.userAgent.toLowerCase();
    if (BROWSER_AGENT.indexOf("msie") != -1) {
        Ext.Msg.alert('Status', 'This Browser does not support our application. \nPlease use one of the following browsers:\n 1. Chrome \n 2. Safari \n 3. Mozilla Firefox \n 4. Internet Explorer 10');
    } else {
        //Ext.Msg.alert('Status', 'This Browser does not support our application. \nPlease use one of the following browsers:\n 1. Chrome \n 2. Safari \n 3. Mozilla Firefox \n 4. Internet Explorer 10');
    }
});

$(document).ready(function(){

});


// var clock = Ext.create('Ext.toolbar.TextItem', {text: Ext.Date.format(new Date(), 'g:i:s A')});

Ext.require(['Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.state.*',
        'Ext.ux.upload.Button',
        'Ext.ux.upload.plugin.Window',
        'Ext.Action'
        ]);

Ext.define('EDGAR.view.Viewport', {
    extend: 'Ext.container.Viewport',
    id: 'viewport',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'Ext.form.field.File',
        'Ext.form.Panel',
        'Ext.toolbar.Spacer',
        'EDGAR.view.FileGrid',
        'Ext.layout.container.Border',
        'EDGAR.view.Products.UserGrid',
        'EDGAR.view.Products.UserGridButtons',
        'EDGAR.view.Products.UserInformation'
    ],

    //style: 'background: #fff;margin-left: 20%; margin-right:20%;border:2px solid #99bce8;',
    items: 
    [
        {
            xtype: 'panel',
            width: 950,
             //height: 800,
            autoHeight: true,
            style: 'background: #fff; margin-left: -485px; left: 50%; position: fixed; margin-right: auto; border:2px solid #99bce8;',
            items:[
            {
                xtype: 'panel',
                width: '100%',
                height: 60,
                baseCls: 'formPanel',
                html: '<h1 class="formHTML"> Quantilus Authoring Tool - Demo</h1>',
                // html: '<h1 class="formHTML"> EDGAR HTML Editor </h1>',
            },
            {
                        xtype: 'tbspacer',
                        height: 10
            },
            {
                xtype: 'tabpanel',
                activeTab: 0,
                height: 900,
                id: 'mainTab',
                 // listeners
                items:[
                {
                    overflowY: 'scroll',
                    // height: 800,
                    title: 'Home',
                    iconCls: 'icons',
                    icon: 'resources/icons/home.png',

                    items:[
                    {
                        xtype: 'panel',
                        width: '100%',
                        id: 'text',
                        baseCls: 'text',
                        height: 900,
                        style: 'margin: 0 auto;',
                        border: 0,
                        // baseCls: 'formPanel',

                        //html: '<p class="formData"> EDGAR HTML Editor is an online editing tool for HTML files. It is a highly optimized wysiwg editor which gives the ability to edit the html as easily and effortlessly as any other offline text editor.</p>',
                        items:[
                       {
                           xtype: 'panel',
                           id: 'Files',
                           width: '100%',
                           baseCls: 'grid',
                           items:[
                               {
                                   xtype:'gridFiles'
                               }]
                        },
                        {
                                xtype: 'panel',
                                id: 'upload',
                                frame: false,
                                border: false,
                                baseCls: 'grid',
                                html: ' <div id="dragload"><h1>Drag files here, or use the button below</h1></div>',
                                style: 'margin-top:30px;margin-left: 30px; margin-right: 30px; text-align: center; ',
                                items: [{
                                    border:0,
                                    html:'<h2 class="upload">Upload Files:</h2>',

                                }],
                                listeners:
                                {
                                    afterrender: function(){
                                    Ext.create('Ext.ux.upload.Button', {
                                        renderTo: 'dragload',
                                        text: 'Select files',

                                        //singleFile: true,
                                        plugins: [{
                                                      ptype: 'ux.upload.window',
                                                      title: 'Upload',
                                                      width: 520,
                                                      height: 350
                                                  }
                                        ],
                                        uploader:
                                        {
                                            url: serverLocation + 'Upload?targetpath=testFiles',
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
                                                var store =  Ext.getStore('Files');
                                                store.proxy.url = serverLocation + 'GetFileData?projectId=' + selectedProjectId;
                                                store.reload();

                                             },
                                            scope: this
                                        }
                                    });
                                    }
                                }

                            }
                        ]

                    }

                    ]
                },
                {
                    overflowY: 'scroll',
                    title: 'Admin',
                    iconCls: 'icons',
                    icon: 'resources/icons/administrator.png',
                    items:[
                    {
                        xtype: 'panel',
                        width: '100%',
                        id: 'tabPanel',
                        baseCls: 'tabPanel',
                        height: 750,
                        style: 'margin: 0 auto;',
                        border: 0,
                        items:[
                        {
                            xtype: 'tabpanel',
                            //title: 'Admin',
                            activeTab: 0,
                            width: '100%',
                            id: 'adminTab',

                            items:[
                                {
                                    overflowY: 'scroll',
                                    title: 'Customer',
                                    iconCls: 'icons',
                                    icon: 'resources/icons/users_icon.png'

                                },
                                {
                                    //overflowY: 'scroll',
                                    title: 'User',
                                    iconCls: 'icons',
                                    icon: 'resources/icons/users_icon.png',
                                    layout: 'border',
                                    height: 400,
                                    items:[
                                        {
//
//                                            xtype: 'container',
//                                            id: 'myUserGridProducts',
//                                            //baseCls: 'formPanel',
//                                            layout: 'border',
//                                            items:[
//                                                {
                                                    xtype: 'myUserGridBtns',
                                                    region: 'north',
                                                    bodyStyle: {
                                                        'background-color': '#5b93da'
                                                    },
                                                    border:0
                                                },
                                                {
                                                    xtype: 'userInformationPanel',
                                                    region: 'east',
                                                    width: '70%',
                                                    //collapsible: true,
                                                    split: true
                                                },
                                                {
                                                    xtype:'gridUsers',
                                                    region: 'center',
                                                    title: 'All Users',
                                                    layout: 'fit'
//
                                                }


//                                               ]
//                                              }
                                            ]

                                        }

                                    ]

                                }
                                ]
                        }
                        ]
                    }]
                }
                ]



            }
    ]
});

