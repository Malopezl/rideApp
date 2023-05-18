import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { RideService } from 'src/services/ride';
import { DEFAULT_RIDE_OBJECT, Ride } from 'src/models/ride';

@Component({
  selector: 'app-ride-form',
  templateUrl: './ride-form.page.html',
  styleUrls: ['./ride-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RideFormPage implements OnInit {

  id!: string;
  editing = false;
  ride: Ride = DEFAULT_RIDE_OBJECT;

  constructor(private activatedRoute: ActivatedRoute, private navCtrl: NavController, private rideService: RideService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.editing = (this.id !== 'new');
    if (this.editing) {
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
  }

  save() {
    if (this.editing) {
      this.rideService.update(this.ride).subscribe({
        next: (data) => {
          alert('Se actualizo la rodada');
          this.navCtrl.pop();
          console.log(data);
        },
        error: (error) => {
          alert('No se pudo actualizar la rodada...');
          console.log(error);
        }
      });
    } else {
      this.rideService.create(this.ride).subscribe({
        next: (data) => {
          alert('Se creo la rodada');
          this.navCtrl.pop();
          console.log(data);
        },
        error: (error) => {
          alert('No se pudo crear la rodada...');
          console.log(error);
        }
      });
    }
  }

}
