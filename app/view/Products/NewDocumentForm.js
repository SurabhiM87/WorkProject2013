/**
 * Created by surabhimendiratta on 11/19/13.
 */
var years = [];

y = 2000;
while (y<=2013){
    years.push([y]);
    y++;
}

var yearStore = new Ext.data.SimpleStore
({
    fields : ['years'],
    data : years
});
var required = '<span style="color:red;" data-qtip="Required">*</span>';
Ext.define('EDGAR.view.products.NewDocumentForm',{
    extend: 'Ext.window.Window',
    id: 'newDocumentPopup',
    xtype: 'newocumentPopup',
//    renderTo: Ext.getBody(),
    width: 700,
//    height:270,
    title: 'New Project Window',
    autoScroll: true,
    bodyPadding: 10,
    constrain: true,
    modal:true,
    minWidth:700,
//    minHeight:350,
    masxWidth:700,
//    maxHeight:350,
    color: '#fff',
    closeAction :'close',
    requires:[
        'EDGAR.store.FormTypes'],
    items:[{
        xtype: 'form',
        id: 'newDocumentForm',
        width:'300',
        border:0,
        bodyStyle: 'padding:5px 5px 0',
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 140,
            msgTarget: 'side'
        },
//        TrackResetOnLoad: "true",
//
        buttons: [
            {
                text: 'Cancel',
                itemId: 'newProjCancelBtn'

            },
            {
                text: 'Next',
                formBind: true, //only enabled once the form is valid

                //disabled: true,
                itemId: "newProjectNextBtn",
                bodyStyle: {
                    'background-color': '#3291d6'
                }
            }

        ],
        items:[
            {
                xtype: 'fieldset',
                title: 'Project Information',
                defaults: {
                    anchor: '100%'
                },
                layout: 'anchor',
                items:[
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Form Type',
                        combineErrors: true,
                        msgTarget : 'side',
                        layout: 'hbox',
                        afterLabelTextTpl: required,
                        items:[
                            {
                                xtype: 'textfield',
                                id: 'tbxFormType',
                                width: 190,
                                disabled: true,
                                disabledCls:  "disabledFormTypeTextboxCls",
                                allowBlank: false
//                                flex: 1

                            },
                            {
                                xtype: 'button',
                                text: 'Select Form',

                                itemId:'selectFormTypeBtn',
                                width: 70
//                                padding: '5',
//                                flex: 1

                            }
                        ]

                    },
//                    {
//                        xtype: 'combobox',
//                        allowBlank:false,
//                        fieldLabel: 'Form Type',
//                        store: 'FormTypes',
//                        valueField: 'formType',
//                        displayField: 'formType',
//                        //name: 'formType',
//                        id: 'cbxformType',
//                        triggerAction: 'all',
//                        afterLabelTextTpl: required,
//                        emptyText: 'Please select a value of Form Type from the list'
////                        listeners: {
////                            beforerender: function(combo){
////                                var recordSelected = combo.getStore().getAt(0);
////                                combo.setValue(recordSelected.get(combo.valueField));
////                            }
////                        }
//
//                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Form Description',
                        id: 'fieldContFormDescription',
                        hidden: true,
//                        allowBlank: false,
//                        disabled: true,
//                        disabledCls:  "disabledTextboxCls"
                        items:[
                            {
                                xtype: 'label',
                                id: 'lblFormDescription'


                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Period Type',
                        id: 'fieldContPeriodType',

//                        disabled: true,
//                        disabledCls:  "disabledTextboxCls",
//                        combineErrors: true,
//                        hidden:true,
//                        msgTarget : 'side',
                        layout: 'hbox',
                        defaults: {
                            flex: 1,
                            hideLabel: true
                        },
                        items: [
                            {
                                xtype     : 'label',
                                id: 'lblPeriodType',
                                name      : 'tbxPeriodType',
//                                disabled: true,
//                                disabledCls:  "disabledTextboxCls",
//                                margin: '0 5 0 0',
                                allowBlank: false
                            },
                            {
                                xtype     : 'datefield',
                                format: 'Y-m-d',
                                name      : 'tbxFormDate',
                                id:'tbxFormDate',
                                fieldLabel: 'Date',
//                                disabled: true,
//                                disabledCls:  "disabledTextboxCls",
                                emptyText: 'Enter Date',
                                afterLabelTextTpl: required,
                                allowBlank: false
                            }
                        ]
                    },
                    {
                        xtype: 'datefield',
                        id:'tbxDeadlineDate',
                        format: 'Y-m-d',

                        minValue : new Date(),
                        fieldLabel: 'Deadline Date',
                        disabled: true,
                        disabledCls:  "disabledTextboxCls",
                        emptyText: 'Enter Date',
                        afterLabelTextTpl: required,
                        allowBlank: false
                    },

                    {
                        xtype          : 'combobox',
                        id: 'tbxYear',
                        fieldLabel      : 'Year',
                        //name          : 'year',
                        store          : yearStore ,
                        mode          : 'local',
                        anchor          : '-15 40%',
                        triggerAction : 'all',
                        selectOnFocus : true,
                        editable      : false,
                        displayField  : 'years',
                        value          : '2008',
                        forceSelection: true,
                        disabled: true,
                        disabledCls:  "disabledTextboxCls",
                        emptyText: 'Select Year',
                        afterLabelTextTpl: required,
                        allowBlank: false
                    },

                    {
                        xtype: 'textfield',
                        id: 'tbxFilingDescription',
                        //name: 'filingDescription',
                        fieldLabel: 'Additional Filing Description',
                        disabled: true,
                        disabledCls:  "disabledTextboxCls",
                        emptyText: 'Add description here'

                    },

                    {   xtype: 'textfield',
                        id: 'tbxJobName',
//                        allowBlank:false,
                        fieldLabel: 'Project Name',
                        //name: 'jobName',
                        emptyText: 'Name of the Project',
                        disabled: true,
                        disabledCls:  "disabledFormTypeTextboxCls"
                    },




                ]


            }
        ]

    } ]


})