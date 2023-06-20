import { Component } from '@angular/core';
import { FixtureDto } from '../services/fixture';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent {
  fixtures: FixtureDto[] = [];
}
