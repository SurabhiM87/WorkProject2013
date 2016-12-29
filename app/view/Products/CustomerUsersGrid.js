/**
 * Created with JetBrains WebStorm.
 * User: surabhimendiratta
 * Date: 10/14/13
 * Time: 10:25 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('EDGAR.view.Products.CustomerUsersGrid',{
    extend: 'Ext.grid.Panel',
    requires:[
        'EDGAR.store.CustomerUser',
        'Ext.tip.QuickTipManager',
        'Ext.ux.form.SearchCustomerUsers'//added by kejal
    ],
    store: 'CustomerUser',
    columnLines: true,
    alias : 'widget.gridCustomerUsers',
    //id: 'gridCustomerUsers',
//    height: 350,
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
                            var store = Ext.getStore('CustomerUser');
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
            text: "Is Super User",
            dataIndex: 'domain',
            hidden:true

        },
//        {
//            text: "Cutomer Name",
//            dataIndex: 'customerName',
//            hidden:true
//
//        },
        {
            text: "Created On",
            dataIndex: 'createdOn',
            //format: 'Y-m-d H:i:s',
            //flex: 1,
            renderer: Ext.util.Format.dateRenderer('M d, Y g:i A'),
            hidden:true

        },
        {
            //xtype: 'datecolumn',
            text: "Modified On",
            dataIndex: 'modifiedOn',
            //format: 'Y-m-d H:i:s',
            //flex: 1,
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
