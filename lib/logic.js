/*Licensed under the Apache License, Version 2.0 (the "License");
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

'use strict';


/* global getAssetRegistry getParticipantRegistry getFactory */

const NS ="org.cattle.trading";

/**
 *
 * @param {org.cattle.trading.RegisterFarmer} param - model instance
 * @transaction
 */
async function onRegisterFarmer(param)
{
   let factory =  await getFactory();
   
     const farmerRegistry = await getParticipantRegistry('org.cattle.trading.Farmer');

    let   existingFarmers = await farmerRegistry.getAll();
     let NumberofFarmers = 0;
 
    await existingFarmers.forEach(function(farmer)
    {  
    NumberofFarmers++;
  })
  NumberofFarmers++;
 
  const newfarmer = await factory.newResource(NS,'Farmer',NumberofFarmers.toString());
      
        newfarmer.emailId = param.emailId;
       newfarmer.passwrd = param.passwrd;
        newfarmer.firstName = param.firstName;
        newfarmer.lastName = param.lastName;
        newfarmer.address1 = param.address1;
        newfarmer.address2 = param.address2;
        newfarmer.county = param.county;
        newfarmer.postcode = param.postcode;
        newfarmer.AccStatus = 'NOT_APPROVED';
    
 
    await farmerRegistry.add(newfarmer);

}

/**
 *
 * @param {org.cattle.trading.Login} param - model instance
 * @transaction
 */
async function onLogin(param)
{
    
 var userMatches = "FALSE";
 if(param.userType === "FARMER")
 {
  // Get the participant registry.
	return getParticipantRegistry('org.cattle.trading.Farmer')//+param.userType)
  	.then(function (participantRegistry) 
        {
    // Get the specific driver from the driver participant registry.
      throw participantRegistry.get(param.userId);
    		return participantRegistry.get(param.userId);
  		})
  .then(function (participant) 
   		{
  			if(participant.passwrd === param.passwrd)
  			{
      			userMatches = "TRUE";
   			}
  		});
  }
  /*
  .catch(function (error) {
       userMatches = "false";
  
  });
 */
 return userMatches;
  throw userMatches;
  
}

/**
 *
 * @param {org.cattle.trading.RegisterCattle} onRegisterCattle - model instance
 * @transaction
 */
async function onRegisterCattle(param)
{  
console.log('onRegisterCattle');
 
 
   let factory =  await getFactory();
   
    const CattleReg     = await getAssetRegistry('org.cattle.trading.Cattle');
   
 
    let   existingCattles = await CattleReg.getAll();
     let NumberofCattles = 0;
 
    await existingCattles.forEach(function(cattle)
    {  
    NumberofCattles++;
  })
  NumberofCattles++;
 
  const cattle2 = await factory.newResource(NS,'Cattle','CATTLE_'+NumberofCattles.toString());
 
    cattle2.dateBirth = param.dateBirth;
    cattle2.breed = param.breed;
    cattle2.milkCapacity = param.milkCapacity;
    cattle2.HCStatus = "NOT_UPLOADED";
    cattle2.tradeStatus = param.tradeStatus;
    cattle2.tradeType = "SELL";
    cattle2.owner = factory.newRelationship(NS, 'Farmer', param.ownerFarmer.userId);
 
  await CattleReg.add(cattle2);
 
  // emitting create event
    let createEvent = factory.newEvent(NS, 'AssetRegistered');
  createEvent.cattle = cattle2;
    await emit(createEvent);
}

/**

 *
 * @param {org.cattle.trading.OpenCattleAuction} param - model instance
 * @transaction
 */

