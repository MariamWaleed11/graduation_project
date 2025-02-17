import { Component, OnInit } from '@angular/core';
// import { GlobalService } from '../global.service';
// import * as L from 'leaflet';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
//   private map: any;

//   constructor(private GlobalService: GlobalService) {}

//   ngOnInit(): void {
//     this.initMap();
//     this.fetchSatellitePosition();
//   }

//   // تهيئة الخريطة
//   private initMap(): void {
//     this.map = L.map('map').setView([0, 0], 2);
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; OpenStreetMap contributors'
//     }).addTo(this.map);
//   }

//   // جلب موقع القمر الصناعي أو محطة الفضاء
//   private fetchSatellitePosition() :void {
//     this.GlobalService.getSatellitePosition().subscribe((data: any) => {
//       const { latitude, longitude } = data.iss_position;

//       // إضافة علامة في الموقع
//       L.marker([latitude, longitude])
//         .addTo(this.map)
//         .bindPopup('Current ISS Location')
//         .openPopup();

//       // تحريك الخريطة إلى الموقع الجديد
//       this.map.setView([latitude, longitude], 4);
//     });
//   }
// }
}