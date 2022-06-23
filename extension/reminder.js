const notify = (heading, content) => {
    const options = {
      type: "basic",
      title: heading,
      message: content,
      iconUrl: "icons/icon_128.png",
    };
    chrome.notifications.create(options, (id) => {
      console.log(`notification sent - ${id}`);
    });
  };

document.querySelector("input[type='submit']").addEventListener("click", (e) => {
    console.log("click event listener is working | from form.js");
    const email = document.querySelector("input[name='email']").value;
    try {
        chrome.storage.sync.set({ email }, () => {
          alert("Email saved locally !!");
          notify("Your'e all set", "Email saved locally");
          chrome.storage.sync.set({ login_count: 0 }, (res) => {
            console.log(`login count - ${res.login_count}`);
          });
        });
      } catch (error) {
        alert("Unable to save email :(");
        notify(
          "Something went wrong :(",
          "Unable to save email locally !!"
        );
      }
});