async function onOpenCattleAuction(param)
{
console.log('onSellCattle');
    let factory =  await getFactory();
    let price = param.price;
    let breed = param.breed;
    let NumberofAuctions = 0;
   
    const AuctionReg = await getAssetRegistry('org.cattle.trading.Auction');
 
  let existingAuctions = await AuctionReg.getAll();
 
 
  await existingAuctions.forEach(function(auc)
  {  
    NumberofAuctions++;
  })
  NumberofAuctions++;
 
   const auction =  await factory.newResource(NS,'Auction',NumberofAuctions.toString());
 

   if (typeof param.cattle == 'undefined'){
     throw "Enter the cattles ";
  }
  else{
   
     param.cattle.forEach(function(i) {
 
     if(breed== i.breed)  
        {    
    if (typeof auction.itemId == 'undefined'){
     auction.itemId = new Array();
     auction.itemId[0] = i.toString();
    }
  else{
    auction.itemId.push(i.toString());
  }
     }
  else
  {
         throw new Error("Breed doesnt match");                
  }
                         
  })
 
  }
 
  auction.aucBreed = breed;
  auction.aucItem = "CATTLE";
  auction.aucStatus="OPEN";
  auction.basePrice=price;
  auction.quantity=param.cattle.length;
 
  auction.owner =factory.newRelationship(NS, 'Farmer', param.farmer.userId);
 
 
   await AuctionReg.add(auction);
  
  return auction;
 
}


/**

 *
 * @param {org.cattle.trading.BuyCattle}param    - model instance
 * @transaction
 */

async function onBuyCattle(param)
{
     console.log('onBuyCattle');
 
  let  NoofCattles = param.f_NoofCattles;
  let breed= param.f_breed;
  let budget = param.f_budget;
  var requiredAuction;
  
  var available = 0;
 
 
    const AuctionReg = await getAssetRegistry('org.cattle.trading.Auction');
   let  existingAuctions = await AuctionReg.getAll();
 
 
 await existingAuctions.forEach(function(auc)
  { if(NoofCattles >= auc.quantity &&  breed === auc.aucBreed && budget >= auc.basePrice )
  {
    available = 1;
     if (typeof requiredAuction == 'undefined'){
     requiredAuction = new Array();
     requiredAuction[0] = auc;
    }
  else{
    requiredAuction.push(auc);
  }  
  }  
   
  /*else{
   throw "Requirements not met";
  }*/
   
  })
  if(available === 0)
  {
    throw new Error("Requirements not met");
  }
 
  
  
   return requiredAuction;
  // throw requiredAuction;
 
 
}

/**

 *
 * @param {org.cattle.trading.EnterAuctionCattle}param    - model instance
 * @transaction
 */

async function onEnterAuctionCattle(param){
   console.log('onEnterAuctionCattle');
  let price = param.price;
 
  let factory =  await getFactory();
 
   const CattleReg = await getAssetRegistry('org.cattle.trading.Cattle');
 
  if(param.auction.aucStatus !== 'IN_PROCESS')
     {
       param.auction.aucStatus ='IN_PROCESS';
     }
     
 
  var cattleToUpdate
param.auction.itemId.forEach(function(cattleid)
 {    
 
//returns all assets
  return getAssetRegistry('org.cattle.trading.Cattle')
      .then(function(cattleassetRegistry){
       return cattleassetRegistry.exists(cattleid);
      })
      .then(function(exists){
        if (exists) {
                return getAssetRegistry('org.cattle.trading.Cattle')                      
                    .then(function(assetRegistry2){                              
                    return assetRegistry2.get(cattleid);
                })
                .then(function(updateCattle){
                        cattleToUpdate = updateCattle                    
                    cattleToUpdate.tradeStatus=  'IN_TRADE';
                        return getAssetRegistry('org.cattle.trading.Cattle')

                })
                .then(function(assetRegistry3){
                        return assetRegistry3.update(cattleToUpdate);
                })
        }
     
    })
})
 
  // Add the new access to the array, checking if empty first as it is optional field at creation
  if (typeof param.auction.listOfFarmers == 'undefined') {
    param.auction.listOfFarmers = new Array();
    param.auction.listOfFarmers[0] = param.buyerFarmer;
  }
  else {
    param.auction.listOfFarmers.push(param.buyerFarmer);
  }

 
   let auction = param.auction;
  if (typeof auction.aucPrice == 'undefined'){
     auction.aucPrice = new Array();
    auction.aucPrice[0] = price;
  }
  else{
    auction.aucPrice.push(price);
  }
 
     auction.noOfBuyers++;
 
     const AuctionReg = await getAssetRegistry('org.cattle.trading.Auction');
 
 
   await AuctionReg.update(param.auction);
  
  return 'Your bid succesfully entered';
 
}



