 Ext.define('EDGAR.model.MetaData', {
     extend: 'Ext.data.Model',
     fields: [
         {name: 'userFirstName', type: 'string'},
         {name: 'userLastName',  type: 'string'},
         {name: 'userId',   type: 'int'},
         {name: 'customerId',   type: 'int'},
         {name: 'currentProjectId',   type: 'int'},
         {name: 'currentFileId',   type: 'int'},
         {name: 'role',  type: 'string'},
         {name: 'currSection', type: 'auto'},
         {name: 'formList', type: 'auto'}
     ]
 });
