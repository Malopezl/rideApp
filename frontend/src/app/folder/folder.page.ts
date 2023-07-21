import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Credential, DEFAULT_CREDENTIAL_OBJECT } from 'src/models/credential';
import { AuthenticationService } from 'src/services/authentication';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class FolderPage {
  isLoggingIn = true;
  credential: Credential = DEFAULT_CREDENTIAL_OBJECT;

  constructor(
    private authenticationService: AuthenticationService,
    private navCtrl: NavController
  ) { }

  public toggleLogin = () => {
    this.isLoggingIn = !this.isLoggingIn;
  };

  login() {
    if (this.isLoggingIn) {
      this.doLogin();
    } else {
      if (this.credential.password !== this.credential.passwordConfirm) {
        alert('Tus contraseñas no coincidieron');
        return;
      }
      this.authenticationService
        .signup({
          email: this.credential.email,
          password: this.credential.password,
        })
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.doLogin();
          },
          error: (error) => {
            alert('No se pudo autenticar!');
            console.log(error);
          },
        });
    }
  }

  doLogin() {
    this.authenticationService
      .login({
        email: this.credential.email,
        password: this.credential.password,
      })
      .subscribe({
        next: (data: any) => {
          // console.log('[DATA]: ', data);
          localStorage.setItem('jwt', data.token);
          this.navCtrl.navigateRoot('/rides');
        },
        error: (error) => {
          alert('No se pudo autenticar!');
          console.log(error);
        },
      });
  }
}
