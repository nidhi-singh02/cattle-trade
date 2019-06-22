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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { CattleComponent } from './Cattle/Cattle.component';
import { MilkComponent } from './Milk/Milk.component';
import { AuctionComponent } from './Auction/Auction.component';

import { FarmerComponent } from './Farmer/Farmer.component';
import { DairyComapanyComponent } from './DairyComapany/DairyComapany.component';
import { VeterinariansComponent } from './Veterinarians/Veterinarians.component';
import { RegulatorComponent } from './Regulator/Regulator.component';

import { RegisterFarmerComponent } from './RegisterFarmer/RegisterFarmer.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterCattleComponent } from './RegisterCattle/RegisterCattle.component';
import { BuyCattleComponent } from './BuyCattle/BuyCattle.component';
import { EnterAuctionCattleComponent } from './EnterAuctionCattle/EnterAuctionCattle.component';
import { CloseAuctionComponent } from './CloseAuction/CloseAuction.component';
import { OpenCattleAuctionComponent } from './OpenCattleAuction/OpenCattleAuction.component';
import { SellMilkComponent } from './SellMilk/SellMilk.component';
import { UploadHealthCertificateComponent } from './UploadHealthCertificate/UploadHealthCertificate.component';
import { UpdateCattleInformationComponent } from './UpdateCattleInformation/UpdateCattleInformation.component';
import { OpenMilkAuctionComponent } from './OpenMilkAuction/OpenMilkAuction.component';
import { BuyMilkComponent } from './BuyMilk/BuyMilk.component';
import { UpdateDairyInformationComponent } from './UpdateDairyInformation/UpdateDairyInformation.component';
import { ApproveCattleCertificateComponent } from './ApproveCattleCertificate/ApproveCattleCertificate.component';
import { UpdateVeterinariansInformationComponent } from './UpdateVeterinariansInformation/UpdateVeterinariansInformation.component';
import { ApproveFarmerComponent } from './ApproveFarmer/ApproveFarmer.component';
import { ApproveDairyCompanyComponent } from './ApproveDairyCompany/ApproveDairyCompany.component';
import { ApproveVeterinariansComponent } from './ApproveVeterinarians/ApproveVeterinarians.component';
import { SetupDemoComponent } from './SetupDemo/SetupDemo.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CattleComponent,
    MilkComponent,
    AuctionComponent,
    FarmerComponent,
    DairyComapanyComponent,
    VeterinariansComponent,
    RegulatorComponent,
    RegisterFarmerComponent,
    LoginComponent,
    RegisterCattleComponent,
    BuyCattleComponent,
    EnterAuctionCattleComponent,
    CloseAuctionComponent,
    OpenCattleAuctionComponent,
    SellMilkComponent,
    UploadHealthCertificateComponent,
    UpdateCattleInformationComponent,
    OpenMilkAuctionComponent,
    BuyMilkComponent,
    UpdateDairyInformationComponent,
    ApproveCattleCertificateComponent,
    UpdateVeterinariansInformationComponent,
    ApproveFarmerComponent,
    ApproveDairyCompanyComponent,
    ApproveVeterinariansComponent,
    SetupDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
