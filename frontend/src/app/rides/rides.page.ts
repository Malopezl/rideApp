import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RideService } from 'src/services/ride';
import { Ride } from 'src/models/ride';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.page.html',
  styleUrls: ['./rides.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RidesPage implements OnInit {

  rides!: Observable<Ride[]>;

  constructor(private rideService: RideService) { }

  ngOnInit() {
    this.getRides();
  }

  getRides() {
    this.rides = this.rideService.getAll();
  }

  delete(id: string) {
    this.rideService.delete(id).subscribe({
      next: (data) => {
        alert('Se elimino la rodada');
        this.getRides();
      },
      error: (error) => {
        alert('No se pudo eliminar la rodada...');
        console.log(error);
      }
    });
  }

}
