/**
 * Created with JetBrains WebStorm.
 * User: surabhimendiratta
 * Date: 10/14/13
 * Time: 10:30 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('EDGAR.view.Products.CustomerUsersInformation',{
    extend: 'Ext.form.Panel',
    store: 'CustomerUser',
    title: 'Customer User Information',
    alias : 'widget.customerUserInformationPanel',
    //id: 'customerUserInformationPanel',
    bodyStyle: 'padding:5px 5px 0',
//    width: 350,
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 90
    },
//    defaultType:'textfield',
    defaults: {
        anchor: '100%'
    },
    autoScroll:true,
    trackResetOnLoad:true,

    buttons: [

        {
            text: 'Save',
            itemId: 'saveCustomerUserChangesbtn',
            dataIndex: 'saveCustomerUserChangesbtn',
            disabled: true,
            margin: '5 5 5 5'
        },
        {
            text: 'Back',
            itemId: 'cancelCustomerUserbtn',
            margin: '5 5 5 5',
            disabled: true

        },
        {
            xtype: 'button',
            text : 'Cancel',
            id: 'closeCustomerUserWindowBtn',
            margin: '5 5 5 5',
            handler:function(){


                Ext.getCmp('custUserPanelpopup'+selectedCustomerId).close();
//
            }

        },

    ],
    items:[
        {
            xtype: 'textfield',
            fieldLabel: 'User Name',
            dataIndex: 'userName',
            vtype: 'email',
            margin: "20 0 15 0",
            itemId: 'tbxcustUserName',
            allowBlank: false,
            emptyText:'Enter the Email Address of the User',
            disabled: true,
            disabledCls:  "disabledTextboxCls"
        },{
            xtype: 'textfield',
            fieldLabel: 'First Name',
            dataIndex: 'firstName',
            margin: "0 0 15 0",
            itemId: 'tbxcustUserFirstName',
            allowBlank: false,
            disabled: true,
            disabledCls:  "disabledTextboxCls"
        },{
            xtype: 'textfield',
            fieldLabel: 'Last Name',
            dataIndex: 'lastName',
            margin: "0 0 15 0",
            itemId: 'tbxcustUserLastName',
            allowBlank: false ,
            disabled: true,
            disabledCls:  "disabledTextboxCls"
        },{
            xtype: 'textfield',
            fieldLabel: 'Phone Number',
            dataIndex: 'phoneNumber',
            margin: "0 0 15 0",
            itemId: 'tbxcustUserPhoneNumber',
            allowBlank: false ,
            disabled: true,
            disabledCls:  "disabledTextboxCls"
        },{
            xtype: 'checkboxfield',
            fieldLabel: 'Is Super User',
//            dataIndex: 'isSuperUser',
//            store:["Yes","No"],
            itemId: 'tbxisSuperUser',
            margin: "0 0 15 0",
            checked: false,
            disabled: true,
            disabledCls:  "disabledTextboxCls"

        },{
            xtype: 'datefield',
            fieldLabel: 'Created On',
            dataIndex: 'createdOn',
            margin: "0 0 15 0",
            itemId: 'tbxcustUserCreatedOn',
            renderer: Ext.util.Format.dateRenderer('M d, Y g:i A'),
            disabled: true,
            disabledCls:  "disabledTextboxCls"
        },{
            xtype: 'datefield',
            fieldLabel: 'Modified On',
            dataIndex: 'modifiedOn',
            renderer: Ext.util.Format.dateRenderer('M d, Y g:i A'),
            margin: "0 0 15 0",
            itemId: 'tbxcustUserModifiedOn',
            emptyText: 'The details of this User has not been modified yet',
            disabled: true,
            disabledCls:  "disabledTextboxCls"

        },{
            xtype: 'textfield',
            fieldLabel: 'Created By',
            dataIndex: 'createdBy' ,
            margin: "0 0 15 0",
            itemId: 'tbxcustUserCreatedBy',
            disabled: true,

            disabledCls:  "disabledTextboxCls"

        },{
            xtype: 'textfield',
            fieldLabel: 'Modified By',
            dataIndex: 'modifiedBy' ,
            itemId: 'tbxcustUserModifiedBy',
            emptyText: 'None',
            disabled: true,
            disabledCls:  "disabledTextboxCls"

        }
    ]
//    }]

});
