/**
 * Created with JetBrains WebStorm.
 * User: surabhimendiratta
 * Date: 9/23/13
 * Time: 3:13 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('EDGAR.view.Products.UserInformation',{
    extend: 'Ext.form.Panel',
    renderTo: Ext.getBody(),
    title: 'User Information',
    alias : 'widget.userInformationPanel',
    //xtype: 'userInformationGrid',

    id: 'userInformation',
    bodyStyle: 'padding:5px 5px 0',
    width: 100,
    //height: 100,
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 75
    },
    defaultType:'textfield',
    defaults: {
        anchor: '100%'
    },

    items:[
    {
        fieldLabel: 'User Name',
        name: 'email',
        vtype: 'email',
        id: 'tbxuserName',
        allowBlank: false,
        emptyText:'Enter the Email Address of the User',
        disabled: true
//        readonly: true,
//        fieldStyle: 'background-color: grey;background-image: none;'
    },{
        fieldLabel: 'Password',
        name: 'password',
        id: 'tbxpassword',
        allowBlank: false,
            disabled: true
//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'
    },{
        fieldLabel: 'First Name',
        name: 'firstName',
        id: 'tbxfrstName',
        allowBlank: false,
            disabled: true
//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'
    },{
        fieldLabel: 'Last Name',
        name: 'lastName',
        id: 'tbxlastName',
        allowBlank: false ,
            disabled: true
//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'
    },{
        fieldLabel: 'Phone Number',
        name: 'phoneNumber',
        id: 'tbxphoneNumber',
        allowBlank: false ,
            disabled: true
//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'
    },{
        fieldLabel: 'Is Admin',
        name: 'isAdmin',
        id: 'tbxisAdmin',
            disabled: true
//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'

    },{
        fieldLabel: 'Created On',
        name: 'createdOn',
        id: 'tbxcreatedOn',
            disabled: true
//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'
    },{
        fieldLabel: 'Modified On',
        name: 'modifiedOn',
        id: 'tbxmodifiedOn',
            disabled: true
//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'

    },{
        fieldLabel: 'Created By',
        name: 'createdBy' ,
        id: 'tbxcreatedBy',
            disabled: true
//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'

    },{
        fieldLabel: 'Modified By',
        name: 'modifiedBy' ,
        id: 'tbxmodifiedBy',
            disabled: true
//            readonly: true,
//            fieldStyle: 'background-color: grey;background-image: none;'

    }
    ] ,

    buttons: [
        {
        text: 'Save',
        id: 'saveChangesbtn',
        disabled: true
    },
        {
            text: 'Close',
            id: 'closebtn',
            disabled: true
        }
    ]



});
