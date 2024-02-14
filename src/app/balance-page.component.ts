import { Component } from '@angular/core';
import { BalanceSectionComponent } from './balance-section.component';

@Component({
  selector: 'nx-heavyduty1-balance-page',
  template: `
    <nx-heavyduty1-balance-section class="flex justify-center"></nx-heavyduty1-balance-section>
  `,
  standalone: true,
  imports: [BalanceSectionComponent]
})

export class BalancePageComponent {}