/**
 * Created with JetBrains WebStorm.
 * User: surabhimendiratta
 * Date: 10/14/13
 * Time: 10:30 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('EDGAR.view.Products.CustomerUsersGridButtons',{
    extend: 'Ext.panel.Panel',
    //id:'myCustomerUsersGridBtns',
    alias : 'widget.myCustomerUsersGridBtns',
   // xtype: 'myCustomerUsersGridBtns',
    layout: {
        type: 'auto',       // Arrange child items vertically
        padding: '5 5 5 5'
    },
    scrollable: {
        direction: 'vertical',
        indicators: true
    },
    requires:[
        'Ext.grid.Panel'
    ],
    items:[
        {
            xtype: 'button',
            text : 'New User',
            itemId: 'newCustUserBtn',
            width:80,
            height:25,
            margin: '5 5 5 5'
        },
        {
            xtype: 'button',
            text : 'Delete User',
            itemId: 'deleteCustUserBtn',
            width:80,
            height:25,
            margin: '5 5 5 5',
            disabled: true,
//            handler: function(){
//
//                var form = this.up('customerUserInformationPanel').getForm();
//
//                if(form.isValid()){
//                    $.ajax({
//                        type: "POST",
//                        url: serverLocation + 'SaveCustomerUserDetails',
//                        data: {
//                            email: Ext.ComponentQuery.query('#tbxcustUserName')[0].value,
//                            userFirstName: Ext.ComponentQuery.query('#tbxcustUserFirstName')[0].value,
//                            userLastName: Ext.ComponentQuery.query('#tbxcustUserLastName')[0].value,
//                            phoneNumber:Ext.ComponentQuery.query('#tbxcustUserPhoneNumber')[0].value,
//                            userIsSuperUser: Ext.ComponentQuery.query('#tbxisSuperUser')[0].value,
//                            custUserId: custUserId
//
//                        }
//                    }).done(function(msg){
//                            Ext.getStore('CustomerUser').reload();
//                            Ext.Msg.alert('Success', 'Changes saved successfully!');
//
//                        })
//
//                }
//            }


//            ui:'normal'
        },
        {
            xtype: 'button',
            text : 'Edit User',
            itemId: 'editCustUserBtn',
            width:80,
            height:25,
            margin: '5 5 5 5',
            disabled: true
//            top:10
        }
    ]
});
