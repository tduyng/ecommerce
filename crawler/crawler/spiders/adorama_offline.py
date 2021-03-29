import glob, os
import scrapy
from crawler.items import AdoramaItem
import json
from lorem_text import lorem
import copy


class AdoramaOfflineSpider(scrapy.Spider):
    name = "offline_adorama"
    currentDir = os.getcwd()
    rootDir = copy.deepcopy(currentDir)

    category = ""

    # Make sur folder & data files always exist
    folder = "data"
    file_name = "data/adorama_offline.json"

    if not os.path.exists(folder):
        os.mkdir(folder)

    open(file_name, "w+").close()

    # Change current directory & read html file offline
    os.chdir("./crawler/html")
    start_urls = []
    for file in glob.glob("*.html"):
        start_urls.append("file://" + rootDir + "/crawler/html/" + file)

    # # Single test
    # start_urls = ["file://" + rootDir + "/crawler/html/laptop-apple.html"]

    # Return root dir
    os.chdir(rootDir)

    def start_request(self):
        for url in self.start_urls:
            self.logger.info("Crawling url............ %s" % url)
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        item = AdoramaItem()
        products = response.xpath('//div[has-class("item-list")]/div')
        self.category = response.xpath('//div[@class="manual-category"]/text()').get() or "notfound"

        if len(products) < 1:
            self.logger.info("--------------------html empty")

        for product in products:

            product_name = (
                product.xpath('./div[@class="item-details"]/h2/a/text()').get().strip()
                or product.xpath('./div[@class="item-details"]/h2/a/text()[2]').get().strip()
                or "Missing"
            )

            img_url = product.xpath('//div[@class="item-img"]//img/@src').get() or "/notfound"

            item["brand"] = "Unknown" if len(product_name) <= 0 else product_name.split(" ")[0]

            item["category"] = self.category
            item["name"] = product_name
            item["description"] = lorem.paragraphs(5)
            item["image"] = "https://www.adorama.com/images/product" + img_url
            item["price"] = product.xpath('//strong[@class="your-price"]/text()').get()[1:]

            with open(self.file_name, "r+", encoding="utf-8") as file:
                try:
                    data = json.load(file)
                except:
                    data = {"products": []}

                data["products"].append(
                    {
                        "name": item["name"],
                        "brand": item["brand"],
                        "category": item["category"],
                        "price": item["price"],
                        "image": item["image"],
                        "description": item["description"],
                    }
                )
                file.seek(0)
                json.dump(data, file, ensure_ascii=False)

            yield item
            pass
