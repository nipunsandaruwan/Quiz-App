import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public name:string='';
  public questionList:any = [];
  public currentQuestion:number=0; 
  public points:number=0;

  constructor(private questionService : QuestionService) { 
  }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
  }

  getAllQuestions(){
    this.questionService.getQuestionJson()
    .subscribe(res=>{
      console.log(res.questions);
      this.questionList= res.questions;
    })
  }

  nextQuestion(){
    this.currentQuestion++;
  }

  answer(curresntQue:number,option:any){
    if(option.correct){
      this.points+=10;
    }
    else{
      this.points-=10;
    }
  }

  previousQuestion(){
    this.currentQuestion--;
  }
}
