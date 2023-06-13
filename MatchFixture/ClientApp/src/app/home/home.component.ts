import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamService } from '../services/team';
interface Fixture {
  homeTeam: string;
  awayTeam: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  teams = [
    "Arsenal",
    "Aston Villa",
    "Brentford",
    "Brighton & Hove Albion",
    "Burnley",
    "Chelsea",
    //"Crystal Palace",
    //"Everton",
    //"Leeds United",
    //"Leicester City",
    //"Liverpool",
    //"Manchester City",
    //"Manchester United",
    //"Newcastle United",
    //"Norwich City",
    //"Southampton",
    //"Tottenham Hotspur",
    //"Watford",
    //"West Ham United",
    //"Wolverhampton Wanderers"
  ];
  fixtures: any;
  form: FormGroup;
  name: FormControl;
  closeResult = '';
  isModalOpen = false;
  isSubmitted = false;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private teamService: TeamService) {
  }


  ngOnInit() {
    this.buildForm();
    // this.generateFixtures();
  }
  // get validData() {
  //   return this.form.controls;
  // }

  //  buildForm() {
  //   this.form = this.fb.group({
  //     name: [ '', Validators.required]
  //   });
  //   console.log(this.form);
  // }

  buildForm() {
    this.name = new FormControl('', [Validators.required]);
    this.form = new FormGroup({
      name: this.name,
    });
  }

  add(teamModal) {
    this.buildForm();
    this.modalService.open(teamModal, { ariaLabelledBy: '' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  get signUpData() { return this.form.controls; }

  onSubmit() {
    this.isModalOpen = true;
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    this.isSubmitting = true;
    this.isSubmitted = false;

    this.teamService.addTeam(this.form.value).subscribe(x => {
      this.isSubmitting = false;
      this.resetForm();
    }, error => {
      this.isSubmitting = false;
    });
  }

  resetForm() {
    this.form.reset();
  }
  // generateFixtures() {
  //   var numberOfRounds = this.teams.length - 1;
  //   let fixtureCopy = [];
  //     for (let i = 0; i < numberOfRounds; i++) {
  //       const fixturesInRound1 = [];
  //       const fixturesInRound2 = [];

  //       for (var j = 0; j < this.teams.length / 2; j++) {
  //         const homeTeam = this.teams[j];
  //         const awayTeam = this.teams[this.teams.length - 1 - j];
  //         let fixture = {} as Fixture
  //         let fixture1 = {} as Fixture
  //         fixture = {
  //           homeTeam: homeTeam,
  //           awayTeam: awayTeam,
  //         };
  //         fixture1 = {
  //           homeTeam: awayTeam,
  //           awayTeam: homeTeam,
  //         };
  //         fixturesInRound1.push(fixture);
  //         fixturesInRound2.push(fixture1);
  //       }
  //       fixtureCopy.push(fixturesInRound1);
  //       fixtureCopy.push(fixturesInRound2);
  //       this.teams.splice(1, 0, this.teams[numberOfRounds]);
  //       this.teams.pop();
  //       this.fixtures = fixtureCopy;
  //   }
  //let numberOfTeams = this.teams.length;
  //let gameWeek = (numberOfTeams - 1) * 2;

  //let fixtureCopy = [];

  //for (let round = 1; round <= gameWeek; round++) {
  //  const fixturesInRound = [];

  //  // Shuffle the teams randomly
  //  // const shuffledTeams = this.shuffleArray(this.teams.slice());

  //  for (let i = 0; i < numberOfTeams / 2; i++) {
  //    const homeTeam = this.teams[i];
  //    const awayTeam = this.teams[i + numberOfTeams / 2];
  //    let fixture = {} as Fixture
  //    if (round > gameWeek / 2) {
  //      fixture = {
  //        homeTeam: awayTeam,
  //        awayTeam: homeTeam,
  //      };
  //    }
  //    else {
  //      fixture = {
  //        homeTeam,
  //        awayTeam,
  //      };

  //    }
  //    fixturesInRound.push(fixture);
  //  }

  //  fixtureCopy.push(fixturesInRound);

  //  // Rotate the teams in the second half for the next round
  //  this.teams.splice(0, 0, this.teams.pop()!);
  //}
  //this.fixtures = fixtureCopy;
  //console.log(fixtureCopy)
  // }
  // private shuffleArray<T>(array: T[]): T[] {
  //   const newArray = array.slice();

  //   for (let i = newArray.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  //   }

  //   return newArray;
  // }
}

