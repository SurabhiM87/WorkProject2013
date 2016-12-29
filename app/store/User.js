Ext.define('EDGAR.store.User',{
    extend: 'Ext.data.Store',
    storeId: 'User',
    autoLoad: true,
    fields: [   'id',
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
            url: serverLocation + 'UserGrid',
            reader:{
             root:'users'
          }
    },

    sorters: [
    {
        property: 'createdOn',
        direction: 'DESC'
    }],

    listeners : {
        load: function(){

            this.filterBy(function(rec){

                if(rec.get('domain')==="Administrator"){
                    return false;
                }
                else{
                    return true;
                }
            })
        }
    }
});