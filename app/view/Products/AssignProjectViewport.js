/**
 * Created by surabhimendiratta on 12/9/13.
 */
var win =Ext.define('EDGAR.view.Products.AssignProjectViewport', {
    extend: 'Ext.container.Container',
    xtype: 'assignProjectViewport',
    alias : 'widget.assignProjectViewport',
    layout: 'border',
    height: 500,
    width: 620,
    title: 'Assign Project to Users',


    items: [
        {
            itemId: 'assignProjectBtns',
            xtype: 'assignProjectBtns',
            region: 'center',
            bodyStyle: {
                'background-color': '#5b93da'
            },
            border:1
        },
        {
            itemId: 'assignProjectLeftGrid',
            region: 'west',
            title: 'Users',
            xtype: 'assignProjectLeftGrid',
            split: true,
            scrollable: true

        },
        {
            itemId: 'assignProjectRightGrid',
            region: 'east',
            xtype: 'assignProjectRightGrid',
            title: 'User in this Project',
            split: true,
            scrollable: true
        }
    ]
});

