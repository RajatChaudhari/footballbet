import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../teams.service';
import { Team } from '../team';
import { MatInputModule, MatTableModule, MatToolbarModule } from '@angular/material';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: Team[];
  team:Team;
  constructor(private teamService: TeamsService) { }

  ngOnInit() {
    this.getTeams();
  }
  
  getTeams():void{
  this.teamService.getTeams()
  .subscribe(teams=> this.teams=teams);
  }
}
