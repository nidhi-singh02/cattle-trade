/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for cattle-trade', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be cattle-trade', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('cattle-trade');
    })
  });

  it('network-name should be cattle-trade@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('cattle-trade@0.0.1.bna');
    });
  });

  it('navbar-brand should be cattle-trade',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('cattle-trade');
    });
  });

  
    it('Cattle component should be loadable',() => {
      page.navigateTo('/Cattle');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Cattle');
      });
    });

    it('Cattle table should have 13 columns',() => {
      page.navigateTo('/Cattle');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(13); // Addition of 1 for 'Action' column
      });
    });
  
    it('Milk component should be loadable',() => {
      page.navigateTo('/Milk');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Milk');
      });
    });

    it('Milk table should have 3 columns',() => {
      page.navigateTo('/Milk');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('Auction component should be loadable',() => {
      page.navigateTo('/Auction');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Auction');
      });
    });

    it('Auction table should have 15 columns',() => {
      page.navigateTo('/Auction');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(15); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Farmer component should be loadable',() => {
      page.navigateTo('/Farmer');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Farmer');
      });
    });

    it('Farmer table should have 11 columns',() => {
      page.navigateTo('/Farmer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(11); // Addition of 1 for 'Action' column
      });
    });
  
    it('DairyComapany component should be loadable',() => {
      page.navigateTo('/DairyComapany');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('DairyComapany');
      });
    });

    it('DairyComapany table should have 10 columns',() => {
      page.navigateTo('/DairyComapany');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  
    it('Veterinarians component should be loadable',() => {
      page.navigateTo('/Veterinarians');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Veterinarians');
      });
    });

    it('Veterinarians table should have 10 columns',() => {
      page.navigateTo('/Veterinarians');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  
    it('Regulator component should be loadable',() => {
      page.navigateTo('/Regulator');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Regulator');
      });
    });

    it('Regulator table should have 10 columns',() => {
      page.navigateTo('/Regulator');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('RegisterFarmer component should be loadable',() => {
      page.navigateTo('/RegisterFarmer');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RegisterFarmer');
      });
    });
  
    it('Login component should be loadable',() => {
      page.navigateTo('/Login');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Login');
      });
    });
  
    it('RegisterCattle component should be loadable',() => {
      page.navigateTo('/RegisterCattle');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RegisterCattle');
      });
    });
  
    it('BuyCattle component should be loadable',() => {
      page.navigateTo('/BuyCattle');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('BuyCattle');
      });
    });
  
    it('EnterAuctionCattle component should be loadable',() => {
      page.navigateTo('/EnterAuctionCattle');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('EnterAuctionCattle');
      });
    });
  
    it('CloseAuction component should be loadable',() => {
      page.navigateTo('/CloseAuction');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CloseAuction');
      });
    });
  
    it('OpenCattleAuction component should be loadable',() => {
      page.navigateTo('/OpenCattleAuction');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('OpenCattleAuction');
      });
    });
  
    it('SellMilk component should be loadable',() => {
      page.navigateTo('/SellMilk');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SellMilk');
      });
    });
  
    it('UploadHealthCertificate component should be loadable',() => {
      page.navigateTo('/UploadHealthCertificate');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UploadHealthCertificate');
      });
    });
  
    it('UpdateCattleInformation component should be loadable',() => {
      page.navigateTo('/UpdateCattleInformation');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateCattleInformation');
      });
    });
  
    it('OpenMilkAuction component should be loadable',() => {
      page.navigateTo('/OpenMilkAuction');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('OpenMilkAuction');
      });
    });
  
    it('BuyMilk component should be loadable',() => {
      page.navigateTo('/BuyMilk');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('BuyMilk');
      });
    });
  
    it('UpdateDairyInformation component should be loadable',() => {
      page.navigateTo('/UpdateDairyInformation');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateDairyInformation');
      });
    });
  
    it('ApproveCattleCertificate component should be loadable',() => {
      page.navigateTo('/ApproveCattleCertificate');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ApproveCattleCertificate');
      });
    });
  
    it('UpdateVeterinariansInformation component should be loadable',() => {
      page.navigateTo('/UpdateVeterinariansInformation');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateVeterinariansInformation');
      });
    });
  
    it('ApproveFarmer component should be loadable',() => {
      page.navigateTo('/ApproveFarmer');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ApproveFarmer');
      });
    });
  
    it('ApproveDairyCompany component should be loadable',() => {
      page.navigateTo('/ApproveDairyCompany');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ApproveDairyCompany');
      });
    });
  
    it('ApproveVeterinarians component should be loadable',() => {
      page.navigateTo('/ApproveVeterinarians');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ApproveVeterinarians');
      });
    });
  
    it('SetupDemo component should be loadable',() => {
      page.navigateTo('/SetupDemo');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SetupDemo');
      });
    });
  

});