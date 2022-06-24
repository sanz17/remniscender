import fetch from "node-fetch";
import { load } from "cheerio";

console.log("from background.js");

chrome.browserAction.onClicked.addListen(() => {
  let email = document
    .getElementsByClassName("submit-btn")
    .addEventListener("click", (e) => {
      email.hasPointerCapture(() => {
        let message = email.value();
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              message,
              type: "EMAIL",
            });
          }
        );
      });
    });
});

chrome.browserAction.onClicked.addListen(() => {
  let sync = document.getElementsByClassName("sync-btn");
  document
    .getElementsByClassName("sync-btn")
    .addEventListener("click", (e) => {
      const getRawData = async (URL) => {
        const response = await fetch(URL);
        const data = await response.text();
        return data;
      };

      const URL = "https://vtop.vit.ac.in/vtop/content";

      const getDaList = async () => {
        const daRawData = await getRawData(URL);

        const daParsed = load(daRawData);

        const daData = daParsed("fixedTableContainer.fixedTableContainer")[0]
          .children[1].children;

        daData.forEach(
          (row) => {
            if (row.name === "tr") {
              let course = null;

              const columns = row.children.filter(
                (column) => column.name === "td"
              );

              const courseColumn = columns[2];
              if (courseColumn) {
                course = courseColumn.children[1];
                if (course) {
                  course = course.children[1].data;
                }
              }
            }
          },
          daData.forEach((row) => {
            if (row.name === "tr") {
              let course = null,
                da_name = null,
                due_date = null;

              const columns = row.children.filter(
                (column) => column.name === "td"
              );
              const da_nameColumn = columns[1];
              if (da_nameColumn) {
                da_name = da_nameColumn.children[1];
                if (da_name) {
                  da_name = da_name.children[0].data;
                }
              }

              const due_dateColumn = columns[5];
              if (due_dateColumn) {
                due_date = due_dateColumn.children[1];
                if (due_date) {
                  due_date = due_date.children[0].data;
                }
              }

              if (course && da_name && due_date) {
                console.log(`${course} --- ${da_name} --- ${due_date}`);
              }
            }
          })
        );
      };

      getDaList();
    });
});
