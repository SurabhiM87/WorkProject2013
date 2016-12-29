/**
 * Created by surabhimendiratta on 12/11/13.
 */

Ext.define('EDGAR.store.AssignUserRightGridStore',{
    extend: 'Ext.data.Store',
    storeId:'AssignUserRightGridStore',
    //autoLoad: false,
    fields: [
        'id',
        'customerId',
        'name',
        'password',
        'nameFirst',
        'nameLast',
        'phone',
        'domain',
        {
            name: 'createdOn',
            type: 'date'

        },
        {
            name: 'modifiedOn',
            type: 'date'

        },
        'createdBy',
        'modifiedBy',
        'isDeleted'
    ],
    proxy:{
        type:'ajax',
        url: serverLocation + 'CustomerUsersGrid',
            reader:{
            root:'users'
        },
        writer:{
            type: 'json'
        }
    }
});
