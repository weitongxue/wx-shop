export class Animat {
  constructor(name, age) { //constructor是一个构造方法，用来接收参数
    this.name = name//this代表的是实例对象
    this.age = age
  }
  say () {
    console.log(this.name)
  }
}