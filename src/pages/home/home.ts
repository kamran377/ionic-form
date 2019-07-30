import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AboutPage } from '../../pages/about/about';
import { LocationPage } from '../../pages/location/location';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
	asam_form: FormGroup;
	directions = ['N', 'W', 'E' , 'S'];
	constructor(public navCtrl: NavController,
		public formBuilder: FormBuilder,
		public modalCtrl: ModalController,
		public storage :Storage,
		public toastCtrl: ToastController
		
	) {
		
	}
	
	showLatModal() {
		let modal = this.modalCtrl.create(LocationPage);
		modal.onDidDismiss(data => {
			if (data) {
				let values = data;
				let lat = parseInt(values.degree, 10) + (parseFloat(values.minute) / 60) + (parseFloat(values.seconds) / 60);
				let latDirection = values.direction == 'N' ? 1 : -1;
				lat = lat * latDirection;
				let latStr = lat.toFixed(6);
				this.asam_form.get('lat').setValue(latStr);
				
				this.asam_form.get('lat_degree').setValue(values.degree);
				this.asam_form.get('lat_minute').setValue(values.minute);
				this.asam_form.get('lat_second').setValue(values.seconds);
				this.asam_form.get('lat_direction').setValue(values.direction);
				
				
			}
		});
		modal.present();
	}
	
	showLngModal() {
		let modal = this.modalCtrl.create(LocationPage);
		modal.onDidDismiss(data => {
			if (data) {
				let values = data;
				let lng = parseInt(values.degree, 10) + (parseFloat(values.minute) / 60) + (parseFloat(values.seconds) / 60);
				let lngDirection = values.direction == 'E' ? 1 : -1;
				lng = lng * lngDirection;
				let lngStr = lng.toFixed(6);
				this.asam_form.get('lng').setValue(lngStr);
				
				this.asam_form.get('lng_degree').setValue(values.degree);
				this.asam_form.get('lng_minute').setValue(values.minute);
				this.asam_form.get('lng_second').setValue(values.seconds);
				this.asam_form.get('lng_direction').setValue(values.direction);
			}
		});
		modal.present();
	}
	
	showMap() {
		// reset
		let modal = this.modalCtrl.create(AboutPage);
		modal.onDidDismiss(data => {
			if (data) {
				let lat = data.lat;
				let lng = data.lng;
				
				let latArray = lat.split('.');
				let latDegree = latArray[0];
				let latFloat = parseFloat(0 + "." + latArray[1]);
				let latCalc = latFloat * 60;
				let latCalcS = latCalc.toString();
				let latCalcArray = latCalcS.split('.');
				let latMinute = latCalcArray[0];
				let latSeconds = parseFloat(0 + "." + latCalcArray[1]) * 60;
				
				
				let lngArray = lng.split('.');
				let lngDegree = lngArray[0];
				let lngFloat = parseFloat(0 + "." + lngArray[1]);
				let lngCalc = lngFloat * 60;
				let lngCalcS = lngCalc.toString();
				let lngCalcArray = lngCalcS.split('.');
				let lngMinute = lngCalcArray[0];
				let lngSeconds = parseFloat(0 + "." + lngCalcArray[1]) * 60;
				
				
				let latDirection = lat > 0 ? 'N' : 'S';
				let lngDirection = lng > 0 ? 'E' : 'W';
				
				
				console.log(data);
				console.log(latDegree + " " + latMinute + " " + latSeconds + " " + latDirection);
				console.log(lngDegree + " " + lngMinute + " " + lngSeconds + " " + lngDirection);
				
				this.asam_form.get('lat').setValue(lat);
				this.asam_form.get('lng').setValue(lng);
				
				
				this.asam_form.get('lat_degree').setValue(latDegree);
				this.asam_form.get('lat_minute').setValue(latMinute);
				this.asam_form.get('lat_second').setValue(latSeconds);
				this.asam_form.get('lat_direction').setValue(latDirection);
				
				this.asam_form.get('lng_degree').setValue(lngDegree);
				this.asam_form.get('lng_minute').setValue(lngMinute);
				this.asam_form.get('lng_second').setValue(lngSeconds);
				this.asam_form.get('lng_direction').setValue(lngDirection);
				
			}
		});
		modal.present();
	}
	
	ionViewWillLoad() {
		this.asam_form = this.formBuilder.group({
			poc: new FormControl('', Validators.required),
			organization: new FormControl('', Validators.required),
			email: new FormControl('',  Validators.pattern('[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')),
			address: new FormControl('', null),
			phone: new FormControl('', null),
			fax: new FormControl('', null),
			doo_date: new FormControl(new Date().toISOString(), Validators.required),
			lat_degree: new FormControl('', null),
			lat_minute: new FormControl('', null),
			lat_second: new FormControl('', null),
			lat_direction: new FormControl('' , null),
			lng_degree: new FormControl('' , null),
			lng_minute: new FormControl('', null),
			lng_second: new FormControl('',  null),
			lng_direction: new FormControl('' , null),
			lat: new FormControl('', null),
			lng: new FormControl('', null),
			suspect: new FormControl('', null),
			victim: new FormControl('', Validators.required),
			comments: new FormControl('', Validators.required),
		});
	}
  
	validation_messages = {
		'poc': [
			{ type: 'required', message: 'Point of Contact is required.' }
		],
		'organization': [
			{ type: 'required', message: 'Ship/Organization is required.' }
		],
		'email': [
			{ type: 'pattern', message: 'Valid Email Address is required' }
		],
		'doo_date': [
			{ type: 'required', message: 'Date of Occurance is required.' }
		],
		'victim': [
			{ type: 'required', message: 'Victim is required.' }
		],
		'comments': [
			{ type: 'required', message: 'Comments is required.' }
		],
	};
	
	range(range){
		let x=[];
		let i=1;
		while(i <= range) {
			x.push(i);
			i++;
		}
		return x;
	}
	
	onSubmit(values) {
		let key = values.doo_date + "-" + values.victim;
		this.storage.set(key, values).then((val) => {
			console.log('Your age is', val);
			let toast = this.toastCtrl.create({
			  message: "ASAM saved on device successfully!",
			  duration: 3000,
			  cssClass: 'toast-success',
			  position: 'bottom',
			});
			toast.present();
		});;
		
		//this.navCtrl.pop();
	}

}
