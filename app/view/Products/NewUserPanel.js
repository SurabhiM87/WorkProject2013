/**
 * Created with JetBrains WebStorm.
 * User: surabhimendiratta
 * Date: 9/26/13
 * Time: 5:08 PM
 * To change this template use File | Settings | File Templates.
 */
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('EDGAR.view.products.NewUserPanel', {
    extend: 'Ext.window.Window',
    id: 'newUserPanelPopup',
    xtype: 'newUserPanelPopup',
    renderTo: Ext.getBody(),
    width: 700,
    height:260,
    title: 'New User Window',
    autoScroll: true,
    bodyPadding: 10,
    constrain: true,
    modal:true,
    minWidth:500,
    minHeight:270,
    color: '#fff',
    closeAction: 'close',

    items:[{
        xtype: 'form',
        id: 'newUserForm',
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
//            text: 'Reset',
//            handler: function() {
//            this.up('form').getForm().reset();
//                }
//            },
            {
                 text: 'Submit',
                formBind: true, //only enabled once the form is valid
                disabled: true,
                //id: "submitBtn",
                handler: function(){
                    var form = this.up('form').getForm();
                    var myMask = new Ext.LoadMask(Ext.getCmp('newUserPanelPopup').el, {msg:"Please wait..."});
                    myMask.show();
                    myMask.center();
                    if(form.isValid()){
                        $.ajax({
                            type: "POST",
                            url: serverLocation + 'CreateNewUser',
                            data: {
                                email: Ext.getCmp('emailUser').value,
                                userFirstName: $('input:text[name=userFirstName]').val(),
                                userLastName: $('input:text[name=userLastName]').val(),
                                phoneNumber:Ext.getCmp('phoneNumberUser').getComponent('phoneNumberUser1').value+Ext.getCmp('phoneNumberUser').getComponent('phoneNumberUser2').value+Ext.getCmp('phoneNumberUser').getComponent('phoneNumberUser3').value,
                                userIsAdmin: Ext.getCmp('userIsAdmin').value,
                                customerId: '1',
                                createdBy: loggedInUserId
                            }
                        }).done(function(msg){
                                myMask.destroy();
                                form.reset();
                                Ext.getCmp("newUserPanelPopup").hide();

                                Ext.getStore('User').reload();

                                Ext.Msg.alert('Success!', 'New user added successfully! An email containing the Login Credentials has been sent to the newly added user!');


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
                    Ext.getCmp('newUserPanelPopup').close();
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
                        name: 'email',
                        vtype: 'email',
                        itemId : 'emailUser',
                        emptyText: 'Enter the Email Address of the User',
                        afterLabelTextTpl: required
                    },
                    {
                        xtype: 'textfield',
                        allowBlank:false,
                        fieldLabel: 'First Name',
                        name: 'userFirstName',
                        emptyText: 'Enter the First Name of the User',
                        afterLabelTextTpl: required
                    },

                    {
                        xtype: 'textfield',
                        allowBlank:false,
                        fieldLabel: 'Last Name',
                        name: 'userLastName',
                        emptyText: 'Enter the Last name of the User',
                        afterLabelTextTpl: required
                    },
                    {
                         xtype: 'fieldcontainer',
                        fieldLabel: 'Phone Number',
                        name: 'phoneNumber',
                        //maxLength: 14,                       
                        id: 'phoneNumberUser',
                        //emptyText: 'Enter the Phone Number of the User',
                        afterLabelTextTpl: required,
                        layout:'hbox',
                        items:[
                        {                            
                             xtype: 'textfield',
                             width:60,                            
                             allowBlank:false,
                             maskRe: /[0-9.]/,
                             itemId: 'phoneNumberUser1',
                             minLength:3,
                             maxLength:3,
                             margin:'0 6 0 0'
                        },{
                             html:'-',
                             border:false,
                             margin:'1 0 0 0'
                        },{
                            xtype: 'textfield', 
                            width:60,                            
                            allowBlank:false,
                             itemId: 'phoneNumberUser2',
                             maskRe: /[0-9.]/,
                             minLength:3,
                             maxLength:3,
                             margin:'0 6 0 6'
                        },{
                             html:'-',
                             border:false,
                             margin:'1 0 0 0'
                        },{                            
                            xtype: 'textfield',
                            width:80,                            
                            allowBlank:false,
                             itemId: 'phoneNumberUser3',
                             maskRe: /[0-9.]/,
                             minLength:4,
                             maxLength:4,
                             margin:'0 0 0 6'
                        }]
                    },
                    {
                        //changed by kejal from radiofield to checkboxfield
                        xtype: 'checkboxfield',
                        fieldLabel: 'Is Admin',
                        afterLabelTextTpl: required,
                        name: 'userIsAdmin',
                        id : 'userIsAdmin',
                        checked   : false,
                        inputValue:'1',
                        uncheckedValue:'0'
                    }
               ]
            }

        ]
    }]

})
