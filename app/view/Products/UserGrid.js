Ext.define('EDGAR.view.Products.UserGrid',{
    extend: 'Ext.grid.Panel',
    requires:[
        'EDGAR.store.User',
        'Ext.tip.QuickTipManager',
        'Ext.ux.form.SearchUsers'//added by kejal
    ],
    store: 'User',
    columnLines: true,
    alias : 'widget.gridUsers',
    id: 'gridUsers',
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
            layout:'hbox',
            items:[
                {
                    xtype:'label',
                    align: 'left',
                    html:'<span style="float:left; margin-left:5px; margin-top:10px;"><img height="20px"  src="resources/icons/Search-icon.png"/></span>',
                    iconCls: 'searchicons',

                    cls:'searchText'
                },

                {
                    xtype: 'searchusers',//edited by kejal
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
                                        return (item.get('nameFirst').toLowerCase().match(searchTemp.toLowerCase())!=null)
                                            || (item.get('nameLast').toLowerCase().match(searchTemp.toLowerCase())!=null);
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
            dataIndex: 'name',
            hidden:true

        },
        {

            text: "Password",
            dataIndex: 'password',
            hidden:true

        },
        {

            text: "First Name",
            dataIndex: 'nameFirst'

        },
        {
            text: "Last Name",
            dataIndex: 'nameLast'

        }  ,

        {
            text: "Phone Number",
            dataIndex: 'phone',
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
            renderer: Ext.util.Format.dateRenderer('M d, Y g:i A'),
            hidden:true

        },
        {
            text: "Modified On",
            dataIndex: 'modifiedOn',
            renderer: Ext.util.Format.dateRenderer('M d, Y g:i A'),
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

        },
        {
            text: "Is Deleted",
            dataIndex: 'isDeleted',
            hidden:true
        }


    ],

    flex: 5
});