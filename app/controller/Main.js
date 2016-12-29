var userId;
var loggedInCustomerId;
var selectedCustomerId;
var custUserId;
var controllerMain;
var loggedInUserId;
var selectedProjectId;

var companyName;
var year;
var formType;
var projectName;
var folderStructure;
var deadlineDate;


Ext.define('EDGAR.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.data.JsonStore',
        'Ext.Action'
    ],

    init: function () {

        Ext.Ajax.useDefaultXhrHeader = false;
        controllerMain = this;
        this.control({
            '#viewport': {
                boxready: this.onInit
            },
            'gridUsers': {
                cellclick: this.onUserRowClick,
                select: this.gridSelect,
                selectionchange: this.onUserSelectionChange

            },
            '#deleteBtn': {
                click: this.onDeleteBtnClick
            },
            '#editBtn': {
                click: this.onEditBtnClick
            },
            '#newUserBtn': {
                click: this.onNewUserBtnClick
            },
            '#userInformation':{
                dirtychange:this.onUserFormChange
            },
            '#cancelbtn': {
                click: this.onCancelBtnClick
            },
            '#saveChangesbtn': {
                click: this.onSaveBtnClick
            },

            '#loginScreenbutton': {
                click: this.onLogin

            },
            'gridCustomers': {
                cellclick: this.onCustomerRowClick,
                select: this.customerGridSelect

            },
            '#editCustomerBtn': {
                click: this.onCustomerEditBtnClick

            },
            '#customerInformation':{
                dirtychange:this.onCustomerFormChange
            },
            '#cancelCustomerbtn': {
                click: this.onCancelCustomerBtnClick
            },
            '#deleteCustomerBtn': {
                click: this.onDeleteCustomerBtn
            },
            '#newCustomerBtn': {
                click: this.onNewCustomerBtnClick
            },
            '#saveCustomerChangesbtn': {
                click: this.onSaveCustomerBtnClick
            },
            '#manageCustUsersBtn': {
                click: this.onManageCustUsersBtn
            },

            'gridCustomerUsers': {
                cellclick: this.onCustomerUserRowClick
            },
            '#editCustUserBtn': {
                click: this.onCustomerUserEditBtnClick

            },
            '#cancelCustomerUserbtn': {
                click: this.onCancelCustomerUserBtnClick
            },
            '#newCustUserBtn': {
                click: this.onNewCustomerUserbtnclick
            },

            '#customerUserInformationPanel':{
                dirtychange:this.onCustomerUserFormChange
            },
            '#saveCustomerUserChangesbtn': {
                click: this.onSaveCustomerUserChangesBtn
            },
            '#deleteCustUserBtn': {
                click: this.onDeleteCustUserBtn
            },
            '#viewLogBtn': {
                click: this.onViewLogBtnClick
            },
            '#mainPageLogOutBtn':{
                click: this.onLogOutClick
            },
            '#addDocBtn': {
                click: this.addDocBtnClick
            },
            '#companyCmbx': {
              select: this.onCompanySelect
            },
            '#mainPageManageCustUsersBtn': {
               click: this.onMainPageManageCustUsersBtnClick
            },
            'documentGrid':{

                celldblclick: this.onCellDoubleClick
            },
            '#newProjCancelBtn':{
                click: this.onNewProjCancelBtn
            },
            '#selectFormTypeBtn':{
                click: this.onSelectFormTypesBtnClick
             },
            '#cbxformType':{
                select: this.onCbxFormTypeSelect,
                selectionchange: this.onCbxFormTypeSelectionChange
            },
            '#formTypesPopupSelectBtn':{
                click: this.onFormTypesPopupSelectBtn
            },
            '#tbxFormDate':{
                select: this.onFormDateSelect
            },
            '#tbxDeadlineDate':{
                select: this.onDeadlineDateSelection
            },
            '#tbxYear': {
                select: this.onYearSelect
            },
            '#newProjectNextBtn':{
                click: this.onNewProjectNextBtnClick
            },
            '#assignUsertoProjectBtn':{
                click: this.onAssignUsertoProjectBtnClick
            },
            '#removeUserFrmProjBtn':{
                click: this.onRemoveUserFrmProjBtnBtn
            },
            'assignProjectLeftGrid': {
                cellclick: this.onAssignProjectLeftGridRowClick
            },
            '#assignProjectNextBtn':{
                click: this.onAssignProjectNextBtnClick
            },
            'assignProjectRightGrid': {
                cellclick: this.onAssignProjectRightGridRowClick
            },
            '#uploadFinishBtn':{
                click: this.onUploadFinishBtn
            },
            '#assignProjectFinishBtn':{
                click: this.onAssignProjectFinishBtnClick
            }




        })
    },

    onInit: function () {


        var cookieUserInfo = Ext.util.Cookies.get("userInfo");
        var cookieDecoded = Ext.urlDecode(cookieUserInfo);
        if (cookieUserInfo === null)
        {
            console.log("In Cooke Null loop")
            Ext.getCmp('mainPageLogOutBtn').hide();
            Ext.getCmp('mainTab').hide();
            Ext.getCmp("loginView").show();
            Ext.getCmp("welcomeName").hide();

        }
        else{
            Ext.create('Ext.data.Store', {
                model: 'EDGAR.model.MetaData',
                id: 'metaData',
                data : [
                    {userFirstName: cookieDecoded.nameFirst, userLastName: cookieDecoded.nameLast, userId: cookieDecoded.id, customerId: cookieDecoded.customerId, role: cookieDecoded.status},
                ]
            });

            var loggedInUser = cookieDecoded.nameFirst + " " + cookieDecoded.nameLast;
            loggedInCustomerId = cookieDecoded.customerId;
            loggedInUserId = cookieDecoded.id;
            var  welcomeText = Ext.getCmp("welcomeName");
            welcomeText.setText( loggedInUser + "  ");
            companyName = cookieDecoded.customerName;
            Ext.getCmp('companyLabelforRegistrant').setText(companyName);


            Ext.getCmp('mainPageLogOutBtn').show();
//            if (cookieUserInfo.indexOf('Administrator') > -1) {
            if (cookieDecoded.status === "Administrator"){

                console.log("Admin");
                Ext.getCmp("loginView").hide();
                Ext.getCmp('mainTab').show();
                $(".CUS_outterwrap").fadeIn(300);
                Ext.getCmp('adminHeadTab').tab.show();
                Ext.getCmp('customerUsersTab').tab.hide();
//                Ext.getCmp('mainTab').show('adminHeadTab',true),
                Ext.getCmp('addDocBtn').disable();
                welcomeText.show();
                Ext.getCmp('companyCmbx').show();
                Ext.getCmp('companyLabel').show();
//                Ext.getCmp('customerUsersTab').hide();

                //Ext.getCmp('mainTab').remove('customerUsersTab',true);
                Ext.getCmp('companyLabelforRegistrant').hide();
                Ext.getCmp('mainTab').setActiveTab(0);
            }

            else if(cookieDecoded.status === "User"){

                console.log("inUser");
                Ext.getCmp("loginView").hide();
                Ext.getCmp('mainTab').show();
                $(".CUS_outterwrap").fadeIn(300);
                Ext.getCmp('usersTab').tab.hide();
                Ext.getCmp('customerUsersTab').tab.hide();
                Ext.getCmp('addDocBtn').disable();
                welcomeText.show();
                Ext.getCmp('companyCmbx').show();
                Ext.getCmp('companyLabel').show();
//                Ext.getCmp('mainTab').remove('customerUsersTab',true);
                Ext.getCmp('companyLabelforRegistrant').hide();
                Ext.getCmp('mainTab').setActiveTab(0);
            }
            else if(cookieDecoded.status === "SuperUser"){
                console.log("inSuperUser");
                var customerUserStore = Ext.getStore('CustomerUser');
                customerUserStore.proxy.url = serverLocation + 'CustomerUsersGrid?customerId=' + loggedInCustomerId;
                customerUserStore.reload();

                Ext.getCmp('mainTab').show();
                Ext.getCmp('adminHeadTab').tab.hide();
                Ext.getCmp('customerUsersTab').tab.show();
                //Ext.getCmp('mainTab').remove('adminHeadTab',true);
                Ext.getCmp("loginView").hide();

//                Ext.getCmp('mainTab').setActiveTab('customerUsersTab');
                Ext.getCmp('mainPageSearchBox').enable(true);
                welcomeText.show();
                Ext.getCmp('companyCmbx').hide();
                Ext.getCmp('companyLabel').hide();
                Ext.getCmp('companyLabelforRegistrant').show();

                var store = Ext.getStore('Project');
                store.proxy.url = serverLocation + 'ProjectGrid?customerId=' + loggedInCustomerId;
                store.reload();
                Ext.getCmp('mainTab').setActiveTab(0);

                Ext.getCmp('addDocBtn').enable(true);
                Ext.getCmp('closeCustomerUserWindowBtn').hide();
            }
            else if(cookieDecoded.status === "CustomerUser")
            {
                console.log("CustomerUser");
                Ext.getCmp('mainTab').show();
                welcomeText.show();
                Ext.getCmp('adminHeadTab').tab.hide();
                Ext.getCmp('customerUsersTab').tab.hide();
                Ext.getCmp("loginView").hide();
                Ext.getCmp('companyCmbx').hide();
                Ext.getCmp('companyLabel').hide();
                Ext.getCmp('companyLabelforRegistrant').show();
                Ext.getCmp('mainPageSearchBox').enable(true);
                var store = Ext.getStore('Project');
                store.proxy.url = serverLocation + 'GetProjectListForRegistrantUsers?userId=' + loggedInUserId;;
                store.reload();
                Ext.getCmp('addDocBtn').hide();
//                Ext.getCmp('mainTab').setActiveTab(0);
            }
            else {
                Ext.Msg.alert('Failure!', 'Unable to load the tool! Please try again');
            }

            var store = Ext.getStore('AssignUserRightGridStore');

            store.removeAll();
        }


    },

    onLogin: function(){

        var form = Ext.getCmp('loginForm');

        var login = Ext.getCmp('loginView');

        if(form.isValid()){

            var userNameForCookie = Ext.getCmp('login_user').value;


            $.ajax({
                type: "Get",
                url: serverLocation + 'LoginUser',
                data: {
                    loginUsername: Ext.getCmp('login_user').value,

                    loginPassword: Ext.getCmp('login_password').value


                }
            }).done(function(msg){
                    Ext.create('Ext.data.Store', {
                        model: 'EDGAR.model.MetaData',
                        id: 'metaData',
                        data : [
                            {userFirstName: msg.nameFirst, userLastName: msg.nameLast, userId: msg.id, customerId: msg.customerId, role: msg.domain},
                        ]
                    });

                    Ext.util.Cookies.set('userInfo',"&id=" + msg.id +"&customerId=" + msg.customerId + "&userName=" + userNameForCookie + "&nameFirst=" + msg.nameFirst + "&nameLast=" + msg.nameLast + "&status=" + msg.domain);
                    var welcomeText = Ext.getCmp("welcomeName");
                    welcomeText.setText( msg.nameFirst + " " + msg.nameLast+ "  ");

                    loggedInCustomerId = msg.customerId;
                    loggedInUserId = msg.id;
                    // create cookies for "User"
                    if (msg.domain === "User")
                    {

//                        Ext.util.Cookies.set('userInfo',"customerId"+ msg.customerId+"userName="+ userNameForCookie + "nameFirst" + msg.nameFirst + "nameLast" + msg.nameLast + "&status=User");
                        Ext.getCmp("loginView").hide();
                        Ext.getCmp('mainTab').show();
                        Ext.getCmp('usersTab').tab.hide();
                        $(".CUS_outterwrap").fadeIn(300);
                        Ext.getCmp('customerUsersTab').tab.hide();
                        Ext.getCmp('addDocBtn').disable();
                        welcomeText.show();
                        Ext.getCmp('mainPageLogOutBtn').show();
                        Ext.getCmp('companyCmbx').show();
                        Ext.getCmp('companyLabel').show();

                        Ext.getCmp('companyLabelforRegistrant').hide();
                        Ext.getCmp('mainTab').setActiveTab(0);

                    }
                    // create cookies for "Administrator"
                    else if(msg.domain === "Administrator")
                    {

                        Ext.getCmp("loginView").hide();
//                        Ext.util.Cookies.set('userInfo',"customerId="+ msg.customerId+"&userName="+ userNameForCookie + "&nameFirst=" + msg.nameFirst + "&nameLast=" + msg.nameLast + "&status=Administrator");
                        Ext.getCmp('mainTab').show();
                        Ext.getCmp('adminHeadTab').tab.show();
                        $(".CUS_outterwrap").fadeIn(300);
                        Ext.getCmp('customerUsersTab').tab.hide();
                        Ext.getCmp('mainTab').setActiveTab('adminHeadTab');
//                        Ext.getCmp('mainTab').add('adminHeadTab');
//                        Ext.getCmp('mainTab').show('adminHeadTab',true),
                        Ext.getCmp('mainPageLogOutBtn').show();
                        Ext.getCmp('addDocBtn').disable();
                        Ext.getCmp('companyCmbx').show();
                        Ext.getCmp('companyLabel').show();

                        //Ext.getCmp('mainTab').remove('customerUsersTab',true);
                        Ext.getCmp('companyLabelforRegistrant').hide();
                        Ext.getCmp('mainTab').setActiveTab(0);

                        welcomeText.show();
                    }
                    // create cookies for "SuperUser"
                    else if(msg.domain === "SuperUser")
                    {
//                        Ext.util.Cookies.set('userInfo',"customerId="+ msg.customerId+"&userName="+ userNameForCookie + "&nameFirst=" + msg.nameFirst + "&nameLast=" + msg.nameLast + "&status=SuperUser");

                        Ext.getCmp("loginView").hide();
                        var store = Ext.getStore('CustomerUser');
                        store.proxy.url = serverLocation + 'CustomerUsersGrid?customerId=' + loggedInCustomerId;
                        store.reload();
                        $.ajax({
                            type: "GET",
                            url: serverLocation + 'GetCustomerName',
                            data: {
                                customerId: loggedInCustomerId
                            }
                        }).done(function(customerName){

                                Ext.util.Cookies.set('userInfo',"&id=" + msg.id +"&customerId=" + msg.customerId + "&userName=" + userNameForCookie + "&nameFirst=" + msg.nameFirst + "&nameLast=" + msg.nameLast + "&status=" + msg.domain + "&customerName=" + customerName);
                                companyName = customerName;
                                Ext.getCmp('mainTab').show();
//                                Ext.getCmp('mainTab').add('customerUsersTab');

                                Ext.getCmp('adminHeadTab').tab.hide();
                                Ext.getCmp('customerUsersTab').tab.show();
                                Ext.getCmp('mainPageLogOutBtn').show();
                                Ext.getCmp('mainPageSearchBox').enable(true);
                                Ext.getCmp('mainTab').setActiveTab(0);
                                Ext.getCmp('companyLabelforRegistrant').setText(customerName);
                                Ext.getCmp('companyCmbx').hide();
                                Ext.getCmp('companyLabel').hide();
                                Ext.getCmp('companyLabelforRegistrant').show();
                                var store = Ext.getStore('Project');
                                store.proxy.url = serverLocation + 'ProjectGrid?customerId=' + loggedInCustomerId;
                                store.reload();                                Ext.getCmp('addDocBtn').enable(true);                               Ext.getCmp('mainTab').setActiveTab(0);
                                Ext.getCmp('closeCustomerUserWindowBtn').hide();
                            })
                            .fail(function() {
                                alert( "Companyerror" );
                            });
                        welcomeText.show();
                    }
                    // create cookies for "CustomerUser"
                    else if (msg.domain === "CustomerUser")
                    {
                        Ext.getCmp("loginView").hide();
//                        Ext.util.Cookies.set('userInfo',"&customerId="+ msg.customerId+"&userName="+ userNameForCookie + "&nameFirst=" + msg.nameFirst + "&nameLast=" + msg.nameLast + "&status=CustomerUser");
                        Ext.getCmp('mainTab').show();
                        Ext.getCmp('mainPageLogOutBtn').show();
                        Ext.getCmp('mainPageSearchBox').enable(true);
                        Ext.getCmp('adminHeadTab').tab.hide();

                        welcomeText.show();

                        Ext.getCmp('addDocBtn').hide();


                        $.ajax({
                            type: "GET",
                            url: serverLocation + 'GetCustomerName',
                            data: {
                                customerId: loggedInCustomerId
                            }
                        }).done(function(customerName){
                                Ext.util.Cookies.set('userInfo',"&id=" + msg.id +"&customerId=" + msg.customerId + "&userName=" + userNameForCookie + "&nameFirst=" + msg.nameFirst + "&nameLast=" + msg.nameLast + "&status=" + msg.domain + "&customerName=" + customerName);
                                companyName = customerName;
                                Ext.getCmp('customerUsersTab').tab.hide();
                                Ext.getCmp('companyCmbx').hide();
                                Ext.getCmp('companyLabel').hide();
                                Ext.getCmp('companyLabelforRegistrant').show();
                                Ext.getCmp('companyLabelforRegistrant').setText(customerName);

                                var store = Ext.getStore('Project');
                                store.proxy.url = serverLocation + 'GetProjectListForRegistrantUsers?userId=' + loggedInUserId;
                                store.reload();




                            })
                            .fail(function() {
                                alert( "Companyerror" );
                            });
//                        Ext.getCmp('mainTab').setActiveTab(0);
                    }

                    else
                    {
                        Ext.Msg.alert('Failure!', 'User does not exist! Check your Username and password');
                        Ext.getCmp("loginView").show();
                        Ext.util.Cookies.set('userInfo', null);
                    }

                })
                .fail(function() {
                    alert( "error" );
                })

        }

    },

    onLogOutClick: function(){

        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to Log Out?', function(button){

            if (button === 'yes')
            {

                Ext.getCmp('mainPageLogOutBtn').hide();
                Ext.getCmp('mainTab').hide();

                Ext.util.Cookies.clear("userInfo");
                Ext.getCmp("loginView").show();
                Ext.getCmp("welcomeName").hide();
            }
            else
            {
                //Do nothing
            }
        });

    },

    gridSelect: function(){
        Ext.getCmp('deleteBtn').enable(false);
        Ext.getCmp('editBtn').enable(false);

    },

    onDeleteBtnClick: function(){

        var userListGrid = Ext.getCmp('gridUsers');
        var store = userListGrid.getStore();
        var currentSelectedUser = userListGrid.getSelectionModel().getSelection()[0].data.id;
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete this User?', function(button){

            if (button === 'yes')
            {
                $.ajax({
                    type:"POST",
                    url: serverLocation + "UserGridDelete",
                    data: {
                        UserId: currentSelectedUser,
                        deletedBy: loggedInUserId
                    }
                }).done(function(msg)
                    {
                        store.load();
                        Ext.getCmp('userInformation').getForm().reset();
                    })
            }
            else
            {
                // do something if No is clicked
            }
        });


    },

    onEditBtnClick:function(){

//        Ext.getCmp('saveChangesbtn').enable(false);
        Ext.getCmp('deleteBtn').disable(true);
        Ext.getCmp('cancelbtn').enable(false);
        //Ext.getCmp('tbxuserName').enable(false);

        Ext.getCmp('tbxfrstName').enable(false);
        Ext.getCmp('tbxlastName').enable(false);
        Ext.getCmp('tbxphoneNumber').enable(false);
        Ext.getCmp('chkbxisAdmin').enable(false);
        Ext.getCmp('gridUsers').setDisabled(true);

    },

    onUserRowClick: function(view, td, cellIndex, record, tr, rowIndex, e){

        var userListGrid = Ext.getCmp('gridUsers').getSelectionModel().getLastSelected();
        userId =   userListGrid.get('id');

        Ext.getCmp('tbxuserName').setValue(userListGrid.get('name'));

        Ext.getCmp('tbxfrstName').setValue(userListGrid.get('nameFirst'));

        Ext.getCmp('tbxlastName').setValue(userListGrid.get('nameLast'));

        Ext.getCmp('tbxphoneNumber').setValue(userListGrid.get('phone'));

        if ((userListGrid.get('domain'))==="Administrator")
        {Ext.getCmp('chkbxisAdmin').setValue(true);}
        else
        {Ext.getCmp('chkbxisAdmin').setValue(false);}

        Ext.getCmp('tbxcreatedOn').setValue(userListGrid.get('createdOn'));

        Ext.getCmp('tbxmodifiedOn').setValue(userListGrid.get('modifiedOn'));

        Ext.getCmp('tbxcreatedBy').setValue(userListGrid.get('createdBy'));

        Ext.getCmp('tbxmodifiedBy').setValue(userListGrid.get('modifiedBy'));

    },

    onUserSelectionChange: function(){

        //Ext.getCmp('saveChangesbtn').disable(false);
        Ext.getCmp('cancelbtn').disable(false);
        Ext.getCmp('tbxuserName').disable(false);
        Ext.getCmp('tbxfrstName').disable(false);
        Ext.getCmp('tbxlastName').disable(false);
        Ext.getCmp('tbxphoneNumber').disable(false);
        Ext.getCmp('chkbxisAdmin').disable(false);
//        Ext.getCmp('tbxcreatedBy').enable(false);
//        Ext.getCmp('tbxmodifiedBy').enable(false);
    },

    onNewUserBtnClick: function(){
        var modalPanel = Ext.getCmp('newUserPanelPopup');

        if (modalPanel){
            modalPanel.center();
            modalPanel.show();
            modalPanel.getComponent('newUserForm').getForm().reset();
        }
        else {
            Ext.getCmp('viewport').add({
                xtype: 'newUserPanelPopup'
            });
            var newUserPopup = Ext.create('EDGAR.view.products.NewUserPanel');
            newUserPopup.center();
            newUserPopup.show();
            Ext.getCmp('newUserPanelPopup').getComponent('newUserForm').getForm().reset();
            //Ext.getWindowArg('newUserPanelPopup').reset();
        }



    },

    onUserFormChange:function(){//edited by kejal
        Ext.getCmp('saveChangesbtn').enable(false);//edited by kejal
    },

    onCancelBtnClick: function(){
        Ext.getCmp('saveChangesbtn').disable(false);
        Ext.getCmp('cancelbtn').disable(false);
        Ext.getCmp('deleteBtn').enable(true);
        Ext.getCmp('tbxuserName').disable(false);

        Ext.getCmp('tbxfrstName').disable(false);
        Ext.getCmp('tbxlastName').disable(false);
        Ext.getCmp('tbxphoneNumber').disable(false);
        Ext.getCmp('chkbxisAdmin').disable(false);
        Ext.getCmp('gridUsers').setDisabled(false);
    },

    onSaveBtnClick: function(){


        Ext.getCmp('saveChangesbtn').disable(false);
        Ext.getCmp('deleteBtn').enable(true);
        Ext.getCmp('cancelbtn').disable(false);
        Ext.getCmp('tbxuserName').disable(false);

        Ext.getCmp('tbxfrstName').disable(false);
        Ext.getCmp('tbxlastName').disable(false);
        Ext.getCmp('tbxphoneNumber').disable(false);
        Ext.getCmp('chkbxisAdmin').disable(false);
        Ext.getCmp('gridUsers').setDisabled(false);

    },

    onCustomerRowClick: function(){

        var customerListGrid = Ext.getCmp('gridCustomers').getSelectionModel().getLastSelected();
        selectedCustomerId = customerListGrid.get('id');

        Ext.getCmp('manageCustUsersBtn').enable(false);
        Ext.getCmp('tbxcustomerName').setValue(customerListGrid.get('name'));
        Ext.getCmp('tbxaddress1').setValue(customerListGrid.get('address1'));
        Ext.getCmp('tbxaddress2').setValue(customerListGrid.get('address2'));
        Ext.getCmp('tbxcustomerPrimPhone').setValue(customerListGrid.get('phone1'));
        Ext.getCmp('tbxcustomerSecPhone').setValue(customerListGrid.get('phone2'));
        Ext.getCmp('tbxcustomerFax').setValue(customerListGrid.get('fax'));
//        Ext.getCmp('tbxcustomerPrimEmail').setValue(customerListGrid.get('email1'));
//        Ext.getCmp('tbxcustomerSecEmail').setValue(customerListGrid.get('email2'));

    },

    customerGridSelect: function(){
        Ext.getCmp('deleteCustomerBtn').enable(false);
        Ext.getCmp('editCustomerBtn').enable(false);
    },

    onCustomerEditBtnClick: function(){

//        Ext.getCmp('saveCustomerChangesbtn').enable(false);
        Ext.getCmp('deleteCustomerBtn').disable(true);
        Ext.getCmp('cancelCustomerbtn').enable(false);
        Ext.getCmp('tbxcustomerName').enable(false);
        Ext.getCmp('tbxaddress1').enable(false);
        Ext.getCmp('tbxaddress2').enable(false);
        Ext.getCmp('tbxcustomerPrimPhone').enable(false);
        Ext.getCmp('tbxcustomerSecPhone').enable(false);
        Ext.getCmp('tbxcustomerFax').enable(false);
//        Ext.getCmp('tbxcustomerPrimEmail').enable(false);
//        Ext.getCmp('tbxcustomerSecEmail').enable(false);
        Ext.getCmp('gridCustomers').setDisabled(true);
    },

    onCustomerFormChange:function(){//edited by kejal
        Ext.getCmp('saveCustomerChangesbtn').enable(false);//edited by kejal
    },

    onCancelCustomerBtnClick: function(){

        Ext.getCmp('deleteCustomerBtn').enable(true);
        Ext.getCmp('saveCustomerChangesbtn').disable(false);
        Ext.getCmp('cancelCustomerbtn').disable(false);
        Ext.getCmp('tbxcustomerName').disable(false);
        Ext.getCmp('tbxaddress1').disable(false);
        Ext.getCmp('tbxaddress2').disable(false);
        Ext.getCmp('tbxcustomerPrimPhone').disable(false);
        Ext.getCmp('tbxcustomerSecPhone').disable(false);
        Ext.getCmp('tbxcustomerFax').disable(false);
//        Ext.getCmp('tbxcustomerPrimEmail').disable(false);
//        Ext.getCmp('tbxcustomerSecEmail').disable(false);
        Ext.getCmp('gridCustomers').setDisabled(false);
    },

    onDeleteCustomerBtn: function(){

        var customerListGrid = Ext.getCmp('gridCustomers');
        var store = customerListGrid.getStore();
        var currentSelectedCustomer = customerListGrid.getSelectionModel().getSelection()[0].data.id;
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete this Customer?', function(button)
        {
            if (button === 'yes')
            {
                $.ajax({
                    type:"POST",
                    url: serverLocation + "CustomerGridDelete",
                    data: {
                        customerId: currentSelectedCustomer
                    }
                }).done(function(msg)
                    {
                        store.load();
                        Ext.getCmp('customerInformation').getForm().reset();
                    })
            }
            else
            {
                // do something if No is clicked
            }
        });
    },

    onNewCustomerBtnClick: function(){

        var modalPanel = Ext.getCmp('newCustomerPanelPopup');

        if (modalPanel){
            modalPanel.center();
            modalPanel.show();
            modalPanel.getComponent('newCustomerForm').getForm().reset();
        }
        else {
            Ext.getCmp('viewport').add({
                xtype: 'newCustomerPanelPopup'
            });
            var newCustomerPopup = Ext.create('EDGAR.view.products.NewCustomerWindow');
            newCustomerPopup.center();
            newCustomerPopup.show();
            Ext.getCmp('newCustomerPanelPopup').getComponent('newCustomerFormi').getForm().reset();
            //Ext.getWindowArg('newUserPanelPopup').reset();
        }

    },

    onSaveCustomerBtnClick:function(){
        Ext.getCmp('saveCustomerChangesbtn').disable(false);
        Ext.getCmp('cancelCustomerbtn').disable(false);
        Ext.getCmp('tbxcustomerName').disable(false);

        Ext.getCmp('tbxaddress1').disable(false);
        Ext.getCmp('tbxaddress2').disable(false);
        Ext.getCmp('tbxcustomerPrimPhone').disable(false);
        Ext.getCmp('tbxcustomerSecPhone').disable(false);
        Ext.getCmp('tbxcustomerFax').disable(false);
//        Ext.getCmp('tbxcustomerPrimEmail').disable(false);
//        Ext.getCmp('tbxcustomerSecEmail').disable(false);
        Ext.getCmp('gridCustomers').setDisabled(false);
    },

    onManageCustUsersBtn: function(){

        var store = Ext.getStore('CustomerUser');

        store.proxy.url =serverLocation + 'CustomerUsersGrid?customerId=' + selectedCustomerId;
        store.reload();

        var modalPanel = Ext.getCmp('custUserPanelpopup'+selectedCustomerId);

        if (modalPanel){
            modalPanel.center();
            modalPanel.show();

        }
        else{
            var win = Ext.create('Ext.window.Window', {
                modal:true,
//                layout:'absolute',
                id: 'custUserPanelpopup'+selectedCustomerId,
                renderTo: Ext.getBody(),
                layout:'fit',
                scrollable: true,
                constrain: true,
                bodyPadding: 10,
                height: 550,
                width: 650,
//                resizable: false,
//                plain: false,
                border: true,
                closeAction :'hide',
                //closable: true,
                items       : [
                    {

//                        closable : true,
                        xtype: 'customerUserViewport',
                        itemId: selectedCustomerId
                    },

                ],
                listeners: {
                    beforeclose: function(){
                        win.destroy();
                    }
                }
            });
//
            win.center();
            win.show();
        }


    },

    onCustomerUserRowClick:function(){

        var custUserViewPort;
        var customerUserInfo;

        var cookieUserInfo = Ext.util.Cookies.get("userInfo");
        var cookieDecoded = Ext.urlDecode(cookieUserInfo);

        if(cookieDecoded.status === "SuperUser"){
            custUserViewPort  = Ext.getCmp('customerUsersTab').getComponent('customerUserViewport');
        }
        else
        {
             custUserViewPort = Ext.getCmp('custUserPanelpopup'+selectedCustomerId).getComponent(selectedCustomerId);
        }
        customerUserInfo = custUserViewPort.getComponent('customerUserInformationPanel');
        var currentSelectedUser = custUserViewPort.getComponent('gridCustomerUsers').getSelectionModel().getLastSelected();

        custUserId =   currentSelectedUser.get('id');

        customerUserInfo.getComponent('tbxcustUserName').setValue(currentSelectedUser.get('name'));

        customerUserInfo.getComponent('tbxcustUserFirstName').setValue(currentSelectedUser.get('nameFirst'));

        customerUserInfo.getComponent('tbxcustUserLastName').setValue(currentSelectedUser.get('nameLast'));

        customerUserInfo.getComponent('tbxcustUserPhoneNumber').setValue(currentSelectedUser.get('phone'));

        if((currentSelectedUser.get('domain'))==="SuperUser")
        {
            customerUserInfo.getComponent('tbxisSuperUser').setValue(true);
        }
        else
        {
            customerUserInfo.getComponent('tbxisSuperUser').setValue(false);
        }



        customerUserInfo.getComponent('tbxcustUserCreatedOn').setValue(currentSelectedUser.get('createdOn'));

        customerUserInfo.getComponent('tbxcustUserModifiedOn').setValue(currentSelectedUser.get('modifiedOn'));

        customerUserInfo.getComponent('tbxcustUserCreatedBy').setValue(currentSelectedUser.get('createdBy'));

        customerUserInfo.getComponent('tbxcustUserModifiedBy').setValue(currentSelectedUser.get('modifiedBy'));

        custUserViewPort.getComponent('myCustomerUsersGridBtns').getComponent('deleteCustUserBtn').enable(false);

        custUserViewPort.getComponent('myCustomerUsersGridBtns').getComponent('editCustUserBtn').enable(false);
    },

    onCustomerUserEditBtnClick: function(){

        var popup;
        var cookieUserInfo = Ext.util.Cookies.get("userInfo");
        var cookieDecoded = Ext.urlDecode(cookieUserInfo);

        if(cookieDecoded.status === "SuperUser"){
            popup  = Ext.getCmp('customerUsersTab').getComponent('customerUserViewport');
        }
        else
        {
            popup = Ext.getCmp('custUserPanelpopup'+selectedCustomerId).getComponent(selectedCustomerId)
        }
        popup.getComponent('myCustomerUsersGridBtns').getComponent('deleteCustUserBtn').disable(true);
        var cancelBtn = popup.getComponent('customerUserInformationPanel').query('#cancelCustomerUserbtn');
        cancelBtn[0].enable(true);
        popup.getComponent('customerUserInformationPanel').getComponent('tbxcustUserName').enable(false);

        popup.getComponent('customerUserInformationPanel').getComponent('tbxcustUserFirstName').enable(false);
        popup.getComponent('customerUserInformationPanel').getComponent('tbxcustUserLastName').enable(false);
        popup.getComponent('customerUserInformationPanel').getComponent('tbxcustUserPhoneNumber').enable(false);
        popup.getComponent('customerUserInformationPanel').getComponent('tbxisSuperUser').enable(false);
        popup.getComponent('gridCustomerUsers').setDisabled(true);
    },

    onCancelCustomerUserBtnClick:function(){

        var popup;
        var cookieUserInfo = Ext.util.Cookies.get("userInfo");
        var cookieDecoded = Ext.urlDecode(cookieUserInfo);
        if(cookieDecoded.status === "SuperUser"){
            popup  = Ext.getCmp('customerUsersTab').getComponent('customerUserViewport');
        }
        else
        {
            popup = Ext.getCmp('custUserPanelpopup'+selectedCustomerId).getComponent(selectedCustomerId)
        }
        popup.getComponent('myCustomerUsersGridBtns').getComponent('deleteCustUserBtn').enable(true);
        var savebtn = popup.getComponent('customerUserInformationPanel').query('#saveCustomerUserChangesbtn');
        savebtn[0].disable(false);

        var cancelBtn = popup.getComponent('customerUserInformationPanel').query('#cancelCustomerUserbtn');
        cancelBtn[0].disable(false);

        popup.getComponent('customerUserInformationPanel').getComponent('tbxcustUserName').disable(false);
        popup.getComponent('customerUserInformationPanel').getComponent('tbxcustUserFirstName').disable(false);
        popup.getComponent('customerUserInformationPanel').getComponent('tbxcustUserLastName').disable(false);
        popup.getComponent('customerUserInformationPanel').getComponent('tbxcustUserPhoneNumber').disable(false);
        popup.getComponent('customerUserInformationPanel').getComponent('tbxisSuperUser').disable(false);
        popup.getComponent('gridCustomerUsers').setDisabled(false);

    },

    onNewCustomerUserbtnclick: function(){

//        var customerListGrid = Ext.getCmp('gridCustomers').getSelectionModel().getLastSelected();
//        currentCustomerId = customerListGrid.get('id');
        var modalPanel = Ext.getCmp('newCustUserPanelPopup');

        if (modalPanel){
            modalPanel.center();
            modalPanel.show();
            modalPanel.getComponent('newCustUserForm').reset();
        }
        else {
            console.log("I am in else loop of NewCustuserbtnclick");
            //var popup = Ext.getCmp('custUserPanelpopup'+ selectedCustomerId).getComponent(selectedCustomerId);
            //var customerUserViewPort = childTabs.getActiveTab()
            Ext.getCmp('viewport').add({

                xtype: 'newCustUserPanelPopup',
                itemId: 'newCustUserPanelPopup'

            });
            var newCustUserPopup= Ext.create('EDGAR.view.products.NewCustomerUsers');
            newCustUserPopup.center();
            newCustUserPopup.show();



        }
    },

    onCustomerUserFormChange:function(){//edited by kejal

        var popup;
        var cookieUserInfo = Ext.util.Cookies.get("userInfo");
        var cookieDecoded = Ext.urlDecode(cookieUserInfo);
        if(cookieDecoded.status==="SuperUser"){
            popup  = Ext.getCmp('customerUsersTab').getComponent('customerUserViewport');
        }
        else
        {
            popup = Ext.getCmp('custUserPanelpopup'+selectedCustomerId).getComponent(selectedCustomerId)
        }

        var savebtn = popup.getComponent('customerUserInformationPanel').query('#saveCustomerUserChangesbtn');
        savebtn[0].enable(true);
    },

    onSaveCustomerUserChangesBtn: function(){
        var popup;
        var cookieUserInfo = Ext.util.Cookies.get("userInfo");
        var cookieDecoded = Ext.urlDecode(cookieUserInfo);
        if(cookieDecoded.status==="SuperUser"){
            popup  = Ext.getCmp('customerUsersTab').getComponent('customerUserViewport');
        }
        else
        {
            popup = Ext.getCmp('custUserPanelpopup'+selectedCustomerId).getComponent(selectedCustomerId)
        }
        popup.getComponent('myCustomerUsersGridBtns').getComponent('deleteCustUserBtn').enable(true);
        var customerUserGrid = popup.getComponent('gridCustomerUsers');
        var store = customerUserGrid.getStore();
        var customerUserInformationPanel = popup.getComponent('customerUserInformationPanel');

        var form = customerUserInformationPanel.getForm();

        if(form.isValid()){
            $.ajax({
                type: "POST",
                url: serverLocation + 'SaveCustomerUserDetails',
                data: {
                    email: customerUserInformationPanel.query('#tbxcustUserName')[0].value,
                    userFirstName: customerUserInformationPanel.query('#tbxcustUserFirstName')[0].value,
                    userLastName: customerUserInformationPanel.query('#tbxcustUserLastName')[0].value,
                    phoneNumber:customerUserInformationPanel.query('#tbxcustUserPhoneNumber')[0].value,
                    userIsSuperUser: customerUserInformationPanel.query('#tbxisSuperUser')[0].value,
                    custUserId: custUserId,
                    modifiedBy: loggedInUserId

                }
            }).done(function(msg){
                    store.reload();
                    Ext.Msg.alert('Success', 'Changes saved successfully!');

                })

        }
        else{
            Ext.Msg.alert('Nothing to Save', 'Nothing Changed!');
        }


    },

    onDeleteCustUserBtn: function(){

        var popup;
        var cookieUserInfo = Ext.util.Cookies.get("userInfo");
        var cookieDecoded = Ext.urlDecode(cookieUserInfo);
        if(cookieDecoded.status==="SuperUser"){
            popup  = Ext.getCmp('customerUsersTab').getComponent('customerUserViewport');
        }
        else
        {
            popup = Ext.getCmp('custUserPanelpopup'+selectedCustomerId).getComponent(selectedCustomerId)
        }
        var customerUserGrid = popup.getComponent('gridCustomerUsers');
        var store = customerUserGrid.getStore();
        var currentSelectedUser = customerUserGrid.getSelectionModel().getLastSelected();
        custUserId =   currentSelectedUser.get('id');

        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete this User?', function(button)
        {
            if (button === 'yes')
            {
                $.ajax({
                    type:"POST",
                    url: serverLocation + "CustomerUserGridDelete",
                    data: {
                        userId: custUserId,
                        deletedBy: loggedInUserId
                    }
                }).done(function(msg)
                    {
                        store.load();
                        popup.getComponent('customerUserInformationPanel').getForm().reset();
                    })
            }
            else
            {
                // do something if No is clicked
            }
        });
    },

    onViewLogBtnClick: function(){

        var modalPanel = Ext.getCmp('logFile');

        if (modalPanel){

            modalPanel.center();
            modalPanel.show();
        }
        else {
            Ext.getCmp('viewport').add({
                xtype: 'logFile'
            });
            var logFilePopup = Ext.create('EDGAR.view.products.LogFile');

            logFilePopup.center();
            logFilePopup.show();

        }

    },

    addDocBtnClick:function(){
        var modalPanel = Ext.getCmp('newDocumentPopup');

        if (modalPanel){
            modalPanel.center();
            modalPanel.show();
            modalPanel.getComponent('newDocumentForm').getForm().reset();
            Ext.getStore('FormTypes').reload();
            Ext.getCmp('fieldContFormDescription').hide();
            Ext.getCmp('fieldContPeriodType').hide();
        }
        else {
            Ext.getCmp('viewport').add({
                xtype: 'newDocumentPopup'
            });
            var newDocumentPopup = Ext.create('EDGAR.view.products.NewDocumentForm');
            newDocumentPopup.center();
            newDocumentPopup.show();
            Ext.getCmp('newDocumentPopup').getComponent('newDocumentForm').getForm().reset();
            Ext.getStore('FormTypes').reload();
            Ext.getCmp('fieldContFormDescription').hide();
            Ext.getCmp('fieldContPeriodType').hide();
            //Ext.getWindowArg('newUserPanelPopup').reset();
        }
    },

    onCompanySelect:function(combo, record){

        Ext.getCmp('addDocBtn').enable();

        Ext.getCmp('mainPageSearchBox').enable(true);
        var store = Ext.getCmp('documentGrid').getStore();
//        var task = {
//            run : function()
//            {
//                store.reload();
//            },
//            interval: 60000
//        };
//        Ext.TaskManager.stop(task);

        var selectedCompany = record[0];
        selectedCustomerId = selectedCompany.get('id');
        store.proxy.url = serverLocation + 'ProjectGrid?customerId=' + selectedCustomerId;
//        Ext.StoreManager.get('Document').load();
        store.load();
        Ext.getCmp('documentGrid').getView().refresh();
//        Ext.TaskManager.start(task);

        companyName = selectedCompany.get('name');
        var cookie =Ext.util.Cookies.get('userInfo');
        cookie = cookie + "&customerName=" + companyName;
        Ext.util.Cookies.set('userInfo',cookie);
        Ext.getCmp('addDocBtn').enable(true);

    },

    onMainPageManageCustUsersBtnClick: function(){
        this.onManageCustUsersBtn();
    },

    onCellDoubleClick:function(td, cellIndex, record, tr, rowIndex, e, eOpts ){

        controllerMain.getFormList();
        var store = Ext.getStore('Files');
        selectedProjectId = tr.get('id');

        Ext.getStore('metaData').data.items[0].set('currentProjectId',selectedProjectId);
        store.proxy.url =serverLocation + 'GetFileData?projectId=' + selectedProjectId;
        store.reload();

        var modalPanel = Ext.getCmp('fileGridPopup'+selectedProjectId);

        if (modalPanel){
            modalPanel.center();
            modalPanel.show();
        }
        else{
            var win = Ext.create('Ext.window.Window', {
                modal:true,
                id: 'fileGridPopup'+selectedProjectId,
                xtype: 'fileGridPopup'+selectedProjectId,
                title: tr.get('jobNo'),
                renderTo: Ext.getBody(),
                scrollable: true,
                constrain: true,
                height: Ext.getBody().getViewSize().height,
                width: 1000,
//                layout:'fit',
//                bodyPadding: 10,
//                height: 550,
//                width: 650,
                resizable: false,

//                border: true,
                closeAction :'close',

                items       : [
                    {
                      xtype: 'tabpanel' ,
                        activeTab: 0,
                        itemId: 'filePanel'+selectedProjectId,
//                        layout:'fit',
                        flex:1,
                        items: [
                            {
                                xtype: 'filesViewport',
                                title: 'Files',
                                itemId: selectedProjectId,

                            }

                            ],
                        listeners:
                        {
                            tabchange: function(panel, newTab, oldTab) {
                                var newTabIndex = Ext.getCmp('fileGridPopup'+selectedProjectId).getComponent('filePanel'+selectedProjectId).items.indexOf(newTab);
                                if(newTabIndex == 0){
                                    var store =  Ext.getStore('Files');
                                    store.proxy.url = serverLocation + 'GetFileData?projectId=' + selectedProjectId;
                                    store.reload();
                                    Ext.getCmp('documentGrid').getView().refresh();
                                }
                                //console.log("CHANGED>>>>>>>>>");
                                activeTabIndex = newTabIndex - 1;
                            } // tabchange
                        },
                    },
                    {
                        xtype: 'button',
                        text : 'Cancel',
                        itemId: 'assignProjectCancelBtn',
                        width:70,
                        height:25,
                        margin: '5 5 5 900',
                        handler:function(){
                            remove();
                            file_name = [];
                            file_version = [];
                            file_fileid = [];
                            file_filePath = [];

                            Ext.getCmp('fileGridPopup'+selectedProjectId).getComponent('filePanel'+selectedProjectId).getComponent(selectedProjectId).getComponent('upload').destroy();
//
                            win.close();
//
                        }

                    },
//                    {
//                        xtype: 'button',
//                        text: 'Delete File',
//                        width: 80,
//                        height: 25,
//                        handler: function(){
////                            var filesViewPort = Ext.getCmp('fileGridPopup'+selectedProjectId).getComponent('filePanel'+selectedProjectId).getComponent(selectedProjectId);
////                            var selectedFile = filesViewPort.getComponent('gridFiles').getSelectionModel().getLastSelected();
////
////                            var path = selectedFile.get('filePath');
//                            $.ajax({
//                                type:"POST",
//                                url: serverLocation + "DeleteAmazonFiles",
////                                data: {
////                                    filePath: "Goldman Sachs/2012/F-X/Form F-X_2013-12-17/ex21-1_1.0.htm"
////                                }
//                            }).done(function(msg)
//
//                                {
//                                    var store =  Ext.getStore('Files');
//                                    store.proxy.url = serverLocation + 'GetFileData?projectId=' + selectedProjectId;
//                                    store.reload();
//
//                                })
//                        }
//                    }
                ],
                listeners:
                {
                    beforeclose: function(){
                        remove();
                        file_name = [];
                        file_version = [];
                        file_fileid = [];
                        file_filePath = [];

                        Ext.getCmp('fileGridPopup'+selectedProjectId).destroy();
                    }
                }
            });
            win.center();
            win.show();

        }

//        selectedProjectId = tr.get('id');

        year = tr.get('year');
        formType = tr.get('formType');
        projectName = tr.get('jobNo');
//        Ext.getCmp('Documents').hide();
//        Ext.getCmp('gridFiles').show();
//        Ext.getCmp('upload').show();
    },

    onNewProjCancelBtn: function(){
        Ext.getCmp('newDocumentPopup').close();
    },
    onSelectFormTypesBtnClick: function(){
        var modalPanel = Ext.getCmp('formTypesPopup');

        if (modalPanel){
            modalPanel.center();
            modalPanel.show();
        }
        else {
            Ext.getCmp('viewport').add({
                xtype: 'formTypesPopup'
            });
            var newCustomerPopup = Ext.create('EDGAR.view.products.FormTypesGridPopup');
            newCustomerPopup.center();
            newCustomerPopup.show();
        }


        },

    onCbxFormTypeSelect: function(combo,record){

        Ext.getCmp('tbxFormDescription').setValue(record[0].get('formDescription'));
        Ext.getCmp('tbxPeriodType').setValue(record[0].get('dateType'));
        Ext.getCmp('tbxFormDate').enable(true);
    },

    onFormTypesPopupSelectBtn:function(){
        var selectedForm = Ext.getCmp('formTypesPopup').getComponent('formTypesGrid').getSelectionModel().getLastSelected();
        Ext.getCmp('formTypesPopup').close();
        Ext.getCmp('tbxFormType').setValue(selectedForm.get('formType'));
        Ext.getCmp('fieldContFormDescription').show();
        Ext.getCmp('lblFormDescription').setText(selectedForm.get('formDescription'));
        Ext.getCmp('fieldContPeriodType').show();
        Ext.getCmp('lblPeriodType').setText(selectedForm.get('dateType'));
//        Ext.getCmp('tbxFormDate').show();

    },

    onCbxFormTypeSelectionChange: function(combo, record){

        var recordSelected = combo.getStore().getAt(0);
        Ext.getCmp('tbxFormDescription').setValue(recordSelected.get('formDescription'));
        Ext.getCmp('tbxPeriodType').setValue(recordSelected.get('dateType'));
    },

    onFormDateSelect: function(){
        Ext.getCmp('tbxDeadlineDate').enable(true);
    },

    onDeadlineDateSelection:function(){
        Ext.getCmp('tbxYear').enable(true);
    },

    onYearSelect: function(){
        var formType =  Ext.getCmp('tbxFormType').value;
//        var dateType =  Ext.getCmp('tbxPeriodType').value;
        var date = Ext.getCmp('tbxFormDate').getRawValue();
        var jobName = "Form"+" "+(formType) + "_" + (date);
        Ext.getCmp('tbxJobName').setValue(jobName);
        Ext.getCmp('tbxFilingDescription').enable(true);

    },

    onNewProjectNextBtnClick: function(){

        var cookieUserInfo = Ext.util.Cookies.get("userInfo");
        var cookieDecoded = Ext.urlDecode(cookieUserInfo);
        var store = Ext.getStore('AssignUserLeftGridStore');
        Ext.getStore('AssignUserRightGridStore').removeAll();

        year = Ext.getCmp('tbxYear').value;
        formType = Ext.getCmp('tbxFormType').value;
        projectName = Ext.getCmp('tbxJobName').value;


        if((cookieDecoded.status === "SuperUser")||(cookieDecoded.status === "CustomerUser"))
        {
            selectedCustomerId = loggedInCustomerId;
        }

        store.proxy.url =serverLocation + 'CustomerUsersGrid?customerId=' + selectedCustomerId;
        store.reload();

        var modalPanel = Ext.getCmp('assignProjectPopup'+selectedCustomerId);

        if (modalPanel){
            modalPanel.center();
            modalPanel.show();
            Ext.getCmp('newDocumentPopup').hide();

        }
        else{
            var win = Ext.create('Ext.window.Window', {
                modal:true,
//                title: customerListGrid.get('name'),
//                layout:'absolute',
                id: 'assignProjectPopup'+selectedCustomerId,
                title: Ext.getCmp('tbxJobName').value,
                renderTo: Ext.getBody(),
                scrollable: true,
                constrain: true,
                bodyPadding: 10,
//                height: 550,
//                width: 650,
                resizable: false,
                plain: false,
                border: true,
                closeAction :'close',
                closable: false,
                items       : [
                    {

//                        closable : true,
                        xtype: 'assignProjectViewport',
                        itemId: selectedCustomerId
//                        itemId: 'assignProjectViewport'
                    },
//
                    {
                        xtype: 'button',
                        text : 'Back',
                        itemId: 'assignProjectBackBtn',
                        width:70,
                        height:25,
                        margin: '5 5 5 455',
//                        disabled: true,
                        handler:function(){
                            Ext.getCmp('assignProjectPopup'+selectedCustomerId).hide();
                            Ext.getCmp('newDocumentPopup').show();
                        }
                    },
                    {
                        xtype: 'button',
                        text : 'Finish',
                        itemId: 'assignProjectFinishBtn',
//                        disabled: true,
                        width:70,
                        height:25,
                        margin: '5 5 5 5'
//                        disabled: true

                    },
//                    {
//                        xtype: 'button',
//                        text : 'Cancel',
//                        itemId: 'assignProjectCancelBtn',
//                        width:70,
//                        height:25,
//                        margin: '5 5 5 5',
//                        handler:function(){
//
//                            win.close();
//                            var assignUserRightGridStore = Ext.getStore('AssignUserRightGridStore');
//
//                            assignUserRightGridStore.removeAll();
//                        }
//
//                    }
//

                ]
            });
            win.center();
            win.show();
            Ext.getCmp('newDocumentPopup').hide();

        }

    },

    onAssignUsertoProjectBtnClick: function(){

        var assignProjViewport = Ext.getCmp('assignProjectPopup'+selectedCustomerId).getComponent(selectedCustomerId);
        var assignProjLeftGrid =assignProjViewport.getComponent('assignProjectLeftGrid');
        var assignProjRightGrid =assignProjViewport.getComponent('assignProjectRightGrid');
        var selectedUser = assignProjLeftGrid.getSelectionModel().getSelection();

        if (!selectedUser.length) {
            Ext.Msg.alert('Info', 'No User Selected to Add');
            return;
        }
//        var userCount = assignProjRightGrid.store.getCount();


//        if(userCount===3)
//        {
//            Ext.Msg.alert('Info', 'Cannot add more than 3 users to a Project!');
//            return;
//        }
//        else
//        {
            assignProjRightGrid.store.add(selectedUser[0]);
            assignProjLeftGrid.store.remove(selectedUser[0]);
//        }

//        Ext.getCmp('assignProjectPopup'+selectedCustomerId).getComponent('assignProjectNextBtn').enable('true');



    },
    onRemoveUserFrmProjBtnBtn: function(){

        var assignProjViewport = Ext.getCmp('assignProjectPopup'+selectedCustomerId).getComponent(selectedCustomerId);
        var assignProjRightGrid =assignProjViewport.getComponent('assignProjectRightGrid');
        var assignProjLeftGrid =assignProjViewport.getComponent('assignProjectLeftGrid');
        var selectedUser = assignProjRightGrid.getSelectionModel().getSelection();
        var userCount = assignProjRightGrid.store.getCount();
        if (!selectedUser.length) {
            Ext.Msg.alert('Info', 'No User Selected to Remove');
            return;
        }
        Ext.Msg.confirm('Remove User', 'Are you sure?', function (button) {
            if (button == 'yes') {
                assignProjRightGrid.store.remove(selectedUser[0]);
                assignProjLeftGrid.store.add(selectedUser[0]);
            }
        });




    },

    onAssignProjectLeftGridRowClick: function(){

    var assignProjViewport = Ext.getCmp('assignProjectPopup'+selectedCustomerId).getComponent(selectedCustomerId);
    var assignProjBtns =assignProjViewport.getComponent('assignProjectBtns');

    assignProjBtns.getComponent('assignUsertoProjectBtn').enable(true);

    },

    onAssignProjectRightGridRowClick: function(){
        var assignProjViewport = Ext.getCmp('assignProjectPopup'+selectedCustomerId).getComponent(selectedCustomerId);
        var assignProjBtns =assignProjViewport.getComponent('assignProjectBtns');

        assignProjBtns.getComponent('removeUserFrmProjBtn').enable(true);
    },

    onAssignProjectNextBtnClick: function(){

        var assignProjViewport = Ext.getCmp('assignProjectPopup'+selectedCustomerId).getComponent(selectedCustomerId);
        var assignProjRightGrid =assignProjViewport.getComponent('assignProjectRightGrid');
        var userCount = assignProjRightGrid.store.getCount();

        if((projectName.search("/"))!= -1){
            projectName = projectName.replace("/","@")
        }
        if((formType.search("/"))!= -1){
            formType = formType.replace("/","@")
        }
        folderStructure = companyName + "/" + year + "/" + formType + "/" + projectName + "/";
        folderStructure=folderStructure.split(' ').join('+');
        if(userCount==0)
        {
            Ext.Msg.confirm('No Users Added','Are you sure you want to proceed without adding any users to this project?', function (button){
                if (button == 'yes') {
                    var modalPanel = Ext.getCmp('uploadFilesWindowPopup');

                    if (modalPanel){
                        modalPanel.center();
                        modalPanel.show();
                    }
                    else {
                        Ext.getCmp('viewport').add({
                            xtype: 'uploadFilesWindowPopup'
                        });
                        var newUserPopup = Ext.create('EDGAR.view.products.UploadFilesWindow');
                        newUserPopup.center();
                        newUserPopup.show();

                    }
                }
                else{
                    return;
                }
            });
        }
        else{
            var modalPanel = Ext.getCmp('uploadFilesWindowPopup');

            if (modalPanel){
                modalPanel.center();
                modalPanel.show();
            }
            else {
                Ext.getCmp('viewport').add({
                    xtype: 'uploadFilesWindowPopup'
                });
                var newUserPopup = Ext.create('EDGAR.view.products.UploadFilesWindow');
                newUserPopup.center();
                newUserPopup.show();

        }
        }



    },

    onUploadFinishBtn: function(){

        var filesViewPort = Ext.getCmp('fileGridPopup'+selectedProjectId).getComponent('filePanel'+selectedProjectId).getComponent(selectedProjectId);
        var fileGrid = filesViewPort.getComponent('gridFiles');

        Ext.Msg.confirm('Are you sure?','Are you sure you want to finish without adding any files to this Project?', function (button){
            if (button == 'yes') {
//                Ext.getStore('Files').reload();
                Ext.getCmp('documentGrid').getView().refresh();

                //Add project
                $.ajax({
                    type: "POST",
                    url: serverLocation + 'CreateNewProject',
                    data: {

                        jobName: Ext.getCmp('tbxJobName').value,
                        year:Ext.getCmp('tbxYear').value,
                        formType: Ext.getCmp('tbxFormType').value,
                        deadlineDate: Ext.getCmp('tbxDeadlineDate').value,
                        filingDescription: Ext.getCmp('tbxFilingDescription').value,
                        company: selectedCustomerId,
                        createdBy: loggedInUserId
                    }
                }).done(function(msg){

                        var newProjectId = msg;

                        Ext.getStore('Project').reload();


                        var storeCount = Ext.getStore('AssignUserRightGridStore').getCount();

                        for(var i=0; i<storeCount; i++){

                            $.ajax({
                                type: "POST",
                                url: serverLocation + 'AddUsertoProject',
                                data: {

                                    userId: Ext.getStore('AssignUserRightGridStore').getAt(i).data.id,
                                    projectId: newProjectId

                                }
                            }).done(function(){


                                })
                        }
                        Ext.getCmp('uploadFilesWindowPopup').close();
                        Ext.getCmp('assignProjectPopup'+selectedCustomerId).close();

                        Ext.Msg.alert('Success!', 'New project added successfully!');
//                        Ext.getCmp('documentGrid').getView().refresh();

                    })

            }
            else
            {
                return;
            }
        })


    },
    onAssignProjectFinishBtnClick: function(){

        folderStructure = companyName + "/" + year + "/" + formType + "/" + projectName + "/";


        var assignProjViewport = Ext.getCmp('assignProjectPopup'+selectedCustomerId).getComponent(selectedCustomerId);
        var assignProjRightGrid =assignProjViewport.getComponent('assignProjectRightGrid');
        var userCount = assignProjRightGrid.store.getCount();
        deadlineDate = Ext.getCmp('tbxDeadlineDate').value
//        if(userCount==0){

            Ext.Msg.confirm('Are you sure?','Are you sure you want to create this Project?', function (button){
                if (button == 'yes') {


                    //Add project
                    $.ajax({
                        type: "POST",
                        url: serverLocation + 'CreateNewProject',
                        data: {

                            jobName: Ext.getCmp('tbxJobName').value,
                            year:Ext.getCmp('tbxYear').value,
                            formType: Ext.getCmp('tbxFormType').value,
                            deadlineDate: deadlineDate.getTime(),
                            filingDescription: Ext.getCmp('tbxFilingDescription').value,
                            company: selectedCustomerId,
                            createdBy: loggedInUserId
                        }
                    }).done(function(msg){

                            var newProjectId = msg;


                            var store = Ext.getStore('Files');
                            store.proxy.url = serverLocation + 'GetFileData?projectId=' + newProjectId;
                            store.reload();


                            //Start deadline timer

                            var storeCount = Ext.getStore('AssignUserRightGridStore').getCount();

                            for(var i=0; i<storeCount; i++){

                                $.ajax({
                                    type: "POST",
                                    url: serverLocation + 'AddUsertoProject',
                                    data: {

                                        userId: Ext.getStore('AssignUserRightGridStore').getAt(i).data.id,
                                        projectId: newProjectId,
                                        filingDeadline: totalTime

                                    }
                                }).done(function(){


                                    })
                            }

//                            var currentDate = new Date();
//
//                            //Get difference in milliseconds
//                            var difference_ms = deadlineDate.getTime()-currentDate.getTime();
//
//                            // Convert back to days, hours,minutes,seconds and return
//                            var daysLeft = Math.round(difference_ms/(24*60*60*1000));
//                            var hoursLeft = (Math.round(difference_ms/(60*60*1000)) - Math.round(daysLeft*24));
//                            var minutesLeft = (Math.round(difference_ms/(60*1000))- Math.round(hoursLeft*60));
//                            var secondsLeft = (Math.round(difference_ms/(1000))-Math.round(minutesLeft*60));
//
//                            if(daysLeft===0)
//                            {
//                                var totalTime = hoursLeft+" " + "Hrs"+" " + minutesLeft+" " + "Mins";
//                            }
//                            else if (daysLeft === 0 && hoursLeft === 0)
//                            {
//                                var totalTime = minutesLeft+" " + "Mins";
//                            }
//                            else if (daysLeft === 0 && hoursLeft === 0 && minutesLeft === 0)
//                            {
//                                var totalTime = secondsLeft+" " + "Secs";
//                            }
//                            else if (daysLeft === 0 && hoursLeft === 0 && minutesLeft === 0 && secondsLeft === 0){
//                                var totalTime = " TIME UP"
//                            }
//                            else
//                            {
//                                var totalTime = daysLeft+" " + "Days"+" " + hoursLeft+" " + "Hrs";
//                            }
//
//                            $.ajax({
//                                type: "POST",
//                                url: serverLocation + 'AddDeadlineDatetoProject',
//                                data: {
//                                    projectId: newProjectId,
//                                    filingDeadline: totalTime
//
//                                }
//                            })
//                            Ext.getCmp('uploadFilesWindowPopup').close();
                            Ext.getCmp('assignProjectPopup'+selectedCustomerId).close();

                            Ext.Msg.alert('Success!', 'New project added successfully!');
                            Ext.getStore('Project').reload();
                        })


                }
                else {
                    return;
                }



            })
        },

    getFormList: function(){
    $.get(serverLocation + 'FormTemplate').success(function(data) {
        console.log(data);
        var formList = data;
        Ext.getStore('metaData').data.items[0].set('formList', formList);
    });




});