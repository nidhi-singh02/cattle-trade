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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Cattle', component: CattleComponent },
  { path: 'Milk', component: MilkComponent },
  { path: 'Auction', component: AuctionComponent },
  { path: 'Farmer', component: FarmerComponent },
  { path: 'DairyComapany', component: DairyComapanyComponent },
  { path: 'Veterinarians', component: VeterinariansComponent },
  { path: 'Regulator', component: RegulatorComponent },
  { path: 'RegisterFarmer', component: RegisterFarmerComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'RegisterCattle', component: RegisterCattleComponent },
  { path: 'BuyCattle', component: BuyCattleComponent },
  { path: 'EnterAuctionCattle', component: EnterAuctionCattleComponent },
  { path: 'CloseAuction', component: CloseAuctionComponent },
  { path: 'OpenCattleAuction', component: OpenCattleAuctionComponent },
  { path: 'SellMilk', component: SellMilkComponent },
  { path: 'UploadHealthCertificate', component: UploadHealthCertificateComponent },
  { path: 'UpdateCattleInformation', component: UpdateCattleInformationComponent },
  { path: 'OpenMilkAuction', component: OpenMilkAuctionComponent },
  { path: 'BuyMilk', component: BuyMilkComponent },
  { path: 'UpdateDairyInformation', component: UpdateDairyInformationComponent },
  { path: 'ApproveCattleCertificate', component: ApproveCattleCertificateComponent },
  { path: 'UpdateVeterinariansInformation', component: UpdateVeterinariansInformationComponent },
  { path: 'ApproveFarmer', component: ApproveFarmerComponent },
  { path: 'ApproveDairyCompany', component: ApproveDairyCompanyComponent },
  { path: 'ApproveVeterinarians', component: ApproveVeterinariansComponent },
  { path: 'SetupDemo', component: SetupDemoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
