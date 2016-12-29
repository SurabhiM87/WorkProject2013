/**
 * Created by surabhimendiratta on 12/9/13.
 */
Ext.define('EDGAR.view.Products.AssignProjectButtons',{
    extend: 'Ext.panel.Panel',
    alias : 'widget.assignProjectBtns',
    layout: {
        type: 'auto',       // Arrange child items vertically
        padding: '5 5 5 5'
    },


    items:[
        {
            xtype: 'button',
            text : '->',
            itemId: 'assignUsertoProjectBtn',
            width:40,
            height:25,
            margin: '180 5 5 5',
            disabled: true
        },
        {
            xtype: 'button',
            text : '<-',
            itemId: 'removeUserFrmProjBtn',
            width:40,
            height:25,
            margin: '5 5 5 5',
            disabled: true

        },

    ]
});