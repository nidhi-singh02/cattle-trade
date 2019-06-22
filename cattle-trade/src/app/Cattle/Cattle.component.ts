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
import { CattleService } from './Cattle.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-cattle',
  templateUrl: './Cattle.component.html',
  styleUrls: ['./Cattle.component.css'],
  providers: [CattleService]
})
export class CattleComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  cattleId = new FormControl('', Validators.required);
  dateBirth = new FormControl('', Validators.required);
  parentCattle = new FormControl('', Validators.required);
  childCattles = new FormControl('', Validators.required);
  dateDeath = new FormControl('', Validators.required);
  breed = new FormControl('', Validators.required);
  milkCapacity = new FormControl('', Validators.required);
  HCStatus = new FormControl('', Validators.required);
  HC = new FormControl('', Validators.required);
  tradeType = new FormControl('', Validators.required);
  tradeStatus = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);

  constructor(public serviceCattle: CattleService, fb: FormBuilder) {
    this.myForm = fb.group({
      cattleId: this.cattleId,
      dateBirth: this.dateBirth,
      parentCattle: this.parentCattle,
      childCattles: this.childCattles,
      dateDeath: this.dateDeath,
      breed: this.breed,
      milkCapacity: this.milkCapacity,
      HCStatus: this.HCStatus,
      HC: this.HC,
      tradeType: this.tradeType,
      tradeStatus: this.tradeStatus,
      owner: this.owner
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCattle.getAll()
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
      $class: 'org.cattle.trading.Cattle',
      'cattleId': this.cattleId.value,
      'dateBirth': this.dateBirth.value,
      'parentCattle': this.parentCattle.value,
      'childCattles': this.childCattles.value,
      'dateDeath': this.dateDeath.value,
      'breed': this.breed.value,
      'milkCapacity': this.milkCapacity.value,
      'HCStatus': this.HCStatus.value,
      'HC': this.HC.value,
      'tradeType': this.tradeType.value,
      'tradeStatus': this.tradeStatus.value,
      'owner': this.owner.value
    };

    this.myForm.setValue({
      'cattleId': null,
      'dateBirth': null,
      'parentCattle': null,
      'childCattles': null,
      'dateDeath': null,
      'breed': null,
      'milkCapacity': null,
      'HCStatus': null,
      'HC': null,
      'tradeType': null,
      'tradeStatus': null,
      'owner': null
    });

    return this.serviceCattle.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'cattleId': null,
        'dateBirth': null,
        'parentCattle': null,
        'childCattles': null,
        'dateDeath': null,
        'breed': null,
        'milkCapacity': null,
        'HCStatus': null,
        'HC': null,
        'tradeType': null,
        'tradeStatus': null,
        'owner': null
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
      $class: 'org.cattle.trading.Cattle',
      'dateBirth': this.dateBirth.value,
      'parentCattle': this.parentCattle.value,
      'childCattles': this.childCattles.value,
      'dateDeath': this.dateDeath.value,
      'breed': this.breed.value,
      'milkCapacity': this.milkCapacity.value,
      'HCStatus': this.HCStatus.value,
      'HC': this.HC.value,
      'tradeType': this.tradeType.value,
      'tradeStatus': this.tradeStatus.value,
      'owner': this.owner.value
    };

    return this.serviceCattle.updateAsset(form.get('cattleId').value, this.asset)
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

    return this.serviceCattle.deleteAsset(this.currentId)
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

    return this.serviceCattle.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'cattleId': null,
        'dateBirth': null,
        'parentCattle': null,
        'childCattles': null,
        'dateDeath': null,
        'breed': null,
        'milkCapacity': null,
        'HCStatus': null,
        'HC': null,
        'tradeType': null,
        'tradeStatus': null,
        'owner': null
      };

      if (result.cattleId) {
        formObject.cattleId = result.cattleId;
      } else {
        formObject.cattleId = null;
      }

      if (result.dateBirth) {
        formObject.dateBirth = result.dateBirth;
      } else {
        formObject.dateBirth = null;
      }

      if (result.parentCattle) {
        formObject.parentCattle = result.parentCattle;
      } else {
        formObject.parentCattle = null;
      }

      if (result.childCattles) {
        formObject.childCattles = result.childCattles;
      } else {
        formObject.childCattles = null;
      }

      if (result.dateDeath) {
        formObject.dateDeath = result.dateDeath;
      } else {
        formObject.dateDeath = null;
      }

      if (result.breed) {
        formObject.breed = result.breed;
      } else {
        formObject.breed = null;
      }

      if (result.milkCapacity) {
        formObject.milkCapacity = result.milkCapacity;
      } else {
        formObject.milkCapacity = null;
      }

      if (result.HCStatus) {
        formObject.HCStatus = result.HCStatus;
      } else {
        formObject.HCStatus = null;
      }

      if (result.HC) {
        formObject.HC = result.HC;
      } else {
        formObject.HC = null;
      }

      if (result.tradeType) {
        formObject.tradeType = result.tradeType;
      } else {
        formObject.tradeType = null;
      }

      if (result.tradeStatus) {
        formObject.tradeStatus = result.tradeStatus;
      } else {
        formObject.tradeStatus = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
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
      'cattleId': null,
      'dateBirth': null,
      'parentCattle': null,
      'childCattles': null,
      'dateDeath': null,
      'breed': null,
      'milkCapacity': null,
      'HCStatus': null,
      'HC': null,
      'tradeType': null,
      'tradeStatus': null,
      'owner': null
      });
  }

}
