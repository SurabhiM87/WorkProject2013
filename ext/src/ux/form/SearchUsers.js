Ext.define('Ext.ux.form.SearchUsers', {
    extend: 'Ext.form.field.Trigger',

    alias: 'widget.searchusers',
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

          var store = Ext.getStore('User');
          store.clearFilter();  
    }

});