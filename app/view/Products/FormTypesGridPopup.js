/**
 * Created by surabhimendiratta on 12/14/13.
 */
Ext.define('EDGAR.view.products.FormTypesGridPopup',{
    extend: 'Ext.window.Window',
    requires:[
        'Ext.ux.form.SearchFormTypes'],
    id: 'formTypesPopup' ,
    xtype:'formTypesPopup',
    renderTo: Ext.getBody(),
    width: 700,
    height:270,
    title: 'Form Types',
    autoScroll: true,
    bodyPadding: 10,
    constrain: true,
    modal:true,
//    minWidth:500,
//    minHeight:250,
//    maxWidth:500,
//    maxHeight:250,
    color: '#fff',
    closeAction: 'close',
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
                    xtype: 'searchFormTypes',//edited by kejal
                    cls:'searchBox',
                    flex : 1,
//                    margin: 2,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function()
                        {
//                          var store = this.up('tablepanel').store;
                            var store = Ext.getStore('FormTypes');
                            store.clearFilter();

                            var searchTemp = this.value;
//                          var forSearchUse = '/'+ searchTemp +'/i';
                            var filters = [
                                new Ext.util.Filter
                                ({
                                    filterFn: function(item)
                                    {
                                        return (item.get('formType').toLowerCase().match(searchTemp.toLowerCase())!=null)
                                            || (item.get('formDescription').toLowerCase().match(searchTemp.toLowerCase())!=null)
                                            || (item.get('dateType').toLowerCase().match(searchTemp.toLowerCase())!=null);
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
    buttons:[
        {
            text: 'Cancel',
            handler: function(){
                Ext.getCmp('formTypesPopup').close();
            }
        },
        {
            text: 'Select',
            itemId: 'formTypesPopupSelectBtn'
        }

    ],
    items:[
        {
            xtype: 'grid',
            itemId: 'formTypesGrid',
            store: 'FormTypes',
            columnLines: true,
            columns:[

                {

                    text: "Form Type",
                    dataIndex: 'formType',
//                    flex: 1

                },
                {

                    text: "Form Description",
                    dataIndex: 'formDescription',
                    flex: 2

                },
                {

                    text: "Date Type",
                    dataIndex: 'dateType',
                    flex: 1


                },
            ]

        }],
//    flex: 1

});