/**
 *
 * @param {org.cattle.trading.CloseAuction} param - CloseAuction instance
 * @transaction
 */

async function onCloseAuction(param){
 
   let factory =  await getFactory();
 
  if (param.auction.aucStatus === "IN_PROCESS"){
   
    param.auction.aucStatus="CLOSED";
 
  }
 
  var max = Math.max(...param.auction.aucPrice);
 
    param.auction.finalPrice = max;
   
    let i = param.auction.aucPrice.indexOf(Math.max(...param.auction.aucPrice));
     
  var cattleToUpdate
param.auction.itemId.forEach(function(cattleid)
 {    
 
//returns all assets
  return getAssetRegistry('org.cattle.trading.Cattle')
      .then(function(cattleassetRegistry){
       return cattleassetRegistry.exists(cattleid);
      })
      .then(function(exists){
        if (exists) {
                return getAssetRegistry('org.cattle.trading.Cattle')                      
                    .then(function(assetRegistry2){                              
                    return assetRegistry2.get(cattleid);
                })
                .then(function(updateCattle){
                        cattleToUpdate = updateCattle                      
                     
                 cattleToUpdate.owner =  factory.newRelationship(NS,'Farmer',param.auction.listOfFarmers[i].userId);
                        return getAssetRegistry('org.cattle.trading.Cattle')

                })
                .then(function(assetRegistry3){
                        return assetRegistry3.update(cattleToUpdate);
                })
        }
     
    })
})
 
   const AuctionReg = await getAssetRegistry('org.cattle.trading.Auction');
  await AuctionReg.update(param.auction);
  
  return 'Auction is closed';

}

/**
 *
 * @param {org.cattle.trading.UploadHealthCertificate} UploadHealthCertificate - UploadHealthCertificate instance
 * @transaction
 */

async function onUploadHealthCertificate(param){
 //var fs=require('fs');
 var filename = '/home/nidhi/Downloads/sample.pdf';
 
param.cattle.HCStatus="UPLOADED";
   const CattleReg = await getAssetRegistry('org.cattle.trading.Cattle');
  await CattleReg.update(param.cattle);
 
//var c =  //param.cattle.HC =
//    fs.readFileSync(filename,'utf8').toString(‘base64’);
   
}


/**
 *
 * @param {org.cattle.trading.UpdateCattleInformation} UpdateCattleInformation - UpdateCattleInformation instance
 * @transaction
 */

async function onUpdateCattleInformation(param){
 
  param.cattle.dateBirth= param.dateBirth ;
  param.cattle.breed= param.breed;
  param.cattle.milkCapacity= param.milkCapacity;
  const CattleReg = await getAssetRegistry('org.cattle.trading.Cattle');
  await CattleReg.update(param.cattle);
 
}

/**

 *
 * @param {org.cattle.trading.OpenMilkAuction} param - model instance
 * @transaction
 */

