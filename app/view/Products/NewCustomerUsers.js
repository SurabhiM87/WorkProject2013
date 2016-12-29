/**
* Created with JetBrains WebStorm.
* User: surabhimendiratta
* Date: 10/10/13
* Time: 5:59 PM
* To change this template use File | Settings | File Templates.
*/

Ext.define('EDGAR.view.products.NewCustomerUsers', {
    extend: 'Ext.window.Window',

    id: 'newCustUserPanelPopup',
    xtype: 'newCustUserPanelPopup',
    renderTo: Ext.getBody(),
    width: 700,
    height:250,
    title: 'New User Window',

    bodyPadding: 10,
    constrain: true,
    modal:true,
    minWidth:500,
    minHeight:200,
//    maxWidth:700,
//    maxHeight:270,
    color: '#fff',
    closeAction :'close',

    items:[{
        xtype: 'form',
        id: 'newCustUserForm',
        autoScroll: true,
        width:'300',
        border:0,
        bodyStyle: 'padding:5px 5px 0',
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 140,

            msgTarget: 'side'
        },
        TrackResetOnLoad: "true",

        buttons: [
//            {
//                text: 'Reset',
//                handler: function() {
//                    this.up('form').getForm().reset();
//                }
//            },

            {
                text: 'Submit',
                formBind: true, //only enabled once the form is valid
                disabled: true,
                //id: "submitBtn",
                handler: function(){
                    var form = this.up('form').getForm();
                    var myMask = new Ext.LoadMask(Ext.getCmp('newCustUserPanelPopup').el, {msg:"Please wait..."});
                    myMask.show();
                    myMask.center();
                    if(form.isValid()){
                        $.ajax({
                            type: "POST",
                            url: serverLocation + 'CreateNewCustomerUser',
                            data: {
                                email: Ext.getCmp('emailUser').value,
                                userFirstName: Ext.getCmp('userFirstName').value,
                                userLastName: Ext.getCmp('userLastName').value,
                                phoneNumber:Ext.getCmp('userPhone').getComponent('userPhone1').value+Ext.getCmp('userPhone').getComponent('userPhone2').value+Ext.getCmp('userPhone').getComponent('userPhone3').value,
                                IsSuperUser: Ext.getCmp('IsSuperUser').value,
                                customerId: selectedCustomerId,
                                createdBy: loggedInUserId
                            }
                        }).done(function(msg){
                            myMask.destroy();

                                form.reset();
//                                Ext.getCmp("newCustUserPanelPopup").close();

                                Ext.getStore('CustomerUser').reload();

                                Ext.getCmp('newCustUserPanelPopup').hide();

                                var custUserViewPort = Ext.getCmp('custUserPanelpopup'+selectedCustomerId).getComponent(selectedCustomerId);

                                custUserViewPort.getComponent('gridCustomerUsers').getView().refresh();

                                Ext.Msg.alert('Success!', 'New user added successfully! An email containing the Login Credentials has been sent to the newly added user!');

                                //var thisForm = Ext.getCmp('newUserForm');
                            })
                            .fail(function() {
                                myMask.destroy();
                                alert( "User could not be added!" );
                            })

                    }
                },
                bodyStyle: {
                    'background-color': '#3291d6'
                }

            },
            {
                text: 'Cancel',
                handler: function(){
                    Ext.getCmp('newCustUserPanelPopup').close();
                }
            }

        ],
        items:[
            {
                xtype: 'fieldset',
                title: 'User Information',

                defaults: {
                    anchor: '100%'
                },
                layout: 'anchor',
                items:[
                    {    xtype: 'textfield',
                        allowBlank:false,
                        fieldLabel: 'User Name / Email Id',
                        vtype: 'email',
                        itemId : 'emailUser',
                        emptyText: 'Enter the Email Address of the User'

                    },
                    {
                        xtype: 'textfield',
                        allowBlank:false,
                        fieldLabel: 'First Name',
                        id: 'userFirstName',
                        emptyText: 'Enter the First Name of the User'

                    },

                    {
                        xtype: 'textfield',
                        allowBlank:false,
                        fieldLabel: 'Last Name',
                        id: 'userLastName',
                        emptyText: 'Enter the Last name of the User'

                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Phone Number',
                        name: 'userPhone',
                        id: 'userPhone',
                        layout:'hbox',
                        items:[
                            {
                                xtype: 'textfield',
                                width:60,
                                allowBlank:false,
                                itemId:'userPhone1',
                                maskRe: /[0-9.]/,
                                minLength:3,
                                maxLength:3,
                                margin:'0 6 0 0'
                            },
                            {
                                html:'-',
                                border:false,
                                margin:'1 0 0 0'
                            },
                            {
                                xtype: 'textfield',
                                width:60,
                                allowBlank:false,
                                itemId:'userPhone2',
                                maskRe: /[0-9.]/,
                                minLength:3,
                                maxLength:3,
                                margin:'0 6 0 6'
                            },
                            {
                                html:'-',
                                border:false,
                                margin:'1 0 0 0'
                            },
                            {
                                xtype: 'textfield',
                                width:80,
                                allowBlank:false,
                                itemId:'userPhone3',
                                maskRe: /[0-9.]/,
                                minLength:4,
                                maxLength:4,
                                margin:'0 0 0 6'
                            }]

                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: 'Is Super User',
                        id : 'IsSuperUser',
                        inputValue: '1',
                        uncheckedValue:'0'



                    }
                ]
            }

        ]
    }]

})