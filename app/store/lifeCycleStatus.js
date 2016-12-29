/**
 * Created with JetBrains WebStorm.
 * User: surabhimendiratta
 * Date: 11/19/13
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('EDGAR.store.lifeCycleStatus', {
    extend:'Ext.data.Store',
    storeId:'lifeCycleStatus',
    data: [
        {name:"Uploaded"},
        {name:"Published"}
    ],
    fields:['name']
});