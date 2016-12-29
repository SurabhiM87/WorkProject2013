Ext.define('EDGAR.store.Files',{
    storeId: 'Files',
    extend: 'Ext.data.Store',
//    autoLoad: true,
    fields: [   'fileName',
                'extension',
//        'folderName',
                {
                    name: 'modifiedOn',
                    type: 'date'
                }, 
                'version',
                'state',
        'filePath'
             ],
    proxy:{
            type:'ajax',
            url: serverLocation + 'GetFileData',
            reader:{
            root:'users'
          }
    },
    listeners : {
        load : function(){
            //console.log(this.getTotalCount());
            // Ext.getCmp('gridFiles').setTitle('Files (' +  Ext.getStore('Files').getTotalCount() + ')');
            //  Ext.getCmp('file-status').insert(2,'Files: ' +  Ext.getStore('Files').getTotalCount());
            //var status = Ext.getCmp('file-status').items.get(2);
            searchText.setText("Total Files: " + Ext.getStore('Files').getTotalCount());
            // if(status!=null){
            //     Ext.getCmp('file-status').items.get(2).update('Files: ' +  Ext.getStore('Files').getTotalCount());
            // }
            // else{
            //    Ext.getCmp('file-status').insert(2,'Files: ' +  Ext.getStore('Files').getTotalCount());
            // }
        }
    },
    sorters: [ 
    {
        property: 'time',
        direction: 'DESC'
    }]
});