import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { CommonModule } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../environment/environment';
import { User } from '../../_models/User';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';
import { response } from 'express';
import { Photo } from '../../_models/photo';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [CommonModule,FileUploadModule],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit{

  @Input() member: Member|undefined;
  uploader: FileUploader| undefined;
  hasBaseDropZoneOver=false;
  baseUrl=environment.apiUrl;
  user:User|undefined;

  constructor(private accountService: AccountService, private memberService: MembersService){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next:user=>{
        if(user) this.user=user
      }
    })
  }

  ngOnInit(): void {
    this.initializeUploader();
  }


  fileOverBase(e:any){
    this.hasBaseDropZoneOver=e;
  }

  deletePhoto(photoId:number){
    this.memberService.deletePhoto(photoId).subscribe({
      next: _ =>{
        if(this.member){
          this.member.photos=this.member.photos.filter(x=>x.id!=photoId);
        }
      }
    })
  }

  setMainPhoto(photo:Photo){
    this.memberService.setMainPhoto(photo.id).subscribe({
      next:()=>{
        if(this.user && this.member){
          this.user.photoUrl=photo.url;
          this.accountService.setCurrentUser(this.user);
          this.member.photoUrl=photo.url;
          this.member.photos.forEach(p=>{
            if(p.isMain) p.isMain=false;
            if(p.id===photo.id) p.isMain=true;
          })
        }
      }
    })
  } 


  initializeUploader(){
    this.uploader=new FileUploader({
      url:this.baseUrl+'users/add-photo',
      authToken:'Bearer '+this.user?.token,
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:10*1024*1024
    });
    this.uploader.onAfterAddingFile=(file)=>{
      file.withCredentials=false
    }
    this.uploader.onSuccessItem=(item,response,status,headers)=>{
      if(response){
        const photo=JSON.parse(response);
        this.member?.photos.push(photo)
      }
    }
  }
}