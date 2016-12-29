/**
 * Created with JetBrains WebStorm.
 * User: surabhimendiratta
 * Date: 9/23/13
 * Time: 3:13 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('EDGAR.view.Products.UserInformation',{
    extend: 'Ext.form.Panel',
    // renderTo: Ext.getBody(),
    title: 'User Information',
    alias : 'widget.userInformationPanel',
    //xtype: 'userInformationGrid',
    trackResetOnLoad:true,
    id: 'userInformation',
    bodyStyle: 'padding:5px 5px 0',
    width: 100,
    autoScroll:true,
    //height: 100,
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 75
    },
//    defaultType:'textfield',
    defaults: {
        anchor: '100%'
    },

//    items:[{
//        xtype: 'form',
//        id: 'editUserForm',
//        autoScroll: true,
//        width:'300',
//        border:0,
//        bodyStyle: 'padding:5px 5px 0',
//        fieldDefaults: {
//            labelAlign: 'right',
//            labelWidth: 140,
//
//            msgTarget: 'side'
//        },

        buttons: [
            {
                text: 'Save',
                id: 'saveChangesbtn',
                //formBind: true,
                disabled: true,
                handler: function(){

                    var form = this.up('userInformationPanel').getForm();
                    if(form.isValid()){
                        $.ajax({
                            type: "POST",
                            url: serverLocation + 'SaveUserDetails',
                            data: {
                                email: Ext.getCmp('tbxuserName').value,
                                userFirstName: $('input:text[name=firstName]').val(),
                                userLastName: $('input:text[name=lastName]').val(),
                                phoneNumber:Ext.getCmp('tbxphoneNumber').value,
                                userIsAdmin: Ext.getCmp('chkbxisAdmin').value,
                                userId: userId,
                                modifiedBy: loggedInUserId
                                //userId: Ext.getForm('gridUsers').getCmp('userId').value



                            }
                        }).done(function(msg){
                                Ext.getCmp('deleteBtn').enable(true);
                                Ext.getStore('User').reload();
                                Ext.Msg.alert('Success', 'Changes saved successfully!');

                            })

                    }
                }
            },
            {
                text: 'Cancel',
                id: 'cancelbtn',
                disabled: true

            }
        ],
        items:[
            {
                xtype: 'textfield',
                fieldLabel: 'User Name',
                name: 'email',
                vtype: 'email',
                margin: "20 0 15 0",
                id: 'tbxuserName',
                allowBlank: false,
                emptyText:'Enter the Email Address of the User',
                disabled: true,
                disabledCls:  "disabledTextboxCls"

//        readonly: true,
//        fieldStyle: 'background-color: grey;background-image: none;'
            },{
                xtype: 'textfield',
                fieldLabel: 'First Name',
                name: 'firstName',
                margin: "0 0 15 0",
                id: 'tbxfrstName',
                allowBlank: false,
                disabled: true,
                disabledCls:  "disabledTextboxCls",

//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'
            },{
                xtype: 'textfield',
                fieldLabel: 'Last Name',
                name: 'lastName',
                margin: "0 0 15 0",
                id: 'tbxlastName',
                allowBlank: false ,
                disabled: true,
                disabledCls:  "disabledTextboxCls"
//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'
            },{
                xtype: 'textfield',
                fieldLabel: 'Phone Number',
                name: 'phoneNumber',
                margin: "0 0 15 0",
                id: 'tbxphoneNumber',
                allowBlank: false ,
                disabled: true,
                disabledCls:  "disabledTextboxCls"
//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'
            },{
                xtype:'checkboxfield',
                fieldLabel: 'Is Admin',
                name: 'isAdmin',
                id: 'chkbxisAdmin',
                margin: "0 0 15 0",
//                checked: false,
                disabled: true,
                disabledCls:  "disabledTextboxCls"
//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'

            },{
                xtype: 'datefield',
                fieldLabel: 'Created On',
                name: 'createdOn',
                margin: "0 0 15 0",
                id: 'tbxcreatedOn',
                disabled: true,
                disabledCls:  "disabledTextboxCls",
                renderer: Ext.util.Format.dateRenderer('M d, Y g:i A'),
//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'
            },{
                xtype: 'datefield',
                fieldLabel: 'Modified On',
                name: 'modifiedOn',
                margin: "0 0 15 0",
                id: 'tbxmodifiedOn',
                emptyText: 'The details of this User has not been modified yet',
                disabled: true,
                disabledCls:  "disabledTextboxCls",
                renderer: Ext.util.Format.dateRenderer('M d, Y g:i A'),
//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'

            },{
                xtype: 'textfield',
                fieldLabel: 'Created By',
                name: 'createdBy' ,
                margin: "0 0 15 0",
                id: 'tbxcreatedBy',
                disabled: true,
                disabledCls:  "disabledTextboxCls"
//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'

            },{
                xtype: 'textfield',
                fieldLabel: 'Modified By',
                name: 'modifiedBy' ,
                id: 'tbxmodifiedBy',
                emptyText: 'None',
                disabled: true,
                disabledCls:  "disabledTextboxCls"
//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'

            }
        ]
//    }]

});
