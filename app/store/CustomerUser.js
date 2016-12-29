/**
 * Created with JetBrains WebStorm.
 * User: surabhimendiratta
 * Date: 10/14/13
 * Time: 10:25 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('EDGAR.store.CustomerUser',{
    extend: 'Ext.data.Store',
    storeId:'CustomerUser',
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
        }
    },


    listeners : {
//        after : function(){
//            var custUserViewPort = Ext.getCmp('custUserPanelpopup'+selectedCustomerId).getComponent(selectedCustomerId)
//
//            custUserViewPort.getComponent('gridCustomerUsers').getView().refresh();
//        }

        load: function(){

//            var storeCount = this.getTotalCount();
//            var i;
//            for(i = 0; i<storeCount; i++)
//            {
//                if(this.getAt(i).data.domain == "SuperUser")
//                {
//                    this.removeAt(i);
//                }
//            }
            this.filterBy(function(rec){

                if(rec.get('domain')==="SuperUser"){
                    return false;
                }
                else{
                    return true;
                }
            })



        }
    },



    sorters: [
        {
            property: 'modifiedOn',
            direction: 'DESC'
        }]
});
