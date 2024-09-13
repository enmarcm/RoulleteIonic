import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import {
  IonHeader,
  IonButtons,
  IonToolbar,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonList,
    IonContent,
    IonTitle,
    IonButton,
    IonToolbar,
    IonButtons,
    IonHeader,
  ],
})
export class ModalExampleComponent {
  constructor(private modalCtrl: ModalController, private router: Router) {}

  @Input() winner!: String;

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    console.log('Confirmamos');
    this.cancel();
    //Redireccionare
    this.router.navigate(['/home']);
    return;
  }
}
