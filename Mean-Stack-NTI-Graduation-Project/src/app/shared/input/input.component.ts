import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
  
  ],
})
export class InputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() name: string = 'input-name';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() error: string = '';
  @Input() errorMessage: string = 'This field is required';
  @Input() errorClass: string = 'error-message';
  @Input() inputClass: string = 'input-field';
  @Input() labelClass: string = 'label-field';
  @Input() containerClass: string = 'input-container';
  @Input() icon: string = '';
  @Input() formGroup!: FormGroup;
  @Input() className: string = 'input-field';
  @Input() controlName!: string;

  focused: boolean = false;

  get formControl(): FormControl {
    return this.formGroup.get(this.controlName) as FormControl;
  }
  get hasError(): boolean {
    return this.formControl?.invalid && this.formControl.touched;
  }

  get errMessage() {
    if (!this.hasError) return [];
    const errors = this.formControl.errors;
    const messages: string[] = [];
    if (errors?.['required']) messages.push('app.validation.required');
    if (errors?.['invalidEmail']) messages.push('app.validation.invalidEmail');
    if (errors?.['minlength']) messages.push('app.validation.minLength');
    if (errors?.['maxlength']) messages.push('app.validation.maxLength');
    if (errors?.['pattern']) messages.push('app.validation.pattern');
    if (errors?.['email']) messages.push('app.validation.email');
    if (errors?.['min']) messages.push('app.validation.min');
    if (errors?.['max']) messages.push('app.validation.max');
    if (errors?.['minDate']) messages.push('app.validation.minDate');
    if (errors?.['maxDate']) messages.push('app.validation.maxDate');
    if (errors?.['invalidDate']) messages.push('app.validation.invalidDate');
    if (errors?.['invalidTime']) messages.push('app.validation.invalidTime');
    if (errors?.['invalidDateFormat'])
      messages.push('app.validation.invalidDateFormat');
    if (errors?.['invalidTimeFormat'])
      messages.push('app.validation.invalidTimeFormat');
    if (errors?.['invalidDateRange'])
      messages.push('app.validation.invalidDateRange');
    if (errors?.['invalidTimeRange'])
      messages.push('app.validation.invalidTimeRange');
    if (errors?.['invalidDateTime'])
      messages.push('app.validation.invalidDateTime');
    if (errors?.['invalidDateTimeFormat'])
      messages.push('app.validation.invalidDateTimeFormat');
    if (errors?.['invalidDateTimeRange'])
      messages.push('app.validation.invalidDateTimeRange');
    if (errors?.['invalidDateTimeRangeFormat'])
      messages.push('app.validation.invalidDateTimeRangeFormat');
    if (errors?.['invalidDateTimeRangeFormat'])
      messages.push('app.validation.invalidDateTimeRangeFormat');
    if (errors?.['invalidDateTimeRangeFormat'])
      messages.push('app.validation.invalidDateTimeRangeFormat');
    if (errors?.['invalidPassword']) {
      const missing = [];
      if (!errors['invalidPassword'].hasUpperCase)
        missing.push('app.validation.missingUpperCase');
      if (!errors['invalidPassword'].hasNumber)
        missing.push('app.validation.missingNumber');
      if (!errors['invalidPassword'].hasSpecialChar)
        missing.push('app.validation.missingSpecialChar');
      messages.push(...missing);
    }
    return messages;
  }

  
  hasValue(): boolean {
    return !!this.formControl?.value || this.formControl?.value === 0;
  }

}
