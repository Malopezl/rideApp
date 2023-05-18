import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { DEFAULT_RIDE_OBJECT, Ride } from 'src/models/ride';
import { RideService } from 'src/services/ride';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RidePage implements OnInit {
  id!: string;
  ride: Ride = DEFAULT_RIDE_OBJECT;

  constructor(private rideService: RideService, private navCtrl: NavController, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.rideService.getById(this.id).subscribe({
      next: (data: Ride) => {
        this.ride = data;
        console.log(data);
      },
      error: (error) => {
        alert('No se pudo obtener la rodada...');
        console.log(error);
      }
    });
  }

  delete() {
    this.rideService.delete(this.ride.id!).subscribe({
      next: (data) => {
        alert('Se elimino la rodada');
        this.navCtrl.pop();
      },
      error: (error) => {
        alert('No se pudo eliminar la rodada...');
        console.log(error);
      }
    });
  }

}
