/**
 * Created with JetBrains WebStorm.
 * User: surabhimendiratta
 * Date: 10/9/13
 * Time: 12:10 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('EDGAR.view.Products.CustomerGrid',{
    extend: 'Ext.grid.Panel',
    requires:[
        'EDGAR.store.CustomerStore',
        'Ext.tip.QuickTipManager',
        'Ext.ux.form.SearchCustomers'//added by kejal
    ],
    store: 'CustomerStore',
    columnLines: true,
    alias : 'widget.gridCustomers',
    id: 'gridCustomers',
    height: 350,
    forceFit: true,
    dockedItems: [
        {
            xtype: 'panel',
            dock: 'top',
            height:40,
            // the grid's column headers are a docked item with a weight of 100.
            // giving this a weight of 101 causes it to be docked under the column headers
            //weight: 101,
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
                    xtype: 'searchcustomers',//edited by kejal
                    cls:'searchBox',
                    flex : 1,
//                    margin: 2,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function()
                        {
                            var store = Ext.getStore('CustomerStore');
                            store.clearFilter();

                            var searchTemp = this.value;
                            var filters = [
                                new Ext.util.Filter
                                ({
                                    filterFn: function(item)
                                    {
                                        return (item.get('name').toLowerCase().match(searchTemp.toLowerCase())!=null);
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

            text: "ID",
            dataIndex: 'id',
            hidden:true
        },
        {

            text: "Registrant Name",
            dataIndex: 'name'

        },
        {

            text: "Address Line 1",
            dataIndex: 'address1',
            hidden:true

        },
        {

            text: "Address Line 2",
            dataIndex: 'address2',
            hidden:true

        },

        {
            text: "Primary Phone",
            dataIndex: 'phone1',
            hidden: true

        }  ,

        {
            text: "Secondary Phone",
            dataIndex: 'phone2',
            hidden:true

        },
        {
            text: "Fax",
            dataIndex: 'fax',
            hidden:true

        },
        {
            text: "Primary Email",
            dataIndex: 'email1',
            hidden:true

        },
        {
            text: "Secondary Email",
            dataIndex: 'email2',
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
