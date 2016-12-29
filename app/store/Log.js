/**
 * Created by surabhimendiratta on 11/4/13.
 */

Ext.define('EDGAR.store.Log',{
    extend: 'Ext.data.Store',
    storeId: 'Log',
    autoLoad: true,
    fields: [
        'entity',
        'action',
        {
            name: 'actionDateTime',
            type: 'date'

        },
        'actionBy',
        'id'
    ],
    proxy:{
        type:'ajax',
        url: serverLocation + 'LogGrid',
        reader:{
            root:'users'
        }
    }
//    sorters: [
//        {
//            property: 'time',
//            direction: 'DESC'
//        }]
});
