// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
  // console.log(nums)
  //...здесь пишем код.

  return nums.reduce((acc, el) => acc + el)
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {
  //...здесь пишем код.
  // В return стоит "заглушка", чтоб typescript не ругался
  let isTriangle = a + b > c && a + c > b && b + c > a
  if (a === b && b === c && a === c) {
    return "10"
  } else if (isTriangle && (a === b || b === c || a === c)) {
    return "01"
  } else if (isTriangle) {
    return "11"
  } else if (!isTriangle) {
    return "00"
  }
  return ""
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
  //...здесь пишем код.
  // В return стоит "заглушка", чтоб typescript не ругался
//   let result = String(number)
//     .split("")
//     .map(el => Number(el))
//     .reduce((acc, curr) => acc + curr)
//   return result
  // without reduce
  let string = String(number)
  let sum = 0
  for (let i = 0; i < string.length; i++)
    sum += Number(string[i])
  return sum
}


// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
  //...здесь пишем код.
  // В return стоит "заглушка", чтоб typescript не ругался
  let sumEven = 0
  let sumOdd = 0
  for (let i = 0; i < arr.length; i++)
    if (!(i % 2)) {
      sumEven += arr[i]
    } else {
      sumOdd += arr[i]
    }
  return sumEven > sumOdd
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив.
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
  //...здесь пишем код.
  // В return стоит "заглушка", чтоб typescript не ругался
  return []
}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
  //...здесь пишем код.
  // В return стоит "заглушка", чтоб typescript не ругался
  return 0
}

// ...и "лапку" вверх!!!!


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(amountOfMoney: number): Array<number> {
  //...здесь пишем код.
  // В return стоит "заглушка", чтоб typescript не ругался
  return [1]
}