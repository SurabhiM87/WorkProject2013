/**
 * Created with JetBrains WebStorm.
 * User: surabhimendiratta
 * Date: 10/9/13
 * Time: 2:38 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('EDGAR.view.Products.CustomerGridButtons',{
    extend: 'Ext.panel.Panel',
    id:'myCustomerGridBtns',
    alias : 'widget.myCustomerGridBtns',

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
            text : 'Add New Registrant',
            id: 'newCustomerBtn',
            width:120,
            height:30,
            margin: '5 5 5 5'
        },
        {
            xtype: 'button',
            text : 'Delete Registrant',
            id: 'deleteCustomerBtn',
            width:120,
            height:30,
            margin: '5 5 5 5',
            disabled: true
//            ui:'normal'
        },
        {
            xtype: 'button',
            text : 'Edit Registrant Information',
            id: 'editCustomerBtn',
            width:150,
            height:30,
            margin: '5 5 5 5',
            disabled: true
//            top:10
        },
//        {
//            xtype: 'button',
//            text : 'Manage Users',
//            id: 'manageCustUsersBtn',
//            width:120,
//            height:30,
//            margin: '5 5 5 400'
////            top:10
//        }
    ]
});