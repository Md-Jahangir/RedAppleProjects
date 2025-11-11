import { Global } from "./Pattern/Global.js";

class Server {
  constructor() {
    this.urlParams = new URLSearchParams(window.location.search);
    this.moduleCount = this.urlParams.get("moduleCount");
    this.baseUrl = "https://staging.newsjargon.com/wp-json/wp/v2/";
    this.lessionDataApi = "lesson/";
    this.lessionMediaDataApi = "media/";
    this.mediaId = "23";//this.urlParams.get("media_id");
    this.lessonDataUrl = "https://staging.newsjargon.com/wp-json/wp/v2/lesson/";
    this.mediaDataUrl = "https://staging.newsjargon.com/wp-json/wp/v2/media/";
    this.quizStartApi = "quiz_start/";
    this.quizEndApi = "quiz_end/";
    this.id = "525";//this.urlParams.get("id");
    this.studentId = "16";//this.urlParams.get("student_id");
    this.attemptId = null;//"lession_hyatszwv50wb";
    this.badges = '2';//this.urlParams.get("badges");
    console.log(this.studentId)
    console.log('this.attemptId', this.attemptId)

    console.log(this.studentId)
    // console.log("Server");
  };

  async GetData(url, options) {
    console.log('Getdata', url)
    try {
      let response = await fetch(url, options);
      console.log("response", response);
      return response.json();
    } catch (err) {
      console.log("Error log: ", err);
    }
  };
  async GetLessonData() {
    let reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    // let url = this.baseUrl + "lesson/" + "525";
    let url = this.baseUrl + this.lessionDataApi + this.id;
    let requestOptions = {
      method: 'GET',
      // body: JSON.stringify(),
      headers: reqHeaders,
    };
    // console.log("GetLessondata requestOptions",requestOptions);
    return (await this.GetData(url, requestOptions));
  }
  async GetMediaData() {
    let reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    // let url = this.baseUrl + "media" + "/23";
    let url = this.baseUrl + this.lessionMediaDataApi + this.mediaId;
    let requestOptions = {
      method: 'GET',
      //body: JSON.stringify(),
      headers: reqHeaders,
    };
    // console.log("GetMediaData requestOptions",requestOptions);
    return (await this.GetData(url, requestOptions));
  }


  async StartQuiz() {
    let reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("Authorization", "Basic " + btoa("nj_api:c8XLtlgqO#j$F09ASUx9mJ%c"));
    // let url = this.baseUrl + "quiz_start/525?" + this.studentId;
    let url = this.baseUrl + this.quizStartApi + this.id + "?student_id=" + this.studentId;
    console.log(url)
    let requestOptions = {
      method: 'POST',
      headers: reqHeaders,
    };

    return await this.GetData(url, requestOptions);
  }

  async SaveQuestion(_studentId, _lessonId, _attemptId, _badges) {
    // console.log('SaveQuestion',_attemptId)
    let reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("Authorization", "Basic " + btoa("nj_api:c8XLtlgqO#j$F09ASUx9mJ%c"));
    console.log(this.studentId, this.id, this.attemptId, this.badges)
    let url = this.baseUrl + this.quizEndApi + "?student_id=" + _studentId + "&lesson_id=" + _lessonId + "&attempt_id=" + _attemptId + "&badges=" + _badges;
    let requestOptions = {
      method: 'POST',
      headers: reqHeaders,
    };

    return await this.GetData(url, requestOptions);
  }

  async EndQuiz(_studentId, _lessonId, _attemptId, _badges) {
    let reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("Authorization", "Basic " + btoa("nj_api:c8XLtlgqO#j$F09ASUx9mJ%c"));
    let url = this.baseUrl + "quiz_end" + "?student_id=" + _studentId + "&lesson_id=" + _lessonId + "&attempt_id=" + _attemptId + "&badges=" + _badges;
    let requestOptions = {
      method: 'POST',
      headers: reqHeaders,
    };

    return await this.GetData(url, requestOptions);
  }

  async ResumeQuiz(_studentId, _lessonId, _attemptId, _badges) {
    let reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("Authorization", "Basic " + btoa("nj_api:c8XLtlgqO#j$F09ASUx9mJ%c"));
    let url = this.baseUrl + "quiz_end" + "?student_id=" + _studentId + "&lesson_id=" + _lessonId + "&attempt_id=" + _lessonId + "&badges=" + _badges;
    let requestOptions = {
      method: 'POST',
      headers: reqHeaders,
    };

    return await this.GetData(url, requestOptions);
  }
}
let server = new Server();

export { server as Server };