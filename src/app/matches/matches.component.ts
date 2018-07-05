import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import { Matches } from '../matches';
import { BetService } from '../bet.service';
import { Bet } from '../bet';


@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
})
export class MatchesComponent implements OnInit {
  matches: Matches[];
  match: Matches;
  bet: Bet;
  bets: Bet[]=[];
  constructor(private matchService: MatchesService, private betService: BetService) { }

  ngOnInit() {
    this.getMatches();
  }

  getMatches(): void {
    this.matchService.getMatches()
      .subscribe(
        (matches: Matches[]) => {
        this.matches = matches;
        });
  }
  placeBet(match: Matches): void {

    //if(!(match.awayScore||match.homeScore)){ return; }
    this.bet=new Bet();
    this.bet= this.getwinner(match);
    console.log(match);
    console.log(this.bet);
    this.betService.placeBets(this.bet).subscribe(
      bets => {
        this.bets.push(this.bet);
      });
  }

  getwinner(match: Matches): Bet {
    
    this.bet.matchId = match.name;
    this.bet.userId = 1;
    this.bet.homeScore = match.homeScore;
    this.bet.awayScore = match.awayScore;

    if (match.homeScore > match.awayScore) {
      this.bet.winner = match.homeTeamID;
    }
    else if (match.homeScore < match.awayScore) {
      this.bet.winner = match.awayTeamID;
    }
    else {
      this.bet.winner = 0;
    }
    return this.bet;
  }

}
