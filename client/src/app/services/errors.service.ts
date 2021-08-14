import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  constructor() {}

  async errorHandling(error: any) {
    console.log(
      'DEVELOPER_ERROR : ',
      error['ERROR'].DEVELOPER_ERROR,
      error['ERROR'].DISPLAY_ERROR
    );
    Swal.fire({
      text: 'Something went wrong, please try again',
      icon: 'error',
      title: 'Server error !!',
      showConfirmButton: false,
      timer: 6500,
    });
  }

  async errorHandlingHttp(error: any) {
    console.log('DEVELOPER_ERROR : ', error.message);
    Swal.fire({
      text: 'Something went wrong, please try again',
      icon: 'error',
      title: 'Server error !!',
      // showCancelButton: true,
      showConfirmButton: true,
      // confirmButtonColor: '#dc3545',
      timer: 6500,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  }
}
