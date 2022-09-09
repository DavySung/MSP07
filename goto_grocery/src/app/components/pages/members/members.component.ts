import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { MemberDTO } from 'src/app/models/MemberDTO';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  memberList: MemberDTO[];
  testMember1: MemberDTO;
  testMember2: MemberDTO;
  isError: boolean;
  message: string;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.GetMembers()
  }

  //get members to display
  GetMembers() {
    //test data
    this.testMember1 = { id: 1, customer_number: '1', first_name: 'test1', last_name: "test1", email: 'test@email', phone: "5555", address_1: "123", address_2: "123", address_suburb: "123", address_state: "123", address_postcode: 111, created_date: "1/1/1" }
    this.testMember2 = { id: 2, customer_number: '2', first_name: 'test2', last_name: "test2", email: 'test@email', phone: "5555", address_1: "123", address_2: "123", address_suburb: "123", address_state: "123", address_postcode: 111, created_date: "1/1/1" }
    this.memberList = [this.testMember1, this.testMember2]

    //this is use the actual api
    //   this.memberService.getMembersDetails().then((response) => {
    //   this.memberList = response;
    // })
    // .catch((err) => {
    //   console.log(err);
    //   this.isError = true;
    //   this.message = err;
    // });
  }

  AddMember() {
    //use MemberRegisterDTO here

  }

  View(member: MemberDTO) {
    console.log(member);
  }
  Edit(member: MemberDTO) {
    console.log(member);
  }
  Delete(member: MemberDTO) {
    console.log(member);
  }
}
