/**
 * Created by surabhimendiratta on 12/3/13.
 */

Ext.define('EDGAR.store.FormTypes',{
    extend: 'Ext.data.Store',
    storeId:'FormTypes',
    autoLoad: false,
    fields: [

        'id',
        'formType',
        'formDescription',
        'dateType'

    ],
    proxy:{
        type:'ajax',
        url: serverLocation + 'FormTypes',
        reader:{
            root:'users'
        }
    }
});