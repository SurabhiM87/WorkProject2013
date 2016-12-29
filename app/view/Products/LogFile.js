/**
 * Created by surabhimendiratta on 11/4/13.
 */

Ext.require(['Ext.grid.*']);
Ext.define('EDGAR.view.products.LogFile', {
    extend: 'Ext.window.Window',
    requires:[
        'EDGAR.store.Log',
        'Ext.tip.QuickTipManager'
    ],
//    store: 'Log',
    id: 'logFile',
    xtype: 'logFile',
    height:Ext.getBody().getViewSize().height,
    width: 1000,
    title: 'LOG',
    bodyPadding: 10,
    constrain: true,
    modal:true,
    color: '#fff',
    closeAction :'close',
layout: 'fit',
//    forceFit: true,
//    layout: {
//        type: 'fit'
//        align: 'stretch'  // Child items are stretched to full width
//    },

    items:[{
        xtype: 'grid',
        requires:[
            'EDGAR.store.Log',
            'Ext.tip.QuickTipManager'
        ],
        store: 'Log',
        //scrollable: true,
        forceFit: true,

        columns:[

            {
                text: "ID",
                dataIndex: 'id',
                hidden: true
            },
            {

                text: "Entity",
                dataIndex: 'entity'

            },
            {

                text: "Action",
                dataIndex: 'action'

            },
            {

                text: "When",
                dataIndex: 'actionDateTime',
                renderer: Ext.util.Format.dateRenderer('M d, Y g:i A')


            },
            {
                text: "By",
                dataIndex: 'actionBy'
            }

        ]
    }],

    flex: 5

});