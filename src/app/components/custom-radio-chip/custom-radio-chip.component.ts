import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { FieldConfig } from "../../field.interface";


const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomRadioChipComponent),
  multi: true
};

@Component({
  selector: 'app-custom-radio-chip',
  template: `
    <mat-chip-list>
      <mat-chip *ngFor="let option of field.options"
        (click)="selectType(option)"
        [value]="option"
        [class.active]="option === value">{{option}}
      </mat-chip>
    </mat-chip-list>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ 
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => CustomRadioChipComponent),
  }]
})
export class CustomRadioChipComponent implements OnInit, ControlValueAccessor {
  field: FieldConfig;
  group: FormGroup;
  public onTouch: Function;
  public onModelChange: Function;
  public value:string = 'torque';
  radioForm: FormGroup;
  ngControl: NgControl;
  constructor(private inj: Injector) {
    

    //this.radioForm.valueChanges.subscribe(data => this.onModelChange(this.value));
  }
  ngOnInit() {
    this.radioForm = new FormGroup({
      interest: new FormControl('')
    });
    //this.ngControl = this.inj.get(NgControl);
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  selectType(value: string) {
    this.value = value;
    this.registerOnChange(value);
    this.onTouch();
  }

  writeValue(obj: string): void {
    this.value = obj; 
  }
}
