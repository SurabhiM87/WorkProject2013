Ext.define('Ext.ux.form.SearchCustomerUsers', {
    extend: 'Ext.form.field.Trigger',

    alias: 'widget.searchcustomerusers',
    autoWidth:true,
     // width:'90%',
     anchor:'100%',

     initComponent: function() {
       var me = this;

       me.triggerCls='x-form-clear-trigger';

        me.callParent(arguments);
   
     },

    onTriggerClick : function(){

         this.setRawValue('');

          var store = Ext.getStore('CustomerUser');
          store.clearFilter();  
    }

});