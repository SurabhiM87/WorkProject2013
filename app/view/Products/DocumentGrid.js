//Ext.Loader.setConfig({enabled: true});
//Ext.Loader.setPath('Ext.ux', '../ux');
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.ux.grid.FiltersFeature',
    'Ext.toolbar.Paging'
]);

var filters = {

    ftype: 'filters',
    local: true,
    filters: [ {
        type: 'string',
        dataIndex: 'jobNo',
        align: 'center',

    },{
        type: 'date',
        dataIndex: 'modifiedOn',
        align: 'center',
    },{
        type: 'int',
        dataIndex: 'year',
        itemId: 'year',
        align: 'center',
        //store: 'Document',
    },{
        type: 'string',
        dataIndex: 'formType',
        align: 'center',
        disabled: true
    },{
        type: 'string',
        dataIndex: 'modifiedBy',
        align: 'center',
        disabled: true
    }, {
        type: 'list',
        dataIndex: 'lifeCycleState',
        align: 'center',
        options: ['uploaded', 'published'],
        phpMode: true
    },{
        type: 'list',
        dataIndex: 'action',
        align: 'center',
//            phpMode: true
    },{
        type: 'numeric',
        align: 'center',
        dataIndex: 'version'
    },
        {
            type: 'string',
            align: 'center',
            dataIndex: 'description'
        },
        {
            type: 'numeric',
            align: 'center',
            dataIndex: 'userCount'
        },
        {
            type: 'date',
            dataIndex: 'filingDeadline',
            align: 'center'
        },

    ]
}


var createHeaders =  function (finish,start){

    var columns =  [{
        dataIndex: 'jobNo',
        text: 'Project Name',
        filterable: true,
        flex: 1.25   ,
        filter: {type: 'string'}
    },
        {
        dataIndex: 'modifiedOn',
        text: 'Last Modified On',
        renderer: Ext.util.Format.dateRenderer('M d, Y g:i A'),
        filterable: true,
        flex: 1,
        emptyText: 'Not Modified'
    },{
        dataIndex: 'year',
        text: 'Year',
        flex: 0.5,
        filter: {type: 'int'},
        emptyText: 'Not Modified'
    }, {
        dataIndex: 'formType',
        text: 'Form Name',
        flex: 0.5,
        filter: {
            type: 'string'  // specify type here or in store fields config
        }
    }, {
        dataIndex: 'modifiedBy',
        text: 'Last Modified By',
        flex: 1,
        filter: {
            type: 'string'  // specify type here or in store fields config
        }
    },{
        dataIndex: 'lifeCycleState',
        text: 'State',
        flex: 0.5,
        filter: {
            type: 'list',
            options: ['Uploaded', 'Published']
            //,phpMode: true
        }
    },  {
        dataIndex: 'action',
        text: 'Action',
        flex: 0.5

    },
    {
        dataIndex: 'description',
        text: 'Filing Description',
        filter: {
            type: 'string'  // specify type here or in store fields config
        },
        hidden:true
    },
        {
            dataIndex: 'userCount',
            text: 'Users',
            flex: 0.25

        },
        {
            dataIndex: 'filingDeadline',
            header: 'Time Left for Filing',
            flex: 0.65,
            filterable: true,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {


                switch(record.data.deadlineIcon){
                    case 'Green':
                        metaData.tdCls = 'greenIcon';
//                        return value + Ext.String.format('<img src="../resources/icons/Green_256.png"/>',Ext.BLANK_IMAGE_URL) ;
                        break;
                    case 'Yellow':
                        metaData.tdCls = 'yellowIcon';

                        break;
                    case 'Amber':
                        metaData.tdCls = 'amberIcon';

                        break;
                    case 'Red':
                        metaData.tdCls = 'redIcon';
                        break;
                }
                return value;
            }

        }

    ];

    return columns.slice(start || 0, finish);
}

Ext.define('EDGAR.view.Products.DocumentGrid',{
        extend: 'Ext.grid.Panel',
        viewConfig: {
            stripeRows: true
        },
        border: true,
        columnLines: true,
        alias : 'widget.documentGrid',
        id: 'documentGrid',
        store: 'Project',
        columns: createHeaders(10),
        features: [filters],
        forceFit: true,


        loadMask: true

    }
);