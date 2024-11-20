import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  protected olympic!: Olympic;
  protected nbTotalMedals: number = 0;
  protected nbTotalAtheltes: number = 0;
  protected datasGraph: any[] = [];

  // options
  protected legend: boolean = false;
  protected showLabels: boolean = false;
  protected xAxis: boolean = true;
  protected yAxis: boolean = true;
  protected showYAxisLabel: boolean = true;
  protected showXAxisLabel: boolean = true;
  protected xAxisLabel: string = 'Year';
  protected yAxisLabel: string = 'Number of medals';

  constructor(private olympicService: OlympicService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const olympicId = this.route.snapshot.params['id'];
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.subscribe(countries => {

      if (countries) { // récupération du seul olympic qui nous intéresse dans la page détail

        for (let i = 0; i < countries.length; i++) {
          const country = countries[i];

          if (olympicId == country["id"]) {
            let participations: Participation[] = [];

            country["participations"].forEach((participation: any) => {
              participations.push(new Participation(participation["id"], participation["year"], participation["city"], participation["medalsCount"], participation["athleteCount"]));
            });

            participations.sort((a, b) => a.getYear() - b.getYear()); // tri croissant des participations par année

            this.olympic = new Olympic(country["id"], country["country"], participations);

            // données pour le graphique
            this.datasGraph[0] =
            {
              "name": this.olympic.getName(),
              "series": []
            };

            participations.forEach(pa => {
              this.datasGraph[0]["series"].push(
                {
                  "name": pa.getYear() + "", // bien penser à mettre une chaine de caractère et non un nombre sinon les années auront des décimales
                  "value": pa.getMedalsCount()
                });

              this.nbTotalMedals += pa.getMedalsCount();
              this.nbTotalAtheltes += pa.getAthleteCount();
            });

            break; // dès que le pays concerné est trouvé, plus besoin de parcourir la boucle inutilement
          }
        }

        if (!this.olympic) { // redirection vers la page not found si l'olympic n'est pas trouvé avec son id
          this.router.navigate(['/page-not-found']);
        } 
      }
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
