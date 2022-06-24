const fetch = require("node-fetch");
const cheerio = require("cheerio");

// function to get the raw data
const getRawData = (URL) => {
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};

// URL for data
const URL = "https://vtop.vit.ac.in/vtop/content";

// start of the program
const getDaList = async () => {
   const daRawData = await getRawData(URL);

   // parsing the data
   const daParsed = cheerio.load(daRawData);

   // extracting the table data
   const daData = daParsed("fixedTableContainer.fixedTableContainer")[0].children[1].children;

   daData.forEach((row) => {
      // extracting `td` tags
      if (row.name === "tr") {
         let course = null,
            da_name = null,
            due_date = null;

         const columns = row.children.filter((column) => column.name === "td");

         const courseColumn = columns[0];
         if (courseColumn) {
            course = courseColumn.children[0];
            if (course) {
               course = course.children[0].data;
            }
         }

         const da_nameColumn = columns[3];
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
   });
};

// invoking the main function
getDaList();
