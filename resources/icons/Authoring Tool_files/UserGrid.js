Ext.define('EDGAR.view.Products.UserGrid',{
	extend: 'Ext.grid.Panel',
	requires:[
		'EDGAR.store.User',
		'Ext.tip.QuickTipManager'
    ],
    store: 'User',
    columnLines: true,
    alias : 'widget.gridUsers',
    //xtype:'gridUsers',
    id: 'gridUsers',

    //scroll: 'vertical',
    height: 350,
    forceFit: true,
    dockedItems: [
        {
            xtype: 'panel',
            dock: 'top',
            height:40,
            // the grid's column headers are a docked item with a weight of 100.
            // giving this a weight of 101 causes it to be docked under the column headers
//            weight: 101,
            bodyStyle: {
                'background-color': '#5b93da'
            },
            border:0,
//            margin:'3 0 0 0',
            items:[
                {
                    xtype:'label',
//                    html:'Search User:',
                    iconCls: 'icons',
                    icon: 'resources/icons/Search-icon.png',
                    cls:'searchText'
                },
                {
                    xtype: 'textfield',
                    cls:'searchBox',
                    flex : 1,
//                    margin: 2,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function()
                        {
//                          var store = this.up('tablepanel').store;
                            var store = Ext.getStore('User');
                            store.clearFilter();

                            var searchTemp = this.value;
//                          var forSearchUse = '/'+ searchTemp +'/i';
                            var filters = [
                                new Ext.util.Filter
                                ({
                                    filterFn: function(item)
                                    {
                                        return (item.get('firstName').toLowerCase().match(searchTemp.toLowerCase())!=null)
                                            || (item.get('lastName').toLowerCase().match(searchTemp.toLowerCase())!=null);
                                    }
                                })
                            ];
                            if (searchTemp)
                            {
                                store.filter(filters);
                            }
                        },
                        buffer: 500
                    }
                }
            ]
        }
    ],
//    selModel: Ext.create('Ext.selection.CheckboxModel', {
//        mode: 'SINGLE'
//    }),
    columns: [
    	{

            text: "ID",
            dataIndex: 'id',
            hidden:true
        },
        {

            text: "User Name",
            dataIndex: 'userName',
            hidden:true

        },
        {

            text: "Password",
            dataIndex: 'password',
            hidden:true

        },
        {

            text: "First Name",
            dataIndex: 'firstName'

        },
        {
            text: "Last Name",
            dataIndex: 'lastName'

        }  ,

        {
            text: "Phone Number",
            dataIndex: 'phoneNumber',
            hidden: true

        }  ,

        {
            text: "Domain",
            dataIndex: 'domain',
            hidden:true

        },
        {
            text: "Created On",
            dataIndex: 'createdOn',
            hidden:true

        },
        {
            text: "Modified On",
            dataIndex: 'modifiedOn',
            hidden:true

        },
        {
            text: "Created By",
            dataIndex: 'createdBy',
            hidden:true

        },
        {
            text: "Modified By",
            dataIndex: 'modifiedBy',
            hidden:true

        }

    ],

    flex: 5
});