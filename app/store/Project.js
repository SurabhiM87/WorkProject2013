/**
 * Created by surabhimendiratta on 11/15/13.
 */

Ext.define('EDGAR.store.Project',{
    extend: 'Ext.data.Store',
    storeId:'Project',
    autoLoad: false,
    fields: [
        'id',
        'year',
        'formType',
        'jobNo',

        {
            name: 'deadlineDate',
            type: 'date'
        },
        {
            name: 'createdOn',
            type: 'date'
        },
       'createdBy',
        {
            name: 'modifiedOn',
            type: 'date'

        },
        'modifiedBy',
        'lifeCycleState',
        'action',
        'version',
        'description',
        'userCount',
        'filingDeadline',
        'deadlineIcon'
    ],
    proxy:{
        type:'ajax',
        url: serverLocation + 'ProjectGrid',
        reader:{
            root:'users'
        }
    },
//    listeners : {
//        load : function(){
//            console.log(this.data);
//            Ext.getCmp('documentGrid').getView().getHeaderCt().child('#year').initialConfig.filter.options = documentStore.collect('year');
//        }
//    },
////    load: {
//        callback: function() {
//            Ext.getCmp('documentGrid').getView().getHeaderCt().child('#year').initialConfig.filter.options = documentStore.collect('levels');
//        }
//    }

    sorters: [
        {
            property: 'modifiedOn',
            direction: 'DESC'
        }],
    listeners : {
        load: function(){

            this.findBy(function(rec){

               var deadlineDate = rec.get('deadlineDate');
                var currentDate = new Date();
                var totalTime;
                var deadlineState;

                if ( deadlineDate.getTime() > currentDate.getTime()){
                //Get difference in milliseconds
                var difference_ms = deadlineDate.getTime()-currentDate.getTime();

                // Convert back to days, hours,minutes,seconds and return
                var x = difference_ms/1000;
                var secondsLeft = x % 60;
                x/=60;
                var minutesLeft = x % 60;
                x/=60;
                var hoursLeft = x % 24;
                x/=24;
                var daysLeft = x;


//                var daysLeft = (difference_ms/(24*60*60*1000));
//                var hoursLeft = ((difference_ms/(60*60*1000)) - (daysLeft*24));
//                var minutesLeft =((difference_ms/(60*1000))-(hoursLeft*60));
//                var secondsLeft = ((difference_ms/(1000))-(minutesLeft*60));

                daysLeft = Math.floor(daysLeft);
                hoursLeft = Math.floor(hoursLeft);
                minutesLeft = Math.floor(minutesLeft);
                secondsLeft = Math.floor(secondsLeft);

                if(daysLeft===0)
                {
                     totalTime = hoursLeft+" " + "Hrs"+" " + minutesLeft+" " + "Mins";
                }
                else if (daysLeft === 0 && hoursLeft === 0)
                {
                     totalTime = minutesLeft+" " + "Mins";
                }
                else if (daysLeft === 0 && hoursLeft === 0 && minutesLeft === 0)
                {
                     totalTime = secondsLeft+" " + "Secs";
                }
                else if (daysLeft === 0 && hoursLeft === 0 && minutesLeft === 0 && secondsLeft === 0){
                     totalTime = "TIME UP"
                }
                else
                {
                     totalTime = daysLeft+" " + "Days"+" " + hoursLeft+" " + "Hrs";
                }
                }
                else{
                    totalTime = " TIME UP";
                }


                deadlineDate = new Date();
                if (deadlineDate.getTime()>currentDate.getTime())
                {
                    deadlineState = "Green";
                }
//                else if (difference_ms <= 86400000){
                else if ((deadlineDate.getHours()-currentDate.getHours())<=24){

                    deadlineState = "Amber"
                }
//                else if (difference_ms <= 259200000){
                else if (difference_ms <= 259200000){

                    deadlineState = "Yellow"
                }
                else if (difference_ms <= 0)
                {
                    deadlineState = "Red";
                }

                $.ajax({
                    type: "POST",
                    url: serverLocation + 'AddDeadlineDatetoProject',
                    data: {
                        projectId: rec.get('id'),
                        filingDeadline: totalTime,
                        deadlineState: deadlineState
                    }
                })
            })
        }
    }
});