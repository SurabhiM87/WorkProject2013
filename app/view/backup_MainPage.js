    var store, ToCjsonHtml;

Ext.define('EDGAR.view.MainPage', {
	extend: 'Ext.container.Viewport',
    alias : 'widget.adduser',
	id: 'mainpage',
	// fullscreen: false,
     require:[
     'Ext.data.TreeStore',
     'Ext.tree.Panel'
     ],

    layout: 'border',   
    items: [
    {
        region: 'north',
        id: 'north-region-container',
        html: '<h1 class="x-panel-header" style="margin-left: 20%; text-align: left">Quantilus Authoring Tool - Demo</h1>',
        bodyStyle: 'padding:10px; color: #04408c',
        height: '10%',
        border: true,
        margins: '0 0 5 0'
    }, 
    {
        region: 'north',
        id: 'mceToolbar',
        
    }, 
    {
        region: 'west',
        width: '20%',
        bodyStyle: 'background: #ebebeb;',
    },
    {
        region: 'east',
        width: '20%',
        bodyStyle: 'background: #ebebeb;',
    },
    {
        region: 'center',
        id: 'centerSec',
        layout: 'border',
        style: 'box-shadow: 5px 5px 2px  #888888;border:0.1px solid;',
        items: [
            {
                region: 'west',
                collapsible: true,
                title: 'Document Structure',
                id: 'west-region-container',
                collapsible: false,
                split: true,         // enable resizing
                width: '25%',
                autoScroll: true,
                items:[
                {  
                        xtype: 'toolbar',
                        items:[ 
                        {
                            dock: 'right',
                            id: 'saveId',
                            text: 'Save'
                        }]
                    
                }
                ]
                // could use a TreePanel or AccordionLayout for navigational items
            }, {
            //     region: 'south',
            //     title: 'South Panel',
            //     collapsible: true,
            //     html: 'Information goes here',
            //     split: true,
            //     height: 100,
            //     minHeight: 100
            // }, {
            //     region: 'east',
            //     title: 'East Panel',
            //     collapsible: true,
            //     split: true,
            //     width: 150
            }, {
                region: 'center',
                xtype: 'tabpanel', // TabPanel itself has no title
                activeTab: 0,      // First tab active by default
                // itemCls: 'mainEdit',
                // bodyStyle: 'padding:10px;',
                id: 'htmlData',
                // items: {
                //     title: 'Default Tab',
                //     contentCls: 'htmlData',
                //     html: 'The first tab\'s content. Others may be added dynamically',
                //     autoScroll: true,
                // }
            }
        ]
    }

    ]

});