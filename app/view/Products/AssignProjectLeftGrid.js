/**
 * Created by surabhimendiratta on 12/9/13.
 */
Ext.define('EDGAR.view.Products.AssignProjectLeftGrid',{
    extend: 'Ext.grid.Panel',
    requires:[
        'EDGAR.store.CustomerUser',
        'Ext.tip.QuickTipManager',
        'Ext.ux.form.SearchCustomerUsers'//added by kejal
    ],
    store: 'AssignUserLeftGridStore',
    columnLines: true,
    alias : 'widget.assignProjectLeftGrid',
    height: 350,
    forceFit: true,

    dockedItems: [
        {
            xtype: 'panel',
            dock: 'top',
            height:40,
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
                    xtype: 'searchcustomerusers',
                    cls:'searchBox',
                    //id:'searchBox',
                    flex : 1,
//                    margin: 2,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function()
                        {
                            var store = Ext.getStore('AssignUserLeftGridStore');
                            store.clearFilter();

                            var searchTemp = this.value;
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

    columns: [
        {

            text: "First Name",
            dataIndex: 'nameFirst'

        },
        {
            text: "Last Name",
            dataIndex: 'nameLast'

        }

    ],

    flex: 5
});