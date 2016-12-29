/**
 * Created by surabhimendiratta on 10/16/13.
 */
Ext.define('EDGAR.view.Products.CustomerUsersViewport', {
    extend: 'Ext.container.Container',
    requires:[
        'EDGAR.view.Products.CustomerUsersInformation',
        'EDGAR.view.Products.CustomerUsersGridButtons',
        'EDGAR.view.Products.CustomerUsersGrid'
    ],
    xtype: 'customerUserViewport',

    alias : 'widget.customerUserViewport',
//    Id: 'customerUserViewport',
    layout: 'border',
//    height: 00,
    width: 620,

    items: [
        {
        itemId: 'myCustomerUsersGridBtns',
        xtype: 'myCustomerUsersGridBtns',
        region: 'north',
        bodyStyle: {
            'background-color': '#5b93da'
        },

        border:0
    },
        {
        itemId: 'gridCustomerUsers',
        region: 'center',
            title: 'Users',
        xtype: 'gridCustomerUsers',
            width: '35%'

//        collapsible: true,
       // split: true,
        //width: 200,
        //layout: 'fit'

    },
        {
        itemId: 'customerUserInformationPanel',
        region: 'east',
        xtype: 'customerUserInformationPanel',
            title: 'User Information',
        split: true,
        //width: 200,
        collapsible: true,
            scrollable: true,
            width: '65%'
    }
    ]
});