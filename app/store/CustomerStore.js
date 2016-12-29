/**
 * Created by surabhimendiratta on 10/18/13.
 */
Ext.define('EDGAR.store.CustomerStore',{
    extend: 'Ext.data.Store',
    storeId: 'CustomerStore',
    autoLoad: true,
    fields: [
        'id',
        'name',
        'address1',
        'address2',
        'phone1',
        'phone2',
        'fax',
        'email1',
        'email2',
        'isDeleted'

    ],
    proxy:{
        type:'ajax',
        url: serverLocation + 'CustomerGrid',
        reader:{
            root:'users'
        }
    }
});