import os
import scrapy
from crawler.items import AdoramaItem
from crawler.utils.get_links_from_txt import get_links_from_txt
import json
from scrapy_splash import SplashRequest
from lorem_text import lorem

script = """
function main(splash)
    splash:init_cookies(splash.args.cookies)
    local url = splash.args.url
    assert(splash:go(url))
    assert(splash:wait(1))
    return {
        cookies = splash:get_cookies(),
        html = splash:html(),
        url = splash:url()
    }
end
"""


class AdoramaSpider(scrapy.Spider):
    name = "adorama"
    allowed_domains = ["adorama.com"]

    text_file = os.getcwd() + "/crawler/spiders/links.txt"
    start_urls = get_links_from_txt(text_file)
    headers = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0"}

    # Make sur folder & data files always exist
    folder = "data"
    file_name = "data/adorama.json"

    if not os.path.exists(folder):
        os.mkdir(folder)

    open(file_name, "w+").close()

    def start_request(self):
        for url in self.start_urls:
            self.logger.info("Crawling url............ %s" % url)
            yield SplashRequest(url, self.parse, endpoint="execute", args={"lua_source": script}, headers=self.headers)

    def parse(self, response):
        item = AdoramaItem()
        products = response.xpath('//div[has-class("item-list")]/div')

        if len(products) < 1:
            self.logger.info("--------------------html empty")

        elements_url = response.url.split("/")
        elements_url.pop()

        for product in products:
            product_detail = product.xpath('//div[@class="item-details"]')
            product_name = product_detail.xpath("/h2/text()").get() or "Unknown"

            item.brand = product_name.split(" ")[0]
            item.category = elements_url[-1].lower()
            item.name = product_name
            item.description = lorem.paragraphs(5)
            item.image = (
                "https://www.adorama.com/images/product/"
                + product_detail.xpath('//div[@class="item-img"]//img/@data-src').get()
            )
            item.price = product.xpath('//strong[@class="your-price"]/text()').get()[1:]

            with open(self.file_name, "r+", encoding="utf-8") as file:
                try:
                    data = json.load(file)
                except:
                    data = {"products": []}

                data["products"].append(
                    {
                        "brand": item["brand"],
                        "category": item["category"],
                        "name": item["name"],
                        "description": item["description"],
                        "price": item["price"],
                        "image": item["image"],
                    }
                )
                file.seek(0)
                json.dump(data, file, ensure_ascii=False)

            yield item
