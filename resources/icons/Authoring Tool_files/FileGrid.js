Ext.define('EDGAR.view.FileGrid',{
	extend: 'Ext.ux.LiveSearchGridPanel',
	requires:[
		'EDGAR.store.Files',
		'Ext.tip.QuickTipManager',
	],
	viewConfig: {
        stripeRows: true
    },
    columnLines: true,
    // frame: true,
    border: 0,
	alias : 'widget.gridFiles',
    id: 'gridFiles',
    store: 'Files',
    scroll: 'vertical',
    height: 700,
    columns: [
    	{
            width: '30%',
            text: "Name",
            dataIndex: 'name'
        },
    	{
            width: '15%',
            text: "Extension",
            align: 'center',
            dataIndex: 'ext'
        },
    	{      
            width: '20%',
            text: "Modified on",
            align: 'center',
            dataIndex: 'time',
            renderer: Ext.util.Format.dateRenderer('M d, Y g:i A')  
        },
    	{
    	    xtype: 'actioncolumn',
    	    text: 'Download',
    	    id: 'download',
    	    width: '10%',
    	    tooltip: 'Download',
    	    align: 'center',
    	    iconCls: 'icons',
    	    icon: 'resources/icons/download.png',
    	    // handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
    	    //     this.getController('Viewport').editLink();
    	    // },
    	    // isDisabled: function(view, rowIdx, colIdx, item, record) {
    	    //     return !(record.data.ext=="htm" ||record.data.ext=="html");
    	    // }
    	},
    	{
    	  	xtype: 'actioncolumn',
    	   	text: 'Edit',
    	   	id: 'edit',
    	   	width: '10%',
    	   	tooltip: 'Edit',
    	    align: 'center',
    	    iconCls: 'icons',
    	    icon: 'resources/icons/edit.png',
    	    // isVisible: function(view, rowIdx, colIdx, item, record) {
    	    //     return (record.data.ext=="htm" ||record.data.ext=="html");
    	    // }
            renderer: function (val, metadata, record) {
                //console.log(record.data.state);
                if((record.data.state=="lock") && !($.inArray(record.data.name, file_name) > -1) ){
                    this.items[0].iconCls = 'icons';
                    this.items[0].icon = 'resources/icons/lock.png';
                    this.items[0].tooltip = 'Locked';
                }
                else{
                    this.items[0].iconCls = 'icons';
                    this.items[0].icon = 'resources/icons/edit.png';
                    this.items[0].tooltip = 'Edit';
                }
            },
            isDisabled: function(view, rowIdx, colIdx, item, record) {
                return ((record.data.state=="lock") && ($.inArray(record.data.name, file_name) > -1));
            },
            getClass: function(value, meta, record) {
    	        if(!(record.data.ext=="htm" ||record.data.ext=="html")) {
    	            return 'x-hide-visibility';
    	        }
    	    }
    	},
    	{
            width: '15%',
            text: "Version",
            align: 'center',
            dataIndex:'version'
        }
    ],
});