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
import { DairyComapanyService } from './DairyComapany.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-dairycomapany',
  templateUrl: './DairyComapany.component.html',
  styleUrls: ['./DairyComapany.component.css'],
  providers: [DairyComapanyService]
})
export class DairyComapanyComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  userId = new FormControl('', Validators.required);
  emailId = new FormControl('', Validators.required);
  passwrd = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  address1 = new FormControl('', Validators.required);
  address2 = new FormControl('', Validators.required);
  county = new FormControl('', Validators.required);
  postcode = new FormControl('', Validators.required);


  constructor(public serviceDairyComapany: DairyComapanyService, fb: FormBuilder) {
    this.myForm = fb.group({
      userId: this.userId,
      emailId: this.emailId,
      passwrd: this.passwrd,
      firstName: this.firstName,
      lastName: this.lastName,
      address1: this.address1,
      address2: this.address2,
      county: this.county,
      postcode: this.postcode
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceDairyComapany.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.cattle.trading.DairyComapany',
      'userId': this.userId.value,
      'emailId': this.emailId.value,
      'passwrd': this.passwrd.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'address1': this.address1.value,
      'address2': this.address2.value,
      'county': this.county.value,
      'postcode': this.postcode.value
    };

    this.myForm.setValue({
      'userId': null,
      'emailId': null,
      'passwrd': null,
      'firstName': null,
      'lastName': null,
      'address1': null,
      'address2': null,
      'county': null,
      'postcode': null
    });

    return this.serviceDairyComapany.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'userId': null,
        'emailId': null,
        'passwrd': null,
        'firstName': null,
        'lastName': null,
        'address1': null,
        'address2': null,
        'county': null,
        'postcode': null
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.cattle.trading.DairyComapany',
      'emailId': this.emailId.value,
      'passwrd': this.passwrd.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'address1': this.address1.value,
      'address2': this.address2.value,
      'county': this.county.value,
      'postcode': this.postcode.value
    };

    return this.serviceDairyComapany.updateParticipant(form.get('userId').value, this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceDairyComapany.deleteParticipant(this.currentId)
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

    return this.serviceDairyComapany.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'userId': null,
        'emailId': null,
        'passwrd': null,
        'firstName': null,
        'lastName': null,
        'address1': null,
        'address2': null,
        'county': null,
        'postcode': null
      };

      if (result.userId) {
        formObject.userId = result.userId;
      } else {
        formObject.userId = null;
      }

      if (result.emailId) {
        formObject.emailId = result.emailId;
      } else {
        formObject.emailId = null;
      }

      if (result.passwrd) {
        formObject.passwrd = result.passwrd;
      } else {
        formObject.passwrd = null;
      }

      if (result.firstName) {
        formObject.firstName = result.firstName;
      } else {
        formObject.firstName = null;
      }

      if (result.lastName) {
        formObject.lastName = result.lastName;
      } else {
        formObject.lastName = null;
      }

      if (result.address1) {
        formObject.address1 = result.address1;
      } else {
        formObject.address1 = null;
      }

      if (result.address2) {
        formObject.address2 = result.address2;
      } else {
        formObject.address2 = null;
      }

      if (result.county) {
        formObject.county = result.county;
      } else {
        formObject.county = null;
      }

      if (result.postcode) {
        formObject.postcode = result.postcode;
      } else {
        formObject.postcode = null;
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
      'userId': null,
      'emailId': null,
      'passwrd': null,
      'firstName': null,
      'lastName': null,
      'address1': null,
      'address2': null,
      'county': null,
      'postcode': null
    });
  }
}
