    var store, ToCjsonHtml;


Ext.define('EDGAR.view.MainPage', {
	extend: 'Ext.container.Container',
    alias : 'widget.mytab',
    height: 500,
    initComponent: function() {

          var me = this;
         
        Ext.apply(me, {
        //itemId: 'centerSec',
        layout: 'border',
        items: [
            {
                xtype: 'tabpanel',
                region: 'west',
                animCollapse: true,
                collapsible: true,
                split: true,            // enable resizing
                title: 'Document Structure',
                itemId: 'west-region',
                style: 'position: fixed;',
                width: 225,
                // could use a TreePanel or AccordionLayout for navigational items
                tabPosition: 'bottom',
                activeTab: 0,
                deferredRender:false,
                items: [{
                    title: 'For Clients',
                    // closable: true,
                    itemId: 'west-region-container',
                    autoScroll: true,
                    bodyStyle: 'padding-bottom: 10px;'
                },{
                    title: 'For QES',
                    // closable: true,
                    itemId: 'west-region-container_QES',
                    height: 400,
                    autoScroll: true,
                    bodyStyle: 'padding-bottom: 10px;'
                } ]
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