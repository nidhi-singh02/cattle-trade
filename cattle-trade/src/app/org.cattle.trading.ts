import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.cattle.trading{
   export enum TradeType {
      BUY,
      SELL,
   }
   export enum TradeStatus {
      TRADE_OFF,
      AVAILABLE,
      IN_TRADE,
      SOLD,
   }
   export enum HCStatus {
      NOT_UPLOADED,
      UPLOADED,
      PENDING_APPROVAL,
      APPROVED,
   }
   export enum AuctionStatus {
      OPEN,
      IN_PROCESS,
      CLOSED,
      SOLD,
   }
   export enum AuctionItem {
      CATTLE,
      MILK,
   }
   export class Cattle extends Asset {
      cattleId: string;
      dateBirth: string;
      parentCattle: string;
      childCattles: string[];
      dateDeath: string;
      breed: string;
      milkCapacity: number;
      HCStatus: HCStatus;
      HC: string;
      tradeType: TradeType;
      tradeStatus: TradeStatus;
      owner: Farmer;
   }
   export class Milk extends Asset {
      milkId: string;
      cattle: Cattle;
   }
   export class Auction extends Asset {
      aucId: string;
      aucItem: AuctionItem;
      aucStatus: AuctionStatus;
      noOfBuyers: number;
      aucBreed: string;
      basePrice: number;
      aucPrice: number[];
      finalPrice: number;
      quantity: number;
      itemId: string[];
      owner: Farmer;
      listOfFarmers: Farmer[];
      cattle: Cattle;
      milk: Milk;
   }
   export abstract class User extends Participant {
      userId: string;
      emailId: string;
      passwrd: string;
      firstName: string;
      lastName: string;
      address1: string;
      address2: string;
      county: string;
      postcode: string;
   }
   export class Farmer extends User {
      allCattle: Cattle[];
   }
   export class DairyComapany extends User {
   }
   export class Veterinarians extends User {
   }
   export class Regulator extends User {
   }
   export abstract class FarmerDetails extends Transaction {
      logs: string[];
      farmer: Farmer;
      cattle: Cattle;
      milk: Milk;
   }
   export class RegisterFarmer extends Transaction {
      emailId: string;
      passwrd: string;
      firstName: string;
      lastName: string;
      address1: string;
      address2: string;
      county: string;
      postcode: string;
   }
   export class Login extends Transaction {
      userId: string;
      passwrd: string;
      userType: string;
   }
   export class RegisterCattle extends Transaction {
      ownerFarmer: Farmer;
      dateBirth: string;
      breed: string;
      milkCapacity: number;
      HCStatus: HCStatus;
      tradeStatus: TradeStatus;
   }
   export class BuyCattle extends Transaction {
      f_NoofCattles: number;
      f_breed: string;
      f_budget: number;
   }
   export class EnterAuctionCattle extends Transaction {
      auction: Auction;
      buyerFarmer: Farmer;
      cattle: Cattle;
      price: number;
   }
   export class CloseAuction extends Transaction {
      auction: Auction;
      farmer: Farmer;
      cattle: Cattle;
   }
   export class OpenCattleAuction extends Transaction {
      farmer: Farmer;
      cattle: Cattle[];
      price: number;
      breed: string;
   }
   export class SellMilk extends FarmerDetails {
   }
   export class UploadHealthCertificate extends Transaction {
      cattle: Cattle;
   }
   export class UpdateCattleInformation extends Transaction {
      cattle: Cattle;
      dateBirth: string;
      breed: string;
      milkCapacity: number;
   }
   export class OpenMilkAuction extends Transaction {
      farmer: Farmer;
      cattle: Cattle[];
      price: number;
      breed: string;
      milkQuantity: number;
   }
   export class BuyMilk extends FarmerDetails {
   }
   export class UpdateDairyInformation extends Transaction {
   }
   export class ApproveCattleCertificate extends Transaction {
   }
   export class UpdateVeterinariansInformation extends Transaction {
   }
   export class ApproveFarmer extends Transaction {
   }
   export class ApproveDairyCompany extends Transaction {
   }
   export class ApproveVeterinarians extends Transaction {
   }
   export class SetupDemo extends Transaction {
   }
   export class AssetRegistered extends Event {
      cattle: Cattle;
   }
   export class AssetProcessed extends Event {
      cattle: Cattle;
      transferGHG: number;
   }
   export class AssetTransferred extends Event {
      cattle: Cattle;
      endGHG: number;
   }
// }
