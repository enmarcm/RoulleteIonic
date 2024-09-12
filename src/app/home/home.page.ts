import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/angular/standalone';
import { INITIAL_VALUES_INPUT } from 'src/constants';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
  ],
})
export class HomePage {
  options!: Array<{ value: string; sts?: string }>;
  parsedInitialValues = INITIAL_VALUES_INPUT.map((item) => item.value);

  constructor(private navCtrl: NavController) {
    this.options = INITIAL_VALUES_INPUT;
  }

  verifyOptions(): boolean {
    const DEFAULT_VALUES = [...this.parsedInitialValues, 'Nueva opcion'];
    let foundInactive = false;
  
    DEFAULT_VALUES.forEach((value) => {
      const optionIndex = this.options.findIndex(
        (option) => option.value === value
      );
      if (optionIndex !== -1) {
        this.options[optionIndex] = { value, sts: 'inactive' };
        foundInactive = true;
      }
    });
  
    return !foundInactive;
  }

  addOption() {
    if (this.options.length >= 6) return;

    this.options.push({ value: 'Nueva opcion' });
  }

  updateOption(event: any, index: number) {
    this.options[index].value = event.target.value;
    this.options[index].sts = 'active';
  }

  goToResults() {
    if (!this.verifyOptions()) return;
    const parsedOptions = this.options.map((option) => option.value);

    this.navCtrl.navigateForward('/results', {
      state: {
        options: parsedOptions,
      },
    });
  }
}
