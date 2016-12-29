var userId;

Ext.define('EDGAR.controller.Main', {
    extend: 'Ext.app.Controller',

    init: function(){
          this.control({
           'gridUsers': {
                 cellclick: this.onUserRowClick,
                 select: this.gridSelect,
               selectionchange: this.onUserSelectionChange

               },
              '#deleteBtn':{
                  click: this.onDeleteBtnClick
              },
              '#editBtn':{
                  click: this.onEditBtnClick
              },
              '#newUserBtn':{
                  click: this.onNewUserBtnClick
              }
             })
         },

    gridSelect: function(){
            Ext.getCmp('deleteBtn').enable(false);
            Ext.getCmp('editBtn').enable(false);

    },

    onDeleteBtnClick: function(){

        var userListGrid = Ext.getCmp('gridUsers');
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete this User?', this.deleteUser);


    },

    deleteUser: function(){
                 var userListGrid = Ext.getCmp('gridUsers');
        var store = userListGrid.getStore();
        var currentSelectedUser = userListGrid.getSelectionModel().getSelection()[0].data.id;
        $.ajax({
            type:"POST",
            url: serverLocation + "UserGridDelete",
            data: {
                UserId: currentSelectedUser
            }
        }).done(function(msg){
                store.load();
                Ext.getCmp('userInformation').getForm().reset();
            })
    },

    onEditBtnClick:function(){

        Ext.getCmp('saveChangesbtn').enable(false);
        Ext.getCmp('closebtn').enable(false);
        Ext.getCmp('tbxuserName').enable(false);
        Ext.getCmp('tbxpassword').enable(false);
       Ext.getCmp('tbxfrstName').enable(false);
        Ext.getCmp('tbxlastName').enable(false);
        Ext.getCmp('tbxphoneNumber').enable(false);
        Ext.getCmp('tbxisAdmin').enable(false);
        Ext.getCmp('gridUsers').rows.disable();

    },

    onUserRowClick: function(view, td, cellIndex, record, tr, rowIndex, e){

        var userListGrid = Ext.getCmp('gridUsers').getSelectionModel().getLastSelected();

        Ext.getCmp('tbxuserName').setValue(userListGrid.get('userName'));

        Ext.getCmp('tbxpassword').setValue(userListGrid.get('password'));

        Ext.getCmp('tbxfrstName').setValue(userListGrid.get('firstName'));

        Ext.getCmp('tbxlastName').setValue(userListGrid.get('lastName'));

        Ext.getCmp('tbxphoneNumber').setValue(userListGrid.get('phoneNumber'));

        Ext.getCmp('tbxisAdmin').setValue(userListGrid.get('isAdmin'));

        Ext.getCmp('tbxcreatedOn').setValue(userListGrid.get('createdOn'));

        Ext.getCmp('tbxmodifiedOn').setValue(userListGrid.get('modifiedOn'));

        Ext.getCmp('tbxcreatedBy').setValue(userListGrid.get('createdBy'));

        Ext.getCmp('tbxmodifiedBy').setValue(userListGrid.get('modifiedBy'));




    },

    onUserSelectionChange: function(){

        Ext.getCmp('saveChangesbtn').disable(false)
        Ext.getCmp('tbxuserName').disable(false);
        Ext.getCmp('tbxpassword').disable(false);
        Ext.getCmp('tbxfrstName').disable(false);
        Ext.getCmp('tbxlastName').disable(false);
        Ext.getCmp('tbxphoneNumber').disable(false);
        Ext.getCmp('tbxisAdmin').disable(false);
//        Ext.getCmp('tbxcreatedBy').enable(false);
//        Ext.getCmp('tbxmodifiedBy').enable(false);
    },

    onNewUserBtnClick: function(){
        var modalPanel = Ext.getCmp('newUserPanelPopup');

        if (modalPanel){
            modalPanel.show();
        }
    else {
            Ext.getCmp('viewport').add({
                xtype: 'newUserPanelPopup'
            });
            Ext.create('EDGAR.view.products.NewUserPanel').show();
            modalPanel.getForm().reset();
        }



    }


});