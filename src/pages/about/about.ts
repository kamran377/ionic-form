import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController  } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
	@ViewChild('map') mapElement: ElementRef;
	map: any;
	lat:any;
	lng:any;
	constructor(public navCtrl: NavController,
		public  geolocation:Geolocation,
		public viewCtrl: ViewController 
	) {
	
	}
	
	selectLocation() {
		console.log(this.lat);
					console.log(this.lng);
		var data = {
		  'lat': this.lat.toFixed(6),
		  'lng': this.lng.toFixed(6),
		}
		this.viewCtrl.dismiss(data);
	}
	
	ngOnInit(){
		this.loadMap();
	}
	
	loadMap() {
		var latLng;
		let me = this;
		this.geolocation.getCurrentPosition().then((position) => {
			me.lat = position.coords.latitude;
			me.lng = position.coords.longitude;
			
			latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				
			let mapOptions = {
				center: latLng,
				zoom:15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
			let marker = new google.maps.Marker({
				map: this.map,
				animation: google.maps.Animation.DROP,
				position: latLng,
				draggable: true,
			});
			google.maps.event.addListener(
				marker,
				'drag',
				function() {
					me.lat = marker.position.lat();
					me.lng = marker.position.lng();
					
				}
			); 
		}, (err) => {
			console.log(err);
			me.lat = -34.9290;
			me.lng = 138.6010;
			  latLng = new google.maps.LatLng(-34.9290, 138.6010);
			 let mapOptions = {
				center: latLng,
				zoom: 15,
			//mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
			let marker = new google.maps.Marker({
				map: this.map,
				animation: google.maps.Animation.DROP,
				position: latLng,
				draggable: true,
			});
			google.maps.event.addListener(
				marker,
				'drag',
				function() {
					me.lat = marker.position.lat();
					me.lng = marker.position.lng();
					
				}
			); 
		});
		
		
		 
	}
}
