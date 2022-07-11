import type { Page } from 'puppeteer';
import puppeteer from 'puppeteer';
import type { availableNames } from 'utils/Global/Types';
import SCRAPPER_CONFIG from './config';

export class ScrapperService {
    private url: string;

    private path: string;

    private scrapperNewPage: Page;

    constructor(chainName: availableNames) {
        console.log(chainName);
        this.url = SCRAPPER_CONFIG[chainName].url;
        this.path = SCRAPPER_CONFIG[chainName].path;
    }

    public async getApr(chainName: string): Promise<number> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        switch (chainName) {
        case 'FTM':
            return await this.getAprFantom(page);
        case 'AVAX':
            return await this.getAprAvax(page);
        case 'BSC':
            return await this.getAprBinance(page);
        case 'ETH':
            return await this.getAprEther(page);
        default:
            return 1;
        }
    }

    public async getAprEther(page: Page): Promise<number> {
        // try {
        // await page.goto(this.url, { waitUntil: 'domcontentloaded' });
        // const count = Number(await page.$eval(
        //     this.path,
        //     (el) => el.innerHTML,
        // ));
        // return count;
        // } catch (e) {
        //     console.log(e);
        // }
        return 5.90;
    }

    public async getAprBinance(page: Page): Promise<number> {
        // try {
        //     await page.goto(this.url);
        //     await page.waitForNavigation({
        //         waitUntil: 'networkidle0',
        //     });
        //     setTimeout(() => {}, 2000);
        //     await page.type('input[placeholder="Search Farms"]', 'USDT-BUSD');
        //     setTimeout(() => {}, 1000);
        //     const data = await page.$eval(this.path, (elem) => elem.innerHTML);
        //     return Number(data.split('%')[0]);
        // } catch (e) {
        //     console.log(e);
        // }
        return 1.08;
    }

    public async getAprFantom(page: Page): Promise<number> {
        // try {
        //     await page.goto(this.url, { waitUntil: 'domcontentloaded' });
        //     setTimeout(() => {}, 2000);
        //     await page.type('input[placeholder="Search farms"]', 'MIM');
        //     setTimeout(() => {}, 1000);
        //     const data = await page.$eval(this.path, (elem: any) => elem.innerText);
        //     return Number(data.split('%')[0]);
        // } catch (e) {
        //     console.log(e);
        // }
        return 11.41;
    }

    public async getAprAvax(page: Page): Promise<number> {
        // try {
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             resolve(1.75);
        //         }, 300);
        //     });
        // } catch (e) {
        //     console.log(e);
        // }
        return 2.23;
    }
}
