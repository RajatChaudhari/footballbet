import { Component, OnInit } from '@angular/core';
import { Bet } from '../bet';
import { BetService } from '../bet.service';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {

  bets: Bet[];
  constructor(private betService : BetService) { }

  ngOnInit() {
    this.getBets();
  }
  getBets():void{
    this.betService.getbets()
    .subscribe(
      bets=>(
        this.bets=bets,
        console.log(this.bets))
      );
  }
}
