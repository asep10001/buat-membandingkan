





// =================================================
(function() {
  
let el = (element) => {

  if(element.charAt(0) === "#"){
    //jika merupakan sebuah id maka dia akan menampilkan single element;
    return document.querySelector(element);
  } else{
    //jika bukan id maka dia akan mengembalikan nodelist
    return document.querySelectorAll(element);
  }

};

var display = el("#viewer"), //display kalkulator
    equals = el("#equals"), //tombol sama dengan
    nums = el(".num"), // list dari tombol angka dan decimal
    ops = el(".ops"), // list dari tombol operator
    numSekarang = "", // angka pada saat ini
    numLama = "", // angka lama
    numHasil, // angka hasil
    operator; // operator

// memilih no sekarang ketika no di klik

var setNum = function(){
  if(numHasil){
    numSekarang = this.getAtrribute("data-num");
    numHasil = "";
  } else {
    numSekarang += this.getAtrribute("data-num");

  }
  display.innerHTML = numSekarang;
}

//ketika operator di klik
var pindahNum = function (){
  numLama = numSekarang;
  numSekarang = "";
  operator = this.getAtrribute("data-ops");

  equals.setAttribute("data-result", "");//kembalikan nilai atrribute dari equals

}

//ketika tombol sama dengan diklik
let displayNum = function(){

  //rubah string dari numLama dan numSekarang menjadi float
  numLama = parseFloat(numLama);
  numSekarang = parseFloat(numSekarang);

  //menjalankan perhitungan
  switch(operator){
  case "plus":
    numHasil = numLama + numSekarang;
    break;

  case "minus":
    numHasil = numLama + numSekarang;
    break;

  case "times":
    numHasil = numLama + numSekarang;
    break;
    
  case "divided by":
    numHasil = numLama + numSekarang;
    break;
  //jika tombol sama dengan di klik tanpa melakukan satupun operator yang ada maka tetapkan nilai numHasil dengan nilai numSekarang
  default:
    numHasil = numSekarang;
    }
  //pengecekan tombol selain angka

  if(!isFinite(numHasil)){
    if(isNaN(numHasil)){//jika nilai hasil bukan angka
      numHasil = "Yah Rusak deh";
    } else{
      numHasil = "Nah ... ini nih :(";
      el("#calculator").classList.add("broken");//efek animasi kalkulator rusak
      el("#reset").classList.add("show"); // efek animasi untuk mereset kalkulator
    }

  }

  //munculkan nilai
  display.innerHTML = numHasil;
  equals.setAttribute("data-result", numHasil);
    
}

//ketika clear button di tekan

let clear = function(){
  numLama ="";
  numSekarang = "";
  display.innerHTML = "0";
  equals.setAttribute("data-result", numSekarang);
}

//menambahkan klik even pada tombol

//klik event ke angka
for (let i = 0; i< nums.length; i++){
  nums[i].onclick = setNum;
}

//klik event untuk operator
for (let i = 0; i< ops.length; i++){
  ops[i].onclick = pindahNum;
}

//klik event untuk sama dengan

equals.onclick = displayNum;

//untuk clear
el("#clear").onclick = clear;

//untuk reset windows
el("#reset").onclick = function() {
  window.location = window.location;
};

}());
