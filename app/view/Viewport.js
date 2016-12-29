var serverLocation = "http://localhost:8080/EDGARFileSystem/";

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
        'Ext.tip.QuickTipManager',
        'Ext.form.field.File',
        'Ext.form.Panel',
        'Ext.toolbar.Spacer',
        'EDGAR.view.FileGrid',
        'Ext.layout.container.Border',
        'EDGAR.view.Products.UserGrid',
        'EDGAR.view.Products.UserGridButtons',
        'EDGAR.view.Products.UserInformation',
        'EDGAR.view.Products.CustomerGrid',
        'EDGAR.view.Products.CustomerGridButtons',
        'EDGAR.view.Products.CustomerInformation',
        'Ext.ux.form.SearchGrid'//added by kejal

    ],
    layout:'fit',
    padding:0,
    style: 'background: #fff; margin-left: -485px; left: 50%; margin-right: auto; border:2px solid #99bce8; position:fixed;',

    items:
        [

            {
                xtype: 'panel',
                height: '100%',
                width:1000,
                minWidth:1000,
                maxWidth:1000,
                id:'main_panel',
                layout: {
                    type: 'vbox',
                    align: 'stretch'  // Child items are stretched to full width
                },

                items:[

                    {
                        xtype: 'panel',
                        width:'100%',
                        height: 40,
                        baseCls: 'formPanel',
//                        style: 'background: #146FAD;',
                        layout: {
                            type: 'hbox',
                            align: 'middle'
                        },
                        items:[

                            {
                                xtype: 'label',
                                text: 'Quality EDGAR Tool',
                                cls: 'formHTML',
                                padding: '5',
                                align: 'center',
                            },
                            {
                                xtype: 'label',
                                id: 'welcomeName',
                                 style: 'margin-left: 530px;',
                                cls: 'logoutLabel',

                                hidden: true
                            },
                            {

                                xtype: 'label',
                                tooltip: 'Log Out',
                                id: 'mainPageLogOutBtn',
                                text:  'Log Out',
                                style: 'margin-right: 30px;',
                                cls: 'logoutLabel',
                                padding: '10',
                                hidden: true,
                                listeners: {
                                    render: function(c){
                                        c.getEl().on('click', function(){
                                            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to Log Out?', function(button){

                                                if (button === 'yes')
                                                {

                                                    Ext.getCmp('mainPageLogOutBtn').hide();
                                                    Ext.getCmp('mainTab').hide();

                                                    Ext.util.Cookies.clear("userInfo");
                                                    Ext.getCmp("loginView").show();
                                                    Ext.getCmp("welcomeName").hide();
                                                }
                                                else
                                                {
                                                    //Do nothing
                                                }
                                            });
                                        }, c);
                                    }
                                }

                            }
//                            {
//                                xtype: 'panel',
//                                align: 'right',
//                                style: 'margin-left: 280px;',
////                                padding: '5,5,5,5',
//                                frame: false,
//                                border: false,
//                                bodyStyle: "background:transparent;",
//                                layout: {
//                                    type: 'hbox',
//                                    align: 'right'
//                                },
//                                items:[
//
//                                ]
//                            },





                        ]


                    },

                    {
                        xtype: 'tbspacer',
                        height: 5
                    },
                    {
                        xtype: 'loginView',
                        style: 'margin-left: 250px; margin-top: 70px; border:2px solid #99bce8;'

                    },
                    {
                        xtype: 'tabpanel',
                        activeTab: 0,
                        id: 'mainTab',
                        hidden: true,
                        flex:1,

                        items:[
                            {
                                title: 'Projects',
                                iconCls: 'icons',
                                icon: 'resources/icons/Projects.ico',
                                layout:'fit',
                                items:[
                                    {
                                        xtype: 'container',
                                        title:'demo',
                                        id: 'text',
                                        baseCls: 'text',
                                        layout: 'border',

                                        items:[
                                            {
                                                region:'center',
                                                xtype:'documentGrid',

                                            },


                                            {
                                                xtype: 'panel',
                                                width: '100%',
                                                id: 'companyCbxPanel',
                                                height: 48,
                                                padding: 5,
                                                // flex:1,
                                                baseCls: 'companyCbxPanel',
                                                region: 'north',
//                                                hidden: true,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
//                                style: 'background: #146FAD;',
                                                items:[
                                                    {
                                                        xtype: 'label',
                                                        text: 'Company:',
                                                        id:'companyLabel',
//                                        padding: 10,
                                                        style: 'margin-left: 5px;font-size: 12px;font-weight: bold; ',
//                                        x: 20,
                                                        y:20
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        id:'companyCmbx',
                                                        emptyText: 'Enter Company Name',
                                                        padding: 5,
                                                        style: 'margin-left: 5px',
                                                        store: 'CustomerStore',
                                                        valueField: 'name',
                                                        displayField: 'name',
                                                        typeAhead: true,
                                                        queryMode: 'remote',
                                                        width: 295,
                                                        hidden: true
//                                                        flex: 1,
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        id: 'companyLabelforAdmin',
                                                        padding: 5,
                                                        style: 'margin-left: 5px;font-size: 12px;font-weight: bold; color: #0000A0;',
//                                                        width: 295,
                                                        hidden: true

                                                    },
                                                    {
                                                        xtype: 'label',
                                                        id: 'companyLabelforRegistrant',
                                                        padding: 5,
                                                        style: 'margin-left: 5px;font-size: 14px; color: #000;',
//                                                        width: 295,
                                                        hidden: true

                                                    },

                                                    {
                                                        xtype:'label',
                                                        align: 'left',
                                                        html:'<span style="float:left; margin-left:5px; margin-top:1px;"><img height="20px"  src="resources/icons/Search-icon.png"/></span>', //edited by kejal
                                                        iconCls: 'searchicons',
                                                        cls:'searchText'
                                                    },
                                                    {
                                                        xtype: 'searchgrid',//edited by kejal
                                                        cls:'mainPageSearchBox',
                                                        id: 'mainPageSearchBox',
                                                        disabled: true,
                                                        padding: '5',
                                                        width: 285,
//                                                        flex : 1,
                                                        enableKeyEvents: true,
                                                        emptyText: 'Search Grid',
//
                                                        listeners: {
                                                            keyup: function()
                                                            {
                                                                var store = Ext.getStore('Project');
                                                                store.clearFilter();

                                                                var searchTemp = this.value;
                                                                var filters = [
                                                                    new Ext.util.Filter
                                                                    ({
                                                                        filterFn: function(item)
                                                                        {
                                                                            return (item.get('jobNo').toLowerCase().match(searchTemp.toLowerCase())!=null)
                                                                                || (item.get('year').toString().match(searchTemp.toString())!=null)
                                                                                || (item.get('formType').toString().match(searchTemp.toString())!=null)
                                                                                || (item.get('modifiedBy').toLowerCase().match(searchTemp.toLowerCase())!=null)
                                                                                || (item.get('lifeCycleState').toLowerCase().match(searchTemp.toLowerCase())!=null)
                                                                                || (item.get('action').toLowerCase().match(searchTemp.toLowerCase())!=null)
                                                                                || (item.get('version').toString().match(searchTemp.toString())!=null);
                                                                        }
                                                                    })
                                                                ];
                                                                if (searchTemp)
                                                                {
                                                                    store.filter(filters);
                                                                }
                                                            },
                                                            buffer: 500
                                                        }
                                                    },
                                                    {
                                                        xtype:'button',
                                                        width: 25,
                                                        height: 26,
//                                                        flex: 1,
//                                                        x: 525,
//                                                        y: -19,
                                                        id:'addDocBtn',
                                                        scale: 'medium',
                                                        iconCls: 'icons',
                                                        icon: 'resources/icons/addDoc.png' ,
                                                        tooltip: 'Add new Project',
                                                        disabled: true

                                                    },
                                                    {
                                                        xtype:'button',
                                                        width: 25,
                                                        height: 26,

//                                                        flex: 1,
//                                                        x: 540,
//                                                        y: -19,
                                                        itemId:'refreshBtn',
                                                        scale: 'medium',
                                                        iconCls: 'icons',
                                                        icon: 'resources/icons/refresh.png' ,
                                                        tooltip: 'Refresh Grid',
                                                        listeners:{
                                                            click: function(){
                                                                Ext.getStore('Project').reload();
                                                            }
                                                        }

                                                    },
                                                    {
                                                        xtype:'button',
                                                        width: 25,
                                                        height: 26,
                                                        itemId:'editProjectBtn',
                                                        scale: 'medium',
                                                        iconCls: 'icons',
                                                        icon: 'resources/icons/editProject.png' ,
                                                        tooltip: 'Edit Project'

                                                    }

                                                ]

                                            },


                                        ]


                                    } // end of basecls text

                                ]
                            },
                            {
                                title: 'Admin',
                                iconCls: 'icons',
                                id: 'adminHeadTab',
                                icon: 'resources/icons/administrator.png',
                                layout:'fit',
                                items:[
//                                    {
//                                        xtype: 'panel',
//                                        width: '100%',
//                                        id: 'tabPanel',
//                                        baseCls: 'tabPanel',
//                                        height: 750,
//                                        style: 'margin: 0 auto;',
//                                        border: 0,
//                                        layout:'fit',
//                                        items:[
//                                            {
//                                                xtype: 'tabpanel',
//                                                activeTab: 0,
//                                                width: '100%',
//
//                                                layout:'fit',
//                                                items:[
//                                                    {
//
//                                                        title: 'Users',
//                                                        xtype:'container',
//                                                        iconCls: 'icons',
//                                                        id: 'usersTab',
//                                                        icon: 'resources/icons/users_icon.png',
//                                                        layout: 'border',
//                                                        // height:500,
//                                                        items:[
//                                                            {
//                                                                xtype: 'myUserGridBtns',
//                                                                region: 'north',
//                                                                bodyStyle: {
//                                                                    'background-color': '#5b93da'
//                                                                },
//                                                                border:0
//                                                            },
//                                                            {
//                                                                xtype: 'userInformationPanel',
//                                                                region: 'east',
//                                                                width: '70%',
//                                                                collapsible: true,
//                                                                split: true
//                                                            },
//                                                            {
//                                                                xtype:'gridUsers',
//                                                                region: 'center',
//                                                                title: 'All Users'
//                                                                //layout: 'fit'
//                                                            }
//                                                        ]
//
//                                                    },
//
//
//                                                    {
//                                                        //overflowY: 'scroll',
//                                                        title: 'Registrant',
//                                                        iconCls: 'icons',
//                                                        icon: 'resources/icons/users_icon.png',
//                                                        layout: 'border',
//                                                        height: 400,
//                                                        items: [
//                                                            {
//                                                                xtype:'gridCustomers',
//                                                                region: 'center',
//                                                                title: 'Registrants',
//                                                                layout: 'fit'
//                                                            },
//                                                            {
//                                                                xtype: 'customerInformationPanel',
//                                                                region: 'east',
//                                                                width: '70%',
//                                                                collapsible: true,
//                                                                split: true
//                                                            },
//                                                            {
//                                                                xtype: 'myCustomerGridBtns',
//                                                                region: 'north',
//                                                                bodyStyle: {
//                                                                    'background-color': '#5b93da'
//                                                                },
//                                                                border:0
//                                                            },
//                                                        ]
//                                                    }, // closing for bracket before title:Customers
////
////
//                                                ]
//
//                                            }
//                                        ]
//                                    }
                                    {
                                        xtype: 'tabpanel',
                                        activeTab: 0,
                                        id: 'adminTab',
                                        width: '100%',

                                        layout:'fit',
                                        items:[
                                            {

                                                title: 'Users',
                                                xtype:'container',
                                                iconCls: 'icons',
                                                id: 'usersTab',
                                                icon: 'resources/icons/users_icon.png',
                                                layout: 'border',
                                                // height:500,
                                                items:[
                                                    {
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
                                                        collapsible: true,
                                                        split: true
                                                    },
                                                    {
                                                        xtype:'gridUsers',
                                                        region: 'center',
                                                        title: 'All Users'
                                                        //layout: 'fit'
                                                    }
                                                ]

                                            },


                                            {
                                                //overflowY: 'scroll',
                                                title: 'Registrant',
                                                iconCls: 'icons',
                                                icon: 'resources/icons/users_icon.png',
                                                layout: 'border',
                                                height: 400,
                                                items: [
                                                    {
                                                        xtype:'gridCustomers',
                                                        region: 'center',
                                                        title: 'Registrants',
                                                        layout: 'fit'
                                                    },
                                                    {
                                                        xtype: 'customerInformationPanel',
                                                        region: 'east',
                                                        width: '70%',
                                                        collapsible: true,
                                                        split: true
                                                    },
                                                    {
                                                        xtype: 'myCustomerGridBtns',
                                                        region: 'north',
                                                        bodyStyle: {
                                                            'background-color': '#5b93da'
                                                        },
                                                        border:0
                                                    },
                                                ]
                                            }, // closing for bracket before title:Customers
//
//
                                        ]

                                    }
                                ]
                            },
                            {
                                title: 'Users',
                                iconCls: 'icons',
                                id: 'customerUsersTab',
                                icon: 'resources/icons/users_icon.png',
                                layout: 'fit',
//                                hidden: true,
                                items: [
                                    {
                                        xtype: 'customerUserViewport',
                                        itemId:'customerUserViewport'
                                    }]

                            },
                            {
                                title: 'Home',
                                iconCls: 'icons',
                                icon: 'resources/icons/home.png',
                                layout:'fit',
                                items:[
                                    {
                                        xtype: 'label',
                                        text: 'Go to Projects'
                                    },
                                    {
                                        xtype: 'label',
                                        text: 'Manage Users'
                                    }]
                            }

                        ]
                    }

                ]



            }
        ]
});
