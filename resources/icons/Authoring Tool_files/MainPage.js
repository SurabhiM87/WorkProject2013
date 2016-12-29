    var store, ToCjsonHtml;


Ext.define('EDGAR.view.MainPage', {
	extend: 'Ext.container.Container',
    alias : 'widget.mytab',
 
	// id: 'mainpage',
	// // fullscreen: false,
    //     require:[
    //     'Ext.data.TreeStore',
    //     'Ext.tree.Panel'
    //     ],
    //     style: 'background: #ebebeb; ' ,
    //     overflowY: 'scroll',
    // {   xtype: 'panel',
    //     renderTo: document.body,
        // width: 965,
        // height: 800,
       // style: 'margin-left: auto; margin-right: auto; box-shadow: 5px 5px 2px  #888888;border:0.1px solid;position: fixed;left: 50%; margin-left:-483px; ',

    initComponent: function() {

          var me = this;
         
        Ext.apply(me, {
        //itemId: 'centerSec',
        layout: 'border', 
        items: [
            {
                region: 'west',
                collapsible: true,
                title: 'Document Structure',
                itemId: 'west-region-container',
                collapsible: true,
                style: 'position: fixed;',
                // split: true,         // enable resizing
                width: 225,
                autoScroll: true,              
                // could use a TreePanel or AccordionLayout for navigational items
            }, 
            {
                region: 'center',
                xtype: 'tabpanel', // TabPanel itself has no title
                // style: 'position: fixed;',
                activeTab: 0,      // First tab active by default
                // itemCls: 'mainEdit',
                bodyStyle: 'min-width: 720px;max-width:940px',
                itemId: 'htmlData'
                // items: {
                //     title: 'Default Tab',
                //     contentCls: 'htmlData',
                //     html: 'The first tab\'s content. Others may be added dynamically',
                //     autoScroll: true,
                // }
            }
        ]
    });
        me.callParent(arguments);
    },



});