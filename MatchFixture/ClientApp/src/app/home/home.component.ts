import { TeamDto } from './../services/team/team.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamService } from '../services/team';
//import { ToastrService } from 'ngx-toastr';
interface Fixture {
  homeTeam: string;
  awayTeam: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  
  fixtures: any;
  form: FormGroup;
  name: FormControl;
  closeResult = '';
  isModalOpen = false;
  isSubmitted = false;
  isSubmitting = false;

  teams: TeamDto[] = [];
  teamForEdit: TeamDto;

  isEdit = false;

  constructor(private fb: FormBuilder, 
    private modalService: NgbModal, 
    private teamService: TeamService,
    //@Inject(ToastrService) private toastr: ToastrService
    ) {
  }


  ngOnInit() {
    this.buildForm();
    // this.generateFixtures();
    this.getTeamList();
  }

  getTeamList() {
    this.teamService.getTeams().subscribe(res => {
      this.teams = res;
    });
  }

  buildForm() {
    this.name = new FormControl('', [Validators.required]);
    this.form = new FormGroup({
      name: this.name,
    });
  }

  add(teamModal: any) {
    this.buildForm();
    //this.teamForEdit = null;
    this.isEdit = false;
    this.modalService.open(teamModal, { ariaLabelledBy: '' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  edit(contents: TeamDto, modalItem: any) {
    this.isEdit = true;
    this.teamForEdit = contents;
    this.name = new FormControl(this.teamForEdit.name, [Validators.required]);
    this.form = new FormGroup({
      name: this.name
    });
    this.modalService.open(modalItem, { ariaLabelledBy: 'team-title' }).result.then((result) => {
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

    if (this.teamForEdit && this.isEdit) {
      let team: TeamDto = {
        name: this.form.value.name,
        id:0
      }
      this.teamService.updateTeamById(this.teamForEdit.id, team).subscribe(x => {
        //this.toastr.success("Update successfully");
        this.isSubmitting = false;
        this.resetForm();
        this.getTeamList();
      }, error => {
        //this.toastr.error(error.error);
        this.isSubmitting = false;
      });
    }
    else {
      this.teamService.addTeam(this.form.value).subscribe(x => {
        //this.toastr.success("Successfully added");
        this.isSubmitting = false;
        this.resetForm();
        this.getTeamList();
      }, error => {
        this.isSubmitting = false;
      });
    }
  }

  delete(id: any) {
    const result = confirm('Do you want to delete question with id: ' + id);
    if (result) {
      this.teamService.deleteTeamById(id).subscribe(x => {
        //this.toastr.error("successfully deleted");
        this.getTeamList();
      });
    }
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

