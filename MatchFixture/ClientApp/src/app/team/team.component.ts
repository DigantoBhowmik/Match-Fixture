import { CreateTeamDto, TeamDto, UpdateTeamDto } from './../services/team/team.model';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamService } from '../services/team';
import { FixtureDto, FixtureService } from '../services/fixture';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  @ViewChild('closebutton') closebutton : ElementRef;
  fixtures: FixtureDto[] = [];
  form: FormGroup;
  name: FormControl;
  closeResult = '';
  isModalOpen = false;
  isSubmitted = false;
  isSubmitting = false;

  teams: TeamDto[] = [];
  teamForEdit: TeamDto;
  id: any;

  isEdit = false;

  constructor(private fb: FormBuilder, 
    private modalService: NgbModal, 
    private teamService: TeamService,
    private fixtureService: FixtureService,
    private route: ActivatedRoute,
    private toastr: ToastrService
    ) {
  }


  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params["id"] !== undefined && params["id"] != "-1") {
        this.id = parseInt(params["id"]);
      }
    });
    this.buildForm();
    // this.generateFixtures();
    this.getTeamList();
  }

  getTeamList() {
    this.teamService.getTeams(this.id).subscribe(res => {
      this.teams = res;
    });
  }

  getFixtures() {
    this.fixtureService.genarateFixture().subscribe(result => {
      console.log(result);
      this.fixtures = result;
    })
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
      let team: UpdateTeamDto = {
        name: this.form.value.name
      }
      this.teamService.updateTeamById(this.teamForEdit.id, team).subscribe(x => {
        this.isModalOpen = false;
        this.toastr.success("Update successfully");
        this.isSubmitting = false;
        this.resetForm();
        this.modalService.dismissAll();
        this.getTeamList();
      }, error => {
        this.toastr.error(error.error);
        this.isSubmitting = false;
      });
    }
    else {
      let team: CreateTeamDto = {
        name: this.form.value.name,
        tournamentId:this.id
      }
      this.teamService.addTeam(team).subscribe(x => {
        this.isModalOpen = false;
        this.toastr.success("Successfully added");
        this.isSubmitting = false;
        this.resetForm();
        this.getTeamList();
        this.modalService.dismissAll();
      }, error => {
        this.isSubmitting = false;
        this.toastr.error(error.error);
      });
    }
    
  }

  delete(id: any) {
    const result = confirm('Do you want to delete Team with id: ' + id);
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
}
