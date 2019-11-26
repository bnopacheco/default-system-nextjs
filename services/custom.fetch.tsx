import FormData from 'form-data';
import fetch from 'node-fetch';
import * as RequestType from './request.type';

export default class CustomFetch {

  /**
   * @param {string} metod metod HTTP
   * @param {string} url for request Ex.: /users/1
   * @param {Object} body of request.
   * @param {Headers} alternativeHeaders alternative header if necessary
   * @descriptor Metodo padrão responsavel por realizar as chamadas fetch's do sistema.
   */
  public static custom_fetch(metod: string, url: string, body?: any) {

    const headers = new Headers();
    headers.append('Accept', 'application/json;charset=UTF-8');

    if (localStorage && localStorage.getItem('token')) {
      headers.set('Authorization', localStorage.getItem('token'));
    }

    let requestInfo: any;

    if (metod === RequestType.POST || metod === RequestType.PUT) {

      headers.append('Content-type', 'application/json');

      requestInfo = {
        method: metod,
        headers,
        body: ''
      };

      if (body) {
        requestInfo.body = JSON.stringify(body);
      }

    } else {
      requestInfo = {
        method: metod,
        headers
      };
    }

    return fetch(`${process.env.API}${url}`, requestInfo)
        .then((response) => {
        return  response.ok ? response.json() : response.json().then((errorFromServer: any) => { throw errorFromServer; });
        })
        .catch((error) => {
            error.message === 'Failed to fetch' ?  () => { throw new Error('Unable to contact server'); } : () => { throw error; };
        });
  }

  /**
   * @param {string} url for request Ex.: /users/1
   * @descriptor Get metod default.
   */
  public static get(url: string) {
    return this.custom_fetch(RequestType.GET, url);
  }

  /**
   * @param {string} url for request Ex.: /users
   * @param {Object} body of request.
   * @descriptor Post metod default.
   */
  public static post(url: string, body?: any) {
    return this.custom_fetch(RequestType.POST, url, body);
  }

  /**
   * @param {string} url for request Ex.: /users
   * @param {Object} body of request.
   * @descriptor Put metod default.
   */
  public static put(url: string, body: any) {
    return this.custom_fetch(RequestType.PUT, url, body);
  }

  /**
   * @param {string} url for request Ex.: /users
   * @descriptor Delete metod default.
   */
  public static delete(url: string) {
    return this.custom_fetch(RequestType.DELETE, url);
  }

  public static upload(url: string, files: File[]) {

    let headers: any = {
      'Accept': 'application/json;charset=UTF-8',
    };

    if (localStorage && localStorage.getItem('token')) {
        headers = {
            'Accept': 'application/json;charset=UTF-8',
            'Authorization': localStorage.getItem('token'),
        };
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name);
    }

    const requestInfo = {
      method: RequestType.POST,
      headers,
      body: formData
    };

    return fetch(`${process.env.API}${url}`, requestInfo)
        .then((response) => {
        return  response.ok ? response.json() : response.json().then((errorFromServer: any) => { throw errorFromServer; });
        })
        .catch((error) => {
        error.message === 'Failed to fetch' ?  () => { throw new Error('Unable to contact server'); } : () => { throw error; };
        });
  }

  public static download(url: string, filename: string) {
    let token: string = '';
    if (localStorage.getItem('userInfo')) {
      const userInfo: any = localStorage.getItem('userInfo');
      token = JSON.parse(userInfo).token;
    }

    let headers = {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Response-Type': 'blob',
        'Authorization': ''
    };

    if (localStorage && localStorage.getItem('token')) {

        headers = {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Response-Type': 'blob',
            'Authorization': localStorage.getItem('token')
        };
    }

    const requestInfo = {
        method: RequestType.GET,
        headers,
    };

    return fetch(`${process.env.API_PORTAL_V1_URI}${url}`, requestInfo)
        .then((response) => {
            if (response.ok) {
                return () => {
                    return response.blob().then((file) => {
                            const urlDownload = window.URL.createObjectURL(file);
                            const a = document.createElement('a');
                            a.href = urlDownload;
                            a.download = filename;
                            a.click();
                        }).catch((error: any) => {throw error; });
                };
            } else {
                response.json().then((errorFromServer: any) => { throw errorFromServer; });
            }
        })
        .catch((error) => {
            error.message === 'Failed to fetch' ?  () => { throw new Error('Unable to contact server'); } : () => { throw error; };
        });
  }

}
