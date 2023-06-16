import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FixtureDto, FixtureService } from '../services/fixture';
import { CreateTournamentDto, TournamentDto, TournamentService } from '../services/tournament';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent {
  @ViewChild('closebutton') closebutton : ElementRef;
  form: FormGroup;
  name: FormControl;
  closeResult = '';
  isModalOpen = false;
  isSubmitted = false;
  isSubmitting = false;

  tournaments: TournamentDto[] = [];
  tournamnetForEdit = {} as TournamentDto;
  isEdit = false;

  months = [
    { name: "January", number: "01" },
    { name: "February", number: "02" },
    { name: "March", number: "03" },
    { name: "April", number: "04" },
    { name: "May", number: "05" },
    { name: "June", number: "06" },
    { name: "July", number: "07" },
    { name: "August", number: "08" },
    { name: "September", number: "09" },
    { name: "October", number: "10" },
    { name: "November", number: "11" },
    { name: "December", number: "12" }
  ];

  constructor(private fb: FormBuilder, 
    private modalService: NgbModal, 
    private tournamentService: TournamentService,
    private fixtureService: FixtureService,
    private router: Router,
    private toastr: ToastrService
    //@Inject(ToastrService) private toastr: ToastrService
    ) {
  }

  ngOnInit() {
    // this.buildForm();
    // this.generateFixtures();
    this.getTournamentList();
  }

  getTournamentList() {
    this.tournamentService.getTournaments().subscribe(res => {
      console.log(res)
      this.tournaments = res;
    });
  }

  // buildForm() {
  //   this.name = new FormControl('', [Validators.required]);
  //   this.form = new FormGroup({
  //     name: this.name,
  //   });
  // }
  buildForm() {
    this.form = this.fb.group({
      name: [this.tournamnetForEdit.name || '', Validators.required],
      startMonth: [this.tournamnetForEdit.startMonth || '', Validators.required],
      endMonth: [this.tournamnetForEdit.endMonth || '', Validators.required],
    });
  }

  getMonthName(monthNumber: any){
    const monthObj = this.months.find(month => month.number === monthNumber);
    return monthObj ? monthObj.name : null;
  }

  add(tournamentModal: any) {
    this.tournamnetForEdit = {} as TournamentDto;
    this.buildForm();
    this.isEdit = false;
    this.modalService.open(tournamentModal, { ariaLabelledBy: '' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  edit(contents: TournamentDto, modalItem: any) {
    this.isEdit = true;
    this.tournamnetForEdit = contents;
    this.buildForm();
    // this.name = new FormControl(this.tournamnetForEdit.name, [Validators.required]);
    // this.form = new FormGroup({
    //   name: this.name
    // });
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

  close(modal: any){
    this.isSubmitted = false;
    modal.dismiss('Cross click');
    this.form.reset();
  }

  get signUpData() { 
    return this.form.controls; 
  }

  onSubmit() {
    this.isModalOpen = true;
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    this.isSubmitting = true;
    this.isSubmitted = false;

    if (this.tournamnetForEdit && this.isEdit) {
      let tournamnent: CreateTournamentDto = {
        name: this.form.value.name,
        startMonth: this.form.value.startMonth,
        endMonth: this.form.value.endMonth
      }
      this.tournamentService.updateTournamentById(this.tournamnetForEdit.id, tournamnent).subscribe(x => {
        this.isModalOpen = false;
        this.toastr.success("Update successfully");
        this.isSubmitting = false;
        this.resetForm();
        this.modalService.dismissAll();
        this.getTournamentList();
      }, error => {
        this.modalService.dismissAll();
        this.toastr.error(error.error);
        this.isSubmitting = false;
      });
    }
    else {
      this.tournamentService.addTournament(this.form.value).subscribe(x => {
        this.isModalOpen = false;
        this.toastr.success("Successfully added");
        this.isSubmitting = false;
        this.resetForm();
        this.getTournamentList();
        this.modalService.dismissAll();
      }, error => {
        this.modalService.dismissAll();
        this.isSubmitting = false;
        this.toastr.error(error.error);
      });
    }
    
  }

  delete(id: any) {
    const result = confirm('Do you want to delete Tournament with id: ' + id);
    if (result) {
      this.tournamentService.deleteTournamentById(id).subscribe(x => {
        this.toastr.error("Delete successfully");
        this.getTournamentList();
      });
    }
  }

  resetForm() {
    this.form.reset();
  }

  teamAdd(id: number) {
    this.router.navigate(['/tournament', id]);
  }
}
