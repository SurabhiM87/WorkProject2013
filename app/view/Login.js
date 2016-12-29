/**
* Created with JetBrains WebStorm.
* User: surabhimendiratta
* Date: 10/7/13
* Time: 12:28 PM
* To change this template use File | Settings | File Templates.
*/
Ext.define('EDGAR.view.Login', {
     extend: 'Ext.form.Panel',
    id: 'loginView',
//    xtype: 'loginScreenPopup',
    alias: "widget.loginView",
    minWidth:400,
    height:300,
    maxWidth:500,
//    maxHeight:400,
//    color: '#e5e5e5',

    items:[
        {
            xtype: 'form',
            id : 'loginForm',
            labelWidth : 80,
            bodyStyle : "background-color: #fff",
            border: 0,
//            frame : true,
            height : 240,
            labelAlign : 'top',
            layout : 'absolute',
            // Login form elements
            items : [
                {
                 xtype : 'label',
                // align: 'left',
                 html: '<img height="100px" src="resources/icons/Edgar_Logo.png"/>',

                x : 30,
                y : 70
                },
                {
                    xtype : 'label',
                    style : 'color: #6666A2; font-weight: bold; font-size: 12px',
                    text : 'Username:',
                    x : 250,
                    y : 60
                }, {
                        xtype: 'textfield',
                    name : 'loginUsername',
                    id : 'login_user',
                        vtype: 'email',
                    x : 250,
                    y : 80,
                    height: 28,
                    width: 200
                }, {
                    xtype : 'label',
                    style : 'color: #6666A2; font-weight: bold; font-size: 12px',
                    text : 'Password:',
                    x : 250,
                    y : 130
                }, {
                        xtype: 'textfield',
                    name : 'loginPassword',
                    id: 'login_password',
                    inputType : 'password',
                    height: 28,
                    width: 200,
                    x : 250,
                    y : 150
                },

                    {
                    xtype : 'button',
                    id : 'loginScreenbutton',
                    text : 'Log In',
                    width : 80,
                    x : 290,
                    y : 210,
                    formBind : true

                }]

     }]


});
