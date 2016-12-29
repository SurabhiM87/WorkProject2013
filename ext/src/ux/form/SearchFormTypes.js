/**
 * Created by surabhimendiratta on 12/14/13.
 */
Ext.define('Ext.ux.form.SearchFormTypes', {
    extend: 'Ext.form.field.Trigger',

    alias: 'widget.searchFormTypes',
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

        var store = Ext.getStore('FormTypes');
        store.clearFilter();
    }

});