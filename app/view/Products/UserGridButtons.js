    /**
 * Created with JetBrains WebStorm.
 * User: surabhimendiratta
 * Date: 9/23/13
 * Time: 6:36 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('EDGAR.view.Products.UserGridButtons',{
    extend: 'Ext.panel.Panel',
    id:'myUserGridBtns',
    alias : 'widget.myUserGridBtns',

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
            id: 'newUserBtn',
            width:120,
            height:30,
            margin: '5 5 5 5'
        },
        {
            xtype: 'button',
            text : 'Delete User',
            id: 'deleteBtn',
            width:120,
            height:30,
            margin: '5 5 5 5',
            disabled: true
//            ui:'normal'
        },
        {
            xtype: 'button',
            text : 'Edit User',
            id: 'editBtn',
            width:120,
            height:30,
            margin: '5 5 5 5',
            disabled: true
//            top:10
        }
        ]
});