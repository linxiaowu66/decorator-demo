function inject1(target, name, descriptor) {
  console.log('inject1 decorator...', target, name, descriptor)
  return {
    enumerable: false,
    configurable: true,
    writable: true,
    value: () => {console.log('this is called by the inject1 value')}
  }
}

function inject(target, name, descriptor) {
  const { initializer } = descriptor

  console.log('inject decorator...', initializer)

  return {
    enumerable: false,
    configurable: true,
    writable: true,
    initializer() {
      return () => {console.log('this is called by inject initializer')}
    }
  }
}

function inject2(target, name, descriptor) {
  return {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    // value: function(...args) {
    //   descriptor.value.apply(this, args)
    // }
    value: (...args) => {
      descriptor.value.apply(this, args)
    }
  }
}

class A {
  constructor() {
  }
}


class B extends A {
  val = 10
  @inject
  method = () => {}
  @inject1
  method1() {}
  @inject2
  method2() {
    this.val = 100
    console.log(this.val)
  }
  method3() {
    console.log(this)
  }
}

const inis = new B()

inis.method()

inis.method1()

inis.method2()

inis.method3()