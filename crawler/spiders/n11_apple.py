import scrapy


class N11AppleSpider(scrapy.Spider):
    name = 'n11_apple'
    allowed_domains = ['n11.com']
    start_urls = ['https://www.n11.com/telefon-ve-aksesuarlari?platformtipi=%C4%B0OS']

    def parse(self, response):
        productName = response.css('.productName::text').extract()
        productPrice = response.xpath("//a[@class='newPrice']/ins/text()").extract()
        productImage = response.xpath("//a[@class='plink']/img/@data-original").extract()
        redirectPage = response.xpath("//a[@class='plink']/@href").extract()


        row_data = zip(productName,productPrice,productImage,redirectPage)
        for product in row_data:
            scraped_info = {
                'page':response.url.strip(),
                'productName' : product[0].strip(),
                'productPrice' : product[1].strip(),
                'productImage' : product[2].strip(),
                'redirectPage' : product[3].strip()
            }
            yield scraped_info