async function onOpenMilkAuction(param)
{
console.log('onOpenMilkAuction');
    let factory =  await getFactory();
    let price = param.price;
    let breed = param.breed;
    let NumberofAuctions = 0;
   
    const AuctionReg = await getAssetRegistry('org.cattle.trading.Auction');
 
  let existingAuctions = await AuctionReg.getAll();
 
 
  await existingAuctions.forEach(function(auc)
  {  
    NumberofAuctions++;
  })
  NumberofAuctions++;
 
   const auction =  await factory.newResource(NS,'Auction',NumberofAuctions.toString());
 

   if (typeof param.cattle == 'undefined'){
     throw "Enter the cattles ";
  }
  else{
   
     param.cattle.forEach(function(i) {
 
     if(breed== i.breed)  
        {    
    if (typeof auction.itemId == 'undefined'){
     auction.itemId = new Array();
     auction.itemId[0] = i.toString();
    }
  else{
    auction.itemId.push(i.toString());
  }
     }
  else
  {
         throw new Error("Breed doesnt match");                
  }
                         
  })
 
  }
 
  auction.aucBreed = breed;
  auction.aucItem = "MILK";
  auction.aucStatus="OPEN";
  auction.basePrice=price;
  auction.quantity=param.milkQuantity;
 
  auction.owner =factory.newRelationship(NS, 'Farmer', param.farmer.userId);
 
 
   await AuctionReg.add(auction);
  
  return auction;
 
}


/**
 *
 * @param {org.cattle.trading.SetupDemo} setupDemo - SetupDemo instance
 * @transaction
 */
async function setupDemo(setupDemo) {  // eslint-disable-line no-unused-vars
    const factory = getFactory();
 

    const farmers = [
        factory.newResource(NS, 'Farmer', 'FARMER_11'),
        factory.newResource(NS, 'Farmer', 'FARMER_22')
    ];


   /* const cattles = [
        factory.newResource(NS, 'Cattle', 'CATTLE_1'),
        factory.newResource(NS, 'Cattle', 'CATTLE_2'),
        factory.newResource(NS, 'Cattle', 'CATTLE_3'),
        factory.newResource(NS, 'Cattle', 'CATTLE_4'),
        factory.newResource(NS, 'Cattle', 'CATTLE_5'),
        factory.newResource(NS, 'Cattle', 'CATTLE_6'),
        factory.newResource(NS, 'Cattle', 'CATTLE_7'),
        factory.newResource(NS, 'Cattle', 'CATTLE_8')
    ];*/

 /*   const regulator = factory.newResource(NS, 'Regulator', 'REGULATOR');
    regulator.userid = 'REGULATOR';
    regulator.firstName = 'Ronnie';
    regulator.lastName = 'Regulator';
     regulator.address1 = 'Reg1';
        regulator.address2 = 'Reg2';
        regulator.county = 'RegCounty';
        regulator.postcode = 'PO57C0D3';
    const regulatorRegistry = await getParticipantRegistry(NS + '.Regulator');
    await regulatorRegistry.addAll([regulator]); */
 
 
 /*  const veternarians = factory.newResource(NS, 'Vetererians', 'REGULATOR');
    regulator.userid = 'REGULATOR';
    regulator.firstName = 'Ronnie';
    regulator.lastName = 'Regulator';
     regulator.address1 = 'Reg1';
        regulator.address2 = 'Reg2';
        regulator.county = 'RegCounty';
        regulator.postcode = 'PO57C0D3';
    const regulatorRegistry = await getParticipantRegistry(NS + '.Regulator');
    await regulatorRegistry.addAll([regulator]);*/
 

    farmers.forEach(function(farmer) {
        farmer.firstName = farmer.getIdentifier();
        farmer.lastName = 'Know';
        farmer.address1 = 'Address1';
        farmer.address2 = 'Address2';
        farmer.county = 'County';
        farmer.postcode = 'PO57C0D3';
        farmer.emailId ='farmer@gmail.com';
       farmer.passwrd='1234';
      farmer.AccStatus ='NOT_APPROVED';
       
    });
    const farmerRegistry = await getParticipantRegistry(NS + '.Farmer');
    await farmerRegistry.addAll(farmers);



  /*  cattles.forEach(function(cattle, index) {
   
        const farmer = 'FARMER_' + ((index % 2) + 1);
 
        cattle.tradeStatus = 'AVAILABLE';
         cattle.MilkCapacity = '1000';
      cattle.tradetype ='BUY';
     
   
        cattle.owner = factory.newRelationship(NS, 'Farmer', farmer);
    });
    const cattleRegistry = await getAssetRegistry(NS + '.Cattle');
    await cattleRegistry.addAll(cattles);*/
}
