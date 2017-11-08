
describe('TP tecweb', function() {

    beforeEach(function(){
        browser.ignoreSynchronization = true;
        browser.get('http://ti2017.azurewebsites.net/tecweb/');
        browser.sleep(7000);
    });

    it('Deve acessar o website', function(){
        expect(browser.getTitle()).toBe('Posto Fácil');
    });

    it('Deve listar Todas as regiões corretamente', function(){
        
        element(by.css('body > div > div > div > form > div > div:nth-child(1) > div > select')).click();
        var regioes = element.all(by.repeater('r in Regioes'));
        expect(regioes.get(0).getText()).toBe('Barreiro');
        expect(regioes.get(1).getText()).toBe('Centro-Sul');
        expect(regioes.get(2).getText()).toBe('Leste');
        expect(regioes.get(3).getText()).toBe('Nordeste');
        expect(regioes.get(4).getText()).toBe('Noroeste');
		expect(regioes.get(5).getText()).toBe('Norte');
        expect(regioes.get(6).getText()).toBe('Oeste');
        expect(regioes.get(7).getText()).toBe('Pampulha');
        expect(regioes.get(8).getText()).toBe('Venda Nova');  
    });

    it('Deve exibir os 3 primeiros postos da região Barreito', function(){
        
        element(by.css('body > div > div > div > form > div > div:nth-child(1) > div > select')).click();
        var regioes = element.all(by.repeater('r in Regioes'));

        regioes.get(0).click().then(function(){

            browser.sleep(5000);
            element(by.css('body > div > div > div > form > div > div:nth-child(2) > div > select')).click();
            var postos = element.all(by.repeater('p in Postos'));
            expect(postos.get(0).getText()).toContain('Centro de Saúde Bairro das Indústrias');
            expect(postos.get(1).getText()).toContain('Barreiro de Cima')
            expect(postos.get(2).getText()).toContain('Barreiro'); 
        });
   
    });

    it('Deve exibir os dados do posto "Centro de Saúde Bairro das Indústrias', function(){
        element(by.css('body > div > div > div > form > div > div:nth-child(1) > div > select')).click();
        var regioes = element.all(by.repeater('r in Regioes'));
       
        regioes.get(0).click().then(function(){

            browser.sleep(5000);
            element(by.css('body > div > div > div > form > div > div:nth-child(2) > div > select')).click();
            var postos = element.all(by.repeater('p in Postos'));
            
            postos.get(0).click().then(function(){
                browser.sleep(5000);
                element(by.css('body > div > div > div > form > div > div:nth-child(3) > div > button')).click();
                expect(element(by.css('body > div > div > div > form > div > div.col-md-offset-3.col-md-6.col-lg-offset-4.col-lg-4 > div > div > div.panel-heading > p')).getText()).toContain('Centro de Saúde Bairro das Indústrias');
            });
        }); 
    });

});
