import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log('Formulario válido:', this.formulario.value);
    } else {
      console.log('Formulario inválido. Corrige los errores antes de enviarlo.');
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.formulario.get(controlName);
    if (control?.invalid && control?.touched) {
      // Accede a las propiedades solo si 'control' no es nulo
      if (control.hasError('required')) {
        return 'Campo obligatorio';
      }
      if (control.hasError('email')) {
        return 'Email no válido';
      }
      if (control.hasError('minlength')) {
        return 'La contraseña debe tener al menos 8 caracteres';
      }
    }
    return '';
  }
}