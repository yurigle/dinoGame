var timer = 0;
var cactusArr = [];
var animate;
var jumpTimer = 0;

class GameStart {
    constructor() {
        this.cnvs = document.getElementById('canvas');
        this.ctx = this.cnvs.getContext('2d');
        this.stageConfig = {
            width : window.innerWidth - 100,
            height : window.innerHeight - 100,
        };
        this.cnvs.width = this.stageConfig.width;
        this.cnvs.height = this.stageConfig.height;
        this.dino = {
            x : 10,
            y : 200,
            width : 50,
            height : 50,
            imageSrc : 'https://yurigle.github.io/dinoGame/img/dinosaur.png',
            jump() {
                this.y -= 5;  
            }, 
            fall() {
                if(this.y <200) {
                    this.y += 4;
                }
            }
        };
        this.floor = {
            x : 0,
            y : 250,
            width : window.innerWidth - 100,
            height : 1,
        };
        this.score = {
            x : 0,
            y : 20,
            val : 0,
            width: 100,
            height: 30,
        };
    }
    
    dinoDrawing() {
        this.ctx.clearRect(0,0, this.stageConfig.width, this.stageConfig.height);
        this.ctx.fillStyle = 'rgba(0,0,0,0)';
        this.ctx.fillRect(this.dino.x, this.dino.y, this.dino.width, this.dino.height);
        var dinoImage = new Image();
        dinoImage.src = this.dino.imageSrc;
        this.ctx.drawImage(dinoImage, this.dino.x, this.dino.y);
        
    }

    drawFloor() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(this.floor.x, this.floor.y, this.floor.width, this.floor.height);
    }

    drawScore() {
        this.ctx.font = "20px";
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`점수 : ${this.score.val}`, this.score.x, this.score.y);
    }


}

class Cactus extends GameStart {
    constructor(ctx) {
        super(ctx);
        this.randomX = Math.random() * 700;
        this.x = Math.floor(this.randomX + 600);
        this.y = 200;
        this.width = 50;
        this.height = 50;
        this.imageSrc = 'https://yurigle.github.io/dinoGame/img/cactus.png';
    }

    draw(){
        var cactusImage = new Image();
        cactusImage.src = this.imageSrc;
        this.ctx.fillStyle = 'rgba(0,0,0,0)';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.drawImage(cactusImage, this.x, this.y);
    }
}


var map = new GameStart();
var cactus = new Cactus();

function moveCactus() {
    animate = requestAnimationFrame(moveCactus);
    timer++;
    map.dinoDrawing();
    map.drawFloor();
    map.drawScore();
    map.score.val += 10;
    // cactus.draw();
    if(timer % 120 == 0) {
        var cactusObj = new Cactus();
        cactusArr.push(cactusObj);
        // cactusObj.draw();
    }
    
    cactusArr.forEach((element, i, object) => {
        var speed = 0;
        element.x -=5;
        if(element.x < 0) {
            object.splice(i, 1);
            // element.x -= speed;
            // console.log(speed);  
        }
        // element.x -= 5;
        element.draw();
        gameOver(map.dino, element);
        
    });

    if(jumping == true) {
        map.dino.jump(); 
        jumpTimer++;
    } else if(jumping == false) {
        jumpTimer = 0;
        map.dino.fall();
    }

    if(map.dino.y < 51) {
        jumpTimer = 0;
        jumping = false;
        map.dino.fall();
    }

    if(jumpTimer > 20) {
        jumping = false;
    }

}

moveCactus();

function gameOver(dino, cactus) {
    var xval = cactus.x - (dino.x + dino.width);
    var yval = cactus.y - (dino.y + dino.height);
    if(xval < -5 && yval < -5) {
        cancelAnimationFrame(animate);
        if(confirm('다시 시작하겠습니까?')) {
            location.reload(true);
        }
    }
}

var jumping = false;
var jumpingNum = 0;
//스페이스바 누르면 
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        jumping = true;
        jumpingNum++;
    }
});

document.addEventListener('touchstart', function(e) {
    e.preventDefault();
    jumping = true;
    jumpingNum++;
});

document.addEventListener('keyup', function(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        jumpingNumCheck(jumpingNum);
        jumpingNum = 0;
    }

});


function jumpingNumCheck(num) {
    console.log(num);
    // if(jumpingNum == 1) {
    //     jumping = false;
    //     jumpingNum = 0;
    // }
}


