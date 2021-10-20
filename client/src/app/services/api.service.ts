import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorsService } from './errors.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    public settingsService: SettingsService,
    public errorService: ErrorsService
  ) {}

  createPostService(url: string, ob?: any) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.httpClient
          .post(
            url === ''
              ? this.settingsService.uploadIMGUrl
              : this.settingsService.baseUrl + url,
            ob
          )
          .subscribe(
            (data) => {
              resolve(data);
            },
            (error) => {
              this.errorService.errorHandlingHttp(error);
              console.log('oops', error, error.error);
            }
          );
      } catch (err) {
        console.log('ERROR : ', err);
        console.log(err);
      }
    });
  }

  createGetService(url: string, headParams?: any) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.httpClient.get(this.settingsService.baseUrl + url).subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            this.errorService.errorHandlingHttp(error);
            console.log('oops', error, error.error);
          }
        );
      } catch (err) {
        console.log('ERROR : ', err);
        console.log(err);
      }
    });
  }
}
