console.log("fron content")
const { google } = require("googleapis");
const { chromemanagement } = require("googleapis/build/src/apis/chromemanagement");
const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  "758124967371-i9c1e6vkhbs5ahkha3iena2ru2g385st.apps.googleusercontent.com",
  "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"
);

oAuth2Client.setCredentials({
  refresh_token:
    "1//049Z-Mw8UJIghCgYIARAAGAQSNwF-L9IrSjzw6phGqRmowWpl9nLuBGefwJUBWJeFWId9rLkSOeZUrXbz5zlhbScxpNjb8DHoSo8",
});

try{
    chrome.storage.sync.get(["email"],(res)=>{
        email=res.email;
        const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

        let due_date='20-Apr-2022';

        let date=due_date.substring(0,2);
        const m=due_date.substring(3,6);
        const month_names=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let index=month_names.indexOf(m);
        date=parseInt(date);
        let de=date; //the dayy da is scheduled
        let ds=date-1; //reminder from the previous day
        let email_user=email
        let da='name of the DA'
        
        let month=index; //july
        const eventStartTime = new Date();
        
        eventStartTime.setMonth(month,0+ds);
        // const startevent=new Date();
        
        // const endevent=new Date();
        eventEndTime.setMonth(month,0+de);
        const eventEndTime = new Date();
        //eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

        const event = {
            'summary': da,
            'location': 'VTOP',
            'colorId': 1,
            'description': 'Your DA deadline is in 1 day !!',
            'start': {
                'dateTime': eventStartTime,
                //'timeZone': "Asia/Kolkata",
            },
            'attendees':[
                {'email':email_user},
                //{'email':'hg242322@gmail.com'}
            ],
            'end': {
                'dateTime': eventEndTime,
                //'timeZone': "Asia/Kolkata",
            },
            'reminders': {
                'useDefault': false,
                'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 12 * 60},
                {'method': 'popup', 'minutes': 6 * 60},
                {'method': 'popup', 'minutes': 10}
                ]
            },
            'visibility':'confidential'
        };
        calendar.freebusy.query(
        {
            resource: {
            'timeMin': eventStartTime,
            'timeMax': eventEndTime,
            'timeZone': "Asia/Kolkata",
            'items': [
                { 'id': "primary" }
            ],
            },
        },
        (err, res) => {
            if (err) {
                return console.error("Could not add reminder: ", err);}
            const eventArr = res.data.calendars.primary.busy;
            if (eventArr.length === 0){
                return calendar.events.insert(
                    { calendarId: "primary", resource: event },
                    (err) => {
                    if (err) {
                        chrome.runtime.sendMessage({
                            notify:true,
                            heading:"Something went wrong !",
                            content:"Could not add reminder",
                        })
                        return console.error("Could not add reminder:", err);
                    }
                    chrome.runtime.sendMessage({
                        notify:true,
                        heading:"Successful",
                        content:"DA Reminder successfully created."
                    })
                    return console.log("DA Reminder successfully created.");
                    }
                );
            }
            else{
                return calendar.events.insert(
                    { calendarId: "primary", resource: event },
                    (err) => {
                    if (err) {
                        chrome.runtime.sendMessage({
                            notify:true,
                            heading:"Something went wrong !",
                            content:"Could not add reminder",
                        })
                        return console.error("Could not add reminder:", err);
                        
                    }
                    chrome.runtime.sendMessage({
                        notify:true,
                        heading:"Successful",
                        content:"DA Reminder successfully created. And YOU HAVE MORE THAN 1 DA to submit !!! DO FAST"
                    })
                    return console.log("DA Reminder successfully created. And YOU HAVE MORE THAN 1 DA to submit !!! DO FAST");
                    }
                );
        
            }
        }
        );

    })
}catch (error) {
    chrome.runtime.sendMessage({
      notify: true,
      heading: "Something went wrong :(",
      content:
        "We were unable to login automatically. You may drop your query at kundusanhita13@gmail.com.\nWe'd be happy to hear your feedback !!",
    });
    console.log(error);
}