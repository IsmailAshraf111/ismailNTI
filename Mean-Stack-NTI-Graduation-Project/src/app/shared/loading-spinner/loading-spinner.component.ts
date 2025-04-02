import { Component, Input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css',
  imports: [ProgressSpinnerModule],
})
export class LoadingSpinnerComponent {
  @Input() strokeWidth: number = 8;
  @Input() fill: string = 'transparent';
  @Input() animationDuration: string = '.5s';
  @Input() width: string = '50px';
  @Input() height: string = '50px';

}
