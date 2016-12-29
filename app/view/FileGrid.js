Ext.define('EDGAR.view.FileGrid', {
    extend: 'EDGAR.view.LiveSearchGridPanelModified',
    requires: [
        'EDGAR.store.Files',
        'Ext.tip.QuickTipManager',
    ],
    viewConfig: {
        stripeRows: true
    },
    columnLines: true,
    // frame: true,
    // border: 0,
    alias: 'widget.gridFiles',
    //    id: 'gridFiles',
    store: 'Files',
    scroll: 'vertical',
    forceFit: true,
    height: 300,
    columns: [{
        //            width: '30%',
        text: "Name",
        dataIndex: 'fileName',
        align: 'center',
    }, {
        //            width: '15%',
        text: "Extension",
        align: 'center',
        dataIndex: 'extension'
    }, {
        //            width: '20%',
        text: "Modified on",
        align: 'center',
        dataIndex: 'modifiedOn',
        renderer: Ext.util.Format.dateRenderer('M d, Y g:i A')
    }, {
        xtype: 'actioncolumn',
        text: 'Download',
        itemId: 'download',
        width: '10%',
        tooltip: 'Download',
        align: 'center',
        iconCls: 'icons',
        icon: 'resources/icons/download.png',

    }, {
        xtype: 'actioncolumn',
        text: 'Edit',
        itemId: 'edit',
        //          width: '10%',
        tooltip: 'Edit',
        align: 'center',
        iconCls: 'icons',
        icon: 'resources/icons/edit.png',
        // isVisible: function(view, rowIdx, colIdx, item, record) {
        //     return (record.data.ext=="htm" ||record.data.ext=="html");
        // }
        renderer: function(val, metadata, record) {
            var type = Ext.getCmp('documentGrid').getView().getSelectionModel().getSelection()[0].data.formType;
            var formList = Ext.getStore('metaData').data.items[0].get('formList');
            console.log(record.data.state);
            if ((record.data.state == "lock") && !($.inArray(record.data.fileName, file_name) > -1) && (record.data.fileName.substring(0, 2) === "ex" || !($.inArray(type, formList)> -1))) {
                this.items[0].iconCls = 'icons';
                this.items[0].icon = 'resources/icons/lock.png';
                this.items[0].tooltip = 'Locked';
            } else {
                this.items[0].iconCls = 'icons';
                this.items[0].icon = 'resources/icons/edit.png';
                this.items[0].tooltip = 'Edit';
            }
        },
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return ((record.data.state == "lock") && ($.inArray(record.data.fileName, file_name) > -1));
        },
        getClass: function(value, meta, record) {
            if (!(record.data.extension == "htm" || record.data.extension == "html")) {
                return 'x-hide-visibility';
            }
        }
    }, {
        width: '15%',
        text: "Version",
        align: 'center',
        dataIndex: 'version'
    }, {
        text: "FilePath",
        dataIndex: 'filePath',
        align: 'center',
        hidden: true
    }],
});