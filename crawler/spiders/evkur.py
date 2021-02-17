import scrapy


class EvkurSpider(scrapy.Spider):
    name = 'evkur'
    allowed_domains = ['evkur.com.tr']
    start_urls = ['https://www.evkur.com.tr/apple-cep-telefonlari/']

    def parse(self, response):
        productName =  response.css('.multiline-ellipsis::text').extract()
        productPrice = response.xpath("//a[@class='price']/span/text()").extract()
        productImage = response.xpath("//a[@class='image']/img/@src").extract()
        redirectPage = response.css('.image').xpath('@href').getall()

        prices = []
        for word in productPrice:
            if "TL" not in word:
                prices.append(word)

        row_data = zip(productName,prices,productImage,redirectPage)
        for product in row_data:
            scraped_info = {
                'page':response.url.strip(),
                'productName' : product[0].strip(),
                'productPrice' : product[1].strip(),
                'productImage' : product[2].strip(),
                'redirectPage' : product[3].strip()
            }
            yield scraped_info
