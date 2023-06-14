import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IFilter } from 'src/app/interfaces/reporting.interface';

@UntilDestroy()
@Component({
  standalone: true,
  imports: [CommonModule, NgSelectModule, ReactiveFormsModule],
  selector: 'app-reporting-page',
  templateUrl: './reporting-page.component.html',
  styleUrls: ['./reporting-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportingPageComponent implements OnInit, AfterViewInit {
  public filters: IFilter;
  public yearsFilter: FormControl = new FormControl('');
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.filters = this.route.snapshot.data['filters'];
  }
  ngAfterViewInit(): void {
    this.yearsFilter.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        console.log(data);
      });
  }
}
