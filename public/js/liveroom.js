import {Display} from "./display.js"
import {Video} from "./video.js"


class Liveroom {
    constructor(room, user, role){
        this.roomName = room
        this.userName = user
        this.userRole = role
        this.sessionCredentials = false
        this.composer = false

        this.display = new Display()

        this.initLiveroom()
    }

    initLiveroom(){
        console.log('initialising presenter with: ', this.roomName, this.userName)
        this.getVideoCredentials(this.roomName)
        .then(()=>{
            this.video = new Video(this.sessionCredentials, {})
            return this.video.connectSession()
        })
        .then(()=>{
            console.log(`User Role: ${this.userRole}`)
            if(this.userRole == 'composer'){
                this.display.enableComposerMode()
                this.composer = true
            }
            if(this.userRole != 'viewer'){
                this.video.publishCamera(this.userRole)
            }
            if(this.userRole == 'presenter'){
                this.video.publishScreen()
            }
            this.updateDisplay(this.video.participants, this.video.mainstage)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    getVideoCredentials(room){
        return new Promise((resolve, reject)=>{
            console.log("Getting Session and Token for room: ", room)
            fetch(`/config.json`) // Replace with your Server SDK URL if you have one
            .then(function fetch(res) {
                return res.json()
            }).then((json) => {
                //json = JSON.parse(json)
                console.log(json)
                this.sessionCredentials = json
                resolve()
            }).catch(function catchErr(error) {
                console.log(error);
                console.log('Failed to get opentok sessionId and token.');
                reject(error)
            })
        })
        
    }

    updateDisplay(participants, mainstage){
        this.display.update(participants, mainstage)
        window.requestAnimationFrame(()=>{
            this.updateDisplay(participants, mainstage)
        })
    }
        
}


let urlRoomName = new URLSearchParams(window.location.search).get('roomName')
let urlUserName = new URLSearchParams(window.location.search).get('userName')
let urlUserRole = new URLSearchParams(window.location.search).get('userRole')

if(typeof(urlRoomName) == 'undefined' || urlRoomName.length < 3){
    window.location = '/app.html?message=invalid-room-name'
}
if(typeof(urlUserName) == 'undefined'){
    urlUserName = "Unknown"
}


const liveroom = new Liveroom(urlRoomName, urlUserName, urlUserRole)