import { App,NavController,AlertController,MenuController } from "ionic-angular";
import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { OnInit } from "@angular/core";
import { SigninPage } from "../pages/signin/signin";
import {HomePage} from '../pages/home/home';

export abstract class BaseComponent implements OnInit{


    protected navCtrl:NavController;
    
    constructor(
        public alertCtrl:AlertController,
        public authService:AuthServiceProvider,
        public app: App,
        public menuCtrl:MenuController

    ){}

    //pegando navegação atual
    ngOnInit():void{
        this.navCtrl = this.app.getActiveNav();
    }

    onLogout():void
    {
        this.alertCtrl.create({
            message:"Você deseja Sair?",
            buttons: [{
                text: "Sim",
                handler:()=>{
                    this.authService.logout()
                    .then(()=>{
                        this.navCtrl.setRoot(SigninPage);
                        console.log("Saiu")
                    }).catch((err)=>{
                        console.log("Erro ao sair"+err)
                    })
                }
            },
        {
            text:"Não"
        }]
        }).present()
    }
}