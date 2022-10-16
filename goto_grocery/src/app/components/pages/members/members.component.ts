import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { MemberDTO } from 'src/app/models/MemberDTO';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResponseDTO } from 'src/app/models/ResponseDTO';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  currentMember: MemberDTO;
  memberList: MemberDTO[];
  isError: boolean;
  message: string;

  //create
  createMember = false;

  //update
  updateMember = false;

  //result modal
  actionResult: any;
  action: string;

  //delete modal
  record: string;
  recordId: string;

  @ViewChild('viewModal') viewModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('resultModal') resultModal: any;

  constructor(private memberService: MemberService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getMembers()
  }

  //get members to display
  getMembers() {
    this.memberService.getMembersDetails().then((response) => {
      this.memberList = response.message;
    })
      .catch((err) => {
        console.log(err);
        this.isError = true;
        this.message = err;
      });
  }

  addMember() {
    this.createMember = true;
  }

  view(member: MemberDTO) {
    this.currentMember = member;
    this.open(this.viewModal);
  }

  edit(member: MemberDTO) {
    this.currentMember = member;
    this.updateMember = true;
  }

  delete(member: MemberDTO) {
    this.currentMember = member;
    this.open(this.deleteModal);
  }

  createFinished(response: ResponseDTO) {
    // console.log(response);
    this.actionResult = response.message
    this.open(this.resultModal)
    this.getMembers()
  }

  updateFinished(response: ResponseDTO) {
    // console.log(response);
    this.actionResult = response.message
    this.open(this.resultModal)
    this.getMembers()
  }

  confirmDelete() {
    this.memberService.deleteMember(this.currentMember).then((response) => {
      console.log(response)
      this.actionResult = response.success
      this.open(this.resultModal)
      this.getMembers();
    })
      .catch((err) => {
        console.log(err);
        this.actionResult = "failed"
        this.open(this.resultModal)
      });
  }

  exitForm() {
    this.createMember = false;
    this.updateMember = false;
  }

  //modal components
  open(content: any) {
    this.modalService.open(content,
      {
        windowClass: 'modal-center'
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

}