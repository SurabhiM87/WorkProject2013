/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

Ext.application({
    name: 'EDGAR',

    views: [
        'Login',
        'Viewport',
        'MainPage',
        'EDGAR.view.Products.DocumentGrid',
        'FileGrid',
        'EDGAR.view.Products.UserGrid',
        'EDGAR.view.Products.UserGridButtons',
        'EDGAR.view.Products.UserInformation',
        'EDGAR.view.Products.CustomerGrid',
        'EDGAR.view.Products.CustomerInformation',
        'EDGAR.view.Products.CustomerGridButtons',
        'EDGAR.view.Products.CustomerUsersViewport',
        'EDGAR.view.Products.CustomerUsersGrid',
        'EDGAR.view.Products.CustomerUsersInformation',
        'EDGAR.view.Products.CustomerUsersGridButtons',
        'EDGAR.view.Products.AssignProjectViewport',
        'EDGAR.view.Products.AssignProjectButtons',
        'EDGAR.view.Products.AssignProjectLeftGrid',
        'EDGAR.view.Products.AssignProjectRightGrid',
        'EDGAR.view.Products.FilesViewport'


        //'EDGAR.view.Products.NewCustomerUsers'


    ],

    controllers: [
        'Main',
        'ViewportCont',
        'FileGridCont'
    ],
    models: [
        'MetaData'
    ],
    stores:[
        'Project',
        'User',
        'CustomerStore',
        'Log',
        'CustomerUser',
        'Files',
        'lifeCycleStatus',
        'FormTypes',
        'AssignUserRightGridStore',
        'AssignUserLeftGridStore'


    ],


    autoCreateViewport: true
});
