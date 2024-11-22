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
  public olympics$!: Observable<Olympic[]>;
 
  protected olympic!: Olympic;
  protected nbTotalMedals: number = 0;
  protected nbTotalAtheltes: number = 0;
  protected datasGraph: Array<{ 
    name: string; 
    series: Array<{ name: string; value: number }> 
  }> = []; // tableau pour afficher les résultats sur le diagramme

  protected view!: [number, number];
  private heightGraph: number = 300;

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
    this.view = [innerWidth, this.heightGraph];
  }

  ngOnInit(): void {
    const olympicId = this.route.snapshot.params['id'];
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.subscribe(olympics => {

      if (olympics) {

        for (let i = 0; i < olympics.length; i++) {
          const olympic = olympics[i];

          if (olympicId == olympic["id"]) { // récupération du seul olympic qui nous intéresse dans la page détail

            let participations: Participation[] = [];

            olympic["participations"].forEach((participation: Participation) => {
              participations.push(new Participation(participation["id"], participation["year"], participation["city"], participation["medalsCount"], participation["athleteCount"]));
            });

            participations.sort((a, b) => a.getYear() - b.getYear()); // tri croissant des participations par année
          
            this.olympic = new Olympic(olympic["id"], olympic["country"], olympic["participations"]);

            // données pour le graphique
            this.datasGraph[0] =
            {
              "name": this.olympic.getCountry(),
              "series": []
            };

            for (let j = 0; j < participations.length; j++) {
              const participation = participations[j];

              this.datasGraph[0]["series"].push(
                {
                  "name": participation.getYear() + "", // bien penser à mettre une chaine de caractère et non un nombre sinon les années auront des décimales
                  "value": participation.getMedalsCount()
                });

              this.nbTotalMedals += participation.getMedalsCount();
              this.nbTotalAtheltes += participation.getAthleteCount();
            }

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

  onResize(event: Event): void { // rendimensionnement du graphique pour la responsivité
    let window = event.target as Window;
    if (window) {
      this.view = [window.innerWidth, this.heightGraph];
    }
  }
}
