import { Component } from '@angular/core';
import { FirstSectionComponent } from './first-section.component';
import { FeaturesSectionComponent } from './features-section.component';

@Component({
  selector: 'nx-heavyduty1-home-page',
  template: `
    <nx-heavyduty1-first-section></nx-heavyduty1-first-section>
    <nx-heavyduty1-features-section></nx-heavyduty1-features-section>
  `,
  standalone: true,
  imports: [FirstSectionComponent, FeaturesSectionComponent]
})

export class HomePageComponent {}