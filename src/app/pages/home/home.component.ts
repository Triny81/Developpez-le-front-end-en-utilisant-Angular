import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Color, LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  protected yearsJO: number[] = [];
  protected olympics: Olympic[] = [];
  protected pieDatas: any[] = []; // tableau pour afficher les résultats sur le diagramme

  // options
  protected gradient: boolean = false;
  protected showLegend: boolean = false;
  protected showLabels: boolean = true;
  protected isDoughnut: boolean = false;
  protected legendPosition: LegendPosition = LegendPosition.Below;

  constructor(private olympicService: OlympicService, private router: Router) {
    Object.assign(this, this.pieDatas);
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.subscribe(countries => {

      if (countries) {
        countries.forEach((country: any) => {

          let ol: Olympic = new Olympic(country["id"], country["country"], []);

          country["name"] = country["country"];
          country["value"] = 0;
          country["extra"] = {"id": country["id"]}; // tableau "extra" pour pouvoir ajouter des données supplémentaires autre que name et value

          country["participations"].forEach((participation: any) => {

            // recherche des années des JO
            const year = participation["year"];
            if (!this.yearsJO.includes(year)) {
              this.yearsJO.push(participation["year"]);
            }

            ol.addParticipation(new Participation(participation["id"], year, participation["city"], participation["medalsCount"], participation["athleteCount"]));

            // médailles par pays
            country["value"] += participation["medalsCount"];
          });

          this.pieDatas.push(country);
          this.olympics.push(ol);

          this.pieDatas = [...this.pieDatas];
        });
      }
    });
  }

  onSelect(country: any): void { // rediriger l'utilisateur quand il clique sur un pays du diagramme
    this.router.navigate(['/', 'detail', country["extra"]["id"]]);
  }
}
