/**
 * Created with JetBrains WebStorm.
 * User: surabhimendiratta
 * Date: 9/25/13
 * Time: 7:12 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('EDGAR.view.Products.UserInformation',{
    extend: 'Ext.panel.Panel',
    title: 'User Information',
    height: 300,
    xtype: 'metaDataUserPanel',
    items: [
        {
            xtype: 'label',
            id: 'metaId',
            cls: 'metaId',
            html: 'ID: ________'
        },
        {
            xtype: 'label',
            id: 'metaFirstName',
            cls: 'metaFirstName',
            html: 'First Name: ________'
        },
        {
            xtype: 'label',
            id: 'metaLastName',
            cls: 'metaLastName',
            html: 'Last Name: ________'
        },
        {
            xtype: 'label',
            id: 'metaIsAdmin',
            cls: 'metaIsAdmin',
            html: 'Is Admin: ________'
        },
        {
            xtype: 'label',
            id: 'metaCreatedOn',
            cls: 'metaCreatedOn',
            html: 'Created On: ________'
        },
        {
            xtype: 'label',
            id: 'metaModifiedOn',
            cls: 'metaModifiedOn',
            html: 'Modified On: ________'
        },
        {
            xtype: 'label',
            id: 'metaCreatedBy',
            cls: 'metaCreatedBy',
            html: 'Created By: ________'
        },
        {
            xtype: 'label',
            id: 'metaModifiedBy',
            cls: 'metaModifedBy',
            html: 'Modified By: ________'
        }

    ]
})