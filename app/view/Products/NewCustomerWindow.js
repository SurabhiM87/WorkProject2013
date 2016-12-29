/**
 * Created with JetBrains WebStorm.
 * User: surabhimendiratta
 * Date: 10/9/13
 * Time: 3:50 PM
 * To change this template use File | Settings | File Templates.
 */

var required = '<span style="color:red;" data-qtip="Required">*</span>';
Ext.define('EDGAR.view.products.NewCustomerWindow',{
    extend: 'Ext.window.Window',
    id: 'newCustomerPanelPopup',
    xtype: 'newCustomerPanelPopup',
    renderTo: Ext.getBody(),
    width: 720,
    height:290,
    title: 'New Registrant Window',
    autoScroll: true,
    bodyPadding: 10,
    constrain: true,
    modal:true,
    minWidth:500,
//    minHeight:350,
//    maxWidth:700,
//    maxHeight:350,
    color: '#fff',
    closeAction: 'close',
    items:[{
        xtype: 'form',
        id: 'newCustomerForm',
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

                //disabled: true,
                //id: "submitBtn",
                handler: function(){
                    var form = this.up('form').getForm();

                    if(form.isValid()){
                        $.ajax({
                            type: "POST",
                            url: serverLocation + 'CreateNewCustomer',
                            data: {
                                customerName: Ext.getCmp('customerName').value,
                                address1:Ext.getCmp('address1').value,
                                address2: Ext.getCmp('address2').value,
                                customerPrimPhone:Ext.getCmp('customerPrimPhone').getComponent('customerPrimPhone1').value+Ext.getCmp('customerPrimPhone').getComponent('customerPrimPhone2').value+Ext.getCmp('customerPrimPhone').getComponent('customerPrimPhone3').value,
                                customerSecPhone: Ext.getCmp('customerSecPhone').getComponent('customerSecPhone1').value+Ext.getCmp('customerSecPhone').getComponent('customerSecPhone2').value+Ext.getCmp('customerSecPhone').getComponent('customerSecPhone3').value,
                                customerFax:Ext.getCmp('customerFax').getComponent('customerFax1').value+Ext.getCmp('customerFax').getComponent('customerFax2').value+Ext.getCmp('customerFax').getComponent('customerFax3').value

                            }
                        }).done(function(msg){

                                form.reset();

                                Ext.getCmp("newCustomerPanelPopup").hide();

                                Ext.getStore('CustomerStore').reload();

                                Ext.Msg.alert('Success!', 'New customer added successfully!');
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
                    Ext.getCmp('newCustomerPanelPopup').close();
                }
            }

        ],
        items:[
            {
                xtype: 'fieldset',
                title: 'Registrant Information',
                defaults: {
                    anchor: '100%'
                },
                layout: 'anchor',
                items:[
                    {   xtype: 'textfield',
                        allowBlank:false,
                        fieldLabel: 'Registrant Name',
                        name: 'customerName',
                        id : 'customerName',
                        emptyText: 'Enter the Name of the Customer',
                        afterLabelTextTpl: required
                    },
                    {
                        xtype: 'textfield',
                        allowBlank:false,
                        fieldLabel: 'Address Line 1',
                        name: 'address1',
                        id:    'address1',
                        emptyText: 'Enter the first line of Address',
                        afterLabelTextTpl: required

                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Address Line 2',
                        name: 'address2',
                        id: 'address2',
                        emptyText: 'Enter the second line of Address'
                    },
                    {                   
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Primary Phone Number',
                        name: 'customerPrimPhone',
                        id: 'customerPrimPhone',
                        //emptyText: 'Enter the Phone Number of the User',
                        afterLabelTextTpl: required,
                        layout:'hbox',
                        items:[
                        {                            
                             xtype: 'textfield',
                             width:60,                            
                             allowBlank:false,
                             itemId:'customerPrimPhone1',
                             maskRe: /[0-9.]/,
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
                            itemId:'customerPrimPhone2',
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
                            itemId:'customerPrimPhone3',
                             maskRe: /[0-9.]/,
                             minLength:4,
                             maxLength:4,
                             margin:'0 0 0 6'
                        }]
                    },
                    {
                        xtype: 'fieldcontainer',
                         fieldLabel: 'Secondary Phone Number',
                        name: 'customerSecPhone',
                        id : 'customerSecPhone',
                        //emptyText: 'Enter the Phone Number of the User',
                        layout:'hbox',
                        items:[
                        {                            
                             xtype: 'textfield',
                             width:60,  
                             maskRe: /[0-9.]/,
                             itemId : 'customerSecPhone1',
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
                             maskRe: /[0-9.]/,
                             itemId : 'customerSecPhone2',
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
                             maskRe: /[0-9.]/,
                             itemId : 'customerSecPhone3',
                             minLength:4,
                             maxLength:4,
                             margin:'0 0 0 6'
                        }]               
                    },
                    {
                        xtype: 'fieldcontainer',                        
                        fieldLabel: 'Fax Number',
                        name: 'customerFax',
                        id : 'customerFax',
                        layout:'hbox',
                        items:[
                        {                            
                             xtype: 'textfield',
                             width:60, 
                             maskRe: /[0-9.]/,
                              itemId : 'customerFax1',
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
                             maskRe: /[0-9.]/,
                              itemId : 'customerFax2',
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
                             maskRe: /[0-9.]/,
                              itemId : 'customerFax3',
                             minLength:4,
                             maxLength:4,
                             margin:'0 0 0 6'
                        }]
                    },
//                    {
//                        xtype: 'textfield',
//                        allowBlank:false,
//                       // vtype:'Email',//added by kejal
//                        fieldLabel: 'Primary Email',
//                        name: 'customerPrimEmail',
//                        id:  'customerPrimEmail',
//                        emptyText: 'Enter the Primary Email of the customer',
//                        afterLabelTextTpl: required
//                    },
//                    {
//                        xtype: 'textfield',
//                        fieldLabel: 'Secondary Email',
//                       // vtype:'Email',//added by kejal
//                        name: 'customerSecEmail',
//                        id:  'customerSecEmail',
//                        emptyText: 'Enter the Secondary Email of the customer'
//                    }
                ]


                    }
                ]

        } ]


})
