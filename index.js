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

class A {
  constructor() {
  }
}


class B extends A {
  @inject
  method = () => {}
  @inject1
  method1() {}
}

const inis = new B()

inis.method()

inis.method1()