import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbActiveModal,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbDatepickerConfig,
  NgbDatepickerModule,
  NgbInputDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Observable, of, take } from 'rxjs';
import { FilterValue } from '../../utils/get-filters-from-pizzas';
import { PizzaApiService } from 'src/app/services/pizza-api.service';
import { NgbDateCustomParserFormatter } from 'src/app/utils/ngb-date-formater';

@Component({
  selector: 'app-pizza-create-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule,
  ],
  providers: [
    NgbInputDatepickerConfig,
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
  ],
  templateUrl: './pizza-create-modal.component.html',
  styleUrls: ['./pizza-create-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaCreateModalComponent implements OnInit {
  @Input() pizzaTypes$: Observable<FilterValue[]> = of();
  @Input() pizzaComponents$: Observable<FilterValue[]> = of();

  public activeModal = inject(NgbActiveModal);
  public fb = inject(FormBuilder);
  private calendar = inject(NgbCalendar);

  public pizzaFormGroup: FormGroup;
  public minDate: NgbDateStruct = this.calendar.getToday();
  public isSubmitted = false;

  constructor() {
    this.pizzaFormGroup = this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      components: [[], Validators.required],
      types: [],
      availableFrom: [null, Validators.required],
      currency: 'UAH',
    });
  }

  ngOnInit(): void {}

  public onClose(): void {
    this.activeModal.dismiss();
  }

  public onCreate(): void {
    this.isSubmitted = true;
    if (this.pizzaFormGroup.invalid) return;
    this.activeModal.close(this.pizzaFormGroup.value);
  }
}
