import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalExampleComponent } from '../modal-example/modal-example.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ResultsPage implements OnInit, AfterViewInit {
  options: Array<String> = [];
  winner: String | null = null;

  @ViewChild('canvas', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private router: Router, private modalCtrl: ModalController) {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalExampleComponent,
      componentProps: { winner: this.winner },
    });
    modal.present();
  }

  ngOnInit() {
    if (!this.router.getCurrentNavigation()) return;

    if (!this.router) return;

    if (this.router.getCurrentNavigation()?.extras.state) {
      this.options =
        this.router.getCurrentNavigation()?.extras?.state?.['options'];
    }
  }

  ngAfterViewInit() {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const center = canvas.width / 2;

    this.options.forEach((option, index) => {
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(
        center,
        center,
        center - 20,
        (index * 2 * Math.PI) / this.options.length,
        ((index + 1) * 2 * Math.PI) / this.options.length
      );
      ctx.fillStyle = this.randomColor();
      ctx.fill();

      //!Escribir los nombres
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(
        (3 * 2 * Math.PI) / (5 * this.options.length) +
          (index * 2 * Math.PI) / this.options.length
      );
      ctx.translate(-center, -center);
      ctx.font = '13px Sans-serif';
      ctx.fillStyle = 'white';
      ctx.fillText(option as string, canvas.width - 120, center);
      ctx.restore();
    });
  }

  private randomColor() {
    return `#${Array.from(
      { length: 6 },
      () => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]
    ).join('')}`;
  }

  posInitial: number = 0;
  isSpinning: boolean = false;
  movement: any;

  spin() {
    if (this.isSpinning) return;
    this.isSpinning = true;

    const duration = 1500;
    const interval = 10;
    const increment = 10;

    this.movement = setInterval(() => {
      this.posInitial += increment;
      this.canvas.nativeElement.style.transform = `rotate(${this.posInitial}deg)`;
    }, interval);

    setTimeout(() => {
      this.detectWinner();
    }, duration - 100);

    setTimeout(() => {
      clearInterval(this.movement);
      this.isSpinning = false;
    }, duration);
  }

  detectWinner(){
    const random = Math.floor(Math.random() * this.options.length);
    this.winner = this.options[random];
    this.openModal();
  }

  // detectWinner() {
  //   const canvas = this.canvas.nativeElement;
  //   const center = canvas.width / 2;

  //   // Obtener el ángulo de rotación actual
  //   const currentRotation = this.posInitial % 360; // Asegúrate de que esté en el rango de 0 a 360

  //   // Calcular el ángulo de la flecha
  //   const markWinner = document.querySelector('.mark-winner') as HTMLElement;
  //   const markCenterX =
  //     markWinner.getBoundingClientRect().left + markWinner.offsetWidth / 2;
  //   const markCenterY =
  //     markWinner.getBoundingClientRect().top + markWinner.offsetHeight / 2;

  //   // Calcular el ángulo en relación al centro del canvas
  //   const canvasRect = canvas.getBoundingClientRect();
  //   const angle = Math.atan2(
  //     markCenterY - (canvasRect.top + center),
  //     markCenterX - (canvasRect.left + center)
  //   );
  //   const degrees = angle * (180 / Math.PI); // Convertir a grados

  //   // Ajustar el ángulo para que esté en el rango de 0 a 360
  //   const adjustedDegrees = (degrees + 360) % 360;

  //   // Calcular el ángulo real considerando la rotación actual
  //   const finalAngle = (adjustedDegrees + 360 - currentRotation) % 360; // Resta la rotación actual

  //   // Calcular el ángulo de cada opción y determinar el ganador
  //   const totalOptions = this.options.length;
  //   const anglePerOption = 360 / totalOptions;

  //   let closestIndex = -1;
  //   let closestDifference = 360; // Inicializar con un valor alto

  //   for (let i = 0; i < totalOptions; i++) {
  //     const optionStartAngle = i * anglePerOption;
  //     const optionEndAngle = (i + 1) * anglePerOption;

  //     // Verificar si el ángulo final está dentro del rango de la opción
  //     if (finalAngle >= optionStartAngle && finalAngle < optionEndAngle) {
  //       closestIndex = i;
  //       break; // Salir del bucle si encontramos el ganador
  //     }

  //     // Calcular la diferencia entre el ángulo final y el ángulo de inicio de la opción
  //     let difference = Math.abs(finalAngle - optionStartAngle);
  //     if (difference > 180) {
  //       difference = 360 - difference; // Ajustar para la diferencia más corta
  //     }

  //     // Verificar si esta opción es la más cercana
  //     if (difference < closestDifference) {
  //       closestDifference = difference;
  //       closestIndex = i;
  //     }
  //   }

  //   // Si no se encontró un ganador en el rango, usar el más cercano
  //   if (closestIndex === -1) {
  //     closestIndex = (closestIndex + totalOptions) % totalOptions; // Asegurarse de que esté en el rango
  //   }

  //   // Obtener el ganador
  //   const winner = this.options[closestIndex];
  //   console.log('El ganador es:', winner);
  //   this.winner = winner;
  //   this.openModal();
  //   this.winner = null;
  // }
}
