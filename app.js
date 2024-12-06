const express = require("express");
const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");

const app = express();
const PORT = 3000;

// Nouveau endpoint avec un paramètre de route
app.get("/scrape/:phoneNumber", async (req, res) => {
  const phoneNumber = req.params.phoneNumber;

  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number is required." });
  }

  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Naviguer vers le site
    await driver.get("https://azovy.vercel.app/");

    // Remplir le champ du numéro de téléphone
    await driver.wait(until.elementLocated(By.id("phone_number")), 10000);
    let phoneNumberInput = await driver.findElement(By.id("phone_number"));
    await phoneNumberInput.clear();
    await phoneNumberInput.sendKeys(phoneNumber);

    // Cliquer sur le bouton Soumettre
    let submitButton = await driver.findElement(
      By.css('button[type="submit"]')
    );
    await submitButton.click();

    // Extraire les résultats
    let ownerNameElement = await driver.wait(
      until.elementLocated(
        By.css(
          "#__nuxt > div.flex.min-h-screen.flex-col > main > section > div.flex.w-full.flex-col.items-center.py-8 > div > div > div.rounded-lg.border.bg-card.text-card-foreground.shadow-sm.mt-16 > div:nth-child(1) > div > div > p.text-md.font-medium.leading-none"
        )
      ),
      10000
    );
    let ownerName = await ownerNameElement.getText();

    let operatorNameElement = await driver.findElement(
      By.css(
        "#__nuxt > div.flex.min-h-screen.flex-col > main > section > div.flex.w-full.flex-col.items-center.py-8 > div > div > div.rounded-lg.border.bg-card.text-card-foreground.shadow-sm.mt-16 > div:nth-child(1) > div > div > p.text-sm.text-muted-foreground"
      )
    );
    let operatorName = await operatorNameElement.getText();

    res.json({ ownerName, operatorName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during scraping." });
  } finally {
    await driver.quit();
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
}); 
