var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100; // canvas 배경 폭
canvas.height = window.innerHeight - 100;

var dinoImage = new Image();
var cactusImage = new Image();
dinoImage.src = './img/dinosaur.png';
cactusImage.src = './img/cactus.png';
var floor = {
    x: 0,
    y: 250,
    width: window.innerWidth - 100,
    height: 1,
    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

var dino = { // 공룡
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(dinoImage, this.x, this.y);
    },
    jump() {
        this.y -= 5;
    },
    fall() {
        if(this.y < 200) {
            this.y += 2;
        }
    }

}


// 여러 개의 장애물 값을 생성 하기 위해 클래스를 생성.
class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    
    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(cactusImage, this.x, this.y);
    }
}

var timer = 0;
var jumpingTimer = 0;
var cactusArr = [];
var jumping = false; // 스위치 기능
var jumpingNum = 0;
var animate;
var gameStatus;
var regame;

function moveCactus() {
    animate = requestAnimationFrame(moveCactus); // 코드를 1초에 60번 실행하면 애니메이션을 만들 수 있는 이거 외에 다른 라이브러리를 쓰는 것이 좋다.
    ctx.clearRect(0,0, canvas.width, canvas.height); // ctx 프레임마다 생성되는 canvas 오브젝트를 삭제한다.
    timer++;

    if(timer % 200 === 0) { // frame이 200이면 아래의 코드 실행 
        var cactus = new Cactus(); // 장애물을 만든 클래스를 인스턴스 생성
        cactusArr.push(cactus); // 생성한 인스턴스를 장애물 배열에 넣기
    }

    // foreach element는 배열에서 처리 중인 현재 요소. index 배열에서 처리 중인 현재의 요소의 인덱스. array forEach()를 호줄한 배열
    cactusArr.forEach((element, i, o) => { // 장애물 배열을 하나씩 출력하면서 장애물을 이동할 수 있게 끔 1초마다 144 프레임으로 왼쪽으로 이동
        // x좌표가 0 미만이면 제거
        if(element.x < 0) {
            o.splice(i, 1); // 장애물 x좌표가 0일 경우 배열에서 삭제.
        }

        element.x -= 2;
        element.draw();
        gameOver(dino, element);
    });
    if(jumping === true) { 
        dino.jump();
        jumpingTimer++;
        
    } else if (jumping == false) { // 공룡이 점프를 안하고 있을 때 떨어지는 함수를 실행
        jumpingTimer = 0;
        jumpingNum = 0;
        dino.fall();
    }

    if(jumpingTimer === 25) {
        jumping = false;
        jumpingTimer = 0;
    }
    if(jumpingNum > 2) {
        jumping = false;
        jumpingTimer = 0;
    }

    if(dino.y <= 52) { // 천장 뚫지 않게끔 막기.
        jumping = false;
        jumpingTimer = 0;

    }
    
    dino.draw(); // 공룡 생성
    floor.draw();
}

moveCactus(); // 1초에 60번 함수 실행

document.addEventListener('keypress', function(e) {
    if(e.code === 'Space') { // 스페이스바를 눌러 점프를 시도 했을 때 jumping을 true로 한다.
        jumping = true; 
        jumpingNum +=2;
        console.log(jumpingNum);
    }
});


function gameOver(dino, cactus){
    var xval = cactus.x - (dino.x + dino.width);
    var yval = cactus.y - (dino.y + dino.height);
    if(xval < -5 && yval < -5) {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animate);
    }
}