function create_event(){
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
        console.log(token);
        let event = {
            summary: da,
            location: subject,
            colorId: 1,
            description: "Your DA deadline !!",
            start: {
              dateTime: eventStartTime,
              //'timeZone': "Asia/Kolkata",
            },
            attendees: [
              { email: email_user },
              //{'email':'hg242322@gmail.com'}
            ],
            end: {
              dateTime: eventEndTime,
              //'timeZone': "Asia/Kolkata",
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 24 * 60 },
                { method: "popup", minutes: 12 * 60 },
                { method: "popup", minutes: 6 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
            visibility: "confidential",
          };
          let fetch_options = {
            method: "POST",
            headers: {
              Authorization: 'Bearer ${token}',
              "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
          };
    
        fetch(
          'https://www.googleapis.com/calendar/v3/calendars/primary/events',
          fetch_options
        )
          .then((response) => response.json()) // Transform the data into json
          .then(function (data) {
            console.log(data);//contains the response of the created event
          });
      });
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.eventStartTime= eventStartTime)
        {eventStartTime= eventStartTime;}
      else if(request.eventEndTime= eventEndTime)
        {eventEndTime= eventEndTime;}
      else if(request.email_user= email_user)
        {email_user= email_user;}
      else if(request.da= da)
        {da= da;}
      else if(request.month= month)
        {month= month;}
      create_event();
    }
  );