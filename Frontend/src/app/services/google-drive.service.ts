import { Injectable } from '@angular/core';
declare var gapi: any;
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {
  private clientId = '330108530110-tm1hmc1l4dhg2j8bsl3odu7nn8gs6ij2.apps.googleusercontent.com';
  private apiKey = 'AIzaSyBDMD0XSdZ-x0jterBK8hkgo5kL0K-xCOU'; // Reemplázalo con la clave de API correcta
  private token: string = '';

  constructor() {
    this.loadGoogleApi();
  }

  loadGoogleApi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      console.log('Google API cargada');
      this.authenticateUser();
    };
    document.body.appendChild(script);
  }

  authenticateUser() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: this.clientId,
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        authInstance.signIn().then((user: any) => {
          this.token = user.getAuthResponse().access_token;
          this.createPicker();
        });
      });
    });
  }

  createPicker() {
    if (this.token) {
      const picker = new google.picker.PickerBuilder()
        .setOAuthToken(this.token)
        .addView(google.picker.ViewId.FOLDERS) // Solo permite seleccionar carpetas
        .setCallback((data: any) => {
          if (data.action === google.picker.Action.PICKED) {
            console.log('Carpeta seleccionada:', data.docs[0].id);
          }
        })
        .build();

      picker.setVisible(true);
    }
  }
}
