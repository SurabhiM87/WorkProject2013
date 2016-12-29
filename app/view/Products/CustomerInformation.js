/**
 * Created with JetBrains WebStorm.
 * User: surabhimendiratta
 * Date: 10/9/13
 * Time: 2:19 PM
 * To change this template use File | Settings | File Templates.
 */


Ext.define('EDGAR.view.Products.CustomerInformation',{
    extend: 'Ext.form.Panel',
    title: 'Registrant Information',
    alias : 'widget.customerInformationPanel',

    id: 'customerInformation',
    bodyStyle: 'padding:5px 5px 0',
    width: 100,
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 90
    },
    defaultType:'textfield',
    defaults: {
        anchor: '100%'
    },
    autoScroll:true,
    trackResetOnLoad:true,
    buttons: [
        {
            text: 'View Log',
            id: 'viewLogBtn',
            margin: '5 5 5 5'

        },
        {
            text : 'Manage Users',
            id: 'manageCustUsersBtn',
            margin: '5 5 5 5',
            disabled: true

        },
        {
            text: 'Save',
            id: 'saveCustomerChangesbtn',
            disabled: true,
            margin: '5 5 5 5',
            handler: function(){

                var form = this.up('customerInformationPanel').getForm();
                if(form.isValid()){
                    $.ajax({
                        type: "POST",
                        url: serverLocation + 'SaveCustomerDetails',
                        data: {
                            customerName: Ext.getCmp('tbxcustomerName').value,
                            address1:Ext.getCmp('tbxaddress1').value,
                            address2: Ext.getCmp('tbxaddress2').value,
                            customerPrimPhone:Ext.getCmp('tbxcustomerPrimPhone').value,
                            customerSecPhone: Ext.getCmp('tbxcustomerSecPhone').value,
                            customerFax:Ext.getCmp('tbxcustomerFax').value,
                            customerId: selectedCustomerId
                        }
                    }).done(function(msg){
                            Ext.getCmp('deleteCustomerBtn').enable(true);
                            Ext.getStore('CustomerStore').reload();
                            Ext.Msg.alert('Success', 'Changes saved successfully!');

                        }).failed()
                    {Ext.Msg.alert('Failed', 'Changes could not be saved!');}

                }
            }
        },
        {
            text: 'Cancel',
            id: 'cancelCustomerbtn',
            margin: '5 5 5 5',
            disabled: true

        }

    ],
    items:[
        {
            fieldLabel: 'Registrant Name',
            name: 'customerName',
            margin: "20 0 15 0",
            id: 'tbxcustomerName',
            allowBlank: false,
            disabled: true,
            disabledCls:  "disabledTextboxCls"

        },{
            fieldLabel: 'Address Line 1',
            name: 'address1',
            margin: "0 0 15 0",
            id: 'tbxaddress1',
            allowBlank: false,
            disabled: true,
            disabledCls:  "disabledTextboxCls",

        },{
            fieldLabel: 'Address Line 2',
            name: 'address2',
            margin: "0 0 15 0",
            id: 'tbxaddress2',
            allowBlank: false ,
            disabled: true,
            disabledCls:  "disabledTextboxCls"

        },{
            fieldLabel: 'Primary Phone Number',
            name: 'customerPrimPhone',
            margin: "0 0 15 0",
            id: 'tbxcustomerPrimPhone',
            allowBlank: false ,
            disabled: true,
            disabledCls:  "disabledTextboxCls"

        },{
            fieldLabel: 'Secondary Phone Number',
            name: 'customerSecPhone',
            id: 'tbxcustomerSecPhone',
            margin: "0 0 15 0",
            disabled: true,
            disabledCls:  "disabledTextboxCls"

        },{
            fieldLabel: 'Fax Number',
            name: 'customerFax',
            margin: "0 0 15 0",
            id: 'tbxcustomerFax',
            disabled: true,
            disabledCls:  "disabledTextboxCls"
        }
    ]
});