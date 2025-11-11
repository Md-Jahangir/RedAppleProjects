/* global window, URLSearchParams,SendMessageForAnalytics,fetch,Headers,atob,btoa,TextEncoder,console*/

class Server {
  constructor() {
    this.urlParams = new URLSearchParams(window.location.search);
    this.gameType = this.urlParams.get('game_type');
    this.timerValue = this.urlParams.get('timer');
    // this.baseURL = 'https://api.flipacoin.com/api/v2'; // old
    this.baseURL = 'https://prodapi.flipacoin.com/api/v2'; // production
    // this.baseURL = 'https://stagapi.flipacoin.com/api/v2'; // staging
    // this.baseURL = 'https://devapi.flipacoin.com/api/v2'; // development
    this.userDetailsEndPoint = '/get-user-profile-data';
    this.token = this.urlParams.get('token');
    this.myUserId = this.urlParams.get('player_id');
    this.opponentUserId = this.urlParams.get('opponent_id');
    this.isFree = this.urlParams.get('isFree');
    this.isBot = this.urlParams.get('isBot');
    this.gameCoordinates = this.urlParams.get('game_coordinates');
    this.clientValue = 'bee199d1a4f28ac9e779c5271fb6b7682b2782e0f77b717ef7599be43f4320b1e23909e1f593ea';

    // Extract session token from URL parameter (for server-authoritative games)
    // This is injected by Android/iOS when starting a tournament/league/free game session
    const sessionToken = this.urlParams.get('sessionToken');
    if (sessionToken) {
      window.sessionToken = sessionToken;
      console.log('[Server] Session token loaded from URL'); // eslint-disable-line no-console
    }

    this.pemPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDW37D3AvoU6pKf
rgXCXqKZ6uW9Td5cTpuj1iG7mXC7blKKEzgFc2piYteBNf318+sC3opgbBKhpEWj
Quoaf46BlzM8AmH85FhieqzS0u7rDSOQl3LFLOsTvepPT0H1nQ0nhRnuSN0eSyUE
Q3o7xjN4x1gwpgixjClxWQd3ARYp52R36IS98tMCDa/rFy/NCj2I7MEOCgbFFd7Z
1c5p+DUHdStUG2knPolgQUqZEt9cPOW4hP5CFu84K3mgzU8wTqlhYLwRCcOig7Wz
Z6KxJjyb1fhOYQKHuG3o58mrG2EiX4s8jMBHfZtvz5w4y5WuXgUOEowsBaQBVmeH
wGnaBmTNAgMBAAECggEAVWBcOEl+hIEP8VJ8B1cC1JV441blW1gAj4CttpSpLlAP
i71HLSNGygDsD/McDXX1kxZJdTZ70K4s3UnhKtY0EVm6icWImatBUx/bO4mEVPDL
iNAkUiQe46E6UHj1hFn6uBEy1HMvKLJC6wbEsqt2GC9c4zeVjLZcYSU2yhosbElB
2GjP7ZUmMAr/NROH7XeURhQwwzzPPf8MhfTiiUGNpYQ8OUj4CIG53fpbsW/DW+Fi
etQa8/aC08gC3XSqx5nN3mjW9FuQsZ7odZO/8BnZ8TIyTYUIFNxqhuwnU1Iybl0C
a+5EflSmb5eZ4FBwFRoeakGcILX6Gvkar9taSBG1IQKBgQD7LpZRRziyRbYa1ivY
JAHVY94645zWdGStk/iRloWccy/8lBUijwjySjyRfuNKgs6y177fTTOo2lbtkflK
v6sJVlss8nzAppQA6RsF7fDXsGuyRsgfYyg/tVPXJB6XLNyCNu+E81ljrVYfx0Iu
MawEYgPPo9oCy6SOgx+cPIB6dwKBgQDa/tCqAKBLT9/jGZx82eDUY0NO9dWwF0u2
I6NtIl7Jlg+HBI4CeH8ufJzkFeemWiGIZ+fN3p2u3hPfSuuH5dvODNfj7gAGPIKt
51uUd3PmRBbzX4hQ6sqLIYB1t7wBPkRYSkRvCLTiOjJLhm814l2oOn1Ay6FCggfV
T+nszhan2wKBgQCIGx5ovGcEcrHSqOrpG9nCf3MUBfIeYsOLKvsuKJoNxHzkKHmr
WEZIw+E+FbujzG2kizNqXLL5dBZWdRrYXjOXw6t0F5Fx8tGQDMAP3nb66SXyXFhk
aZ6NpvvfQDszP6PdC1eOey6czHg2kApUbaYAWfwmr2qayS5J6tNeHYqg0QKBgHa+
1MZZsJElrnCl4oSQX6jKaiTWiBgDibopeOQkTuFfzOuZPKd6TvwV9bx3ZDR/is88
CCVJIJdBM+VP6oa1zIndzPJ6iujWxsUlPjMy0lV5djhhBLlblpf6gn1SM085RDXb
j1/liK9ifwMU0hiVtdMSY/hOchJuD3FK87zDwuUhAoGBAONokKPvrFj0mwELZzW1
541JrAi5p2wzofq5xW6PFMyuJZL3WewWsaF78A3HKpiaUCa6lr30xrP89L66J8W5
1beOPnIo/JKUBG5L6KQUH/x1ldd1Sup/H2VAuv4UEqznb8/EOufIl51JCqwpIr/p
xZXoxAEvFx75hvvLGgQbJPok
-----END PRIVATE KEY-----
`;

  }

  IsUrlParamsMissing() {
    if (!this.isFree) {
      return true;
    }
    else {
      return false;
    }
  };
  //#region -GetData
  /**
   * 
   * @param {string} url 
   * @param {Object} options 
   * @returns 
   */
  async GetData(url, options) {
    try {
      const response = await (await fetch(url, options)).json();
      switch (true) {
        case (response.status === 404):
          throw new Error(response.message);
        case (response.status === 401):
          throw new Error(response.message);
        case (response.status === 400):
          throw new Error(response.message);
        case (response.status === 406):
          throw new Error(response.message);
        case (response.error):
          throw new Error(response.message);
        default:
          return response;
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
  //#endregion

  PostGameOverToParent(_timeConsumed) {
    SendMessageForAnalytics('getGamePlayTime',
      {
        'event': 'Gameplay Time',
        'game_id': this.gameType,
        'game_type': 'HTML 5',
        'gameplay_time': _timeConsumed,
        'timestamp': Math.floor(Date.now() / 1000)
      }
    );
  };

  async GetUserProfileData(userId, isBot) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const dataToSign = `timestamp:${timestamp}`;
    const privateKey = await this.importPrivateKey(this.pemPrivateKey);
    const signature = await this.signData(dataToSign, privateKey);
    const url = `${this.baseURL + this.userDetailsEndPoint}?id=${userId}&type=${isBot}`;
    const reqHeaders = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    reqHeaders.append('Authorization', `Bearer ${this.token}`);
    reqHeaders.append('X-App-Client', this.clientValue);
    reqHeaders.append('X-App-Timestamp', timestamp);
    reqHeaders.append('X-App-Signature', signature);

    try {
      const requestOptions = {
        method: 'GET',
        headers: reqHeaders,
      };
      return (await this.GetData(url, requestOptions));
    }
    catch (error) {
      // console.log('Error : ', error);
      throw new Error(error.message);
    }
  };

  async pemToArrayBuffer(pem) {
    const b64Lines = pem
      .replace(/-----.*-----/g, '')
      .replace(/\s+/g, '');
    const byteStr = atob(b64Lines);
    const bytes = new Uint8Array(byteStr.length);
    for (let i = 0; i < byteStr.length; i++) {
      bytes[i] = byteStr.charCodeAt(i);
    }
    return bytes.buffer;
  };

  async importPrivateKey(pemKey) {
    const keyBuffer = await this.pemToArrayBuffer(pemKey);
    return await window.crypto.subtle.importKey(
      'pkcs8',
      keyBuffer,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      },
      false,
      ['sign']
    );
  };

  async signData(data, privateKey) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const signatureBuffer = await window.crypto.subtle.sign(
      {
        name: 'RSASSA-PKCS1-v1_5'
      },
      privateKey,
      dataBuffer
    );
    return btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));
  };

}

const server = new Server();
export { server as Server };