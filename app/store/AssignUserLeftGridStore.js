/**
 * Created by surabhimendiratta on 12/12/13.
 */

Ext.define('EDGAR.store.AssignUserLeftGridStore',{
    extend: 'Ext.data.Store',
    storeId:'AssignUserLeftGridStore',
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
        }
    },

    listeners : {
        load: function(){

            this.filterBy(function(rec){

                if(rec.get('domain')==="SuperUser"){
                    return false;
                }
                else{
                    return true;
                }
            })
        }
    }
});