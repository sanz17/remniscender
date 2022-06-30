// window.onload = function() {
//   document.querySelector('button').addEventListener('click', function() {
//     chrome.identity.getAuthToken({interactive: true}, function(token) {
//       console.log(token);
//     });
    
//   });
// };

const notify = (heading, content) => {
  const options = {
    type: "basic",
    title: heading,
    message: content,
    iconUrl: "icons/icon_128.png",
  };
  chrome.notifications.create(options, (id) => {
    console.log('notification sent - ${id}');
  });
};
document.querySelector('.submit-btn').addEventListener("click", function() {
  console.log("click event listener is working | from reminder.js");
  const email = document.querySelector("input[name='email']").value;
  try {
    chrome.storage.sync.set({ email }, () => {
      alert("email saved locally !!");
      notify("Your'e all set", "Email saved locally");
    });
  } catch (error) {
    alert("Unable to save email locally :(");
    notify(
      "Something went wrong :(",
      "Unable to save email locally !!"
    );
  }
});