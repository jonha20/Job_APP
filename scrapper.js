const { chromium } = require("playwright");
const { MongoClient } = require("mongodb");
require("dotenv").config(); // Cargar las variables de entorno desde el archivo .env

const readWrite = async () => {
  const browser = await chromium.launch({ headless: true });

  const page = await browser.newPage();

  await page.goto("https://www.workana.com/es/jobs?language=es");

  const jobs = await page.evaluate(() => {
    const jobElements = document.querySelectorAll(".project-item");
    const jobList = [];

    jobElements.forEach((jobElement) => {
      const titleElement = jobElement.querySelector(".project-title");
      const title = titleElement ? titleElement.innerText : "No title found";

      const descriptionElement = jobElement.querySelector(".project-details");
      let description = descriptionElement
        ? descriptionElement.innerText
        : "No description found";
      description =
        description.length > 100
          ? description.substring(0, 150) + "..."
          : description; // Limitar a 100 caracteres
      description = description.replace(/(\r\n|\n|\r)/gm, " "); // Eliminar saltos de línea

      const countryElement = jobElement.querySelector(".country-name");
      const country = countryElement
        ? countryElement.innerText
        : "No description found";

      const salaryElement = jobElement.querySelector(".values");
      const salary = salaryElement ? salaryElement.innerText : "No link found";

      jobList.push({ title, description, country, salary });
    });

    return jobList;
  });

  // Conexión a MongoDB
  const uri = process.env.MONGOURL; // Cambia esto si tu MongoDB está en otro host o puerto
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("job_app"); // Nombre de la base de datos
    const collection = database.collection("jobs"); // Nombre de la colección

    // Insertar los trabajos en la colección
    const result = await collection.insertMany(jobs);
    console.log(
      `${result.insertedCount} jobs were inserted into the database.`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB or inserting data:", error);
  } finally {
    await client.close();
  }

  console.log(jobs);
  await browser.close();
};
readWrite();
