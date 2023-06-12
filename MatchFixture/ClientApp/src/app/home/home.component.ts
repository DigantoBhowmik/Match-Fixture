import { Component, OnInit } from '@angular/core';
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


  ngOnInit() {
    this.generateFixtures();
  }

  generateFixtures() {
    var numberOfRounds = this.teams.length - 1;
    let fixtureCopy = [];
      for (let i = 0; i < numberOfRounds; i++) {
        const fixturesInRound1 = [];
        const fixturesInRound2 = [];

        for (var j = 0; j < this.teams.length / 2; j++) {
          const homeTeam = this.teams[j];
          const awayTeam = this.teams[this.teams.length - 1 - j];
          let fixture = {} as Fixture
          let fixture1 = {} as Fixture
          fixture = {
            homeTeam: homeTeam,
            awayTeam: awayTeam,
          };
          fixture1 = {
            homeTeam: awayTeam,
            awayTeam: homeTeam,
          };
          fixturesInRound1.push(fixture);
          fixturesInRound2.push(fixture1);
        }
        fixtureCopy.push(fixturesInRound1);
        fixtureCopy.push(fixturesInRound2);
        this.teams.splice(1, 0, this.teams[numberOfRounds]);
        this.teams.pop();
        this.fixtures = fixtureCopy;
    }
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
  }
  // private shuffleArray<T>(array: T[]): T[] {
  //   const newArray = array.slice();

  //   for (let i = newArray.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  //   }

  //   return newArray;
  // }
}

