import { Component } from '@angular/core';
import { NavController, ViewController  } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})


export class LocationPage {
	asam_form: FormGroup;
	directions = ['N', 'W', 'E' , 'S'];
	constructor(public navCtrl: NavController,
		public formBuilder: FormBuilder,
		public viewCtrl: ViewController
		
		
	) {
		
	}
	
	closeModal() {
		this.viewCtrl.dismiss();
	}
	
	ionViewWillLoad() {
		this.asam_form = this.formBuilder.group({
			degree: new FormControl('', Validators.required),
			minute: new FormControl('', Validators.required),
			seconds: new FormControl('', Validators.required),
			direction: new FormControl('' , Validators.required),
		});
	}
  
	validation_messages = {
		'degree': [
			{ type: 'required', message: 'Degree is required.' }
		],
		'minute': [
			{ type: 'required', message: 'Minute is required.' }
		],
		'seconds': [
			{ type: 'pattern', message: 'Second is required' }
		],
		'direction': [
			{ type: 'required', message: 'Direction is required.' }
		],
	};
	
	
	onSubmit(values) {
		this.viewCtrl.dismiss(values);
	}

}
