import fs from 'fs';
import dotenv from 'dotenv';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

dotenv.config();

puppeteer.use(StealthPlugin());
const PATH = './places.json';

const requestParams = {
  baseURL: process.env.BASE_URL,
  query: process.env.QUERY,
  coordinates: process.env.COORDINATES,
  hl: process.env.HL
};

const scrollPage = async (page, scrollContainer) => {
  let lastHeight = await page.evaluate(
    `document.querySelector("${scrollContainer}").scrollHeight`
  );

  while (true) {
    await page.evaluate(
      `document.querySelector("${scrollContainer}").scrollTo(0, document.querySelector("${scrollContainer}").scrollHeight)`
    );
    await page.waitForTimeout(2000);
    let newHeight = await page.evaluate(
      `document.querySelector("${scrollContainer}").scrollHeight`
    );
    if (newHeight === lastHeight) {
      break;
    }
    lastHeight = newHeight;
  }
};

const fillDataFromPage = async page => {
  const elements = await page.$$('.bfdHYd');
  const data = [];

  for (let i = 0; i < elements.length; i++) {
    await elements[i].click();
    await page.waitForTimeout(1000);

    const dataFromElement = await page.evaluate(i => {
      const el = document.querySelectorAll('.bfdHYd')[i];

      const placeUrl = el.parentElement
        .querySelector('.hfpxzc')
        ?.getAttribute('href');

      const urlPattern =
        /!1s(?<id>[^!]+).+!3d(?<latitude>[^!]+)!4d(?<longitude>[^!]+)/gm;

      const dataId = [...placeUrl.matchAll(urlPattern)].map(
        ({ groups }) => groups.id
      )[0];

      const latitude = [...placeUrl.matchAll(urlPattern)].map(
        ({ groups }) => groups.latitude
      )[0];

      const longitude = [...placeUrl.matchAll(urlPattern)].map(
        ({ groups }) => groups.longitude
      )[0];

      const title = el.querySelector('.qBF1Pd')?.textContent.trim();

      const phone = document
        .querySelectorAll(
          '.CsEnBe[data-tooltip="Copiar número de telefone"]'
        )[0]
        ?.getAttribute('aria-label')
        .slice('Telefone: '.length)
        .trim();

      const image = document
        .querySelectorAll(`.NMjTrf img[decoding="async"]`)?.[0]
        ?.getAttribute('src');

      const address = el
        .querySelector(
          '.W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:last-child'
        )
        ?.textContent.replaceAll('·', '')
        .trim();

      return {
        phone,
        image,
        title,
        address,
        gpsCoordinates: {
          latitude,
          longitude
        },
        placeUrl,
        dataId
      };
    }, i);

    data.push(dataFromElement);
  }

  return data;
};

async function getLocalPlacesInfo() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  page.on('console', async msg => {
    const msgArgs = msg.args();
    for (let i = 0; i < msgArgs.length; ++i) {
      console.log(await msgArgs[i].jsonValue());
    }
  });

  const URL = `${requestParams.baseURL}/maps/search/${requestParams.query}/${requestParams.coordinates}?hl=${requestParams.hl}`;

  await page.setDefaultNavigationTimeout(60000);
  await page.goto(URL);

  await page.waitForNavigation();

  const scrollContainer = '.m6QErb[aria-label]';

  const localPlacesInfo = [];

  await page.waitForTimeout(2000);
  await scrollPage(page, scrollContainer);
  localPlacesInfo.push(...(await fillDataFromPage(page)));

  await browser.close();

  return localPlacesInfo;
}

getLocalPlacesInfo().then(res => {
  const json = JSON.stringify(res, null, 2);
  fs.writeFile(PATH, json, erro => {
    if (erro) {
      console.error('Process fail:', erro);
    } else {
      console.log('Process completed successfully!');
    }
  });
});
