import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-reporting-page',
  templateUrl: './reporting-page.component.html',
  styleUrls: ['./reporting-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportingPageComponent {

}
