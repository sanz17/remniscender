window.onload = () => {
  const button = document.createElement("button");
  button.id = "sync-btn";
  button.textContent = "Sync";
  document.querySelector(".navbar-header").append(button);
  button.addEventListener("click", () => sync());
};

function sync() {
  chrome.storage.sync.get(["email"], (res) => {
    
      email = res.email;
      var subject = document
        .querySelector("#fixedTableContainer.fixedTableContainer")
        .getElementsByTagName("tr")[1]
        .getElementsByTagName("td")[2];
      subject = subject.innerText;
      let table_data = document
        .getElementsByClassName("customTable")[1]
        .getElementsByTagName("tr");
      for (let i = 2; i < table_data.length; i++) {
        let da_name = table_data[i].getElementsByTagName("td")[1].innerText;
        let dd = table_data[i].getElementsByTagName("td")[4].innerText;
        let due_date = dd;
        let date = due_date.toString().substring(0, 2);
        const m = due_date.toString().substring(3, 6);
        const month_names = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        let index = month_names.indexOf(m);
        date = parseInt(date);
        let de = date; //the dayy da is scheduled
        let ds = date - 1; //reminder from the previous day
        let email_user = email;
        let da = da_name;

        let month = index; //july
        const eventStartTime = new Date();
        const eventEndTime = new Date();

        eventStartTime.setMonth(month, 0 + ds);
        eventEndTime.setMonth(month, 0 + de);

        chrome.storage.sync.set({gmail: email_user,
          sub:subject,
          end_date:de,
          start_date:ds,
          name_da:da,
          m:month},()=>{
          console.log("infos sent to background js")
        })
        //var port =chrome.runtime.connect()

        // chrome.storage.sync.set({ email_user }, () => {
        //   chrome.runtime.sendMessage(
        //     { email_user: email_user },
        //     function (response) {
        //       console.log(response.email_user);
        //       console.log("received email_user");
        //     }
        //   );
        // });

        // chrome.storage.sync.set({ da }, () => {
        //   chrome.runtime.sendMessage(
        //     { da: da},
        //     function (response) {
        //       console.log(response.da);
        //       console.log("received da name");
        //     }
        //   );
        // });

        // chrome.storage.sync.set({ month }, () => {
        //   chrome.runtime.sendMessage(
        //     { month: month },
        //     function (response) {
        //       console.log(response.month);
        //       console.log("received month");
        //     }
        //   );
        // });
        // calendar.freebusy.query(
        //   {
        //     resource: {
        //       timeMin: eventStartTime,
        //       timeMax: eventEndTime,
        //       timeZone: "Asia/Kolkata",
        //       items: [{ id: "primary" }],
        //     },
        //   },
        //   (err, res) => {
        //     if (err) {
        //       return console.error("Could not add reminder: ", err);
        //     }
        //     const eventArr = res.data.calendars.primary.busy;
        //     if (eventArr.length === 0) {
        //       return calendar.events.insert(
        //         { calendarId: "primary", resource: event },
        //         (err) => {
        //           if (err) {
        //             chrome.runtime.sendMessage({
        //               notify: true,
        //               heading: "Something went wrong !",
        //               content: "Could not add reminder",
        //             });
        //             return console.error("Could not add reminder:", err);
        //           }
        //           chrome.runtime.sendMessage({
        //             notify: true,
        //             heading: "Successful",
        //             content: "DA Reminder successfully created.",
        //           });
        //           return console.log("DA Reminder successfully created.");
        //         }
        //       );
        //     } else {
        //       return calendar.events.insert(
        //         { calendarId: "primary", resource: event },
        //         (err) => {
        //           if (err) {
        //             chrome.runtime.sendMessage({
        //               notify: true,
        //               heading: "Something went wrong !",
        //               content: "Could not add reminder",
        //             });
        //             return console.error("Could not add reminder:", err);
        //           }
        //           chrome.runtime.sendMessage({
        //             notify: true,
        //             heading: "Successful",
        //             content:
        //               "DA Reminder successfully created. And YOU HAVE MORE THAN 1 DA to submit !!! DO FAST",
        //           });
        //           return console.log(
        //             "DA Reminder successfully created. And YOU HAVE MORE THAN 1 DA to submit !!! DO FAST"
        //           );
        //         }
        //       );
        //     }
        //   }
        // );
      }
    
  });
}
