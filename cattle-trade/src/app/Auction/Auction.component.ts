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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuctionService } from './Auction.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-auction',
  templateUrl: './Auction.component.html',
  styleUrls: ['./Auction.component.css'],
  providers: [AuctionService]
})
export class AuctionComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  aucId = new FormControl('', Validators.required);
  aucItem = new FormControl('', Validators.required);
  aucStatus = new FormControl('', Validators.required);
  noOfBuyers = new FormControl('', Validators.required);
  aucBreed = new FormControl('', Validators.required);
  basePrice = new FormControl('', Validators.required);
  aucPrice = new FormControl('', Validators.required);
  finalPrice = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);
  itemId = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);
  listOfFarmers = new FormControl('', Validators.required);
  cattle = new FormControl('', Validators.required);
  milk = new FormControl('', Validators.required);

  constructor(public serviceAuction: AuctionService, fb: FormBuilder) {
    this.myForm = fb.group({
      aucId: this.aucId,
      aucItem: this.aucItem,
      aucStatus: this.aucStatus,
      noOfBuyers: this.noOfBuyers,
      aucBreed: this.aucBreed,
      basePrice: this.basePrice,
      aucPrice: this.aucPrice,
      finalPrice: this.finalPrice,
      quantity: this.quantity,
      itemId: this.itemId,
      owner: this.owner,
      listOfFarmers: this.listOfFarmers,
      cattle: this.cattle,
      milk: this.milk
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceAuction.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.cattle.trading.Auction',
      'aucId': this.aucId.value,
      'aucItem': this.aucItem.value,
      'aucStatus': this.aucStatus.value,
      'noOfBuyers': this.noOfBuyers.value,
      'aucBreed': this.aucBreed.value,
      'basePrice': this.basePrice.value,
      'aucPrice': this.aucPrice.value,
      'finalPrice': this.finalPrice.value,
      'quantity': this.quantity.value,
      'itemId': this.itemId.value,
      'owner': this.owner.value,
      'listOfFarmers': this.listOfFarmers.value,
      'cattle': this.cattle.value,
      'milk': this.milk.value
    };

    this.myForm.setValue({
      'aucId': null,
      'aucItem': null,
      'aucStatus': null,
      'noOfBuyers': null,
      'aucBreed': null,
      'basePrice': null,
      'aucPrice': null,
      'finalPrice': null,
      'quantity': null,
      'itemId': null,
      'owner': null,
      'listOfFarmers': null,
      'cattle': null,
      'milk': null
    });

    return this.serviceAuction.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'aucId': null,
        'aucItem': null,
        'aucStatus': null,
        'noOfBuyers': null,
        'aucBreed': null,
        'basePrice': null,
        'aucPrice': null,
        'finalPrice': null,
        'quantity': null,
        'itemId': null,
        'owner': null,
        'listOfFarmers': null,
        'cattle': null,
        'milk': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.cattle.trading.Auction',
      'aucItem': this.aucItem.value,
      'aucStatus': this.aucStatus.value,
      'noOfBuyers': this.noOfBuyers.value,
      'aucBreed': this.aucBreed.value,
      'basePrice': this.basePrice.value,
      'aucPrice': this.aucPrice.value,
      'finalPrice': this.finalPrice.value,
      'quantity': this.quantity.value,
      'itemId': this.itemId.value,
      'owner': this.owner.value,
      'listOfFarmers': this.listOfFarmers.value,
      'cattle': this.cattle.value,
      'milk': this.milk.value
    };

    return this.serviceAuction.updateAsset(form.get('aucId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceAuction.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceAuction.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'aucId': null,
        'aucItem': null,
        'aucStatus': null,
        'noOfBuyers': null,
        'aucBreed': null,
        'basePrice': null,
        'aucPrice': null,
        'finalPrice': null,
        'quantity': null,
        'itemId': null,
        'owner': null,
        'listOfFarmers': null,
        'cattle': null,
        'milk': null
      };

      if (result.aucId) {
        formObject.aucId = result.aucId;
      } else {
        formObject.aucId = null;
      }

      if (result.aucItem) {
        formObject.aucItem = result.aucItem;
      } else {
        formObject.aucItem = null;
      }

      if (result.aucStatus) {
        formObject.aucStatus = result.aucStatus;
      } else {
        formObject.aucStatus = null;
      }

      if (result.noOfBuyers) {
        formObject.noOfBuyers = result.noOfBuyers;
      } else {
        formObject.noOfBuyers = null;
      }

      if (result.aucBreed) {
        formObject.aucBreed = result.aucBreed;
      } else {
        formObject.aucBreed = null;
      }

      if (result.basePrice) {
        formObject.basePrice = result.basePrice;
      } else {
        formObject.basePrice = null;
      }

      if (result.aucPrice) {
        formObject.aucPrice = result.aucPrice;
      } else {
        formObject.aucPrice = null;
      }

      if (result.finalPrice) {
        formObject.finalPrice = result.finalPrice;
      } else {
        formObject.finalPrice = null;
      }

      if (result.quantity) {
        formObject.quantity = result.quantity;
      } else {
        formObject.quantity = null;
      }

      if (result.itemId) {
        formObject.itemId = result.itemId;
      } else {
        formObject.itemId = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      if (result.listOfFarmers) {
        formObject.listOfFarmers = result.listOfFarmers;
      } else {
        formObject.listOfFarmers = null;
      }

      if (result.cattle) {
        formObject.cattle = result.cattle;
      } else {
        formObject.cattle = null;
      }

      if (result.milk) {
        formObject.milk = result.milk;
      } else {
        formObject.milk = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'aucId': null,
      'aucItem': null,
      'aucStatus': null,
      'noOfBuyers': null,
      'aucBreed': null,
      'basePrice': null,
      'aucPrice': null,
      'finalPrice': null,
      'quantity': null,
      'itemId': null,
      'owner': null,
      'listOfFarmers': null,
      'cattle': null,
      'milk': null
      });
  }

}
