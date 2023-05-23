import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PizzaCreateModalComponent } from '../pizza-create-modal/pizza-create-modal.component';
import { PizzaStore } from '../component-store/pizza.store';
import { Observable } from 'rxjs';
import { FilterValue, Pizza } from 'src/app/interfaces/pizzas.interface';

@Component({
  selector: 'app-pizza-create',
  standalone: true,
  imports: [],
  templateUrl: './pizza-create.component.html',
  styleUrls: ['./pizza-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaCreateComponent {
  private modalService = inject(NgbModal);
  private pizzaStore = inject(PizzaStore);

  public pizzaTypes$: Observable<FilterValue[]> = this.pizzaStore.selectTypes$;
  public pizzaComponents$: Observable<FilterValue[]> =
    this.pizzaStore.selectComponents$;

  createPizza() {
    const modalRef = this.modalService.open(PizzaCreateModalComponent);
    modalRef.componentInstance.pizzaTypes$ = this.pizzaTypes$;
    modalRef.componentInstance.pizzaComponents$ = this.pizzaComponents$;
    modalRef.result.then(
      (data: Partial<Pizza>) => {
        const { year, month, day } =
          data.availableFrom as unknown as NgbDateStruct;
        const pizzaWithFormattedDate = {
          ...data,
          availableFrom: `${day}-${month}-${year}`,
        };
        console.log(data);
        this.pizzaStore.createPizza(pizzaWithFormattedDate as Partial<Pizza>);
      },
      () => {
        // on error/dismiss
      }
    );
  }
}
